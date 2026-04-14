import mongoose, { Schema, Document } from 'mongoose';

export interface IWhyChooseUs {
  iconType: string;
  title: string;
  description: string;
}

export interface IPricing {
  type: string;
  price: string;
}

export interface IRestaurant extends Document {
  id: number;
  name: string;
  description: string;
  image: string;
  images?: string[];
  details: string;
  features?: string[];
  whyChooseUs?: IWhyChooseUs[];
  pricing?: IPricing[];
  availabilityNotes?: string;
  enquiryLink?: string;
  
  // Fields for services list
  listIcon?: string;
  listColor?: string;
  isCustomLink?: boolean;
  customLinkUrl?: string;
}

const WhyChooseUsSchema = new Schema<IWhyChooseUs>({
  iconType: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const PricingSchema = new Schema<IPricing>({
  type: { type: String, required: true },
  price: { type: String, required: true }
});

const RestaurantSchema = new Schema<IRestaurant>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  images: { type: [String], default: [] },
  details: { type: String },
  features: { type: [String], default: [] },
  whyChooseUs: { type: [WhyChooseUsSchema], default: [] },
  pricing: { type: [PricingSchema], default: [] },
  availabilityNotes: { type: String },
  enquiryLink: { type: String },
  
  listIcon: { type: String },
  listColor: { type: String },
  isCustomLink: { type: Boolean, default: false },
  customLinkUrl: { type: String }
}, { timestamps: true });

export default mongoose.models.Restaurant || mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
