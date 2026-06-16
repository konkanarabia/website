import mongoose, { Schema, Document } from 'mongoose';

export interface ITranslation extends Document {
  hash: string;
  originalText: string;
  locale: string;
  translatedText: string;
  createdAt: Date;
  updatedAt: Date;
}

const TranslationSchema = new Schema<ITranslation>({
  hash: { type: String, required: true },
  originalText: { type: String, required: true },
  locale: { type: String, required: true },
  translatedText: { type: String, required: true }
}, { timestamps: true });

// Unique index to ensure lookups are fast and duplicates are avoided
TranslationSchema.index({ hash: 1, locale: 1 }, { unique: true });

export default mongoose.models.Translation || mongoose.model<ITranslation>('Translation', TranslationSchema);
