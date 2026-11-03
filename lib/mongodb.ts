import mongoose from 'mongoose';

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

/**
 * False when MONGO_URI is unset, e.g. in CI or a local `next build` without a
 * database. Public list getters check this and return [] so the build can
 * prerender those pages; at runtime on Netlify MONGO_URI is always set.
 */
export function isMongoConfigured(): boolean {
  return Boolean(process.env.MONGO_URI);
}

async function dbConnect() {
  const MONGODB_URI = process.env.MONGO_URI;
  if (!MONGODB_URI) {
    throw new Error(
      'Set MONGO_URI to your MongoDB connection string (e.g. Netlify: Site configuration → Environment variables → MONGO_URI).',
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      return m;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
