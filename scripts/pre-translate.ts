import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini Client
const key = process.env.GEMINI_API_KEY?.trim();
if (!key) {
  console.error('Error: GEMINI_API_KEY is not defined in .env');
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey: key });
const models = ['gemini-2.0-flash', 'gemini-2.5-flash'];

// Target languages
const targetLanguages: Record<string, string> = {
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  pt: 'Portuguese',
  ar: 'Arabic',
  hi: 'Hindi',
};

// Mongoose schemas
const Schema = mongoose.Schema;

const TranslationSchema = new Schema({
  hash: { type: String, required: true },
  originalText: { type: String, required: true },
  locale: { type: String, required: true },
  translatedText: { type: String, required: true }
}, { timestamps: true });

TranslationSchema.index({ hash: 1, locale: 1 }, { unique: true });

const Translation = mongoose.models.Translation || mongoose.model('Translation', TranslationSchema);

const Destination = mongoose.models.Destination || mongoose.model('Destination', new Schema({}, { strict: false }));
const Event = mongoose.models.Event || mongoose.model('Event', new Schema({}, { strict: false }));
const Hospitality = mongoose.models.Hospitality || mongoose.model('Hospitality', new Schema({}, { strict: false }));
const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', new Schema({}, { strict: false }));
const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', new Schema({}, { strict: false }));
const Visa = mongoose.models.Visa || mongoose.model('Visa', new Schema({}, { strict: false }));
const Review = mongoose.models.Review || mongoose.model('Review', new Schema({}, { strict: false }));

// Helper to extract strings from DB documents
function extractStrings(obj: any, stringsSet: Set<string>) {
  if (!obj) return;
  if (typeof obj === 'string') {
    const trimmed = obj.trim();
    if (
      trimmed &&
      !trimmed.startsWith('http') &&
      !trimmed.startsWith('/') &&
      trimmed.length > 1 &&
      isNaN(Number(trimmed))
    ) {
      stringsSet.add(trimmed);
    }
    return;
  }
  if (Array.isArray(obj)) {
    for (const item of obj) {
      extractStrings(item, stringsSet);
    }
    return;
  }
  if (typeof obj === 'object') {
    for (const [key, value] of Object.entries(obj)) {
      const lowerKey = key.toLowerCase();
      if (
        lowerKey === '_id' ||
        lowerKey === 'id' ||
        lowerKey === '__v' ||
        lowerKey.includes('url') ||
        lowerKey.includes('image') ||
        lowerKey.includes('icon') ||
        lowerKey.includes('color') ||
        lowerKey.includes('date') ||
        lowerKey.includes('class') ||
        lowerKey === 'createdat' ||
        lowerKey === 'updatedat'
      ) {
        continue;
      }
      extractStrings(value, stringsSet);
    }
  }
}

