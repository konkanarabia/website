import mongoose from 'mongoose';

/** Server-side record of a live admin session. Deleting it revokes the cookie. */
const AdminSessionSchema = new mongoose.Schema({
  sidHash: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  // TTL index: MongoDB removes the document once expiresAt has passed.
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

export default mongoose.models.AdminSession || mongoose.model('AdminSession', AdminSessionSchema);
