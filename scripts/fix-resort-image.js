require('dotenv').config();
const mongoose = require('mongoose');

const HospitalitySchema = new mongoose.Schema({}, { strict: false });
const Hospitality = mongoose.models.Hospitality || mongoose.model('Hospitality', HospitalitySchema);

async function main() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) { console.error('No MONGO URI found'); process.exit(1); }

  await mongoose.connect(uri);

  // Force update using $set operator
  const result = await Hospitality.collection.updateOne(
    { id: 1 },
    { $set: { image: '/services/siddhivinayak-resort.jpeg', updatedAt: new Date() } }
  );

  console.log('Matched:', result.matchedCount, '| Modified:', result.modifiedCount);

  // Verify
  const doc = await Hospitality.collection.findOne({ id: 1 }, { projection: { name: 1, image: 1, updatedAt: 1 } });
  console.log('\nVerified record:');
  console.log('  Name:', doc.name);
  console.log('  Image:', doc.image);
  console.log('  UpdatedAt:', doc.updatedAt);

  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
