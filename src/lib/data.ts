export type Car = {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  emi: number;
  fuel: "Petrol" | "Diesel" | "CNG" | "Electric" | "Hybrid";
  transmission: "Manual" | "Automatic";
  bodyType: "Sedan" | "SUV" | "Hatchback" | "Luxury" | "MUV";
  kmDriven: number;
  owner: string;
  rto: string;
  image: string;
  featured?: boolean;
  badge?: string;
  features: string[];
  rating: number;
  inspections: number;
};

export const cars: Car[] = [
  {
    id: "rk-001",
    name: "Hyundai Verna SX (O)",
    brand: "Hyundai",
    model: "Verna",
    year: 2022,
    price: 945000,
    originalPrice: 1120000,
    emi: 14999,
    fuel: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    kmDriven: 18450,
    owner: "1st Owner",
    rto: "DL",
    image: "/cars/car-1.png",
    featured: true,
    badge: "Hot Deal",
    features: ["Sunroof", "Touchscreen", "Reverse Camera", "ABS", "Airbags"],
    rating: 4.7,
    inspections: 198,
  },
  {
    id: "rk-002",
    name: "Tata Harrier XZA+",
    brand: "Tata",
    model: "Harrier",
    year: 2021,
    price: 1485000,
    originalPrice: 1790000,
    emi: 23999,
    fuel: "Diesel",
    transmission: "Automatic",
    bodyType: "SUV",
    kmDriven: 27600,
    owner: "1st Owner",
    rto: "DL",
    image: "/cars/car-2.png",
    featured: true,
    badge: "Low KMs",
    features: ["Panoramic Sunroof", "ADAS", " ventilated Seats", "360 Camera", "6 Airbags"],
    rating: 4.8,
    inspections: 245,
  },
  {
    id: "rk-003",
    name: "Maruti Swift VXi",
    brand: "Maruti Suzuki",
    model: "Swift",
    year: 2020,
    price: 545000,
    originalPrice: 680000,
    emi: 8499,
    fuel: "Petrol",
    transmission: "Manual",
    bodyType: "Hatchback",
    kmDriven: 35200,
    owner: "1st Owner",
    rto: "DL",
    image: "/cars/car-3.png",
    featured: true,
    badge: "Best Value",
    features: ["Touchscreen", "Reverse Camera", "ABS", "Dual Airbags", "Power Steering"],
    rating: 4.6,
    inspections: 312,
  },
  {
    id: "rk-004",
    name: "Honda City ZX CVT",
    brand: "Honda",
    model: "City",
    year: 2021,
    price: 1095000,
    originalPrice: 1350000,
    emi: 17499,
    fuel: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    kmDriven: 22100,
    owner: "1st Owner",
    rto: "DL",
    image: "/cars/car-4.png",
    featured: true,
    badge: "Certified",
    features: ["Sunroof", "Leather Seats", "Touchscreen", "Cruise Control", "6 Airbags"],
    rating: 4.7,
    inspections: 178,
  },
  {
    id: "rk-005",
    name: "Mahindra XUV700 AX7",
    brand: "Mahindra",
    model: "XUV700",
    year: 2022,
    price: 1985000,
    originalPrice: 2350000,
    emi: 31999,
    fuel: "Diesel",
    transmission: "Automatic",
    bodyType: "SUV",
    kmDriven: 19800,
    owner: "1st Owner",
    rto: "DL",
    image: "/cars/car-5.png",
    featured: true,
    badge: "Premium",
    features: ["ADAS", "Panoramic Sunroof", "Dual 10.25\" Screens", "Ventilated Seats", "7 Airbags"],
    rating: 4.9,
    inspections: 156,
  },
  {
    id: "rk-006",
    name: "Kia Seltos HTX",
    brand: "Kia",
    model: "Seltos",
    year: 2021,
    price: 1245000,
    originalPrice: 1490000,
    emi: 19999,
    fuel: "Petrol",
    transmission: "Manual",
    bodyType: "SUV",
    kmDriven: 24500,
    owner: "1st Owner",
    rto: "DL",
    image: "/cars/car-6.png",
    badge: "Popular",
    features: ["Sunroof", "Touchscreen", "Wireless Charging", "6 Airbags", "Bose Sound"],
    rating: 4.6,
    inspections: 203,
  },
  {
    id: "rk-007",
    name: "Maruti Ciaz ZXi+",
    brand: "Maruti Suzuki",
    model: "Ciaz",
    year: 2020,
    price: 765000,
    originalPrice: 950000,
    emi: 11999,
    fuel: "Petrol",
    transmission: "Manual",
    bodyType: "Sedan",
    kmDriven: 31800,
    owner: "1st Owner",
    rto: "DL",
    image: "/cars/car-7.png",
    features: ["Touchscreen", "Reverse Camera", "Cruise Control", "2 Airbags", "ABS"],
    rating: 4.5,
    inspections: 189,
  },
  {
    id: "rk-008",
    name: "Skoda Slavia Style",
    brand: "Skoda",
    model: "Slavia",
    year: 2022,
    price: 1325000,
    originalPrice: 1620000,
    emi: 21499,
    fuel: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    kmDriven: 16200,
    owner: "1st Owner",
    rto: "DL",
    image: "/cars/car-8.png",
    badge: "Like New",
    features: ["Sunroof", "Virtual Cockpit", "Touchscreen", "6 Airbags", "Cruise Control"],
    rating: 4.7,
    inspections: 142,
  },
];

