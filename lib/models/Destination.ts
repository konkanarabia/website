import mongoose, { Schema, Document } from 'mongoose';

export interface IItineraryItem {
  day: string;
  title: string;
  description: string;
}

export interface IDestination extends Document {
  id: number;
  name: string;
  description: string;
  image: string;
  details: string;
  highlights: string[];
  duration: string;
  bestTime: string;
  priceMin?: number;
  priceMax?: number;
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: IItineraryItem[];
  availableDates?: Date[];
  blackoutDates?: Date[];
  type: 'Domestic' | 'International';
}

const ItineraryItemSchema = new Schema<IItineraryItem>({
  day: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const DestinationSchema = new Schema<IDestination>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  details: { type: String, required: true },
  highlights: { type: [String], default: [] },
  duration: { type: String, required: true },
  bestTime: { type: String, required: true },
  priceMin: { type: Number },
  priceMax: { type: Number },
  inclusions: { type: [String], default: [] },
  exclusions: { type: [String], default: [] },
  itinerary: { type: [ItineraryItemSchema], default: [] },
  availableDates: { type: [Date], default: [] },
  blackoutDates: { type: [Date], default: [] },
  type: { type: String, enum: ['Domestic', 'International'], default: 'International' }
}, { timestamps: true });

export default mongoose.models.Destination || mongoose.model<IDestination>('Destination', DestinationSchema);
