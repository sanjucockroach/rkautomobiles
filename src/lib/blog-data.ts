export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  points: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "best-used-cars-under-5-lakh",
    title: "Best used cars under Rs 5 lakh for Indian roads",
    description: "A practical shortlist for first-time buyers who want low running costs, easy service and dependable resale value.",
    category: "Buying guide",
    readTime: "6 min read",
    points: ["Prioritise service history over cosmetic shine.", "Compare insurance, tyre and upcoming service costs.", "Keep part of the budget for transfer and preventive maintenance."],
  },
  {
    slug: "used-car-buying-checklist",
    title: "The used-car inspection checklist that protects your money",
    description: "What to inspect in the body, tyres, cabin, engine bay, documents and test drive before making a decision.",
    category: "Inspection",
    readTime: "7 min read",
    points: ["Inspect the car in daylight on level ground.", "Match the VIN and registration records.", "Test every warning light, switch and safety feature."],
  },
  {
    slug: "used-car-valuation-guide",
    title: "What is your used car really worth?",
    description: "Understand how age, kilometres, demand, ownership, condition and service records shape a fair selling price.",
    category: "Selling guide",
    readTime: "5 min read",
    points: ["Market demand matters as much as the original price.", "Complete records reduce buyer uncertainty.", "Repair safety issues before cosmetic imperfections."],
  },
  {
    slug: "rc-transfer-guide-india",
    title: "RC transfer in India: a clear guide for buyers and sellers",
    description: "The responsibilities, documents and follow-up steps that help both parties close a used-car transaction safely.",
    category: "Paperwork",
    readTime: "8 min read",
    points: ["Use the correct RTO forms for the transaction.", "Keep signed delivery and payment records.", "Track transfer completion instead of assuming it is done."],
  },
  {
    slug: "service-history-resale-value",
    title: "Why service history can raise your car's resale value",
    description: "A simple maintenance record tells a future buyer how the car was treated and can shorten price negotiations.",
    category: "Ownership",
    readTime: "4 min read",
    points: ["Keep invoices and digital service records together.", "Follow time-based service intervals even at low mileage.", "Disclose repairs clearly to build trust."],
  },
  {
    slug: "used-car-finance-emi-guide",
    title: "Used-car finance and EMI: plan the full cost",
    description: "Look beyond the monthly EMI to compare down payment, interest, tenure, insurance and ownership expenses.",
    category: "Finance",
    readTime: "6 min read",
    points: ["Compare total interest, not only the EMI.", "Choose a down payment that leaves an emergency buffer.", "Budget for insurance, fuel and maintenance together."],
  },
];

