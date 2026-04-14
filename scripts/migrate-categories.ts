import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Vehicle from '../lib/models/Vehicle';
import Visa from '../lib/models/Visa';
import Event from '../lib/models/Event';
import Hospitality from '../lib/models/Hospitality';
import Restaurant from '../lib/models/Restaurant';

dotenv.config({ path: '.env' });

async function migrate() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const servicesCollection = mongoose.connection.db.collection('services');
  const allServices = await servicesCollection.find().toArray();

  for (const s of allServices) {
    const cleanData = { ...s };
    delete cleanData._id;
    delete cleanData.__v;

    if (s.name === 'Vehicle Rental') {
      console.log('Migrating Vehicle Rental...');
      await Vehicle.findOneAndUpdate({ id: s.id }, cleanData, { upsert: true });
    } else if (s.name === 'Visa Services') {
      console.log('Migrating Visa Services...');
      await Visa.findOneAndUpdate({ id: s.id }, cleanData, { upsert: true });
    } else if (s.name === 'Event Management') {
      console.log('Migrating Event Management...');
      await Event.findOneAndUpdate({ id: s.id }, cleanData, { upsert: true });
    }
  }

  // Pre-populate Hospitality from hardcoded data if empty
  const hospitalityCount = await Hospitality.countDocuments();
  if (hospitalityCount === 0) {
    console.log('Seeding Hospitality data...');
    await Hospitality.create({
      id: 1,
      name: "Siddhivinayak Devbag Beach Resort",
      description: "Beach Side Family Holiday Stay, AC & Non Ac Rooms, Water Sports, Scuba, & Event place",
      image: "/services/siddhivinayak-resort.jpg",
      listIcon: "Hotel",
      listColor: "bg-blue-50 text-blue-600",
      features: ["Beach Side Stay", "AC & Non-Ac Rooms", "Water Sports", "Scuba Diving", "Event Space"],
      details: "Located right on the white sands of Devbag beach, Siddhivinayak Resort offers a perfect blend of traditional Malvani hospitality and modern comfort. Our rooms are designed for families and couples seeking peace and adventure alike.",
      isCustomLink: false,
      pricing: [{ type: "Standard Room", price: "₹3,500" }, { type: "Luxury AC Suite", price: "₹6,500" }]
    });
  }

  // Pre-populate Restaurant from hardcoded data if empty
  const restaurantCount = await Restaurant.countDocuments();
  if (restaurantCount === 0) {
    console.log('Seeding Restaurant data...');
    await Restaurant.create({
      id: 1,
      name: "Konkan Swad - The Test Of Konkan",
      description: "Authentic Malvani & Goan Sea Food Restaurant",
      image: "/services/siddhivinayak-resort.jpg",
      listIcon: "Utensils",
      listColor: "bg-red-50 text-red-600",
      features: ["Authentic Malvani", "Goan Sea Food", "Fresh Catch", "Traditional Recipes", "Premium Dining"],
      details: "Experience the true flavors of the Konkan coast. Our chefs use age-old recipes and the freshest catch of the day to bring you an unforgettable Malvani dining experience.",
      isCustomLink: false,
      pricing: [{ type: "Sea Food Thali", price: "₹450" }, { type: "Special Surmai Fry", price: "₹650" }]
    });
  }

  console.log('Migration complete!');
  process.exit(0);
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});
