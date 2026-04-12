import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  preferredContact: String,
  travelType: String,
  destination: String,
  departureDate: Date,
  returnDate: Date,
  travelers: String,
  budgetMin: Number,
  budgetMax: Number,
  message: String,
  subscribe: Boolean,
  status: { type: String, default: 'New', enum: ['New', 'Contacted', 'Booked', 'Cancelled'] },
  createdAt: { type: Date, default: Date.now },
  lastFollowUp: Date,
});

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
