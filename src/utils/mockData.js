// Premium Mock Data for Ready2Reel

export const CATEGORIES = [
  {
    id: 'reels',
    name: 'Reels & Shorts',
    slug: 'reels',
    icon: 'Flame',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80',
    desc: 'High-impact 9:16 mobile-first storytelling designed to viral-loop.'
  },
  {
    id: 'weddings',
    name: 'Weddings',
    slug: 'weddings',
    icon: 'Heart',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    desc: 'Bespoke cinematic wedding films capturing timeless emotional beats.'
  },
  {
    id: 'commercial',
    name: 'Commercial Shoots',
    slug: 'commercial',
    icon: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80',
    desc: 'Polished commercial visuals crafted for brand identity and high conversions.'
  },
  {
    id: 'branding',
    name: 'Branding Films',
    slug: 'branding',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80',
    desc: 'Personal and corporate profile films highlighting core visions.'
  },
  {
    id: 'music-videos',
    name: 'Music Videos',
    slug: 'music-videos',
    icon: 'Music',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    desc: 'Stylized cinematic edits synced with acoustic and visual rhythms.'
  },
  {
    id: 'social-media',
    name: 'Social Media Content',
    slug: 'social-media',
    icon: 'Users',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80',
    desc: 'Consistent visual assets built for digital presence.'
  },
  {
    id: 'events',
    name: 'Events & Expos',
    slug: 'events',
    icon: 'Calendar',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    desc: 'Aftermovies and dynamic teasers covering conferences and launches.'
  },
  {
    id: 'product',
    name: 'Product Shoots',
    slug: 'product',
    icon: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    desc: 'Detailed close-ups and motion control videos for retail and e-commerce.'
  },
  {
    id: 'influencer',
    name: 'Influencer Campaigns',
    slug: 'influencer',
    icon: 'TrendingUp',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    desc: 'Collaborative, native content matching specific audiences.'
  }
];

export const CITIES = [
  'Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem', 'Tirunelveli', 'Ooty', 'Kanyakumari', 'Tanjore'
];

