require('dotenv').config();
const mongoose = require('mongoose');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const Vehicle = mongoose.connection.db.collection('vehicles');

  const vehiclesData = [
    {
      id: 1,
      name: "PedneCar – Tourist Taxi & Vehicle Rental Service",
      description: "Your Trusted Goa Travel Partner Since 2010. Premier Tourist Taxi, Luxury SUVs, and Tempo Traveler Fleet in Mapusa & all across Goa.",
      image: "/vehicles/pednecar-banner.png",
      images: [
        "/vehicles/pednecar-banner.png",
        "/vehicles/pednecar-wood-banner.png",
        "/vehicles/vehicle-1.webp",
        "/vehicles/vehicle-2.webp",
        "/vehicles/vehicle-3.webp",
        "/vehicles/vehicle-4.webp",
        "/vehicles/vehicle-5.webp"
      ],
      details: `
        <div class="space-y-4 text-slate-700">
          <p class="font-semibold text-lg text-slate-900">Welcome to PedneCar – Your Goa Travel Partner (EST. 2010)</p>
          <p>Operated from Mapusa, Goa, <strong>PedneCar (Tourist Vehicle Service Division)</strong> delivers premium, reliable, and hassle-free transport solutions across North Goa, South Goa, and outstation routes. Whether you need an airport transfer from MOPA or Dabolim, a comfortable sightseeing taxi for beaches and waterfalls, or a spacious luxury Tempo Traveler for group holidays and destination weddings, we have you covered.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <div>
              <p class="font-bold text-amber-900">📍 Registered Office</p>
              <p class="text-sm">Flat No.203, Magic Marvel, Peddem, Mapusa, Goa 403507</p>
            </div>
            <div>
              <p class="font-bold text-amber-900">📞 Direct Booking Contacts</p>
              <p class="text-sm font-medium">+91 8625807465 | 09326380922 | 9370528517</p>
            </div>
          </div>
          <p><strong>Core Divisions & Services:</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>Tourist Taxi & Tempo Traveler:</strong> AC Sedans, Ertiga, Innova Crysta, and 12/17/26 Seater Tempo Travelers.</li>
            <li><strong>Hotels Booking:</strong> Exclusive partner rates for luxury resorts, heritage villas, and beach hotels in Goa.</li>
            <li><strong>Events Booking:</strong> Wedding guest transfers, corporate logistics, conference escorts, and VIP transport.</li>
            <li><strong>Tours & Sightseeing:</strong> Customized North Goa, South Goa, Dudhsagar Falls, Island Cruises & Grand Island Scuba tours.</li>
          </ul>
        </div>
      `,
      features: [
        "Tourist Taxi & Luxury Tempo Traveler",
        "24/7 MOPA (GOX) & Dabolim (GOI) Airport Transfers",
        "Hotels & Resort Booking Assistance",
        "Destination Wedding & Event Logistics",
        "Customized North & South Goa Sightseeing",
        "Professional, Courteous & Verified Chauffeurs",
        "Clean, Sanitized & Modern Fleet",
        "Flexible Hourly, Daily & Outstation Packages"
      ],
      whyChooseUs: [
        {
          iconType: "ShieldCheck",
          title: "Established 2010 in Goa",
          description: "Over 15 years of trusted local hospitality, verified yellow-plate tourist fleet and transparent pricing."
        },
        {
          iconType: "Clock",
          title: "24/7 Airport & Station Transfers",
          description: "Guaranteed on-time pickup and drop across Mopa (GOX), Dabolim (GOI), Thivim, and Madgaon."
        },
        {
          iconType: "Sparkles",
          title: "Complete Travel Solutions",
          description: "Beyond vehicle rentals, we organize hotel reservations, event logistics, and customized sightseeing tours."
        }
      ],
      pricing: [
        { type: "Airport Transfer (Sedan)", price: "From ₹1,500" },
        { type: "Full Day Goa Sightseeing (Sedan)", price: "₹2,800/day" },
        { type: "Innova Crysta (Full Day / 80km)", price: "₹4,200/day" },
        { type: "Luxury Tempo Traveler (12-17 Seater)", price: "₹6,500/day" }
      ],
      availabilityNotes: "Instant bookings available. Advance reservation recommended during peak season (Oct - March).",
      enquiryLink: "/enquiry/vehicle-rental",
      listIcon: "Car",
      listColor: "bg-amber-50 text-amber-600",
      isCustomLink: false,
      updatedAt: new Date()
    },
    {
      id: 2,
      name: "Toyota Innova Crysta – Premium 7-Seater MUV",
      description: "The gold standard of comfortable family travel in Goa. Luxury captain seats, supreme AC, and ample luggage space for sightseeing and long drives.",
      image: "/vehicles/vehicle-3.webp",
      images: [
        "/vehicles/vehicle-3.webp",
        "/vehicles/pednecar-banner.png",
        "/vehicles/vehicle-4.webp"
      ],
      details: `
        <div class="space-y-4 text-slate-700">
          <p>Experience the ultimate in travel luxury with our <strong>Toyota Innova Crysta</strong> fleet managed by PedneCar Goa. Engineered for smooth rides on coastal highways and ghat roads, this is Goa's most favored vehicle for family vacations, airport transfers, and VIP transport.</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Comfortable 6+1 and 7+1 seating configurations with individual rear AC vents.</li>
            <li>Spacious boot space capable of accommodating 4-5 large travel suitcases.</li>
            <li>Experienced, courteous local drivers who double as knowledgeable local guides.</li>
          </ul>
        </div>
      `,
      features: [
        "Captain Seat Luxury",
        "Dual-Zone Powerful Air Conditioning",
        "Ample Luggage Capacity (4-5 Bags)",
        "USB Fast Charging Ports",
        "Smooth Highway & Coastal Performance",
        "Complimentary Bottled Water on Board"
      ],
      whyChooseUs: [
        {
          iconType: "ShieldCheck",
          title: "Prime Quality Fleet",
          description: "Immaculately maintained Innova Crysta vehicles serviced regularly."
        },
        {
          iconType: "Clock",
          title: "Punctual Drivers",
          description: "Reliable airport pickups with flight tracking."
        },
        {
          iconType: "Sparkles",
          title: "All-Inclusive Rates",
          description: "Transparent pricing including fuel, driver charges, and toll fees."
        }
      ],
      pricing: [
        { type: "Airport Pickup / Drop", price: "From ₹2,200" },
        { type: "Full Day Sightseeing (8 Hrs / 80 Km)", price: "₹4,200" },
        { type: "Outstation (Dudhsagar / Gokarna / Malvan)", price: "₹18/km" }
      ],
      availabilityNotes: "Available 24/7 across North & South Goa.",
      enquiryLink: "/enquiry/vehicle-rental",
      listIcon: "Car",
      listColor: "bg-blue-50 text-blue-600",
      isCustomLink: false,
      updatedAt: new Date()
    },
    {
      id: 3,
      name: "Luxury Tempo Traveler – 12 to 26 Seater",
      description: "Specialized group transport for destination weddings, corporate team outings, family get-togethers, and sightseeing tours across Goa.",
      image: "/vehicles/vehicle-4.webp",
      images: [
        "/vehicles/vehicle-4.webp",
        "/vehicles/pednecar-banner.png",
        "/vehicles/vehicle-5.webp"
      ],
      details: `
        <div class="space-y-4 text-slate-700">
          <p>Travelling with a group? PedneCar's <strong>Luxury Force Tempo Traveler</strong> fleet is the ideal choice for destination weddings, family reunions, party groups, and corporate retreats across Goa.</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Available in 12, 17, 20, and 26-seater premium executive formats.</li>
            <li>Pushback reclining seats, wide aisle, panoramic viewing windows, and high-roof headroom.</li>
            <li>Equipped with high-performance AC, LED TV, audio entertainment system, and separate oversized luggage hold.</li>
          </ul>
        </div>
      `,
      features: [
        "12 / 17 / 20 / 26 Seating Options",
        "Push-Back Reclining Luxury Seats",
        "High-Performance Dual AC",
        "Surround Sound Audio System & Mic",
        "Dedicated Boot for 15+ Bags",
        "Experienced Mountain & Highway Chauffeur"
      ],
      whyChooseUs: [
        {
          iconType: "ShieldCheck",
          title: "Safety & Comfort",
          description: "Equipped with speed governors, seatbelts, and comprehensive commercial permits."
        },
        {
          iconType: "Clock",
          title: "Wedding & Event Specialist",
          description: "Proven track record managing guest shuttles for 100+ destination weddings."
        },
        {
          iconType: "Sparkles",
          title: "Cost-Effective Group Travel",
          description: "Keep your entire family or group together while reducing per-head transit cost."
        }
      ],
      pricing: [
        { type: "12-Seater (Full Day / 80 Km)", price: "₹5,500" },
        { type: "17-Seater (Full Day / 80 Km)", price: "₹6,800" },
        { type: "26-Seater (Full Day / 80 Km)", price: "₹8,500" },
        { type: "Wedding Event Package (12 Hours)", price: "Custom Quote" }
      ],
      availabilityNotes: "Advance reservation of 2-3 days recommended for wedding and corporate dates.",
      enquiryLink: "/enquiry/vehicle-rental",
      listIcon: "Car",
      listColor: "bg-emerald-50 text-emerald-600",
      isCustomLink: false,
      updatedAt: new Date()
    },
    {
      id: 4,
      name: "Executive Tourist Sedans – Dzire, Etios & Honda City",
      description: "Economical, comfortable, and air-conditioned sedans for daily commute, couple sightseeing, shopping tours, and airport shuttles.",
      image: "/vehicles/vehicle-1.webp",
      images: [
        "/vehicles/vehicle-1.webp",
        "/vehicles/vehicle-2.webp",
        "/vehicles/pednecar-banner.png"
      ],
      details: `
        <div class="space-y-4 text-slate-700">
          <p>For solo travelers, couples, and small families, our fleet of <strong>AC Sedans (Maruti Swift Dzire, Toyota Etios, Honda City)</strong> provides the most cost-effective and swift way to explore Goa.</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Fuel-efficient, compact yet roomy, perfect for navigating Goa's scenic village roads and beach lanes.</li>
            <li>Fixed-rate airport transfers to Calangute, Baga, Candolim, Anjuna, Panjim, and Colva.</li>
          </ul>
        </div>
      `,
      features: [
        "Chilled Air Conditioning",
        "4 Passengers + Driver Capacity",
        "Fits 2-3 Medium Bags",
        "Clean & Non-Smoking Interiors",
        "Quickest Navigation through Beach Streets",
        "Transparent Distance-Based Meter/Package"
      ],
      whyChooseUs: [
        {
          iconType: "ShieldCheck",
          title: "Reliable & Economical",
          description: "Budget-friendly travel with no surge pricing or hidden convenience charges."
        },
        {
          iconType: "Clock",
          title: "Rapid Dispatch",
          description: "Fast availability in Mapusa, Panjim, Calangute, and surrounding areas."
        },
        {
          iconType: "Sparkles",
          title: "Clean & Sanitized",
          description: "Freshly cleaned and sanitized before every customer assignment."
        }
      ],
      pricing: [
        { type: "MOPA Airport Pick/Drop", price: "₹1,500" },
        { type: "Dabolim Airport Pick/Drop", price: "₹1,800" },
        { type: "North Goa Sightseeing (Full Day)", price: "₹2,600" },
        { type: "South Goa Heritage Tour", price: "₹3,200" }
      ],
      availabilityNotes: "Instant booking available on call or WhatsApp.",
      enquiryLink: "/enquiry/vehicle-rental",
      listIcon: "Car",
      listColor: "bg-amber-50 text-amber-600",
      isCustomLink: false,
      updatedAt: new Date()
    }
  ];

  for (const v of vehiclesData) {
    await Vehicle.updateOne(
      { id: v.id },
      { $set: v },
      { upsert: true }
    );
    console.log(`Upserted vehicle: ${v.id} - ${v.name}`);
  }

  console.log('Seeding finished successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
