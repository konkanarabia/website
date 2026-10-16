/**
 * Schema.org JSON-LD Structured Data Generators for SEO
 */

const BASE_URL = 'https://konkanarabiahospitalitygroup.com';
const LOGO_URL = `${BASE_URL}/logo/KonkanArabia-New-Logo.webp`;

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${BASE_URL}/#organization`,
    name: 'KonkanArabia Hospitality & Holiday Group',
    alternateName: ['KonkanArabia', 'Konkan Arabia Tours & Travels'],
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      caption: 'KonkanArabia Hospitality & Holiday Group Logo',
    },
    image: LOGO_URL,
    description:
      'Premier hospitality and luxury travel management group in India and UAE. Specializing in curated international tours, Dubai holiday packages, Goa tourist taxi rentals, vehicle bookings, and hotel reservations.',
    telephone: ['+91-9370528517', '+91-8625807465'],
    email: 'bookings@konkanarabiahospitalitygroup.com',
    priceRange: '₹₹₹',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Haware Fantasia Business Park, Sector 30A, Vashi',
        addressLocality: 'Navi Mumbai',
        addressRegion: 'Maharashtra',
        postalCode: '400703',
        addressCountry: 'IN',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Flat No.203, Magic Marvel, Peddem',
        addressLocality: 'Mapusa',
        addressRegion: 'Goa',
        postalCode: '403507',
        addressCountry: 'IN',
      },
    ],
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Country', name: 'United Arab Emirates' },
    ],
    sameAs: [
      'https://www.instagram.com/konkanarabia',
      'https://www.facebook.com/konkanarabia',
    ],
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'KonkanArabia Hospitality & Holiday Group',
    description: 'Luxury Holiday Packages, Goa Tourist Taxi & Vehicle Rentals, Visa Services, and Event Management.',
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/destinations?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en',
  };
}

export function getPedneCarSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['AutoRental', 'TaxiService'],
    '@id': `${BASE_URL}/pednecar/#service`,
    name: 'PedneCar • Tourist Taxi & Vehicle Rental Service Division',
    alternateName: 'PedneCar Goa',
    description:
      'Premier Goa tourist taxi and vehicle rental division established in 2010. Offering Toyota Rumion 7-seater MUVs, luxury tempo travelers, MOPA & Dabolim airport transfers, and customized Goa sightseeing tours.',
    url: `${BASE_URL}/pednecar`,
    telephone: '+91-8625807465',
    priceRange: '₹₹',
    parentOrganization: {
      '@id': `${BASE_URL}/#organization`,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Flat No.203, Magic Marvel, Peddem',
      addressLocality: 'Mapusa',
      addressRegion: 'Goa',
      postalCode: '403507',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 15.5937,
      longitude: 73.8142,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Goa' },
      { '@type': 'City', name: 'Mapusa' },
      { '@type': 'Place', name: 'North Goa' },
      { '@type': 'Place', name: 'South Goa' },
      { '@type': 'Place', name: 'Manohar International Airport MOPA' },
      { '@type': 'Place', name: 'Dabolim Airport Goa' },
    ],
  };
}

export function getPedneCarFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I book a tourist taxi in Mapusa Goa with PedneCar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can book directly via WhatsApp (+91-8625807465) or call our 24/7 Mapusa booking desk at 09326380922 or 9370528517 for instant vehicle dispatch and sightseeing bookings.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide airport taxi transfers to and from MOPA and Dabolim airports in Goa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, PedneCar provides 24/7 fixed-rate airport transfers to and from both Manohar International Airport (MOPA - GOX) and Dabolim Airport (GOI) to any resort or hotel across North and South Goa.',
        },
      },
      {
        '@type': 'Question',
        name: 'What vehicles are available in the PedneCar Goa fleet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our fleet includes the signature Toyota Rumion 7-seater MUV, Maruti Ertiga, executive sedans, and luxury Tempo Travelers (12, 17, and 26 seaters) with experienced, police-verified chauffeurs.',
        },
      },
    ],
  };
}