export const CREATORS = [
  {
    id: 'c1',
    name: 'Karthik Raja',
    role: 'Cinematic Reel Specialist',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    rating: 4.95,
    reviewCount: 184,
    startingPrice: 1999,
    location: 'Chennai',
    tags: ['Reels', 'Social Media', 'Color Grading'],
    isAvailable: true,
    badge: 'Super Creator',
    stats: { projects: 420, experience: '5 Yrs', delivery: '24 Hrs' },
    skills: ['DaVinci Resolve', 'Mobile Aesthetics', 'Transition Cuts', 'Audio Syncing'],
    certifications: ['RED Cinema Editing Masterclass', 'Blackmagic Certified Professional'],
    about: 'Karthik Raja is a viral reel specialist who has generated over 50M views combined for his clients. He specializes in traditional veshti transitions, Chennai street food vlogs, and local culture reels that immediately hook the viewer.',
    portfolio: [
      {
        id: 'p1_1',
        title: 'Traditional Veshti & Silk Transition Reel',
        views: '1.2M',
        likes: '94K',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-neon-lights-40019-large.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'p1_2',
        title: 'Bustling Chennai Central Night Vibe',
        views: '840K',
        likes: '72K',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-mysterious-person-standing-in-a-neon-street-42416-large.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'p1_3',
        title: 'Hot Filter Coffee Pouring Macro Roll',
        views: '450K',
        likes: '31K',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-classic-wrist-watch-41484-large.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80'
      }
    ],
    reviews: [
      {
        id: 'r1_1',
        clientName: 'Abirami Sundaram',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: 'May 20, 2026',
        text: 'Raam exceeded our expectations. He delivered 5 highly engaging traditional reels for our silk boutique in less than 24 hours. The transition precision and rich colors matched our Kanchipuram sarees flawlessly.',
        projectType: 'Reels & Shorts'
      },
      {
        id: 'r1_2',
        clientName: 'Selvam Vignesh',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        rating: 4.8,
        date: 'April 14, 2026',
        text: 'Insane transition details and local thavil beat sync. Will definitely book again for our Madurai restaurant promo next month.',
        projectType: 'Product Shoots'
      }
    ]
  },
  {
    id: 'c2',
    name: 'Meenakshi Sundaram',
    role: 'Luxury Wedding Filmmaker',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    rating: 4.98,
    reviewCount: 215,
    startingPrice: 12000,
    location: 'Chennai',
    tags: ['Weddings', 'Cinematic', 'Slow-mo'],
    isAvailable: true,
    badge: 'Top Rated Elite',
    stats: { projects: 180, experience: '7 Yrs', delivery: '5 Days' },
    skills: ['Cinematography', 'Storytelling', 'Sound Scoring', 'HDR HDR10+ Master'],
    certifications: ['Sony Artisan of Imagery', 'Filmmaking Academy Alum'],
    about: 'Meenakshi crafts emotional, Kollywood-style wedding trailers and traditional Tamil marriage documentary films. Working with prime anamorphic lenses, she captures intimate highlights like Mangalya Dharanam.',
    portfolio: [
      {
        id: 'p2_1',
        title: 'Temple Wedding Highlights in Chennai',
        views: '920K',
        likes: '80K',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-wedding-couple-kissing-by-the-sea-41984-large.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'p2_2',
        title: 'Traditional Chennai Brahmin Kalyanam Trailer',
        views: '1.4M',
        likes: '110K',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-happy-bride-running-in-a-green-garden-42749-large.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=500&q=80'
      }
    ],
    reviews: [
      {
        id: 'r2_1',
        clientName: 'Ravi & Janani',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: 'May 05, 2026',
        text: 'We are speechless! Meenakshi didn’t just film our wedding; she turned it into a breathtaking Mani Ratnam style cinematic masterpiece. The camera movements and nadaswaram scoring were absolute genius.',
        projectType: 'Weddings'
      }
    ]
  },
  {
    id: 'c3',
    name: 'Vigneshwaran',
    role: 'Commercial & Brand Videographer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    rating: 4.88,
    reviewCount: 96,
    startingPrice: 49999,
    location: 'Chennai',
    tags: ['Commercial', 'Product', 'B-Roll'],
    isAvailable: true,
    badge: 'Rising Star',
    stats: { projects: 120, experience: '3 Yrs', delivery: '3 Days' },
    skills: ['Product Lighting', 'Drone Operation', 'Hyperlapses', '3D Graphics Overlay'],
    certifications: ['FAA Remote Pilot License', 'DJI Academy Specialist'],
    about: 'Vignesh works closely with local clothing brands, textile mills, and Tamil food brands. He designs fast-paced commercial reels, festival showreels, and premium B-Roll videos showcasing local handloom designs.',
    portfolio: [
      {
        id: 'p3_1',
        title: 'Authentic Kumbakonam Degree Coffee Promo',
        views: '340K',
        likes: '22K',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-coffee-into-a-white-cup-41581-large.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'p3_2',
        title: 'Royal Enfield Hill Climb in Ooty',
        views: '680K',
        likes: '48K',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-fast-on-a-curved-road-33827-large.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=500&q=80'
      }
    ],
    reviews: [
      {
        id: 'r3_1',
        clientName: 'Pothys Silk & Textiles',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: 'March 28, 2026',
        text: 'The commercial Vignesh shot for our festival saree launch drove massive footfall. His attention to detail, lighting setup, and nadaswaram track transitions were exemplary.',
        projectType: 'Commercial Shoots'
      }
    ]
  },
  {
    id: 'c4',
    name: 'Priyanka Chandrasekhar',
    role: 'Music Video Director & Editor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    rating: 4.92,
    reviewCount: 112,
    startingPrice: 4499,
    location: 'Chennai',
    tags: ['Music Videos', 'VFX', 'Cinematic'],
    isAvailable: false,
    badge: 'Creative Director',
    stats: { projects: 95, experience: '6 Yrs', delivery: '7 Days' },
    skills: ['Director of Photography', 'VFX Compositing', 'Neon Grading', 'Pacing Master'],
    certifications: ['Red Giant Certified Artist', 'Adobe After Effects Pro'],
    about: 'Priyanka brings cinematic drone shots, traditional folk vibes, and vibrant edits to independent Tamil musicians and local folk artists. Her cuts match every thavil and parai drum beat.',
    portfolio: [
      {
        id: 'p4_1',
        title: 'Margazhi Music Festival Cover',
        views: '2.1M',
        likes: '190K',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-guitarist-playing-guitar-under-neon-lights-42588-large.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80'
      }
    ],
    reviews: [
      {
        id: 'r4_1',
        clientName: 'Madras Records',
        avatar: 'https://images.unsplash.com/photo-1510520434124-5bc7e643b5ef?auto=format&fit=crop&w=100&q=80',
        rating: 4.9,
        date: 'January 10, 2026',
        text: 'Priyanka is pure creative energy. She understood our Carnatic fusion track’s mood instantly and executed a visual piece that feels incredibly artistic. Rhythm pacing is genius.',
        projectType: 'Music Videos'
      }
    ]
  }
];

