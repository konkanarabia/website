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
    image: "/destinations/international/Dubai.png",
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
    id: 22,
    name: "Dubai Tour – 5 Nights / 6 Days",
    description: "Luxurious Dubai and Abu Dhabi",
    image: "/destinations/international/Dubai.png",
    details: "Experience the best of Dubai along with a full-day tour of Abu Dhabi. This 5 Nights / 6 Days package offers a perfect blend of modern luxury and cultural exploration.",
    duration: "5 Nights / 6 Days",
    bestTime: "November to March",
    highlights: ["Abu Dhabi City Tour", "Sheikh Zayed Grand Mosque", "Burj Khalifa", "Desert Safari", "Global Village"],
    inclusions: [
      "UAE Tourist Visa",
      "Two-way Airport Transfer",
      "Hotel Options – 3*, 4* & 5* with Daily Breakfast",
      "Marina / Creek Dhow Cruise with Buffet Dinner",
      "Half Day Dubai City Tour",
      "Burj Khalifa 124th Floor Entry",
      "Miracle Garden",
      "Global Village",
      "Abu Dhabi City Tour",
      "Desert Safari with BBQ Dinner"
    ],
    exclusions: [
      "International Flights",
      "Lunch & Dinner",
      "Any personal Expenses"
    ],
    itinerary: [
      { day: 1, title: "Arrival and Dhow Cruise", description: "Arrival at DXB and transfer to hotel. Evening enjoy a traditional wooden Dhow Cruise at Dubai Creek or Marina with buffet dinner." },
      { day: 2, title: "Dubai City Tour, Burj Khalifa, and Dubai Mall", description: "Comprehensive city tour including Jumeirah Mosque, Palm Jumeirah, and Gold Souk. Afternoon visit Burj Khalifa 124th floor and Dubai Mall." },
      { day: 3, title: "Miracle Garden & Global Village", description: "Visit the world's largest natural flower garden. Afternoon enjoy the cultural extravaganza at Global Village." },
      { day: 4, title: "Abu Dhabi City Tour (Full Day)", description: "Full day tour of Abu Dhabi including Sheikh Zayed Grand Mosque, BAPS Hindu Temple, Qasr Al Watan, and the Corniche." },
      { day: 5, title: "Leisure and Desert Safari", description: "Morning at leisure. Afternoon enjoy Desert Safari with dune bashing, belly dancing, and BBQ dinner." },
      { day: 6, title: "Departure", description: "Check out and transfer to airport for your flight back home." }
    ]
  },
  {
    id: 23,
    name: "Dubai Tour – 6 Nights / 7 Days",
    description: "The Complete Dubai Experience",
    image: "/destinations/international/Dubai.png",
    details: "The most comprehensive Dubai package including unique attractions like Dubai Frame and Aya Universe. 7 days of pure bliss in the land of skyscrapers.",
    duration: "6 Nights / 7 Days",
    bestTime: "November to March",
    highlights: ["Dubai Frame", "Aya Universe", "Abu Dhabi City Tour", "Burj Khalifa", "Miracle Garden"],
    inclusions: [
      "UAE Tourist Visa",
      "Two-way Airport Transfer",
      "Hotel Options – 3*, 4* & 5* with Daily Breakfast",
      "Marina / Creek Dhow Cruise with Buffet Dinner",
      "Half Day Dubai City Tour",
      "Burj Khalifa 124th Floor Entry",
      "Miracle Garden",
      "Global Village",
      "Abu Dhabi City Tour",
      "Desert Safari with BBQ Dinner",
      "Dubai Frame",
      "Aya Universe"
    ],
    exclusions: [
      "International Flights",
      "Lunch & Dinner",
      "Any personal Expenses"
    ],
    itinerary: [
      { day: 1, title: "Arrival and Dhow Cruise", description: "Arrival and transfer to hotel. Relax and in the evening embark on a delightful Dhow Cruise with dinner." },
      { day: 2, title: "Dubai City Tour, Burj Khalifa, and Dubai Mall", description: "Explore old and new Dubai. Visit Burj Khalifa and watch the fountain show at Dubai Mall." },
      { day: 3, title: "Miracle Garden & Global Village", description: "Floral wonders at Miracle Garden and global shopping/entertainment at Global Village." },
      { day: 4, title: "Abu Dhabi City Tour (Full Day)", description: "Visit the stunning Sheikh Zayed Grand Mosque, BAPS Temple, and more in the capital." },
      { day: 5, title: "Morning Leisure & Desert Safari", description: "Spend your morning shopping or at the beach. Afternoon thrilling Desert Safari." },
      { day: 6, title: "Dubai Frame & Aya Universe", description: "Visit the iconic Dubai Frame for panoramic views. Afternoon immerse yourself in the virtual wonders of Aya Universe." },
      { day: 7, title: "Departure", description: "Final shopping and transfer to airport for departure." }
    ]
  },
  {
    id: 15,
    name: "Vietnam – 6 Nights / 7 Days",
    description: "The Classic Highlights",
    image: "/destinations/international/Vietnam.png",
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
    id: 31,
    name: "Vietnam – 8 Nights / 9 Days",
    description: "The Grand Vietnam",
    image: "/destinations/international/Vietnam.png",
    details: "A comprehensive journey from North to South, exploring the soul of Hanoi, the beauty of Halong Bay, the charm of Hoi An, and the energy of Ho Chi Minh City.",
    duration: "8 Nights / 9 Days",
    bestTime: "February to April & August to October",
    highlights: ["Hanoi Explore", "Halong Bay Overnight", "Hoi An Ancient Town", "Cu Chi Tunnels", "Mekong Delta Boat Trip"],
    itinerary: [
      { day: "1-2", title: "Hanoi - The Soul of the North", description: "Arrive in Hanoi and immerse yourself in the Old Quarter's 36 ancient streets. Visit the Ho Chi Minh Mausoleum and the peaceful Temple of Literature. Spend your second evening enjoying a traditional Water Puppet Show and tasting the legendary 'Egg Coffee' or a bowl of steaming Bun Cha at a local hidden gem." },
      { day: "3-4", title: "Halong Bay & Flight to Central Vietnam", description: "Journey to Halong Bay or the quieter Lan Ha Bay. Board a luxury overnight cruise and sail past thousands of limestone islets. Try kayaking through Luon Cave and visit the 'Surprise Cave' (Sung Sot). After a sunrise Tai Chi session on deck, fly to Da Nang and transfer to the lantern-lit town of Hoi An." },
      { day: "5-6", title: "Hoi An Ancient Town & Ba Na Hills", description: "Discover the UNESCO heritage of Hoi An; walk across the Japanese Covered Bridge and take a basket boat ride through the Coconut Forest. The next day, ascend the Ba Na Hills by cable car to walk among the clouds on the spectacular Golden Bridge (Giant Hands) and explore the French Village." },
      { day: "7-8", title: "The Pulse of Saigon & Mekong Delta", description: "Fly to Ho Chi Minh City (Saigon). Explore the historic Reunification Palace and the War Remnants Museum. Take a day trip to the Mekong Delta; cruise through the narrow canals on a rowboat, visit local coconut candy workshops, and enjoy a traditional 'Elephant Ear Fish' lunch at an island farm." },
      { day: 9, title: "Ben Thanh Market & Departure", description: "Spend your final morning shopping for lacquerware, silk, and Vietnamese coffee at Ben Thanh Market. Enjoy a final Banh Mi on the street before your transfer to Tan Son Nhat International Airport for your flight back home." }
    ]
  },
  {
    id: 12,
    name: "Thailand – The Classic",
    description: "Bangkok & Pattaya",
    image: "/destinations/international/Thailand.png",
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
    id: 32,
    name: "Thailand – The Island Hopper",
    description: "Phuket & Phi Phi",
    image: "/destinations/international/Thailand.png",
    details: "Ideal for couples and beach lovers looking for stunning island scenery and vibrant nightlife.",
    duration: "5 Nights / 6 Days",
    bestTime: "November to March",
    highlights: ["Patong Beach", "Phi Phi Islands", "James Bond Island", "Phuket Old Town", "Elephant Sanctuary"],
    itinerary: [
      { day: 1, title: "Arrival in Phuket & Bangla Road", description: "Warm welcome at Phuket Airport and transfer to your beachfront resort. Spend the afternoon soaking up the sun at Patong Beach. As the sun sets, head to Bangla Road to experience the neon-lit nightlife, vibrant street food, and energetic atmosphere that Phuket is famous for." },
      { day: 2, title: "Phuket Sightseeing & Sunset Views", description: "Discover the island's landmarks. Visit the 45-meter-tall Big Buddha for panoramic views of the island. Explore the historic Wat Chalong temple and the charming colorful streets of Phuket Old Town. End your day at Promthep Cape, the island's most famous sunset viewpoint." },
      { day: 3, title: "The Phi Phi Islands Speedboat Tour", description: "A must-do journey! Speedboat to the Phi Phi Islands. Swim in the emerald waters of Pileh Lagoon, see the famous Maya Bay (from the film 'The Beach'), and visit Monkey Beach. Enjoy snorkeling among vibrant coral reefs and a buffet lunch on Phi Phi Don island." },
      { day: 4, title: "James Bond Island & Phang Nga Bay", description: "Cruise through the stunning limestone karsts of Phang Nga Bay. Hop into a sea canoe to explore hidden sea caves and mangrove forests. Visit Khao Phing Kan, famously known as James Bond Island, and the unique floating fishing village of Koh Panyee for lunch." },
      { day: 5, title: "Ethical Elephant Sanctuary & Spa", description: "Spend a meaningful morning at an ethical Elephant Sanctuary, learning about their rescue stories and feeding them in their natural habitat. In the afternoon, indulge in a restorative 2-hour Thai Spa or reflexology session to rejuvenate after your island adventures." },
      { day: 6, title: "Departure from Phuket", description: "Slow morning for a final swim or picking up some local handicrafts and Thai silk. After a hearty breakfast, transfer to Phuket International Airport for your journey onward." }
    ]
  },
  {
    id: 33,
    name: "Thailand – Cultural North",
    description: "Chiang Mai & Chiang Rai",
    image: "/destinations/international/Thailand.png",
    details: "Perfect for foodies and nature lovers who prefer mountains and local culture over beaches.",
    duration: "5 Nights / 6 Days",
    bestTime: "November to February",
    highlights: ["Doi Suthep", "White Temple", "Blue Temple", "Elephant Park", "Cooking Class"],
    itinerary: [
      { day: 1, title: "Arrival in the Rose of the North", description: "Upon arrival in Chiang Mai, transfer to your hotel. In the evening, explore the vibrant Night Bazaar, a treasure trove of local handicrafts and world-class street food. Taste the famous 'Khao Soi' (curry noodles), a signature dish of Northern Thailand." },
      { day: 2, title: "Sacred Peaks & Sticky Waterfalls", description: "Climb the 306 steps (or take the tram) to Wat Phra That Doi Suthep, a golden temple perched on a mountain with panoramic views of the city. Later, cool off at the unique Bua Tong 'Sticky' Waterfalls, where the limestone allows you to climb directly up the cascading water." },
      { day: 3, title: "Chiang Rai & The Golden Triangle", description: "A full-day excursion to Chiang Rai. Marvel at the surreal architecture of the 'White Temple' (Wat Rong Khun) and the deep blue hues of the 'Blue Temple'. Visit the Golden Triangle, the historic border where Thailand, Laos, and Myanmar meet at the confluence of the Mekong River." },
      { day: 4, title: "Elephant Sanctuary & Northern Kitchen", description: "Spend an ethical morning at a local elephant rescue park, feeding and bathing these gentle giants in the river. In the afternoon, join a hands-on Thai cooking class at an organic farm, learning to balance the four flavors—sour, sweet, salty, and spicy—of Northern Thai cuisine." },
      { day: 5, title: "Nimman Road & Art Villages", description: "Discover the modern side of Chiang Mai along Nimman Road, filled with chic coffee shops and art galleries. Later, visit Baan Kang Wat, a forest-themed craft village, to meet local artisans and try your hand at pottery or watercolor painting. Perfect for a relaxed final day." },
      { day: 6, title: "Farewell to the Mountains", description: "Enjoy one last bowl of fresh tropical fruit. Take a final stroll through the Old City's moated walls and temples before your transfer to Chiang Mai International Airport for your journey back home." }
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
  {
    id: 34,
    name: "Sri Lanka – Ramayana Trail",
    description: "Ultimate Spiritual Journey",
    image: "/destinations/international/Sri Lanka.png",
    details: "Trace the path of Ramayana, visiting legendary sites from Munneswaram to the coronation of Vibhishana.",
    duration: "8 Nights / 9 Days",
    bestTime: "December to March",
    highlights: ["Sita Amman Temple", "Hanuman Temple", "Ravana Falls & Caves", "Ashok Vatika", "Ramayana Sites"],
    itinerary: [
      { day: "1-2", title: "North Shore & Sins of War", description: "Visit Munneswaram and Manavari Temples. Thirukoneswaram Temple (Trincomalee) and Shankari Devi Shakti Peetha." },
      { day: "3-4", title: "Central Fortress & The Search", description: "Explore Sigiriya and Cobra Hood Cave. Muthumariamman Temple and Kandy's Tooth Relic Temple." },
      { day: "5-6", title: "Nuwara Eliya (Heart of Trail)", description: "Sri Bhakta Hanuman Temple (Ramboda). Sita Amman Temple at Ashok Vatika and Gayathri Peedam." },
      { day: "7-8", title: "Fire Ordeal & The South", description: "Divurumpola (place of oath) and Ravana Falls/Caves in Ella. Kataragama Temple and Ussangoda." },
      { day: 9, title: "Coronation & Departure", description: "Visit Kelaniya Raja Maha Vihara (Vibhishana Temple) in Colombo before departure flight." }
    ]
  },

  // DOMESTIC DESTINATIONS
  {
    id: 1,
    name: "Kashmir – Paradise on Earth",
    description: "Kashmir Highlights",
    image: "/destinations/domestic/Kashmir.png",
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
    id: 35,
    name: "Kashmir – Summer Bloom",
    description: "Tulip & Meadow Special",
    image: "/destinations/domestic/Kashmir.png",
    details: "Specially designed for the spring/summer bloom, featuring the iconic Tulip Garden and lush landscapes.",
    duration: "5 Nights / 6 Days",
    bestTime: "April to June",
    highlights: ["Tulip Garden (April)", "Shikara Sunset Ride", "Gondola Experience", "Lidder River", "Aru Valley"],
    itinerary: [
      { day: 1, title: "Srinagar Arrival & Houseboat", description: "Relax with a sunset Shikara ride on Dal Lake. Stay in a carved cedar-wood Houseboat." },
      { day: 2, title: "Tulip & Mughal Gardens", description: "Visit Indira Gandhi Memorial Tulip Garden (Peak April) and Mughal architectural wonders." },
      { day: 3, title: "Sonamarg (Meadow of Gold)", description: "Day trip to Thajiwas Glacier. Hike or pony to the snow-line even in summer." },
      { day: 4, title: "Gulmarg (Gondola)", description: "Head to Gulmarg for breathtaking Himalayan views via Gondola Phase 1 & 2." },
      { day: 5, title: "Pahalgam & Saffron Fields", description: "Drive via Pampore Saffron fields. Visit Betaab and Aru Valleys by Lidder River." },
      { day: 6, title: "Departure", description: "Final mountain air before returning to Srinagar for your flight." }
    ]
  },
  {
    id: 2,
    name: "Himachal Heights",
    description: "Shimla & Manali Package",
    image: "/destinations/domestic/Himachal.png",
    details: "A classic tour of Himachal covering India's most popular hill stations with scenic drives and adventure.",
    duration: "5 Nights / 6 Days",
    bestTime: "March to June, September to November",
    highlights: ["Mall Road Shimla", "Kufri Snow Point", "Atal Tunnel", "Solang Valley", "Hadimba Temple"],
    inclusions: [
      "Stay: 2N Shimla, 3N Manali",
      "Meals: MAP Plan (Breakfast and Dinner)",
      "Transport: Dedicated private vehicle",
      "Taxes: Tolls, parking, and driver allowances"
    ],
    itinerary: [
      { day: 1, title: "Arrival & Gateway to the Hills", description: "Your journey Begins with a pickup from Delhi or Chandigarh. Wind your way through the Shivalik Hills to Shimla, once the summer capital of British India. Upon arrival, check into your hotel. In the evening, take a leisurely stroll on 'The Mall Road', browse the local markets, and visit the historic Scandal Point and Christ Church at The Ridge." },
      { day: 2, title: "Shimla & Kufri Exploration", description: "After breakfast, head to Kufri, a small hill station known for its Himalayan National Park and poy rides. Enjoy the panoramic views of the perennial snow-clad mountains. On the way back, visit the Jakhoo Temple, dedicated to Lord Hanuman, situated on the highest peak of Shimla. Evening at leisure for shopping at Lakkar Bazaar." },
      { day: 3, title: "Scenic Drive to Manali via Kullu", description: "Check out and drive to Manali (7-8 hours). This is one of the most scenic drives in India. Pass through the Aut Tunnel and stop at the Pandoh Dam. We will stop at a Kullu Shawl factory where you can see traditional weaving. Arrive in Manali and settle into your cozy mountain resort for the night." },
      { day: 4, title: "Manali Local Heritage Tour", description: "After breakfast, visit the 16th-century Hadimba Devi Temple, uniquely constructed in a cedar forest. Explore the Vashisht Hot Springs and its ancient temples. Later, visit the Tibetan Monastery and Van Vihar park. Evening browse the Old Manali market, famous for its bohemian cafes and local handicrafts." },
      { day: 5, title: "Solang Valley & The Atal Tunnel Experience", description: "A day of adventure! Travel to Solang Valley for activities like paragliding, zorbing, and skiing (seasonal). Later, drive through the record-breaking Atal Tunnel to reach the Lahaul Valley. Visit the quaint village of Sissu and witness the stunning Sissu Lake and waterfall before returning to Manali." },
      { day: 6, title: "Farewell to the Mountains", description: "Enjoy your last mountain breakfast. Check out and drive back to Chandigarh or Delhi. We will drop you at the airport or railway station for your onward journey, leaving you with countless memories of the majestic Himachal Heights." }
    ]
  },
  {
    id: 3,
    name: "Golden Triangle Tour",
    description: "Delhi, Agra & Jaipur",
    image: "/destinations/domestic/Golden Triangle.png",
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
    id: 6,
    name: "Best of Kerala",
    description: "God's Own Country",
    image: "/destinations/domestic/Kerala.png",
    details: "A tranquil escape through the tea hills of Munnar, wildlife of Thekkady, and backwaters of Alleppey.",
    duration: "7 Nights / 8 Days",
    bestTime: "September to March",
    highlights: ["Munnar Tea Estates", "Periyar Boat Safari", "Alleppey Houseboat", "Fort Kochi", "Kovalam Beach"],
    inclusions: [
      "Accommodation: 7 Nights (Kochi, Munnar, Thekkady, Houseboat, Kovalam)",
      "Meals: Daily Breakfast; Full board on Houseboat",
      "Transport: Private AC vehicle",
      "Houseboat: Private 1-bedroom AC houseboat"
    ],
    itinerary: [
      { day: 1, title: "The Heritage Gateway - Kochi", description: "Arrive at Kochi International Airport and transfer to your hotel. Kochi is a melting pot of cultures. In the afternoon, explore Fort Kochi on foot to see the iconic Chinese Fishing Nets, the 16th-century St. Francis Church, and the ornate Santa Cruz Basilica. Evening, witness a spellbinding Kathakali dance performance at a local theatre." },
      { day: "2-3", title: "Munnar - The Sea of Tea", description: "Drive up to Munnar (4 hours), passing through endless rubber plantations and misty hills. Visit the Cheeyappara and Valara waterfalls on the way. Spend two days immersed in greenery; visit the Tata Tea Museum, explore the Eravikulam National Park (home to the rare Nilgiri Tahr), and enjoy the echo effect at Echo Point and Mattupetty Dam." },
      { day: 4, title: "Thekkady - Wildlife & Spices", description: "Travel to Thekkady. Embark on a boat safari on Periyar Lake, where you might spot herds of elephants and wild boars by the water's edge. Later, take a guided tour of a spice plantation to see how cardamom, pepper, and cinnamon are grown. Conclude your day with a Kalaripayattu martial arts show." },
      { day: 5, title: "The Houseboat Experience - Alleppey", description: "Drive to Alleppey and board your private, traditional Kerala Houseboat (Kettuvallam). Cruise through the serene, palm-fringed backwaters of Vembanad Lake. Observe the local village life along the banks. Enjoy traditional Keralite meals prepared on board as you anchor for a peaceful night on the water." },
      { day: "6-7", title: "The Sun-Kissed Coast - Kovalam", description: "Disembark and head to Kovalam. Spend two days at the famous crescent-shaped beaches. Climb the Vizhinjam Lighthouse for a panoramic view of the Arabian Sea. Take an optional day trip to Kanyakumari to visit the Vivekananda Rock Memorial and watch the sun set over the meeting point of three oceans." },
      { day: 8, title: "Trivandrum Heritage & Departure", description: "Visit the magnificent Padmanabhaswamy Temple (dress code applies), the richest temple in the world. Explore the Napier Museum and Zoo before our representative drops you at the Thiruvananthapuram International Airport for your flight back home." }
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
    image: "/destinations/domestic/Konkan.png",
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
      { day: 4, title: "Cashews, Feni & Farewell", description: "Enjoy a final Goan breakfast of Pao Bhaji. Visit a local spice plantation (optional) or head to Mapusa Market for some authentic Goan cashews and handicrafts. We will سپس transfer you to the Dabolim or MOPA airport for your flight back home, with the Goan spirit in your soul." }
    ]
  },
  {
    id: 37,
    name: "Mysore & Bengaluru",
    description: "Royal Heritage Tour",
    image: "/destinations/domestic/Mysore.jpg",
    details: "Explore the silicon valley and the city of palaces, showcasing the grand history of the Wodeyars.",
    duration: "3 Nights / 4 Days",
    bestTime: "October to February",
    highlights: ["Mysore Palace Lighting", "Lalbagh Botanical Garden", "Chamundi Hills", "Srirangapatna", "Mysore Silk"],
    inclusions: [
      "Stay: 1N Bengaluru, 2N Mysore",
      "Meals: Daily Breakfast (CP Plan)",
      "Transport: Private AC Sedan",
      "Taxes: GST, tolls, and driver allowances"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Bengaluru", description: "Visit ISKCON Temple, Lalbagh Gardens and drive past Vidhana Soudha." },
      { day: 2, title: "Bengaluru to Mysore", description: "Via Srirangapatna. Evening lighting of Mysore Palace or Brindavan Gardens." },
      { day: 3, title: "Mysore Local Exploration", description: "Chamundi Hills, Nandi Statue and Mysore Zoo. Shop for Silk and Sandalwood." },
      { day: 4, title: "Mysore back to Bengaluru", description: "Visit Rail Museum. Optional stop at Channapatna Toy Town before flight." }
    ]
  },
  {
    id: 21,
    name: "Ooty – Blue Mountains",
    description: "The Queen of Hill Stations",
    image: "/destinations/domestic/Ooty.jpg",
    details: "Escape to the misty peaks of the Nilgiris with iconic toy train rides and sprawling botanical gardens.",
    duration: "3 Nights / 4 Days",
    bestTime: "April to June & September to November",
    highlights: ["UNESCO Toy Train", "Botanical & Rose Gardens", "Doddabetta Peak", "Pykara Waterfalls", "Homemade Chocolates"],
    inclusions: [
      "Stay: 3 Nights in 3-star room",
      "Meals: Daily Breakfast",
      "Transport: Private AC Sedan",
      "Taxes: All GST and driver allowances"
    ],
    itinerary: [
      { day: 1, title: "Arrival & Ooty Lake", description: "Transfer from Coimbatore. Evening walk through market for chocolates/oils." },
      { day: 2, title: "Botanical Splendor", description: "Rose Gardens, Botanical Garden and Doddabetta Peak panoramic views." },
      { day: 3, title: "Coonoor & Toy Train", description: "UNESCO Heritage train ride. Visit Sim's Park and Dolphin’s Nose in Coonoor." },
      { day: 4, title: "Pykara & Departure", description: "Visit Pykara Lake/Waterfalls and Pine Forests before Coimbatore transfer." }
    ]
  },
  {
    id: 10,
    name: "Kanyakumari",
    description: "The Southernmost Tip",
    image: "/destinations/domestic/Kanyakumari.jpg",
    details: "Kanyakumari, at the southernmost tip of India, is where the Arabian Sea, Bay of Bengal, and Indian Ocean meet. Witness breathtaking sunrises and sunsets over the three oceans and visit the iconic Vivekananda Rock Memorial.",
    highlights: ["Vivekananda Rock Memorial", "Thiruvalluvar Statue", "Meeting of three oceans", "Sunrise & Sunset view"],
    duration: "2-3 days",
    bestTime: "October to March"
  },
  {
    id: 7,
    name: "Mysore",
    description: "The City of Palaces",
    image: "/destinations/domestic/Mysore.jpg",
    details: "Mysore is renowned for its heritage buildings and palaces, including the majestic Mysore Palace. Experience the rich culture, grand Dussehra celebrations, and famous Mysore silk sarees.",
    highlights: ["Mysore Palace", "Chamundi Hills", "Brindavan Gardens", "St. Philomena's Church"],
    duration: "2-3 days",
    bestTime: "October to February"
  },
  {
    id: 8,
    name: "Bangalore",
    description: "Silicon Valley of India",
    image: "/destinations/domestic/Bangalore.png",
    details: "Bangalore, the capital of Karnataka, offers a blend of modern IT parks and lush gardens. Explore its vibrant nightlife, pleasant climate, and historical sites like Bangalore Palace.",
    highlights: ["Lalbagh Botanical Garden", "Cubbon Park", "Bangalore Palace", "Vidhana Soudha"],
    duration: "2-4 days",
    bestTime: "All Year Round"
  },
];