export type Service = {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  color: "lime" | "cyan" | "red" | "blue";
};

export const services: Service[] = [
  {
    id: "buy-sell",
    icon: "car",
    title: "Buy & Sell Used Cars",
    description: "Wide range of certified pre-owned cars. Sell your car at the best price with instant payment.",
    features: ["200+ cars in stock", "Instant payment", "Free valuation", "Hassle-free transfer"],
    color: "lime",
  },
  {
    id: "finance",
    icon: "wallet",
    title: "Finance Available",
    description: "Easy car loans with quick approval, minimal documentation and attractive interest rates.",
    features: ["Up to 90% funding", "Quick approval", "Low EMI options", "Minimal paperwork"],
    color: "cyan",
  },
  {
    id: "delivery",
    icon: "truck",
    title: "Pan India Delivery",
    description: "Get your dream car delivered to your doorstep anywhere in India, safely and on time.",
    features: ["Doorstep delivery", "All states covered", "Safe transit", "Insurance during transit"],
    color: "blue",
  },
  {
    id: "insurance",
    icon: "shield",
    title: "Insurance & Claim Support",
    description: "Comprehensive car insurance and end-to-end claim assistance from our experts.",
    features: ["Best premiums", "Cashless claims", "Quick settlement", "Renewal reminders"],
    color: "red",
  },
  {
    id: "denting",
    icon: "wrench",
    title: "Denting & Painting",
    description: "Professional denting, painting and body repair to make your car look brand new.",
    features: ["Color matching", "Panel repair", "Rust treatment", "Insurance claims"],
    color: "lime",
  },
  {
    id: "detailing",
    icon: "sparkles",
    title: "Car Detailing & Workshop",
    description: "Premium car detailing, polishing and complete workshop services for all makes.",
    features: ["Ceramic coating", "Interior detailing", "Engine service", "AC service"],
    color: "cyan",
  },
];

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  car: string;
  text: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rahul Verma",
    location: "Delhi",
    rating: 5,
    car: "Hyundai Verna",
    text: "Bought my Verna from R.K. Automobile and the experience was seamless. Genuine price, transparent paperwork, and the car was in excellent condition. Highly recommended!",
    avatar: "RV",
  },
  {
    id: "t2",
    name: "Priya Sharma",
    location: "Noida",
    rating: 5,
    car: "Tata Harrier",
    text: "The team helped me with finance approval within a day. Got my Harrier at a great price with low KMs. Their after-sales service is also fantastic.",
    avatar: "PS",
  },
  {
    id: "t3",
    name: "Amit Khanna",
    location: "Gurgaon",
    rating: 5,
    car: "Mahindra XUV700",
    text: "Best used car dealer in Delhi NCR. The XUV700 I bought was spotless and they even delivered it to my doorstep. Truly professional service.",
    avatar: "AK",
  },
  {
    id: "t4",
    name: "Sneha Gupta",
    location: "Faridabad",
    rating: 5,
    car: "Honda City",
    text: "Sold my old car and bought a City from R.K. Automobile. Got the best value for both transactions. The staff is honest and friendly.",
    avatar: "SG",
  },
  {
    id: "t5",
    name: "Vikram Singh",
    location: "Delhi",
    rating: 5,
    car: "Kia Seltos",
    text: "I was skeptical about buying a used car but R.K. Automobile made it stress-free. 200+ point inspection gave me full confidence. Worth every rupee.",
    avatar: "VS",
  },
  {
    id: "t6",
    name: "Neha Kapoor",
    location: "Ghaziabad",
    rating: 5,
    car: "Maruti Swift",
    text: "Affordable, reliable and genuine deals! Got my first car from here and the finance team made EMI super easy. Thank you R.K. Automobile!",
    avatar: "NK",
  },
];