// Helper to extract static strings from source files
function findStaticStringsInDir(dirPath: string, stringsSet: Set<string>) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      findStaticStringsInDir(fullPath, stringsSet);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Match <TranslatedText text="something" />
        const textMatches = content.matchAll(/<TranslatedText\s+[^>]*text="([^"]+)"/g);
        for (const match of textMatches) {
          if (match[1]) stringsSet.add(match[1].trim());
        }
        
        // Match useTranslatedString("something")
        const hookMatches = content.matchAll(/useTranslatedString\(\s*"([^"]+)"\s*\)/g);
        for (const match of hookMatches) {
          if (match[1]) stringsSet.add(match[1].trim());
        }
      } catch (err) {
        console.error('Failed to parse static translations from file:', fullPath, err);
      }
    }
  }
}

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('Error: MONGO_URI is not defined in .env');
    process.exit(1);
  }

  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri);
  console.log('Connected successfully.');

  const stringsSet = new Set<string>();

  // Fetch from DB
  console.log('Fetching collections...');
  const [destinations, events, hospitalities, restaurants, vehicles, visas, reviews] = await Promise.all([
    Destination.find().lean(),
    Event.find().lean(),
    Hospitality.find().lean(),
    Restaurant.find().lean(),
    Vehicle.find().lean(),
    Visa.find().lean(),
    Review.find().lean(),
  ]);

  extractStrings(destinations, stringsSet);
  extractStrings(events, stringsSet);
  extractStrings(hospitalities, stringsSet);
  extractStrings(restaurants, stringsSet);
  extractStrings(vehicles, stringsSet);
  extractStrings(visas, stringsSet);
  extractStrings(reviews, stringsSet);

  // Scan TSX/TS files
  console.log('Scanning client components...');
  findStaticStringsInDir(path.join(process.cwd(), 'app'), stringsSet);
  findStaticStringsInDir(path.join(process.cwd(), 'components'), stringsSet);

  const allStrings = Array.from(stringsSet);
  console.log(`Found ${allStrings.length} total translatable strings.`);

  // Load existing translations from MongoDB
  console.log('Loading existing translation cache from MongoDB...');
  const existingTranslations = await Translation.find({}, { hash: 1, locale: 1 }).lean();
  const cachedSet = new Set<string>();
  for (const record of existingTranslations) {
    cachedSet.add(`${record.hash}:${record.locale}`);
  }
  console.log(`Loaded ${existingTranslations.length} cached translations.`);

  // Filter out strings that are already fully cached in all target languages
  const stringsToTranslate = allStrings.filter((text) => {
    const hash = crypto.createHash('sha256').update(text).digest('hex');
    return Object.keys(targetLanguages).some((lang) => !cachedSet.has(`${hash}:${lang}`));
  });

  console.log(`Remaining strings needing translation: ${stringsToTranslate.length}`);

  if (stringsToTranslate.length === 0) {
    console.log('All strings are already pre-translated! Exiting.');
    await mongoose.disconnect();
    return;
  }

  // Batch strings into chunks of 40 to be highly request-efficient
  const batchSize = 40;
  const batches: string[][] = [];
  for (let i = 0; i < stringsToTranslate.length; i += batchSize) {
    batches.push(stringsToTranslate.slice(i, i + batchSize));
  }

  console.log(`Total batches to process: ${batches.length} (batch size = ${batchSize})`);

  for (let b = 0; b < batches.length; b++) {
    const batch = batches[b];
    console.log(`\n--- Processing Batch ${b + 1}/${batches.length} (Size: ${batch.length}) ---`);

    const prompt = `You are a travel website translation API. Translate the following list of travel website texts into Spanish (es), French (fr), German (de), Portuguese (pt), Arabic (ar), and Hindi (hi).

List of texts to translate:
${JSON.stringify(batch, null, 2)}

Return ONLY a JSON array of objects of the same size (${batch.length}) and in the same order as the input list.
Each object in the array must have exactly these keys: "es", "fr", "de", "pt", "ar", "hi" with their respective translated values. Do not write any explanations or wrap the output in markdown code blocks.`;

    let success = false;
    let retries = 0;
    const maxRetries = 5;
    let modelIndex = 0;

    while (!success && retries < maxRetries) {
      const currentModel = models[modelIndex % models.length];
      try {
        console.log(`[Batch ${b + 1}] Requesting translation using model: ${currentModel}...`);
        const response = await ai.models.generateContent({
          model: currentModel,
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const textRes = response.text?.trim() || '';
        let jsonArray: any[] = [];
        try {
          jsonArray = JSON.parse(textRes);
        } catch {
          // If response had markdown formatting, strip it
          let cleanText = textRes;
          if (cleanText.startsWith('```')) {
            cleanText = cleanText.replace(/^```(?:json)?\n/i, '').replace(/\n```$/, '');
          }
          jsonArray = JSON.parse(cleanText);
        }

        if (Array.isArray(jsonArray) && jsonArray.length === batch.length) {
          // Save translations directly to MongoDB
          for (let idx = 0; idx < batch.length; idx++) {
            const origText = batch[idx];
            const hash = crypto.createHash('sha256').update(origText).digest('hex');
            const translations = jsonArray[idx];

            for (const lang of Object.keys(targetLanguages)) {
              if (translations[lang]) {
                const translatedText = translations[lang].trim();
                await Translation.findOneAndUpdate(
                  { hash, locale: lang },
                  { originalText: origText, translatedText },
                  { upsert: true, new: true }
                );
              }
            }
          }

          console.log(`[Batch ${b + 1} Success] Saved translations for ${batch.length} strings directly to MongoDB.`);
          success = true;
        } else {
          console.warn(`[Batch ${b + 1} Warning] Returned array length (${jsonArray?.length}) did not match expected size (${batch.length}). Retrying...`);
          retries++;
        }
      } catch (err: any) {
        const errMsg = err.message || String(err);
        console.error(`[Batch ${b + 1} Error] (Attempt ${retries + 1}/${maxRetries}) on model ${currentModel}:`, errMsg);

        // Check if rate limit/quota error (429 / RESOURCE_EXHAUSTED)
        if (errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('quota')) {
          modelIndex++;
          const nextModel = models[modelIndex % models.length];
          console.log(`[Rate Limit] Switching model from ${currentModel} to ${nextModel}...`);
          
          // If we have cycled through all available models, perform a wait
          if (modelIndex >= models.length) {
            let waitSeconds = 45;
            const match = errMsg.match(/retry in (\d+(\.\d+)?)/i) || errMsg.match(/retryDelay":"(\d+)s"/i);
            if (match && match[1]) {
              waitSeconds = Math.ceil(parseFloat(match[1])) + 2;
            }
            console.log(`[Rate Limit] All models exhausted for this attempt. Sleeping for ${waitSeconds} seconds before retrying...`);
            await new Promise((resolve) => setTimeout(resolve, waitSeconds * 1000));
            // Reset model index and increment retry count
            modelIndex = 0;
            retries++;
          }
        } else {
          // Regular error, wait a small bit and retry
          retries++;
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }
    }

    if (!success) {
      console.error(`[Batch ${b + 1} Critical] Failed to translate batch after ${maxRetries} attempts. Skipping to next batch to prevent blocking.`);
    }

    // Delay 12 seconds between batches to stay under 5 RPM limit
    if (b < batches.length - 1) {
      console.log('Sleeping 12 seconds to respect 5 RPM rate limit...');
      await new Promise((resolve) => setTimeout(resolve, 12000));
    }
  }

  console.log('\n=======================================');
  console.log('Pre-translation run finished!');
  console.log('=======================================');
  await mongoose.disconnect();
}

main().catch(console.error);