export const PACKAGES = [
  {
    id: 'pkg-reels-1',
    name: '1 Hour Reel Shoot',
    category: 'Reels & Shorts',
    price: 1999,
    duration: '10 Mins post shoot Delivery',
    features: [
      '1 Hour Shoot session',
      '1 Edited Reel Delivered',
      'Shot on Latest iPhone',
      'Fast Delivery (10 mins post shoot)',
      'Trained and Certified Reel Maker'
    ],
    badge: 'Starter',
    isRecommended: false
  },
  {
    id: 'pkg-reels-3',
    name: '3 Hours Reel Shoot',
    category: 'Reels & Shorts',
    price: 4499,
    duration: '10 Mins post shoot Delivery',
    features: [
      'Up to 3 Hours Shoot session',
      '2 Edited reels',
      'Shot on Latest iPhone',
      'Fast Delivery (10 mins post shoot)',
      'Trained and Certified Reel Maker'
    ],
    badge: 'Popular',
    isRecommended: true
  },
  {
    id: 'pkg-wedding-bronze',
    name: 'Bronze Wedding Package',
    category: 'Weddings',
    price: 12000,
    duration: '2-3 Days Delivery',
    features: [
      'Bronze Tier Coverage',
      'Shot on Latest iPhone/Pro Gear',
      'Trained & Certified Filmmaker crew',
      'Cinematic edit of ceremony highlight',
      'Delivery in high-definition'
    ],
    badge: 'Bronze Category',
    isRecommended: false
  },
  {
    id: 'pkg-wedding-silver',
    name: 'Silver Wedding Package',
    category: 'Weddings',
    price: 18000,
    duration: '3 Days Delivery',
    features: [
      'Silver Tier Coverage',
      'Multi-angle iPhone shoots',
      'Highlight trailer + raw ceremony footage',
      'Dolby sound enhancement',
      'Trained and Certified Reel Maker crew'
    ],
    badge: 'Silver Category',
    isRecommended: false
  },
  {
    id: 'pkg-wedding-gold',
    name: 'Gold Wedding Package',
    category: 'Weddings',
    price: 28000,
    duration: '4 Days Delivery',
    features: [
      'Gold Tier Coverage',
      'Aerial sweeps / drone (if allowed)',
      'Full highlights + 3 social reels',
      'Cinematic color grading',
      'Dedicated backup director'
    ],
    badge: 'Gold Category',
    isRecommended: true
  },
  {
    id: 'pkg-wedding-platinum',
    name: 'Platinum Wedding Package',
    category: 'Weddings',
    price: 45000,
    duration: '5 Days Delivery',
    features: [
      'Platinum Tier Coverage (Complete)',
      '6 Crew members / Cinematic setups',
      'Full length feature film + 5 teaser reels',
      'Ultra fast preview within 24 hours',
      'Premium gift package / raw footage drive'
    ],
    badge: 'Platinum Category',
    isRecommended: false
  },
  {
    id: 'pkg-commercial-event',
    name: 'Commercial Event Package',
    category: 'Commercial Shoots',
    price: 49999,
    duration: '1 Day Delivery',
    features: [
      'Full day shoot session',
      '15 edited videos',
      'Reels shooter total (6 members)',
      'Shoot on latest iPhone',
      'Delivery in one day',
      'Trained and Certified Reel Maker'
    ],
    badge: 'Commercial Enterprise',
    isRecommended: true
  }
];

export const UPSELL_ADDONS = [
  { id: 'add-drone', name: '4K Pro Drone Aerial Sweeps', price: 1500, desc: 'Professional DJI drone coverage' },
  { id: 'add-raw', name: 'Raw Media & Footage Transfer', price: 999, desc: 'Receive all unedited clips via SSD link' },
  { id: 'add-rush', name: 'Super Rush Turnaround (24 Hrs)', price: 1999, desc: 'Skip the editing queue with dedicated focus' },
  { id: 'add-sound', name: 'Dolby Atmos Sound Mixing', price: 750, desc: 'Immersive soundscapes and custom master' }
];

export const MOCK_BOOKINGS = [
  {
    id: 'b-1082',
    creator: CREATORS[0], // Karthik Raja
    clientName: 'Siddharth (Cafe Vibe)',
    category: 'Branding Films',
    packageSelected: PACKAGES[1], // 3 Hours Reel Shoot
    scheduledDate: '2026-06-10',
    scheduledTime: '15:00 - 18:00',
    location: 'Adyar, Chennai',
    totalPrice: 8999,
    addonsSelected: [],
    status: 'Delivered',
    progressPercent: 100,
    chatHistory: [
      { sender: 'user', text: 'Hey Karthik! The final video export looks absolutely stunning. The color grading matches our cafe aesthetic perfectly.', time: '04:00 PM' },
      { sender: 'creator', text: 'Glad you loved it Siddharth! Pleasure working with you. Let me know if you need promotional reels for your next menu launch.', time: '04:30 PM' }
    ]
  },
  {
    id: 'b-8412',
    creator: CREATORS[1], // Meenakshi Sundaram
    clientName: 'Janani & Ravi',
    category: 'Weddings',
    packageSelected: PACKAGES[2], // Bronze Wedding Package
    scheduledDate: '2026-05-24',
    scheduledTime: '08:00 - 23:00',
    location: 'Mahabalipuram Beach Resort, Chennai',
    totalPrice: 13500, // Package (12000) + addon (1500)
    addonsSelected: [UPSELL_ADDONS[0]],
    status: 'Delivered',
    progressPercent: 100,
    chatHistory: []
  }
];
