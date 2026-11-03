import mongoose from 'mongoose';

/**
 * Login attempt counter for one rate-limit window. Lives in MongoDB so the
 * limit holds across Netlify function instances and cold starts.
 */
const LoginAttemptSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  count: { type: Number, required: true, default: 0 },
  // TTL index: MongoDB removes the document once the window has passed.
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

export default mongoose.models.LoginAttempt || mongoose.model('LoginAttempt', LoginAttemptSchema);
