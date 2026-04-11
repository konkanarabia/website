export interface ItineraryItem {
  day: number | string;
  title: string;
  description: string;
}

export interface Destination {
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
  itinerary?: ItineraryItem[];
}

export const destinations: Destination[] = [
  // INTERNATIONAL DESTINATIONS
  {
    id: 11,
    name: "Dubai Tour – 4 Nights / 5 Days",
    description: "The City of Gold",
    image: "/destinations/international/Dubai-1.jpeg",
    details: "Dubai is a city and emirate in the United Arab Emirates known for luxury shopping, ultramodern architecture and a lively nightlife scene. This 4 Nights / 5 Days tour covers the best of Dubai including Burj Khalifa, Desert Safari, and Dhow Cruise.",
    duration: "4 Nights / 5 Days",
    bestTime: "November to March",
    highlights: ["Burj Khalifa 124th Floor", "Desert Safari with BBQ Dinner", "Miracle Garden", "Global Village", "Half Day Dubai City Tour"],
    inclusions: [
      "UAE Tourist Visa",
      "Two-way Airport Transfer",
      "Hotel Options – 3*, 4* & 5* with Daily Breakfast",
      "Marina / Creek Dhow Cruise with Buffet Dinner",
      "Half Day Dubai City Tour",
      "Burj Khalifa 124th Floor Entry",
      "Miracle Garden",
      "Global Village",
      "Desert Safari with BBQ Dinner"
    ],
    exclusions: [
      "International Flights",
      "Lunch & Dinner",
      "Any personal Expenses"
    ],
    itinerary: [
      { day: 1, title: "Marhaba Dubai & Dhow Cruise Dinner", description: "Welcome to the City of Gold! Upon arrival at Dubai International Airport (DXB), clear immigration and transfer to your hotel. Relax and recharge. In the evening, head to Dubai Creek or Marina for a traditional Dhow Cruise. Enjoy a lavish international buffet dinner with live Tanoura dance show while cruising past the illuminated skyscrapers." },
      { day: 2, title: "Dubai City Tour & Peak of the World", description: "Discover the contrast between old and new. Visit the Jumeirah Mosque, take a photo-op at the sail-shaped Burj Al Arab, and drive through the Palm Jumeirah. In the afternoon, head to the Dubai Mall and ascend to the 124th floor of the Burj Khalifa for unparalleled views. Stay for the spectacular Dubai Fountain Show." },
      { day: 3, title: "Miracle Garden & Global Village Extravaganza", description: "Witness the floral wonders at the Dubai Miracle Garden, the world's largest natural flower garden with over 50 million flowers. Later, immerse yourself in the cultural diversity of Global Village, featuring pavilions from over 80 countries, incredible street food, and world-class entertainment shows." },
      { day: 4, title: "Leisure Morning & Thrilling Desert Safari", description: "Spend your morning shopping at the Gold Souk or Meena Bazaar. Afternoon, Gear up for a 4x4 Desert Safari adventure. Experience heart-pounding dune bashing, sandboarding, and camel rides. Conclude the night at a traditional Bedouin camp with a BBQ dinner, belly dancing, and fire shows under the stars." },
      { day: 5, title: "Last Minute Shopping & Departure", description: "Enjoy a final Arabic breakfast at your hotel. Depending on your flight, spend time at the Museum of the Future (optional) or do some last-minute shopping at the Emirates Mall. Transfer to the airport for your departure flight with memories that will last a lifetime." }
    ]
  },
  {
    id: 15,
    name: "Vietnam – 6 Nights / 7 Days",
    description: "The Classic Highlights",
    image: "/destinations/international/Vietnam.jpeg",
    details: "Best for first-timers who want a mix of history, nature, and the 'most famous' sights of North and Central Vietnam.",
    duration: "6 Nights / 7 Days",
    bestTime: "February to April & August to October",
    highlights: ["Hanoi Old Quarter", "Halong Bay Cruise", "Hoi An Ancient Town", "Ba Na Hills", "Golden Bridge"],
    itinerary: [
      { day: 1, title: "Arrive in Hanoi", description: "Check into the Old Quarter. Take a 'cyclo' ride through the 36 ancient streets and enjoy a bowl of authentic Pho." },
      { day: 2, title: "Hanoi City & Culture", description: "Visit the Ho Chi Minh Mausoleum, Temple of Literature, and the iconic Train Street. End the day with a Water Puppet Show." },
      { day: 3, title: "Halong Bay Cruise", description: "Travel to Halong Bay (2-3 hours). Board an overnight cruise. Kayak through limestone karsts and explore Sung Sot Cave." },
      { day: 4, title: "Halong Bay to Hoi An", description: "Morning Tai Chi on deck. Return to Hanoi and take an evening flight to Da Nang, then a 30-minute taxi to Hoi An." },
      { day: 5, title: "Hoi An Ancient Town", description: "A UNESCO site. Visit the Japanese Covered Bridge, get a custom suit/dress made at a tailor, and release lanterns on the river at night." },
      { day: 6, title: "Ba Na Hills & Golden Bridge", description: "Take the world’s longest cable car to see the 'Giant Hands' bridge. Return to Hoi An for a final seafood dinner by the beach." },
      { day: 7, title: "Departure", description: "Grab a Banh Mi for breakfast, visit the Hoi An Central Market for souvenirs, and fly out of Da Nang." }
    ]
  },
  {
    id: 12,
    name: "Thailand – The Classic",
    description: "Bangkok & Pattaya",
    image: "/destinations/international/Thailand-1.jpg",
    details: "Best for families and shoppers who want a mix of vibrant city life and beach fun.",
    duration: "5 Nights / 6 Days",
    bestTime: "November to February",
    highlights: ["Pattaya Beach", "Coral Island", "Grand Palace Bangkok", "Floating Market", "Alcazar Cabaret Show"],
    itinerary: [
      { day: 1, title: "Arrival in Bangkok & Transfer to Pattaya", description: "Arrive at Bangkok's Suvarnabhumi Airport. Your private chauffeur will greet you and drive you to the vibrant coastal city of Pattaya (approx. 2 hours). Check into your hotel and relax. In the evening, witness the world-famous Alcazar Cabaret Show, a spectacular display of music, dance, and dazzling costumes." },
      { day: 2, title: "Coral Island (Koh Larn) Adventure", description: "After breakfast, board a shared speedboat for a thrilling ride to Coral Island. Spend your morning swimming in crystal-clear turquoise waters or relaxing on the white sandy beaches. Adventure seekers can opt for parasailing, sea-walking, or snorkeling. Enjoy a delicious local Indian/Thai lunch on the island before returning to Pattaya." },
      { day: 3, title: "Cultural Pattaya & Nong Nooch Garden", description: "Explore the cultural side of Pattaya. Visit the Nong Nooch Tropical Garden, home to world-class botanical displays and cultural shows including Thai boxing and elephant performances. Later, visit the Sanctuary of Truth, a massive wooden structure carved entirely by hand, representing ancient philosophy and art." },
      { day: 4, title: "Bangkok City Tour & Royal Heritage", description: "Check out and drive back to Bangkok. Embark on a city tour visiting the Grand Palace, the official residence of the Kings of Siam. Marvel at the intricate architecture of Wat Phra Kaew (Emerald Buddha) and the giant Reclining Buddha at Wat Pho. Evening, enjoy a walk through the bustling Sukhumvit area." },
      { day: 5, title: "Railway & Floating Markets Experience", description: "Experience the unique 'Umbrella Pulldown' market at Maeklong Railway Market, where vendors fold their stalls as the train passes through. Continue to Damnoen Saduak Floating Market; hop on a long-tail boat to navigate the canals filled with colorful fruit and food sellers. Evening free for shopping at MBK or Siam Paragon." },
      { day: 6, title: "Leisure and Departure", description: "Enjoy a final Thai breakfast. Spend your morning at leisure for last-minute shopping or a traditional Thai massage. Transfer to Bangkok International Airport for your flight back home with unforgettable memories." }
    ]
  },
  {
    id: 13,
    name: "Sri Lanka – Emerald Island",
    description: "Cultural & Scenic Tour",
    image: "/destinations/international/Sri Lanka.png",
    details: "A perfect mix of history, spirituality, and breathtaking natural beauty across the Pearl of the Indian Ocean.",
    duration: "6 Nights / 7 Days",
    bestTime: "December to March",
    highlights: ["Sigiriya Rock", "Temple of Tooth", "Scenic Blue Train", "Nine Arches Bridge", "Galle Fort"],
    itinerary: [
      { day: 1, title: "Arrival & The Fishing Village - Negombo", description: "Welcome to the Emerald Isle! Meet our representative and transfer to Negombo (20 mins). Explore the bustling fish market, the Dutch canal, and the sandy beach. In the evening, enjoy a sunset boat ride through the lagoon, punctuated by the sight of traditional outrigger canoes." },
      { day: 2, title: "The Cave Temple & The Lion Rock", description: "Drive to the Cultural Triangle. Visit the Dambulla Cave Temple, a UNESCO site containing stunning statues and paintings of Lord Buddha. In the afternoon, arrive at Sigiriya and climb the 1,200 steps to the summit of the Lion Rock Fortress, which housed a royal palace 1,500 years ago." },
      { day: 3, title: "Spiritual Kandy & Cultural Rhythms", description: "Travel to Kandy, the last royal capital of Sri Lanka. Stop at a Spice Garden in Matale to learn about Ayurvedic healing. In Kandy, visit the Temple of the Sacred Tooth Relic. End your day with a vibrant Sri Lankan cultural show featuring traditional drumming and fire walking." },
      { day: 4, title: "Tea Cascades & Little England", description: "A scenic climb into the mountains to Nuwara Eliya. Visit a lush tea plantation and factory to taste pure Ceylon tea and learn the 'two leaves and a bud' picking process. Explore the colonial-era Gregory Lake and the Victoria Park, feeling the cool mist of the highlands." },
      { day: 5, title: "The Blue Train Odyssey & Ella", description: "Embark on one of the world's most beautiful train journeys from Nanu Oya to Ella. Witness sprawling tea estates and cascading waterfalls from your window. In Ella, walk across the iconic Nine Arches Bridge and hike up Little Adam's Peak for a breathtaking valley view." },
      { day: 6, title: "Galle Fort & The Golden Coast", description: "Head to the southern coast and explore the 17th-century Galle Fort (UNESCO), a mix of Dutch and Portuguese architecture. Visit the iconic lighthouse. Later, proceed to Bentota for a mangrove safari on the Madu River and visit a Turtle Hatchery to see baby sea turtles being rescued." },
      { day: 7, title: "The vibrant Colombo & Departure", description: "Finish your journey in the capital city, Colombo. Visit the Red Mosque, the Lotus Tower, and shop at the Dutch Hospital complex. After a day of exploration and souvenir hunting, transfer to Bandaranaike International Airport for your flight back home." }
    ]
  },

  // --- NEW INTERNATIONAL DESTINATIONS ---
  {
    id: 40,
    name: "Bali – 5 Nights / 6 Days",
    description: "The Island of Gods",
    image: "/destinations/international/Bali.jpg",
    details: "Discover the magic of Bali with its ancient temples, terraced rice paddies, world-class surf beaches, and vibrant arts scene. This package covers the best of Ubud's culture and Seminyak's beaches.",
    duration: "5 Nights / 6 Days",
    bestTime: "April to October",
    highlights: ["Tanah Lot Temple", "Ubud Monkey Forest", "Tegallalang Rice Terraces", "Kuta Beach Sunset", "Traditional Kecak Dance"],
    inclusions: [
      "Bali Visa on Arrival assistance",
      "Two-way Airport Transfers",
      "Hotel: 3N Ubud + 2N Seminyak (Breakfast included)",
      "Tanah Lot Temple sunset tour",
      "Ubud full-day tour (Monkey Forest, Rice Terraces, Batik workshop)",
      "Kecak Fire Dance at Uluwatu"
    ],
    exclusions: [
      "International Flights",
      "Lunch & Dinner",
      "Personal expenses & tips"
    ],
    itinerary: [
      { day: 1, title: "Arrival & Seminyak Welcome", description: "Land at Ngurah Rai International Airport and transfer to your beachfront Seminyak resort. Spend the afternoon unwinding at the famous Seminyak Beach. In the evening, stroll through the trendy Eat Street (Jalan Kayu Aya) lined with world-class restaurants and quirky boutiques." },
      { day: 2, title: "Tanah Lot & Pura Uluwatu", description: "Morning visit to the iconic sea temple of Tanah Lot, perched dramatically on a coastal rock. Continue to the clifftop Uluwatu Temple for breathtaking Indian Ocean views. As the sun dips, witness the mesmerizing Kecak Fire Dance – a dramatic Balinese Hindu ritual performed against a backdrop of the sunset." },
      { day: 3, title: "Transfer to Ubud & Cultural Immersion", description: "Drive to Ubud, Bali's artistic heartland. Stop at a traditional silver-smithing workshop in Celuk and a wood-carving village in Mas. Arrive in Ubud and visit the sacred Monkey Forest Sanctuary. Explore the vibrant Ubud Art Market and the grand Ubud Royal Palace in the evening." },
      { day: 4, title: "Tegallalang Rice Terraces & Mount Batur", description: "Early morning drive to the Tegallalang Rice Terraces for a scenic sunrise walk through the UNESCO-listed 'subak' irrigation system. Later, visit the Batur Geopark Museum and see the active volcano from a viewpoint. Afternoon visit to Tirta Empul, a sacred holy spring temple where locals perform purification rituals." },
      { day: 5, title: "Cooking Class & Spa Day", description: "Start your morning with a hands-on Balinese cooking class at a local farm. Learn to cook Nasi Goreng, Satay, and black rice pudding using freshly harvested ingredients. Return to the hotel for a well-deserved traditional Balinese massage. Evening at leisure for last-minute shopping at Ubud Market." },
      { day: 6, title: "Departure", description: "After a final Balinese breakfast of Jamu (herbal tonic) and tropical fruits, check out and transfer to the airport. Carry home the memory of the Island of Gods – its incense, its smiling people, and its endless beauty." }
    ]
  },
  {
    id: 42,
    name: "Cambodia – 5 Nights / 6 Days",
    description: "Temples of the Gods",
    image: "/destinations/international/Cambodia.jpg",
    details: "Journey to the heart of the Khmer Empire. Explore the world's largest religious monument – Angkor Wat – and witness the resilience of the Cambodian people in Phnom Penh.",
    duration: "5 Nights / 6 Days",
    bestTime: "November to March",
    highlights: ["Angkor Wat Sunrise", "Bayon Temple Faces", "Ta Prohm (Tomb Raider)", "Tonle Sap Lake", "Phnom Penh Heritage"],
    inclusions: [
      "Cambodia e-Visa assistance",
      "Arrival and departure airport transfers",
      "Hotel: 2N Phnom Penh + 3N Siem Reap (Breakfast)",
      "Angkor Wat 2-day temple pass",
      "Tonle Sap floating village boat ride",
      "Tuk-tuk sightseeing in Siem Reap"
    ],
    exclusions: [
      "International Flights",
      "Lunch & Dinner",
      "Tips and personal expenses"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Phnom Penh", description: "Welcome to the Kingdom of Wonder! Transfer to your hotel. Spend the afternoon at the stunning Royal Palace and the Silver Pagoda, housing the legendary Emerald Buddha. Evening walk along the Sisowath Quay riverside promenade for local street food and sunset views over the Tonle Sap and Mekong confluence." },
      { day: 2, title: "Phnom Penh – History & Heritage", description: "Visit the Tuol Sleng Genocide Museum (S-21 prison), a sobering reminder of the Khmer Rouge era. Continue to the Choeung Ek Memorial (Killing Fields). In the afternoon visit the National Museum, housing the world's largest collection of Khmer art. Evening flight to Siem Reap." },
      { day: 3, title: "Angkor Wat Sunrise & Bayon Temple", description: "Rise before dawn for the unmissable sunrise over the five towers of Angkor Wat reflected in the moat. Spend the morning exploring the main temple. After breakfast, visit the Bayon Temple with its 54 towers bearing 216 serene stone faces. Continue to Baphuon and the Terrace of Elephants." },
      { day: 4, title: "Ta Prohm & Outer Temples", description: "Visit the jungle-clad Ta Prohm temple (made famous by Tomb Raider), where giant tree roots engulf ancient stone walls. Continue to Banteay Srei, the 'Citadel of Women', renowned for its intricate pink sandstone carvings. Evening: Apsara traditional dance dinner show." },
      { day: 5, title: "Tonle Sap Floating Village", description: "Morning at leisure. Afternoon boat trip to the Kompong Khleang floating village on the vast Tonle Sap Lake, where entire communities live on the water in stilted houses. Watch the sunset over the lake and return for a final Cambodian dinner of Fish Amok and Khmer curry." },
      { day: 6, title: "Departure from Siem Reap", description: "Final morning for souvenir shopping at the Old Market (Psar Chas). Pick up some silk scarves, Angkor replica carvings, and local Kampot pepper. Transfer to Siem Reap International Airport for your departure flight." }
    ]
  },
  {
    id: 43,
    name: "Japan – 7 Nights / 8 Days",
    description: "Land of the Rising Sun",
    image: "/destinations/international/Japan.jpg",
    details: "Experience the perfect harmony of ancient tradition and ultra-modern innovation. From the neon-drenched streets of Tokyo to the spiritual temples of Kyoto and the deer park of Nara.",
    duration: "7 Nights / 8 Days",
    bestTime: "March to May (Cherry Blossom) & October to November",
    highlights: ["Mount Fuji View", "Fushimi Inari Shrine", "Tokyo Shibuya Crossing", "Nara Deer Park", "Hiroshima Peace Memorial"],
    inclusions: [
      "Japan Tourist Visa assistance",
      "7-day JR Pass (Bullet Train)",
      "Hotel: 3N Tokyo + 1N Hakone + 3N Kyoto (Breakfast)",
      "Hakone Ropeway & Lake Ashi cruise",
      "Nara Day Trip from Kyoto",
      "Hiroshima & Miyajima Day Trip"
    ],
    exclusions: [
      "International Flights",
      "Lunch & Dinner",
      "Personal expenses & pocket wifi"
    ],
    itinerary: [
      { day: "1-2", title: "Tokyo – The Neon Metropolis", description: "Land at Narita or Haneda and transfer to your Tokyo hotel. Day 1: Explore Shinjuku's dazzling neon-lit streets and the peaceful Shinjuku Gyoen Garden. Day 2: Visit the Tsukiji Outer Market for fresh sushi breakfast, cross the iconic Shibuya Scramble, shop in Harajuku's quirky Takeshita Street, and see the Senso-ji temple in Asakusa at sunset." },
      { day: 3, title: "Hakone – Fuji Views & Onsens", description: "Take the Shinkansen to Hakone. Ascend on the Hakone Ropeway over volcanic Owakudani Valley for views of Mount Fuji on clear days. Cruise on the pirate ship across Lake Ashi framed by the iconic floating Torii gate. Check in to a traditional Ryokan (inn) and enjoy a restorative onsen (hot spring) bath and a multi-course Kaiseki dinner." },
      { day: "4-5", title: "Kyoto – The Soul of Japan", description: "Bullet train to Kyoto. Day 4: Walk under thousands of vermillion torii gates at the Fushimi Inari Shrine at dawn. Visit Kinkaku-ji (the Golden Pavilion), the Ryoan-ji Zen rock garden, and the Arashiyama Bamboo Grove. Day 5: Explore Nijo Castle, the Philosopher's Path (lined with cherry trees), and the ancient Gion district – watch for Maiko (apprentice Geisha) in the early evening." },
      { day: 6, title: "Nara – Sacred Deer & Giant Buddha", description: "Day trip to Nara, Japan's first permanent capital. Wander through Nara Park where over 1,000 sacred sika deer roam freely and bow (literally!) to visitors. Visit Todai-ji Temple housing the world's largest bronze Buddha statue. Explore the Kasuga Taisha Grand Shrine lit by thousands of lanterns." },
      { day: 7, title: "Hiroshima & Miyajima Island", description: "Travel to Hiroshima to visit the Peace Memorial Park and Museum – a profoundly moving experience. Take the ferry to the sacred island of Miyajima to see the 'floating' vermillion Torii gate of Itsukushima Shrine, one of Japan's three most scenic views. Return to Kyoto for a farewell Japanese dinner." },
      { day: 8, title: "Departure", description: "Transfer to Osaka's Kansai Airport or Kyoto Station. Last chance to buy some Matcha KitKats, sake, and Japanese ceramics at the station shops. Board your flight home with memories of cherry blossoms, ramen, and robot cafes." }
    ]
  },
  {
    id: 44,
    name: "Maldives – 4 Nights / 5 Days",
    description: "Heaven on Earth",
    image: "/destinations/international/Maldives.jpg",
    details: "Escape to paradise with this luxurious Maldives escape. Stay in stunning overwater bungalows, snorkel in crystal-clear lagoons, and watch the sun melt into the Indian Ocean horizon.",
    duration: "4 Nights / 5 Days",
    bestTime: "November to April",
    highlights: ["Overwater Bungalow Stay", "Snorkeling with Manta Rays", "Sunset Dolphin Cruise", "Underwater Dining", "Private Beach Dinner"],
    inclusions: [
      "Maldives on-arrival Visa (Free for Indians)",
      "Speedboat or Seaplane Transfer to Resort",
      "4 Nights Overwater / Beach Villa (All-Inclusive)",
      "Snorkeling trip & Dolphin watching cruise",
      "Sunset fishing trip",
      "Couple's spa (60 min) for honeymoon packages"
    ],
    exclusions: [
      "International Flights",
      "Alcoholic beverages",
      "Deep sea diving (extra cost)"
    ],
    itinerary: [
      { day: 1, title: "Arrival at 'The Last Paradise'", description: "Land at Velana International Airport in Malé. Freshen up at a transit lounge and transfer via speedboat or seaplane to your private island resort. As the turquoise water rushes beneath you, the stress of city life simply dissolves. Check in and indulge in your first sunset cocktail over the infinite Indian Ocean." },
      { day: 2, title: "Snorkeling Safari & Marine Life", description: "After a lavish breakfast, embark on a guided snorkeling excursion over the house reef. Swim alongside colorful parrotfish, sea turtles, and gentle nurse sharks in crystal-clear water. Visit the Coral Nursery to understand marine conservation. Afternoon: paddle boarding and kayaking in the calm lagoon." },
      { day: 3, title: "Island Hopping & Local Culture", description: "Explore a local Maldivian island to see how the islanders live, shop at a local fish market, and visit a traditional Maldivian house. Later, visit the sandbank – a tiny strip of white sand surrounded by ocean on all sides. Enjoy a private picnic with freshly caught grilled fish and tropical fruits." },
      { day: 4, title: "Dolphin Cruise & Spa Day", description: "Join an evening dolphin cruise as spinner dolphins race and leap alongside your boat in the golden light. Return for a sunset spa treatment at the overwater spa – try the traditional Maldivian coconut oil massage. Cap your penultimate night with a candlelit private beach dinner under a million stars." },
      { day: 5, title: "Departure", description: "Final sunrise over the lagoon – slip off the deck into the warm water for a solo swim. Enjoy a final lavish breakfast. Transfer back to Malé Airport for your international flight, carrying with you the memory of the most serene place on earth." }
    ]
  },
  {
    id: 45,
    name: "Mauritius – 6 Nights / 7 Days",
    description: "The Pearl of the Indian Ocean",
    image: "/destinations/international/Mauritius.jpg",
    details: "A jewel of the Indian Ocean with volcanic mountains, turquoise lagoons, sugar cane fields, and pristine beaches. Mauritius is the ultimate tropical luxury destination.",
    duration: "6 Nights / 7 Days",
    bestTime: "May to December",
    highlights: ["Le Morne Brabant", "Underwater Waterfall Illusion", "Chamarel Coloured Earth", "Blue Bay Marine Park Snorkeling", "Grand Baie Shopping"],
    inclusions: [
      "Mauritius Visa (Free for Indian passport holders)",
      "Return Airport Transfers",
      "6 Nights hotel (Breakfast & Dinner – MAP Plan)",
      "North Island Tour (Grand Baie, Pamplemousses)",
      "South Island Tour (Chamarel, Le Morne)",
      "Blue Bay Glass-bottom boat ride"
    ],
    exclusions: [
      "International Flights",
      "Lunch",
      "Water sports (extra cost)"
    ],
    itinerary: [
      { day: 1, title: "Bienvenue à l'Île Maurice", description: "Arrive at Sir Seewoosagur Ramgoolam International Airport and transfer to your resort. Mauritius is an explosion of tropical color – red flamboyant trees, turquoise lagoon, and emerald mountains. Relax at the beach and enjoy a welcome dinner of traditional Creole cuisine." },
      { day: 2, title: "Northern Mauritius Explore", description: "Tour the North Island: Visit the Pamplemousses Botanical Garden, one of the oldest in the southern hemisphere. Drive past the colonial-era Château Labourdonnais. Explore the vibrant town of Grand Baie, known for its duty-free shopping and buzzing nightlife along the beachfront." },
      { day: 3, title: "Catamaran & Snorkeling Adventure", description: "Full day catamaran cruise to the Northern Islands – Île Gabriel and Flat Island. Snorkel in the turquoise bays, see dolphins, and enjoy a BBQ lunch on the boat. Optional: parasailing over the lagoon for a bird's-eye view of the island." },
      { day: 4, title: "South Mauritius – Chamarel & Le Morne", description: "Explore Southern Mauritius. Visit the surreal 'Chamarel Coloured Earth', an undulating landscape of seven volcanic dunes in different colors. See the Chamarel Waterfall. Drive to Le Morne Brabant, a UNESCO World Heritage peninsula, for the famous 'Underwater Waterfall' illusion viewpoint." },
      { day: 5, title: "Blue Bay Marine Park & Mahébourg", description: "Head to the Blue Bay Marine Park for snorkeling in the most pristine coral reef lagoon in Mauritius. Take a glass-bottom boat ride to see the colourful coral gardens without getting wet. Visit the Mahébourg Waterfront Market and the National History Museum for stories of colonial-era battles." },
      { day: 6, title: "Leisure & Sugar Cane Country", description: "Morning at leisure at your resort. Optional: Quad biking through the sugar cane fields and volcanic landscape in the south. Afternoon: Rum distillery tour and tasting at St. Aubin. Evening farewell dinner with a live Sega dance show – the joyful national dance of Mauritius." },
      { day: 7, title: "Au Revoir Mauritius", description: "Final tropical breakfast. Pack your bottles of rhum arrangé and vanilla pods. Transfer to the airport for your flight home, dreaming of the day you'll return to this slice of heaven." }
    ]
  },
  {
    id: 46,
    name: "Kazakhstan – 6 Nights / 7 Days",
    description: "The Land of the Great Steppe",
    image: "/destinations/international/Kazakhstan.jpg",
    details: "Discover Central Asia's most modern and breathtaking destination. From the futuristic skyline of Astana to the canyon landscapes of Charyn and the ski resort city of Almaty.",
    duration: "6 Nights / 7 Days",
    bestTime: "May to September & December to February (skiing)",
    highlights: ["Baiterek Tower Astana", "Charyn Canyon", "Big Almaty Lake", "Medeu Skating Rink", "Shymbulak Ski Resort"],
    itinerary: [
      { day: "1-2", title: "Astana – The City of the Future", description: "Arrive in Nur-Sultan (Astana), Kazakhstan's stunning futuristic capital. Day 1: Settle in and explore the iconic Baiterek Tower (the 'golden egg on a tree' monument). Day 2: Visit the Khan Shatyr Entertainment Center (the world's largest tent structure), Hazrat Sultan Mosque, the Palace of Peace and Reconciliation pyramid, and the unique 'EXPO 2017' energy complex." },
      { day: 3, title: "Flight to Almaty – City of Apples", description: "Fly to Almaty, the country's cultural capital. Explore the ornate Zenkov Cathedral built entirely without nails. Visit Panfilov Park and the Central State Museum. In the evening, stroll through the Green Bazaar bursting with dried fruits, nuts, and Kazakh handicrafts – the perfect place to pick up souvenirs." },
      { day: 4, title: "Charyn Canyon – The Grand Canyon of Central Asia", description: "Full-day excursion to Charyn Canyon National Park (200km from Almaty). Walk through the dramatic 'Valley of Castles', where 150-million-year-old red rock formations rise like ancient ruins from the earth. Picnic lunch by the Charyn River. Return via the Ash Tree Grove." },
      { day: 5, title: "Big Almaty Lake & Medeu", description: "Morning drive up to Big Almaty Lake – a stunning glacial lake of shimmering turquoise waters set against a backdrop of snow-capped peaks. Return via the world's highest-altitude skating rink at Medeu. Afternoon: hike or cable car to Shymbulak Ski Resort for panoramic mountain views." },
      { day: 6, title: "Kolsai Lakes Excursion (Optional Day Trip)", description: "Optional full-day trip to the Kolsai Lakes – Kazakhstan's 'Pearls of the Tian Shan'. Three turquoise lakes nestled in the spruce forests offer surreal beauty. Alternatively, enjoy a leisurely day in Almaty, visiting the State Museum of Musical Instruments, the art gallery, and local restaurants for traditional Beshbarmak (mutton and noodles)." },
      { day: 7, title: "Departure", description: "Last morning in Central Asia. Shop for Kazakh feltwear, wolf-head ornaments, and eagle hunting artwork at the Aport Bazaar. Transfer to Almaty International Airport for your flight back home, carrying the memory of endless golden steppes and modern marvels." }
    ]
  },
  {
    id: 47,
    name: "Georgia – 6 Nights / 7 Days",
    description: "The Caucasus Gem",
    image: "/destinations/international/Georgia.jpg",
    details: "Nestled between Europe and Asia, Georgia is a land of dramatic mountains, ancient cave cities, medieval churches, and some of the world's oldest wine. An undiscovered gem for the Indian traveler.",
    duration: "6 Nights / 7 Days",
    bestTime: "April to June & September to November",
    highlights: ["Kazbegi & Mount Kazbek", "Gergeti Trinity Church", "Vardzia Cave Monastery", "Old Tbilisi & Narikala Fort", "Wine Tasting in Kakheti"],
    itinerary: [
      { day: 1, title: "Arrival in Tbilisi – The Crossroads City", description: "Arrive at Tbilisi International Airport. Transfer to your hotel in the heart of Old Tbilisi. Explore the cobblestone streets of the Old Town on foot – see the iconic sulfuric bathhouses of Abanotubani and the flowing white 'Bride of Georgia' statue. Enjoy traditional Georgian dinner of Khinkali (dumplings) and Khachapuri (cheese bread) at a local tavern." },
      { day: 2, title: "Tbilisi City Highlights", description: "Visit the ancient Narikala Fortress by cable car for panoramic views of the city. Explore the Anchiskhati Basilica, the oldest church in Tbilisi. Walk through the colorful Dry Bridge Flea Market for Soviet-era antiques. Afternoon, visit the Georgian National Museum and the iconic Bridge of Peace." },
      { day: 3, title: "Kazbegi – The Mighty Caucasus", description: "Full-day excursion to Kazbegi National Park (2.5 hrs from Tbilisi). Stop at the Ananuri Fortress overlooking the Jinvali Reservoir. Arrive at Stepantsminda village and take a 4x4 jeep ride up to the medieval Gergeti Trinity Church perched at 2,170m, with the snow-capped Mount Kazbek (5,047m) as its backdrop – one of the most dramatic views in the world." },
      { day: 4, title: "Mtskheta & Gori", description: "Visit UNESCO-listed Mtskheta, the religious capital of Georgia. See the Svetitskhoveli Cathedral and Jvari Monastery. Continue to Gori, birthplace of Stalin. Explore the Stalin Museum. On the way back, stop at Uplistsikhe – an ancient rock-hewn city dating back to the Iron Age." },
      { day: 5, title: "Kakheti Wine Region", description: "Full-day tour to the Kakheti wine region – the oldest wine-growing region in the world (8,000 years old!). Visit the Alaverdi Monastery winery. Tour local family 'marani' (wine cellars) and taste wine aged in traditional clay amphoras called 'Qvevri'. Return via the historic Sighnaghi 'City of Love'." },
      { day: 6, title: "Vardzia Cave Monastery (Optional) or City Leisure", description: "Optional: long day trip south to Vardzia, a spectacular cave city carved into the Erusheti Mountain in the 12th century, featuring 3,000 apartments, churches, and a throne room. Or relax in Tbilisi, explore the Vake Park, enjoy a final Georgian spa hammam at the Abanotubani thermal baths." },
      { day: 7, title: "Departure", description: "Final Georgian breakfast of Churchkhela (walnut-stuffed grape candy), fresh cheese, and honey. Shop for local wine, pomegranate products, and hand-painted pottery at the Dry Bridge market. Transfer to Tbilisi Airport for departure." }
    ]
  },
  {
    id: 48,
    name: "Budapest – Hungary – 5 Nights / 6 Days",
    description: "The Pearl of the Danube",
    image: "/destinations/international/Budapest.jpg",
    details: "Budapest, the magnificent capital of Hungary, straddles the Danube with its Gothic Parliament, thermal baths, and vibrant ruin bar culture. One of Europe's most stunning and affordable capitals.",
    duration: "5 Nights / 6 Days",
    bestTime: "April to June & September to November",
    highlights: ["Hungarian Parliament Building", "Buda Castle & Fisherman's Bastion", "Széchenyi Thermal Bath", "Danube River Cruise", "Ruin Bar Nightlife"],
    inclusions: [
      "Schengen Visa guidance",
      "Return Airport Transfers",
      "5 Nights hotel in central Budapest (Breakfast)",
      "Danube Evening River Cruise",
      "Széchenyi Thermal Bath entry",
      "Buda Castle & Fisherman's Bastion tour"
    ],
    exclusions: [
      "International Flights",
      "Schengen Visa fees",
      "Lunch & Dinner",
      "Personal expenses"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Budapest", description: "Transfer to your hotel in the heart of Pest. In the evening, take a walk along the illuminated Danube promenade and marvel at the lit-up Parliament reflected in the river. Discover a 'Ruin Bar' – Budapest's unique bars built inside crumbling Jewish Quarter buildings filled with eclectic décor." },
      { day: 2, title: "Buda Castle Hill & Fisherman's Bastion", description: "Take the funicular up to Buda Castle Hill. Explore the Hungarian National Gallery inside the Royal Palace. Walk to the neo-Gothic Fisherman's Bastion for the city's most iconic panoramic view of the Parliament and Danube bridges. Visit the Matthias Church with its stunning Moorish-influenced interior. Evening Danube river cruise with dinner." },
      { day: 3, title: "Pest City Tour & Parliament", description: "Full-day Pest exploration: Visit the magnificent Hungarian Parliament Building (book guided tour in advance), the stunning St. Stephen's Basilica (climb the dome for views), and Andrássy Avenue – Budapest's Champs-Élysées lined with Neo-Renaissance mansions. Explore the Hungarian State Opera House." },
      { day: 4, title: "Thermal Bath Day", description: "Budapest has the most thermal bath capacity of any city in the world! Spend a morning soaking in the Széchenyi Thermal Bath (inside a grand Neo-Baroque palace in City Park). Alternatively, the art nouveau Gellért Baths for couples. Afternoon: stroll through Heroes' Square and the Museum of Fine Arts." },
      { day: 5, title: "Day Trip – Danube Bend", description: "Scenic day trip along the Danube Bend to Visegrád Citadel, Esztergom Basilica (Hungary's largest church), and the charming arts town of Szentendre with its Serbian Orthodox churches and artist workshops. Return to Budapest for a farewell dinner at a traditional Hungarian restaurant featuring Goulash and Langos." },
      { day: 6, title: "Departure", description: "Final Kürtőskalács (chimney cake) and Langos for breakfast. Pick up some Pálinka (Hungarian fruit brandy), paprika, and Tokaj wine from the Central Market Hall. Transfer to Budapest Ferenc Liszt International Airport for your flight home." }
    ]
  },

  // DOMESTIC DESTINATIONS
  {
    id: 1,
    name: "Kashmir – Paradise on Earth",
    description: "Kashmir Highlights",
    image: "/destinations/domestic/Kashmir.jpeg",
    details: "Experience the timeless beauty of Srinagar, the golden meadows of Sonamarg, and the snowy peaks of Gulmarg.",
    duration: "5 Nights / 6 Days",
    bestTime: "March to October",
    highlights: ["Dal Lake Houseboat", "Mughal Gardens", "Gondola Ride Gulmarg", "Pahalgam Valleys", "Betaab Valley"],
    inclusions: [
      "Accommodation: 3N Srinagar, 1N Houseboat, 1N Pahalgam",
      "Meals: Daily Breakfast and Dinner (MAP Plan)",
      "Transport: Private AC/Non-AC car",
      "Extras: 1 Hour Shikara ride, airport transfers"
    ],
    itinerary: [
      { day: 1, title: "The Warmth of Srinagar & Dal Lake", description: "Upon arrival at Srinagar Airport, meet our representative and transfer to a luxury hand-carved Houseboat on Dal Lake. Afternoon, take a relaxing 1-hour Shikara ride through the floating vegetable gardens and lotus flowers. Experience the unique lifestyle of the lake dwellers while enjoying the sunset." },
      { day: 2, title: "Mughal Grandeur & Hilltop Temple", description: "Visit the world-famous Mughal Gardens: Nishat Bagh (Garden of Pleasure) and Shalimar Bagh (Abode of Love), built by Emperor Jehangir. Later, climb to the Shankaracharya Temple situated on a hilltop, offering a breathtaking 360-degree view of the entire Srinagar city and the Jhelum River." },
      { day: 3, title: "Sonamarg - The Meadow of Gold", description: "Embark on a full-day excursion to Sonamarg, the gateway to Ladakh. Drive through the scenic Sindh Valley. Once there, you can hire a pony to trek to the Thajiwas Glacier, where snow remains throughout the year. The flower-strewn meadows and snowy peaks make for a perfect photography session." },
      { day: 4, title: "Gulmarg - The Winter Wonderland", description: "Drive to Gulmarg, the 'Meadow of Flowers'. Experience the world's second-highest cable car, the Gondola. Ride to Phase 1 (Kongdoori) and Phase 2 (Apharwat Peak) to see the Apharwat glacier and LOC views. Explore the lush green golf course and the historic St. Mary's Church." },
      { day: 5, title: "Pahalgam - The Shepherd's Valley", description: "Travel to Pahalgam via the Saffron fields of Pampore and the ancient Awantipura ruins. Spend the day exploring the Betaab Valley (named after the Bollywood movie) and Aru Valley. Enjoy a walk along the crystal-clear Lidder River, perfect for nature lovers and soul seekers." },
      { day: 6, title: "Departure from Srinagar", description: "After breakfast, enjoy one last view of the mountains over a cup of Kashmiri Kahwa. We will then transfer you to Srinagar Airport for your flight back home, carrying the peace of the valley in your heart." }
    ]
  },
  {
    id: 3,
    name: "Golden Triangle Tour",
    description: "Delhi, Agra & Jaipur",
    image: "/destinations/domestic/Golden Triangle.jpg",
    details: "The ultimate cultural introduction to India, visiting the iconic monuments of history and the pink city.",
    duration: "5 Nights / 6 Days",
    bestTime: "October to March",
    highlights: ["Taj Mahal at Sunrise", "Red Fort Delhi", "Amber Fort Hilltop", "Hawa Mahal", "Fatehpur Sikri"],
    inclusions: [
      "Accommodation: 5 Nights stay with daily breakfast",
      "Transport: Dedicated Private AC Sedan/SUV",
      "Sightseeing: All transfers, fuel, and tolls",
      "Guides: Local experts in each city"
    ],
    itinerary: [
      { day: 1, title: "Namaste Delhi - Arrival", description: "Welcome to India's capital! After a warm reception at the airport, transfer to your hotel. Depending on your arrival time, we recommend an optional evening visit to the Akshardham Temple for its spectacular light and water show, or a food walk through the legendary lanes of Chandni Chowk." },
      { day: 2, title: "Full Day Delhi Heritage Tour", description: "Explore the contrast between Old and New Delhi. Visit the majestic Red Fort and Jama Masjid. In New Delhi, drive past the majestic Rashtrapati Bhavan and India Gate. Conclude your day with a visit to the UNESCO sites of Humayun's Tomb and the soaring Qutub Minar, a masterpiece of Indo-Islamic architecture." },
      { day: 3, title: "Delhi to the City of Taj", description: "A smooth drive to Agra (approx 4 hours). After checking in, visit the massive Agra Fort, a red sandstone wonder that housed the Mughal emperors. Enjoy a peaceful sunset at Mehtab Bagh (The Moonlight Garden), offering a stunning view of the Taj Mahal from across the Yamuna River." },
      { day: 4, title: "Taj Mahal Sunrise & The Pink City", description: "Witness the ultimate symbol of love, the Taj Mahal, at sunrise when the marble glows in shades of pink. Return for breakfast, then drive towards Jaipur. En route, explore the abandoned Mughal city of Fatehpur Sikri and the mesmerizing Chand Baori stepwell in Abhaneri village." },
      { day: 5, title: "Jaipur - Forts and Palaces", description: "Start with an elephant or jeep ride to the hilltop Amber Fort. Visit the serene Jal Mahal situated in the middle of Man Sagar Lake. Explore the City Palace, the astronomical observatory Jantar Mantar, and the iconic pink-sandstone Hawa Mahal (Palace of Winds). Evening at leisure for shopping." },
      { day: 6, title: "Jaipur to Delhi & Departure", description: "After breakfast, catch a panoramic view of the city from Nahargarh Fort. Drive back to Delhi (approx 5 hours). Our representative will drop you at the New Delhi International Airport for your flight back home, completing your golden triangle journey." }
    ]
  },
  {
    id: 9,
    name: "Rajasthan – Land of Kings",
    description: "Royal Heritage Journey",
    image: "/destinations/domestic/Rajasthan.jpg",
    details: "Step back into history with a grand tour of forts, palaces, and the golden Thar desert.",
    duration: "7 Nights / 8 Days",
    bestTime: "October to March",
    highlights: ["Jaisalmer Desert Camp", "Mehrangarh Fort", "Lake Pichola Boat Ride", "Amber Fort", "Junagarh Fort"],
    inclusions: [
      "Stays: 2N Jaipur, 1N Bikaner, 1N Jaisalmer Camp, 1N Jodhpur, 2N Udaipur",
      "Meals: Daily Breakfast and Dinner (MAP Plan)",
      "Transport: Private AC vehicle",
      "Activities: Camel safari and folk dance in Jaisalmer"
    ],
    itinerary: [
      { day: "1-2", title: "Jaipur - The Royal Gateway", description: "Begin your royal journey in the Pink City. Spend two days exploring the Amber Fort, Jaigarh Fort, and Nahargarh Fort. Visit the City Palace and the Jantar Mantar. Experience a sunset dinner with a view of Jal Mahal and shop for precious gemstones and block-printed textiles at Johari Bazaar." },
      { day: 3, title: "Jaipur to Bikaner - The Camel Country", description: "Drive to Bikaner. Explore the Junagarh Fort, an impregnable structure containing numerous palaces and pavilions. Later, visit the unique Karni Mata Temple (Deshnok), also known as the Rat Temple, world-famous for the holy white rats that live within its walls." },
      { day: 4, title: "Bikaner to the Golden City Jaisalmer", description: "Drive through the Thar Desert to Jaisalmer. Upon arrival, visit the Gadisar Lake for a peaceful boat ride and watch the sandstone buildings turn golden as the sun sets. Spend your evening at a local cafe inside the fort walls, tasting traditional Ker Sangri." },
      { day: 5, title: "Sonar Quila & Thar Desert Camp", description: "Explore Jaisalmer Fort, the world's only 'living fort'. Visit the ornate Patwon Ki Haveli. In the afternoon, head to Sam Sand Dunes for a traditional camel safari. Spend a magical night under the stars in a luxury tent, enjoying Rajasthani folk music and Kalbelia dance." },
      { day: 6, title: "Jaisalmer to the Blue City Jodhpur", description: "Proceed to Jodhpur. Visit the mighty Mehrangarh Fort, towering 400 feet above the city. Explore the Jaswant Thada, a royal white marble cenotaph. Spend the evening wandering through the blue lanes of the old city and tasting the famous Mirchi Bada at the Clock Market." },
      { day: 7, title: "Jodhpur to the City of Lakes Udaipur", description: "A scenic drive to Udaipur. En route, visit the Ranakpur Jain Temple, famous for its 1,444 uniquely carved marble pillars. Arrive in Udaipur and enjoy a relaxing evening walk by Lake Fatehsagar or a traditional puppet show at Bagore Ki Haveli." },
      { day: 8, title: "Udaipur & The Lake Palace", description: "Explore the grand City Palace complex, Saheliyon-ki-Bari (the Garden of Maidens), and the Jagdish Temple. In the afternoon, take a boat ride on Lake Pichola to see Jag Mandir and the Lake Palace from the water before your transfer to Udaipur airport for departure." }
    ]
  },
  {
    id: 36,
    name: "Kerala & Kanyakumari",
    description: "Greenery to the Cape",
    image: "/destinations/domestic/Kerala.png",
    details: "A comprehensive journey from the heritage of Kochi to the southernmost tip of mainland India.",
    duration: "7 Nights / 8 Days",
    bestTime: "September to March",
    highlights: ["Vivekananda Rock Memorial", "Periyar Lake Boat Safari", "Backwater Houseboat", "Munnar Hills", "Three Oceans Meet"],
    itinerary: [
      { day: 1, title: "Kochi Arrival & Heritage Walk", description: "Arrive at Kochi and transfer to your hotel. Spend your first afternoon walking through the historical lanes of Fort Kochi. See the Chinese Fishing Nets in action and visit the Jewish Synagogue. In the evening, enjoy a traditional Kathakali performance at a local art center." },
      { day: "2-3", title: "The Emerald Hills of Munnar", description: "Drive up to the mist-covered mountains of Munnar. Visit the sprawling tea estates and the Blossom Hydel Park. The next day, explore the Eravikulam National Park to spot the Nilgiri Tahr and take a boat ride on the Mattupetty Dam, surrounded by lush evergreen forests." },
      { day: 4, title: "Thekkady Wildlife & Spice Trails", description: "Continue to Thekkady. Take a guided tour of a spice plantation to learn about the 'Black Gold' of Kerala. In the afternoon, enjoy a peaceful boat safari on Periyar Lake within the Wildlife Sanctuary, where you might see wild elephants and bison coming for a drink." },
      { day: 5, title: "Backwater Bliss in Alleppey", description: "Drive to Alleppey, the 'Venice of the East'. Board your private, luxury houseboat for an overnight cruise. Float past paddy fields, coconut groves, and rural villages. Savor authentic Keralite meals prepared by the onboard chef while you watch the sunset over the backwaters." },
      { day: 6, title: "Alleppey to the Sandy Shores of Kovalam", description: "After breakfast on the houseboat, drive to Kovalam. Spend your afternoon at the crescent-shaped Lighthouse Beach. Capture a photo of the iconic red-and-white striped lighthouse and enjoy a relaxed dinner at a beachfront cafe as the waves crash nearby." },
      { day: 7, title: "Kanyakumari - The Meeting of Oceans", description: "Take a day trip to Kanyakumari, the southernmost tip of India. Take a ferry to the Vivekananda Rock Memorial and the Thiruvalluvar Statue. Experience the unique phenomenon of watching the sunset over the Arabian Sea, Bay of Bengal, and Indian Ocean meeting at one point." },
      { day: 8, title: "Trivandrum City & Departure", description: "On your way to the airport, visit the grand Sree Padmanabhaswamy Temple in Trivandrum. Spend some time at the Napier Museum or do some last-minute shopping at Chalai Market before your transfer to the airport for your flight back home." }
    ]
  },
  {
    id: 5,
    name: "Konkan – Coastal Heaven",
    description: "Pristine Beaches & History",
    image: "/destinations/domestic/Konkan.jpg",
    details: "Discover the hidden gems of the western coast with emerald backwaters, ancient sea forts and white sand beaches.",
    duration: "4 Nights / 5 Days",
    bestTime: "October to March",
    highlights: ["Sindhudurg Sea Fort", "Tarkarli Scuba Diving", "Backwater Boat Ride", "Kunkeshwar Beach", "Malvani Cuisine"],
    itinerary: [
      { day: 1, title: "Arrival & The Flavors of Malvan", description: "Arrive at Kudal/Kankavli station or MOPA airport. Transfer to the coastal town of Malvan. Spend your afternoon relaxing on the pristine white sands of Tarkarli Beach. In the evening, treat your taste buds to an authentic Malvani Fish Thali, featuring the famous Solkadhi and freshly caught sea food cooked in coconut and local spices." },
      { day: 2, title: "Sea Forts & Underwater Adventures", description: "Take a boat through the Arabian Sea to the massive Sindhudurg Fort, built by Chhatrapati Shivaji Maharaj in the 17th century. Explore its hidden passages and massive walls. Later, head to the Tarkarli jetty for exhilarating water sports, including scuba diving in the clear waters, parasailing, and jet-skiing." },
      { day: 3, title: "Backwaters & The Sunset Point", description: "Experience the unique 'Tsunami Island' in Devbagh, where the Karli river meets the sea. Enjoy a boat ride through the dense mangrove forests and backwaters. Keep an eye out for dolphins leaping in the distance. End your day with a mesmerizing sunset at the quiet and serene Wayari beach." },
      { day: 4, title: "The Kashi of Konkan - Kunkeshwar", description: "A scenic coastal drive takes you to the Kunkeshwar Temple, an architectural marvel situated right on the edge of the Arabian Sea. It is often called the 'Kashi of Konkan'. Explore the ancient caves nearby and spend a peaceful afternoon on the uncrowded Kunkeshwar beach, known for its silver sands." },
      { day: 5, title: "Kokum, Cashews & Departure", description: "Before heading back, visit a local 'Khanaval' or bazaar. Stock up on locally produced spices, Kokum syrup, Amla candy, and Malvani cashews. Our representative will then drop you at the station or airport for your journey home, carrying the rustic charm of Konkan with you." }
    ]
  },
  {
    id: 4,
    name: "Goa Escape",
    description: "Beaches & Balcao",
    image: "/destinations/domestic/Goa.png",
    details: "From the high energy of North Goa's beaches to the serene heritage of the South, experience the Goan way of life.",
    duration: "3 Nights / 4 Days",
    bestTime: "November to February",
    highlights: ["Aguada Fort", "Mandovi River Cruise", "Old Goa Churches", "Latin Quarter Fontainhas", "Water Sports"],
    itinerary: [
      { day: 1, title: "Susegad Goa Arrival & North Goa Shacks", description: "Welcome to India's pocket-sized paradise! Transfer to your resort in North Goa (Calangute/Baga). Spend your first afternoon feeling the sand between your toes at a local beach shack, sipping on a refreshing beverage and enjoying the high-energy vibe. Evening free to explore the local flea markets." },
      { day: 2, title: "Forts, Sunsets & Water Sports adventure", description: "Visit the 17th-century Fort Aguada and its lighthouse for a stunning view of the Arabian Sea. In the afternoon, head to Sinquerim or Candolim for a thrill with parasailing and windsurfing. Conclude your day by watching the sunset from the 'Dil Chahta Hai' famous Hilltop at Chapora Fort." },
      { day: 3, title: "Heritage Heartland & Panjim's Latin Quarter", description: "Step back in time at Old Goa (UNESCO site), visiting the Basilica of Bom Jesus and Se Cathedral. Later, drive to Panjim and wander through the colorful heritage streets of Fontainhas, the Latin Quarter. In the evening, embark on a scenic Mandovi River cruise with live Goan folk music and dance." },
      { day: 4, title: "Cashews, Feni & Farewell", description: "Enjoy a final Goan breakfast of Pao Bhaji. Visit a local spice plantation (optional) or head to Mapusa Market for some authentic Goan cashews and handicrafts. We will then transfer you to the Dabolim or MOPA airport for your flight back home, with the Goan spirit in your soul." }
    ]
  },
  {
    id: 37,
    name: "Mysore – Bangalore – Ooty Circuit",
    description: "Royal Heritage, Garden City & Blue Mountains",
    image: "/destinations/domestic/Mysore.jpg",
    details: "The ultimate Karnataka-Tamil Nadu triangle – from Bengaluru's vibrant tech cityscape and lush gardens, to the royal grandeur of Mysore's illuminated palace and Wodeyar heritage, and finally the misty Nilgiri hills of Ooty with its UNESCO toy train and sprawling botanical gardens. A perfect blend of culture, royalty, and nature.",
    duration: "6 Nights / 7 Days",
    bestTime: "October to February (Best Overall); April to June for Ooty",
    highlights: ["Mysore Palace Illumination", "UNESCO Nilgiri Mountain Railway", "Lalbagh Botanical Garden", "Chamundi Hills", "Doddabetta Peak", "Brindavan Gardens", "Ooty Botanical Garden", "Channapatna Toy Town"],
    inclusions: [
      "Stay: 2N Bengaluru, 2N Mysore, 2N Ooty",
      "Meals: Daily Breakfast (CP Plan)",
      "Transport: Private AC Sedan throughout",
      "Taxes: GST, tolls, and driver allowances",
      "Sightseeing: All transfers as per itinerary"
    ],
    exclusions: [
      "Lunches & Dinners",
      "Entry fees to monuments & parks",
      "Personal expenses & tips",
      "Toy train tickets (bookable on-site)"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Bengaluru – The Garden City", description: "Arrive at Kempegowda International Airport and transfer to your hotel. Explore Bengaluru's iconic Lalbagh Botanical Garden, home to a 200-year-old glasshouse modelled on London's Crystal Palace. Drive past the majestic Vidhana Soudha (State Legislature) and Cubbon Park. Evening stroll on MG Road or Commercial Street for shopping and street food." },
      { day: 2, title: "Bengaluru Heritage & Culture", description: "Morning visit to ISKCON Temple – one of the largest ISKCON temples in the world. Explore Bangalore Palace, modelled on England's Windsor Castle, with its Tudor-style architecture and vintage interiors. Visit Tipu Sultan's Summer Palace and the Bull Temple. Afternoon at leisure to explore the vibrant café culture of Indiranagar or Koramangala." },
      { day: 3, title: "Bengaluru to Mysore via Srirangapatna", description: "After breakfast, drive to Mysore (3 hours). En route, stop at Srirangapatna – the island fortress-capital of Tipu Sultan. Visit the Ranganathaswamy Temple, Tipu's Summer Palace (Dariya Daulat Bagh), and the site of the historic battle. Arrive in Mysore and check in. In the evening, witness the spectacular illumination of the Mysore Palace (Tuesdays & Sundays; all days during Dussehra) – a dazzling spectacle of 100,000 light bulbs." },
      { day: 4, title: "Royal Mysore Exploration", description: "Full day exploring the cultural capital of Karnataka. Begin with Chamundi Hills and the giant Nandi statue. Visit the magnificent Mysore Palace (Amba Vilas) – one of India's most visited monuments. Explore Mysore Zoo, one of Asia's oldest. Browse the Devaraja Market for fragrant jasmine, sandalwood products, and the famous Mysore Pak sweet. Shop for iconic Mysore silk sarees." },
      { day: 5, title: "Mysore to Ooty via Bandipur Forest", description: "Drive from Mysore to Ooty through the Bandipur Tiger Reserve (approx. 3.5 hours). Keep a lookout for wild elephants, deer, and peacocks at forest checkpoints. Ascend into the Nilgiri hills via 36 hairpin bends with dramatic valley views. Arrive in Ooty and check into your cozy hill resort. Evening walk through the Ooty market for homemade chocolates, eucalyptus oil, and Nilgiri tea." },
      { day: 6, title: "Ooty – Blue Mountains Exploration", description: "Spend a full day discovering 'The Queen of Hill Stations'. Visit the magnificent Government Botanical Garden, established in 1848, spread over 55 acres with rare plants and a 20-million-year-old fossilized tree trunk. Explore the Rose Garden (May season is peak). Drive up to Doddabetta Peak (8,650 ft) – the highest point in the Nilgiris – for breathtaking panoramic views. Afternoon visit to the serene Pykara Lake and Pykara Waterfalls, and trek through the mystical Pine Forests." },
      { day: 7, title: "Coonoor Toy Train & Departure", description: "Morning ride on the UNESCO Heritage Nilgiri Mountain Railway (Toy Train) from Ooty to Coonoor – a mesmerizing 1-hour journey through tea estates, tunnels, and misty mountains. Explore Sim's Park in Coonoor and the Dolphin's Nose viewpoint for spectacular valley vistas. Head back to Coimbatore (2.5 hours) or Bengaluru (approx. 5 hours) for your onward journey. Optional stop at Channapatna, famous for its traditional lacquer wooden toys." }
    ]
  },

  // --- NEW DOMESTIC DESTINATIONS ---
  {
    id: 50,
    name: "Lakshadweep – 4 Nights / 5 Days",
    description: "India's Hidden Coral Paradise",
    image: "/destinations/domestic/Lakshadweep.jpg",
    details: "Discover India's best-kept secret – a pristine archipelago of 36 coral islands in the Arabian Sea. With crystal-clear lagoons, vibrant coral reefs, and zero crowds, Lakshadweep is paradise untouched.",
    duration: "4 Nights / 5 Days",
    bestTime: "October to May",
    highlights: ["Bangaram Island Stay", "Snorkeling & Scuba Diving", "Glass-bottom Boat Ride", "Lagoon Kayaking", "Pristine White Sand Beaches"],
    inclusions: [
      "Ship / Flight transfer from Kochi to Lakshadweep",
      "Accommodation on Bangaram / Agatti Island (All meals)",
      "Snorkeling equipment and guided sessions",
      "Glass-bottom boat ride",
      "Lagoon island visit"
    ],
    exclusions: [
      "Flights to/from Kochi",
      "Scuba diving (extra cost)",
      "Personal expenses"
    ],
    itinerary: [
      { day: 1, title: "Kochi to Agatti Island – Arrival", description: "Fly from Kochi to Agatti Island (1.5 hrs). As the tiny aircraft descends, you'll see the emerald-green lagoon and white sandbars from above – truly breathtaking. Transfer by boat to your island resort. Spend the evening on the beach watching the sunset over the Arabian Sea with a fresh coconut in hand." },
      { day: 2, title: "Snorkeling & Coral Reefs", description: "After a fresh island breakfast, embark on a guided snorkeling tour over the Agatti House Reef. The lagoon teems with colorful tropical fish, sea turtles, and vibrant hard coral formations. Afternoon: Explore the island on foot or by bicycle – it takes just 30 minutes to walk end to end. Evening: bioluminescent plankton watching from the beach (seasonal)." },
      { day: 3, title: "Bangaram Atoll Day Trip", description: "Boat transfer to the uninhabited Bangaram Island – a teardrop-shaped atoll ringed with white sand. Spend the day at this completely pristine beach. Snorkel the outer reef wall, spot blacktip reef sharks in the shallows, and enjoy a packed lunch on the beach under the shade of coconut palms." },
      { day: 4, title: "Glass-bottom Boat & Lagoon Kayaking", description: "Morning glass-bottom boat tour to see the coral garden and marine life without getting wet. Afternoon kayaking across the calm shallow lagoon – the water is so clear you can see the seabed from your kayak. Visit the island fish market in the evening and watch fishermen bring in their catch of tuna." },
      { day: 5, title: "Departure – Agatti to Kochi", description: "Last sunrise on the beach. Dip your toes in the warm Arabian Sea one final time. Transfer to the airport for your flight back to Kochi. You'll leave with a transformed sense of peace and wonder at the earth's most pristine ecosystem." }
    ]
  },
  {
    id: 51,
    name: "North East India – 8 Nights / 9 Days",
    description: "The Seven Sisters & Beyond",
    image: "/destinations/domestic/NorthEast.jpg",
    details: "Explore the enchanting North East – a land of misty mountains, living root bridges, tea estates, one-horned rhinos, and vibrant tribal cultures across Assam, Meghalaya, and Sikkim.",
    duration: "8 Nights / 9 Days",
    bestTime: "October to April",
    highlights: ["Kaziranga Rhino Safari", "Living Root Bridges Meghalaya", "Dawki Crystal Water River", "Nathula Pass Sikkim", "Majuli River Island"],
    itinerary: [
      { day: "1-2", title: "Guwahati & Kaziranga – Rhino Country", description: "Arrive in Guwahati and visit the Kamakhya Temple atop Nilachal Hill. Drive to Kaziranga National Park. Day 2: UNESCO-listed Kaziranga – home to the world's largest population of one-horned rhinoceroses. Take an elephant back safari at dawn through the tall elephant grass, spotting rhinos, elephants, and wild buffalo." },
      { day: "3-4", title: "Majuli River Island & Jorhat", description: "Ferry across the Brahmaputra to Majuli, the world's largest river island and a center of Assamese Vaishnavite culture. Visit the Satra monasteries, watch mask-makers and potters at work. Day 4: Explore local tribal villages and participate in a community meal. Return to Jorhat and overnight." },
      { day: "5-6", title: "Cherrapunji & Meghalaya's Wonders", description: "Drive to Shillong, Meghalaya's capital. Day 5: Visit the iconic Double Decker Living Root Bridge at Nongriat – a 45-minute trek through dense forest. Swim in the crystal-clear natural pools. Day 6: Explore Mawsmai Caves and Nohkalikai Falls (India's tallest plunge waterfall) near Cherrapunji, the wettest place on earth." },
      { day: 7, title: "Dawki – The Clear River Border", description: "Drive to Dawki on the Bangladesh border. Boat ride on the Umngot River – the water is so transparent that boats appear to float on glass. Visit the Mawlynnong village (Asia's cleanest village) with its hanging root bridges and sky walk. Return to Shillong for overnight." },
      { day: "8-9", title: "Sikkim – Gangtok & Nathula Pass", description: "Fly or drive to Gangtok, Sikkim's capital. Day 8: Visit Rumtek Monastery, Tashi Viewpoint, and the Institute of Tibetology. Day 9: Permit-required trip to Nathula Pass (14,140 ft) on the historic Silk Road, standing at the India-China border. Views of snow-capped Himalayan peaks. Return to Gangtok and evening departure." }
    ]
  },
  {
    id: 52,
    name: "Dehradun – Mussoorie – Nainital – 6 Nights / 7 Days",
    description: "Queen of the Hills & Lake City",
    image: "/destinations/domestic/Uttarakhand.jpg",
    details: "A beautiful circuit of three iconic Uttarakhand hill stations – the intellectual Dehradun, the romantic Mussoorie 'Queen of Hills', and the charming Nainital with its pear-shaped lake.",
    duration: "6 Nights / 7 Days",
    bestTime: "March to June & September to November",
    highlights: ["Gun Hill Mussoorie", "Naini Lake Boating", "Kempty Falls", "Robber's Cave Dehradun", "Snow View Point"],
    itinerary: [
      { day: 1, title: "Arrival in Dehradun", description: "Arrive in Dehradun, the gateway to the Garhwal Himalayas. Visit Robber's Cave (Guchhu Pani), a natural river cave you can walk through. See Tapkeshwar Temple and the Sahastradhara sulphur springs. Enjoy a walk along Rajpur Road for local food." },
      { day: "2-3", title: "Mussoorie – The Queen of Hills", description: "Drive up to Mussoorie (35 km). Day 2: Walk the famous Mall Road, visit Kempty Falls (a tiered waterfall 1,364m above sea level). Ride the ropeway to Gun Hill for panoramic Himalayan views including Bandarpunch. Day 3: Visit Lal Tibba (the highest point in Mussoorie) for views of Kedarnath and Badrinath peaks. Camelback Road stroll at sunset." },
      { day: 4, title: "Mussoorie to Nainital", description: "Scenic drive through the oak and rhododendron forests to Nainital (5-6 hours). Check in. Evening walk along the Mall Road beside the pear-shaped Naini Lake. Visit the Naina Devi Temple. Watch the sun set behind the surrounding seven mountains (Sapt Shring)." },
      { day: "5-6", title: "Nainital Sightseeing", description: "Day 5: Boating on Naini Lake. Cable car to Snow View Point (7,513 ft) for Himalayan panoramas. Visit the Nainital Zoo, home to snow leopards and Himalayan bears. Day 6: Day trip to Mukteshwar (51 km) – a quiet hill station with the ancient Mukteshwar Dham temple and spectacular views of the Kumaon Himalayas." },
      { day: 7, title: "Departure", description: "Final morning in the hills. Visit the Bhim Tal and Sat Tal (lakes near Nainital) on your way to the Kathgodam railway station or Pantnagar Airport for your journey home." }
    ]
  },
  {
    id: 53,
    name: "Kulu Manali – Leh Ladakh – 8 Nights / 9 Days",
    description: "Himalayan Highway Adventure",
    image: "/destinations/domestic/LehLadakh.jpg",
    details: "One of India's most iconic road trips – from the apple orchards of Kullu-Manali through the world's highest motorable passes to the lunar landscapes and monasteries of Leh Ladakh.",
    duration: "8 Nights / 9 Days",
    bestTime: "June to September",
    highlights: ["Rohtang Pass", "Pangong Tso Lake", "Khardung La Pass", "Spiti Valley", "Thiksey Monastery"],
    itinerary: [
      { day: "1-2", title: "Manali – Arrival & Acclimatization", description: "Arrive in Manali by air (Delhi-Kullu) or overnight Volvo bus. Day 1: Rest and acclimatize (important at 6,700 ft). Evening: Explore Old Manali village cafes and the Hadimba Devi Temple. Day 2: Visit Solang Valley, Vashisht Hot Springs, and Naggar Castle. Prepare gear for the high-altitude journey ahead." },
      { day: 3, title: "Manali to Sarchu via Rohtang Pass", description: "Early morning departure. Navigate the iconic Rohtang Pass (13,050 ft) with its snow fields and panoramic views. Drive through the Lahaul Valley – a dramatic shift from pine forests to high-altitude desert. Cross the Baralacha La pass (16,040 ft) and descend to Sarchu plains for overnight camping under a canopy of a billion stars." },
      { day: "4-5", title: "Leh City & Monasteries", description: "Day 4: Arrive in Leh via Lachulung La and Tanglang La (world's second highest motorable pass at 17,480 ft). Rest and acclimatize. Day 5: Explore Leh Palace (9-storey medieval palace), Shanti Stupa, and the Leh Market. Visit Spituk Monastery and Sankar Gompa. Traditional Ladakhi Thukpa (noodle soup) dinner." },
      { day: 6, title: "Khardung La & Nubra Valley", description: "Drive over Khardung La Pass (17,582 ft) – one of the world's highest motorable roads. Descend into the scenic Nubra Valley. Visit the sand dunes of Hunder and take a double-humped Bactrian camel ride across the desert landscape with the Himalayas as backdrop. Overnight at Nubra valley camp." },
      { day: 7, title: "Pangong Tso – The Blue Jewel", description: "Early drive to the iconic Pangong Tso Lake (14,270 ft) – immortalized in Bollywood's '3 Idiots'. The 134 km long salt water lake straddles India and China. Watch the lake change color from blue to green to purple. Overnight camp at the lake shore for a surreal starlit experience." },
      { day: 8, title: "Return to Leh & Local Explore", description: "Drive back to Leh via the Chang La Pass. En route, visit the stunning Hemis Monastery (largest in Ladakh) and Thiksey Monastery (resembling a mini Potala Palace). Evening: stroll through Leh market for Buddhist artifacts, pashmina, and local apricot jam." },
      { day: 9, title: "Departure from Leh", description: "Early morning flight from Kushok Bakula Rimpochee Airport back to Delhi. As the plane climbs over the Himalayas, get one last aerial view of the lunar landscape that will stay with you forever." }
    ]
  },
  {
    id: 54,
    name: "Dharamsala – Spiti – Manali – 7 Nights / 8 Days",
    description: "Mountains of the Buddha",
    image: "/destinations/domestic/Dharamsala.jpg",
    details: "A spiritual and adventure circuit from the Dalai Lama's home at Dharamsala through the ancient Spiti Valley monasteries to the adventure hub of Manali.",
    duration: "7 Nights / 8 Days",
    bestTime: "May to October",
    highlights: ["Dalai Lama Temple Dharamsala", "Key Monastery Spiti", "Chandratal Lake", "Triund Trek", "Dhankar Monastery"],
    itinerary: [
      { day: "1-2", title: "Dharamsala & McLeod Ganj", description: "Arrive in Dharamsala / McLeod Ganj (Little Lhasa). Day 1: Visit the Tsuglagkhang Complex – the residence of the Dalai Lama and the Namgyal Monastery. Walk through the Tibetan colony market for momos and thukpa. Day 2: Trek to Triund (9,350 ft) – a 6 km hike rewarded with breathtaking views of the Dhauladhar range and the Kashmir valley below." },
      { day: "3-4", title: "Manali & Rohtang", description: "Drive to Manali (7 hrs). Day 3: Explore Old Manali street food and Hadimba Devi Temple in the cedar forest. Day 4: Day trip to Rohtang Pass (weather/season permitting) or Solang Valley for paragliding, zorbing, and snowfields." },
      { day: "5-6", title: "Spiti Valley – Kaza & Key Monastery", description: "Drive from Manali into the Spiti Valley (Kunzum Pass route). Day 5: Arrive in Kaza, the headquarters of Spiti district at 11,980 ft. Visit the ancient Key Monastery perched on a hilltop. Day 6: Explore Kibber village (one of the world's highest inhabited villages) and the Dhankar Monastery – a mud fortress perched on a cliff 1,000m above the valley." },
      { day: 7, title: "Chandratal Lake – The Moon Lake", description: "Full-day excursion to the stunning Chandratal Lake (14,100 ft) – a crescent-shaped glacial lake of mesmerizing turquoise waters. Trek for 2 km from the campsite to the lake shore. Return to Kaza or campsite for overnight stay under an extraordinary cover of stars at altitude." },
      { day: 8, title: "Return & Departure", description: "Drive back to Manali via Kunzum Pass. Transfer to the Bhuntar Airport (Kullu) for your flight to Delhi, or catch the overnight bus. You return changed – calmer, more grateful, and secretly planning your return to the mountains." }
    ]
  },
  {
    id: 55,
    name: "MP – Khajuraho – Gwalior – Jhansi – 5 Nights / 6 Days",
    description: "The Heart of Incredible India",
    image: "/destinations/domestic/MadhyaPradesh.jpg",
    details: "Explore Madhya Pradesh's UNESCO temples of Khajuraho, the mighty Gwalior Fort, and the legendary city of Jhansi – home of Rani Lakshmi Bai. This is a journey through the very soul of Indian history.",
    duration: "5 Nights / 6 Days",
    bestTime: "October to March",
    highlights: ["Khajuraho UNESCO Temples", "Gwalior Fort Light & Sound Show", "Jhansi Fort", "Chandela Temple Architecture", "Orchha Heritage Town"],
    itinerary: [
      { day: 1, title: "Arrival in Khajuraho", description: "Fly or take the train to Khajuraho. Transfer to hotel. In the evening, attend the spectacular Sound & Light Show at the Western Group of Temples – where the story of the Chandela Dynasty is narrated against the illuminated sandstone temples. A perfect first introduction to one of India's most unique UNESCO sites." },
      { day: "2-3", title: "Khajuraho Temple Circuit", description: "Day 2: Explore the Western Group of Temples (the most celebrated) – Kandariya Mahadev, Lakshmana, and Vishvanatha temples. Their intricate carvings represent the universe in stone, depicting celestial beings, warriors, and scenes from daily Chandela life. Day 3: Visit the Eastern and Southern groups; the Javari and Chaturbhuja temples. Also visit the Adivart Tribal and Folk Art Museum." },
      { day: 4, title: "Orchha – The Forgotten Kingdom", description: "Drive to Orchha (2.5 hrs from Khajuraho). This abandoned capital of the Bundela Rajas is a dramatic riverside ghost city of cenotaphs, palaces, and temples that rise from the Betwa River. Visit the Jahangir Mahal, the Ram Raja Temple (the only temple where Lord Ram is worshipped as a King), and explore the riverside Chaturbhuj Temple." },
      { day: 5, title: "Jhansi – City of the Warrior Queen", description: "Drive to Jhansi. Visit the iconic Jhansi Fort (18th century) – where the legendary Rani Lakshmi Bai mounted her revolt against the British in 1857. The fort houses a museum with the Rani's belongings and Bundela-era artifacts. Also visit the Rani Lakshmi Bai Memorial and St. Jude's Shrine." },
      { day: 6, title: "Gwalior Fort & Departure", description: "Drive to Gwalior (1.5 hrs from Jhansi). Spend the morning at the magnificent Gwalior Fort ('The Gibraltar of India') – a sandstone fortress that has been besieged by every major dynasty. See the giant Jain Tirthankar statues carved into the cliff face, the Man Mandir Palace, and the Sas Bahu temples inside. Transfer to Gwalior Railway Station or Airport for departure." }
    ]
  },
];

