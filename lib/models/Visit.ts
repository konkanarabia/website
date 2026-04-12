import mongoose, { Schema, Document } from 'mongoose';

export interface IVisit extends Document {
  path: string;
  userAgent: string;
  ip: string;
  sessionId: string;
  timestamp: Date;
}

const VisitSchema = new Schema<IVisit>({
  path: { type: String, required: true },
  userAgent: { type: String },
  ip: { type: String },
  sessionId: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Visit || mongoose.model<IVisit>('Visit', VisitSchema);