export function getFranchiseFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Mumbai to Malabar Food Express?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mumbai to Malabar Food Express is an authentic coastal Indian culinary brand by KonkanArabia Hospitality Group, featuring regional cuisines from CST Mumbai, Sindhudurg, Madgaon, Mangaluru, and Ernakulam.',
        },
      },
      {
        '@type': 'Question',
        name: 'What franchise formats and investment budgets are available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer QSR in Food Courts, Cloud Kitchens, Dine-in Express, and Full-Service Coastal Restaurants. Investment ranges from ₹15 Lakhs to ₹45 Lakhs (or AED 200,000 to AED 500,000).',
        },
      },
      {
        '@type': 'Question',
        name: 'What support does KonkanArabia provide to franchise partners?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'KonkanArabia provides end-to-end support including site selection, turnkey kitchen setup, standardized recipes and spices, chef recruitment, staff training, POS systems, and multi-channel marketing.',
        },
      },
    ],
  };
}

export function getDestinationSchema(destination: {
  id: number | string;
  name: string;
  description?: string;
  image?: string;
  price?: number;
  duration?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': ['TouristDestination', 'Product'],
    name: destination.name,
    description: destination.description || `Explore ${destination.name} luxury holiday package with KonkanArabia Hospitality Group.`,
    image: destination.image ? [destination.image] : undefined,
    url: `${BASE_URL}/destinations/${destination.id}`,
    provider: {
      '@type': 'TravelAgency',
      name: 'KonkanArabia Hospitality & Holiday Group',
      url: BASE_URL,
    },
    ...(destination.price
      ? {
          offers: {
            '@type': 'Offer',
            price: destination.price,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            url: `${BASE_URL}/destinations/${destination.id}`,
          },
        }
      : {}),
  };
}


export function getHomeFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where is KonkanArabia Hospitality & Holiday Group located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our corporate head office is at Haware Fantasia Business Park, Sector 30A, Vashi, Navi Mumbai, Maharashtra 400703. We also operate our PedneCar tourist vehicle fleet in Mapusa, Goa, and partner travel desks in Dubai, UAE.',
        },
      },
      {
        '@type': 'Question',
        name: 'What services does KonkanArabia offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We specialize in curated domestic and international tour packages (Dubai, Maldives, Europe, SE Asia), 24/7 tourist taxi and vehicle rentals in Goa (PedneCar division), expedited visa assistance, and corporate & destination wedding event management.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I book a tour package or Goa tourist taxi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can browse and book tour packages directly on our website, submit an online enquiry, or chat with our travel team directly on WhatsApp (+91-9370528517 / +91-8625807465).',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer customized group tours from Navi Mumbai and Mumbai?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We curate specialized group tours, family vacations, honeymoon packages, and corporate offsites departing directly from Vashi, Navi Mumbai, and Mumbai.',
        },
      },
    ],
  };
}

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${BASE_URL}/#localbusiness-vashi`,
    name: 'KonkanArabia Hospitality & Holiday Group - Vashi Navi Mumbai',
    description: "Navi Mumbai's premier travel agency and tour operator for Dubai luxury holidays, domestic Konkan tours, and Goa tourist taxi rentals.",
    url: BASE_URL,
    telephone: '+91-9370528517',
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Haware Fantasia Business Park, Sector 30A, Vashi',
      addressLocality: 'Navi Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400703',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.0633,
      longitude: 73.0031,
    },
    areaServed: [
      { '@type': 'City', name: 'Navi Mumbai' },
      { '@type': 'Place', name: 'Vashi' },
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'City', name: 'Thane' },
      { '@type': 'City', name: 'Pune' },
      { '@type': 'City', name: 'Dubai' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:30',
      closes: '19:30',
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

export function getItemDetailSchema(item: {
  id: number | string;
  name: string;
  description?: string;
  image?: string;
  price?: number;
  category: 'vehicles' | 'events' | 'hospitality' | 'restaurants' | 'visas';
}) {
  const typeMap: Record<string, string> = {
    vehicles: 'Product',
    events: 'Service',
    hospitality: 'LodgingBusiness',
    restaurants: 'FoodEstablishment',
    visas: 'Service',
  };

  const schemaType = typeMap[item.category] || 'Service';

  return {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: item.name,
    description: item.description || `${item.name} provided by KonkanArabia Hospitality & Holiday Group.`,
    image: item.image ? [item.image] : undefined,
    url: `${BASE_URL}/${item.category}/${item.id}`,
    provider: {
      '@type': 'TravelAgency',
      name: 'KonkanArabia Hospitality & Holiday Group',
      url: BASE_URL,
    },
  };
}