export type ProcessStep = {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
};

export const buyProcess: ProcessStep[] = [
  {
    id: "b1",
    step: 1,
    title: "Browse & Select",
    description: "Explore 200+ certified cars online or visit our showroom. Filter by budget, brand & body type.",
    icon: "search",
  },
  {
    id: "b2",
    step: 2,
    title: "Inspect & Test Drive",
    description: "Every car passes 200+ point inspection. Book a free test drive at your convenience.",
    icon: "car",
  },
  {
    id: "b3",
    step: 3,
    title: "Finance & Paperwork",
    description: "Get instant loan approval with minimal documents. We handle all RTO & transfer paperwork.",
    icon: "file",
  },
  {
    id: "b4",
    step: 4,
    title: "Drive Home",
    description: "Pay securely, get your keys and drive home. Pan India delivery available on request.",
    icon: "key",
  },
];

export const sellProcess: ProcessStep[] = [
  {
    id: "s1",
    step: 1,
    title: "Book Free Valuation",
    description: "Fill the form or call us. Get a free, no-obligation valuation for your car in minutes.",
    icon: "phone",
  },
  {
    id: "s2",
    step: 2,
    title: "Inspection at Home",
    description: "Our expert visits your location for a thorough inspection at zero cost.",
    icon: "search",
  },
  {
    id: "s3",
    step: 3,
    title: "Get Best Price",
    description: "Receive the best market price quote instantly. No hidden charges, no haggling.",
    icon: "wallet",
  },
  {
    id: "s4",
    step: 4,
    title: "Instant Payment",
    description: "Accept the offer and get instant payment with free RC transfer handled by us.",
    icon: "check",
  },
];

export const stats = [
  { label: "Happy Customers", value: "5000+", icon: "users" },
  { label: "Cars Sold", value: "3200+", icon: "car" },
  { label: "Years of Trust", value: "12+", icon: "calendar" },
  { label: "Avg. Rating", value: "4.8★", icon: "star" },
];

export const brandInfo = {
  name: "R.K. AUTOMOBILE",
  tagline: "USED CAR DEALERS",
  phone1: "9999995121",
  phone2: "9990995121",
  phone3: "9210488098",
  whatsapp: "919999995121",
  address: "D-11/12 Nehru Vihar, Near Timarpur, Delhi - 110054",
  website: "https://rkautomobile.in",
  mapUrl: "https://maps.app.goo.gl/e8VCvoMa3GfFgHV98",
  mapEmbed:
    "https://www.google.com/maps?q=D-11/12+Nehru+Vihar+Near+Timarpur+Delhi+110054&output=embed",
  socials: {
    facebook: "https://www.facebook.com/people/RK-Automobiles/61566463160118/",
    instagram: "https://www.instagram.com/r.k.automobileofficial",
    youtube: "https://www.youtube.com/channel/UCQ13O9jRdBa-CUkggXuKRwA",
    whatsapp: "https://whatsapp.com/channel/0029VbDJWLALSmbU6eBmOo1M",
  },
};
