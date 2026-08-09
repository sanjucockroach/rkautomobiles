"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Sparkles,
  MessageCircle,
  X,
  Send,
  RotateCcw,
  Car,
  Wrench,
  IndianRupee,
  ShieldCheck,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { brandInfo, initialCars, Car as CarType } from "@/lib/data";

type MessageSender = "ai" | "user";

type IntentType = "buy" | "sell" | "service" | "loan" | "general" | null;

interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  intent?: IntentType;
  step?: number;
  dropdown?: {
    id: string;
    label: string;
    options: { value: string; label: string }[];
    selectedValue?: string;
  };
  recommendations?: CarType[];
  actionLink?: {
    text: string;
    url: string;
    isWhatsApp?: boolean;
  };
  summaryCard?: {
    title: string;
    items: { label: string; value: string }[];
    waMessage: string;
  };
}

const BUY_BODY_TYPES = [
  { value: "Any", label: "✨ Any Body Type" },
  { value: "SUV", label: "🚙 SUV / Compact SUV" },
  { value: "Sedan", label: "🏎️ Premium Sedan" },
  { value: "Hatchback", label: "🚗 Family Hatchback" },
  { value: "Luxury", label: "👑 Luxury Car" },
];

const BUDGET_RANGES = [
  { value: "under-5", label: "💰 Under ₹5 Lakh" },
  { value: "5-10", label: "💰 ₹5 Lakh - ₹10 Lakh" },
  { value: "10-15", label: "💰 ₹10 Lakh - ₹15 Lakh" },
  { value: "15-25", label: "💰 ₹15 Lakh - ₹25 Lakh" },
  { value: "25-plus", label: "💰 ₹25 Lakh+ (Luxury)" },
];

const FUEL_TYPES = [
  { value: "Any", label: "⚡ Any Fuel Type" },
  { value: "Petrol", label: "⛽ Petrol" },
  { value: "Diesel", label: "🛢️ Diesel" },
  { value: "CNG", label: "🍃 CNG (Company Fitted)" },
  { value: "Electric", label: "🔋 Electric / Hybrid" },
];

const TRANSMISSIONS = [
  { value: "Any", label: "🕹️ Any Transmission" },
  { value: "Automatic", label: "🅰️ Automatic (AT / DCT / CVT)" },
  { value: "Manual", label: "Ⓜ️ Manual" },
];

const SELL_BRANDS = [
  { value: "Maruti Suzuki", label: "Maruti Suzuki" },
  { value: "Hyundai", label: "Hyundai" },
  { value: "Honda", label: "Honda" },
  { value: "Tata Motors", label: "Tata Motors" },
  { value: "Mahindra", label: "Mahindra" },
  { value: "Toyota", label: "Toyota" },
  { value: "Kia", label: "Kia" },
  { value: "Volkswagen / Skoda", label: "Volkswagen / Skoda" },
  { value: "BMW / Audi / Mercedes", label: "Luxury (BMW / Audi / Mercedes)" },
  { value: "Other", label: "Other Brand" },
];

const MANUFACTURING_YEARS = [
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
  { value: "2017", label: "2017" },
  { value: "2016", label: "2016" },
  { value: "2015 or older", label: "2015 or older" },
];

const KILOMETERS_DRIVEN = [
  { value: "Under 20,000 km", label: "Under 20,000 km" },
  { value: "20,000 - 40,000 km", label: "20,000 - 40,000 km" },
  { value: "40,000 - 70,000 km", label: "40,000 - 70,000 km" },
  { value: "70,000 - 100,000 km", label: "70,000 - 100,000 km" },
  { value: "Above 100,000 km", label: "Above 100,000 km" },
];

const SERVICE_TYPES = [
  { value: "Periodic Maintenance & Oil Change", label: "🛠️ Periodic Maintenance & Full Service" },
  { value: "Denting & Painting (Booth Baked)", label: "🎨 Denting & Painting (Booth Baked Finish)" },
  { value: "Ceramic Coating & Deep Detailing", label: "✨ Ceramic Coating & Detailing" },
  { value: "Mechanical & AC Repair", label: "❄️ Mechanical & AC Diagnostic Repair" },
  { value: "7-Day Free Warranty Claim (Delhi NCR)", label: "🛡️ Free 7-Day Warranty Claim" },
  { value: "Emergency Roadside Assistance", label: "🚨 Roadside Assistance (Delhi NCR)" },
];

const LOAN_AMOUNTS = [
  { value: "₹2 Lakh - ₹5 Lakh", label: "₹2 Lakh - ₹5 Lakh" },
  { value: "₹5 Lakh - ₹10 Lakh", label: "₹5 Lakh - ₹10 Lakh" },
  { value: "₹10 Lakh - ₹18 Lakh", label: "₹10 Lakh - ₹18 Lakh" },
  { value: "₹18 Lakh+", label: "₹18 Lakh+ (Luxury Vehicle)" },
];

const EMPLOYMENT_TYPES = [
  { value: "Salaried (MNC / Corporate / Govt)", label: "💼 Salaried (MNC / Corporate / Govt)" },
  { value: "Self-Employed / Business Owner", label: "🏢 Self-Employed / Business Owner" },
  { value: "Professional (Doctor, CA, Lawyer)", label: "🩺 Professional (Doctor, CA, Lawyer)" },
  { value: "Other", label: "📋 Other Profile" },
];

export function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  // Flow State
  const [currentIntent, setCurrentIntent] = useState<IntentType>(null);
  const [buyState, setBuyState] = useState({
    bodyType: "",
    budget: "",
    fuel: "",
    transmission: "",
    city: "",
  });
  const [sellState, setSellState] = useState({
    brand: "",
    model: "",
    year: "",
    fuelTrans: "",
    kms: "",
    regState: "",
  });
  const [serviceState, setServiceState] = useState({
    serviceType: "",
    carModel: "",
    preferredDate: "",
  });
  const [loanState, setLoanState] = useState({
    amount: "",
    employment: "",
    tenure: "",
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 1800);
    return () => clearTimeout(t);
  }, []);

  // Initialize greeting on first open or mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "msg-welcome-1",
          sender: "ai",
          text: "Namaste! 🙏 Welcome to R.K. Automobiles AI Assistant.\n\nI can help you find your dream certified car, calculate vehicle valuation for instant selling, book workshop services, or check loan eligibility. How can I assist you today?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, [messages.length]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowBubble(false);
    setUnreadCount(0);
  };

  const handleReset = () => {
    setCurrentIntent(null);
    setBuyState({ bodyType: "", budget: "", fuel: "", transmission: "", city: "" });
    setSellState({ brand: "", model: "", year: "", fuelTrans: "", kms: "", regState: "" });
    setServiceState({ serviceType: "", carModel: "", preferredDate: "" });
    setLoanState({ amount: "", employment: "", tenure: "" });

    setMessages([
      {
        id: "msg-reset",
        sender: "ai",
        text: "🔄 Chat restarted! What would you like to explore today at R.K. Automobiles?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const addAiMessage = (msg: Omit<ChatMessage, "id" | "sender" | "timestamp">) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          ...msg,
          id: `msg-${Date.now()}-${Math.random()}`,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 600);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}-${Math.random()}`,
        sender: "user",
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  // Flow Triggers
  const startBuyFlow = () => {
    setCurrentIntent("buy");
    addUserMessage("🚗 I want to buy a certified pre-owned car");
    addAiMessage({
      text: "Awesome! We have 150+ point inspected, non-accidental cars with full paperwork. Please select your preferred body type from the dropdown:",
      intent: "buy",
      step: 1,
      dropdown: {
        id: "buy-body-type",
        label: "Select Body Type / Segment",
        options: BUY_BODY_TYPES,
      },
    });
  };

  const startSellFlow = () => {
    setCurrentIntent("sell");
    addUserMessage("💰 I want to sell or exchange my car (Get Instant Valuation)");
    addAiMessage({
      text: "Great! We provide instant doorstep valuation, transparent pricing, and same-day payment with hassle-free free RC transfer.\n\nPlease select your car brand:",
      intent: "sell",
      step: 1,
      dropdown: {
        id: "sell-brand",
        label: "Select Car Make / Brand",
        options: SELL_BRANDS,
      },
    });
  };

  const startServiceFlow = () => {
    setCurrentIntent("service");
    addUserMessage("🛠️ Workshop Service & 7-Day Warranty Support");
    addAiMessage({
      text: "Our multi-brand workshop at Nehru Vihar, Delhi provides professional mechanical work, booth-baked painting, and free 7-day machinery warranty coverage.\n\nPlease select the service you need:",
      intent: "service",
      step: 1,
      dropdown: {
        id: "service-type",
        label: "Select Workshop Service",
        options: SERVICE_TYPES,
      },
    });
  };

  const startLoanFlow = () => {
    setCurrentIntent("loan");
    addUserMessage("💳 Car Finance & Loan Assistance");
    addAiMessage({
      text: "We partner with leading national banks (HDFC, ICICI, SBI, Axis) to offer up to 90% funding with low interest rates and instant approval.\n\nWhat is your required loan amount?",
      intent: "loan",
      step: 1,
      dropdown: {
        id: "loan-amount",
        label: "Select Loan Amount",
        options: LOAN_AMOUNTS,
      },
    });
  };

  const startDirectWa = () => {
    addUserMessage("💬 Chat directly with Showroom Manager on WhatsApp");
    const waUrl = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent(
      "Hi R.K. Automobiles, I am browsing your website and would like to chat directly with a showroom manager."
    )}`;
    addAiMessage({
      text: `Connecting you directly to our Delhi Showroom WhatsApp at +91 ${brandInfo.whatsapp}! Click below to start chatting:`,
      actionLink: {
        text: "Open WhatsApp Chat",
        url: waUrl,
        isWhatsApp: true,
      },
    });
  };

  // Handle Dropdown Selection
  const handleDropdownSelect = (dropdownId: string, value: string, label: string) => {
    addUserMessage(label);

    // BUY FLOW
    if (dropdownId === "buy-body-type") {
      setBuyState((prev) => ({ ...prev, bodyType: value }));
      addAiMessage({
        text: `Got it: ${label}. What is your comfortable budget range?`,
        intent: "buy",
        step: 2,
        dropdown: {
          id: "buy-budget",
          label: "Select Budget Range",
          options: BUDGET_RANGES,
        },
      });
    } else if (dropdownId === "buy-budget") {
      setBuyState((prev) => ({ ...prev, budget: value }));
      addAiMessage({
        text: `Perfect (${label}). What fuel type do you prefer?`,
        intent: "buy",
        step: 3,
        dropdown: {
          id: "buy-fuel",
          label: "Select Fuel Type",
          options: FUEL_TYPES,
        },
      });
    } else if (dropdownId === "buy-fuel") {
      setBuyState((prev) => ({ ...prev, fuel: value }));
      addAiMessage({
        text: `Noted (${label}). What transmission type do you prefer?`,
        intent: "buy",
        step: 4,
        dropdown: {
          id: "buy-trans",
          label: "Select Transmission",
          options: TRANSMISSIONS,
        },
      });
    } else if (dropdownId === "buy-trans") {
      const updatedBuy = { ...buyState, transmission: value };
      setBuyState(updatedBuy);

      // Find matching inventory cars
      const matches = initialCars.filter((c) => {
        const bodyMatch = updatedBuy.bodyType === "Any" || c.bodyType.toLowerCase() === updatedBuy.bodyType.toLowerCase();
        const fuelMatch = updatedBuy.fuel === "Any" || c.fuel.toLowerCase() === updatedBuy.fuel.toLowerCase();
        const transMatch = updatedBuy.transmission === "Any" || c.transmission.toLowerCase() === updatedBuy.transmission.toLowerCase();
        return bodyMatch && fuelMatch && transMatch;
      });

      const topMatches = matches.length > 0 ? matches.slice(0, 3) : initialCars.slice(0, 3);

      const summaryText = `*🚗 R.K. Automobiles - Car Buying Inquiry*\n• *Body Type:* ${updatedBuy.bodyType || "Any"}\n• *Budget:* ${updatedBuy.budget || "Flexible"}\n• *Fuel:* ${updatedBuy.fuel || "Any"}\n• *Transmission:* ${updatedBuy.transmission || "Any"}\n• *Source:* Website AI Assistant`;
      const waUrl = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent(summaryText)}`;

      addAiMessage({
        text: `🎉 Thank you! I found matching certified vehicles available in our Delhi showroom and warehouse network.\n\nHere is your custom enquiry summary:`,
        intent: "buy",
        step: 5,
        recommendations: topMatches,
        summaryCard: {
          title: "Verified Car Requirement Summary",
          items: [
            { label: "Segment / Body", value: updatedBuy.bodyType || "Any" },
            { label: "Budget Range", value: label },
            { label: "Fuel Type", value: updatedBuy.fuel || "Any" },
            { label: "Transmission", value: updatedBuy.transmission || "Any" },
            { label: "Delhi Warranty", value: "7-Day Free Warranty Included" },
          ],
          waMessage: summaryText,
        },
        actionLink: {
          text: "🚀 Send Requirement & Get Car Photos on WhatsApp",
          url: waUrl,
          isWhatsApp: true,
        },
      });
    }

    // SELL FLOW
    else if (dropdownId === "sell-brand") {
      setSellState((prev) => ({ ...prev, brand: value }));
      addAiMessage({
        text: `Great, ${label}! What is the manufacturing year of the vehicle?`,
        intent: "sell",
        step: 2,
        dropdown: {
          id: "sell-year",
          label: "Select Manufacturing Year",
          options: MANUFACTURING_YEARS,
        },
      });
    } else if (dropdownId === "sell-year") {
      setSellState((prev) => ({ ...prev, year: value }));
      addAiMessage({
        text: `Noted (${label}). Approximately how many kilometers has the car run?`,
        intent: "sell",
        step: 3,
        dropdown: {
          id: "sell-kms",
          label: "Select Kilometers Driven",
          options: KILOMETERS_DRIVEN,
        },
      });
    } else if (dropdownId === "sell-kms") {
      const updatedSell = { ...sellState, kms: value };
      setSellState(updatedSell);

      const summaryText = `*💰 R.K. Automobiles - Car Selling & Valuation Request*\n• *Brand / Make:* ${updatedSell.brand}\n• *Year:* ${updatedSell.year}\n• *Kms Driven:* ${updatedSell.kms}\n• *Benefit:* Same Day Payment & Free RC Transfer\n• *Source:* Website AI Assistant`;
      const waUrl = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent(summaryText)}`;

      addAiMessage({
        text: `✨ Excellent! Based on current Delhi NCR market demand for ${updatedSell.brand} (${updatedSell.year}), your car is eligible for an instant top-dollar quote and same-day doorstep inspection.`,
        intent: "sell",
        step: 4,
        summaryCard: {
          title: "Vehicle Valuation Submission",
          items: [
            { label: "Vehicle Brand", value: updatedSell.brand },
            { label: "Year of Make", value: updatedSell.year },
            { label: "Odometer Range", value: label },
            { label: "RC Transfer", value: "100% Free & Legal Guarantee" },
            { label: "Payment", value: "Instant Bank Transfer on Handover" },
          ],
          waMessage: summaryText,
        },
        actionLink: {
          text: "💰 Send Details for Instant WhatsApp Valuation Quote",
          url: waUrl,
          isWhatsApp: true,
        },
      });
    }

    // SERVICE FLOW
    else if (dropdownId === "service-type") {
      setServiceState((prev) => ({ ...prev, serviceType: value }));

      const summaryText = `*🛠️ R.K. Automobiles - Workshop Service & Warranty Booking*\n• *Service Needed:* ${value}\n• *Location:* Nehru Vihar Multi-Brand Workshop, Delhi\n• *Warranty T&C:* Machinery & car issues covered under 7-day warranty; 1 month roadside assistance across Delhi NCR.\n• *Source:* Website AI Assistant`;
      const waUrl = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent(summaryText)}`;

      addAiMessage({
        text: `✅ Request received for *${value}*.\n\nOur workshop technicians at Nehru Vihar, Delhi are ready to assist you. All mechanical repairs are backed by genuine parts and warranty support.`,
        intent: "service",
        step: 2,
        summaryCard: {
          title: "Service Appointment Summary",
          items: [
            { label: "Selected Service", value },
            { label: "Workshop Location", value: "D-11/12 Nehru Vihar, Timarpur, Delhi" },
            { label: "Warranty Coverage", value: "Machinery & Car Parts Addressed" },
            { label: "Roadside Assistance", value: "1 Month Free across Delhi NCR" },
          ],
          waMessage: summaryText,
        },
        actionLink: {
          text: "📅 Confirm Service Slot on WhatsApp",
          url: waUrl,
          isWhatsApp: true,
        },
      });
    }

    // LOAN FLOW
    else if (dropdownId === "loan-amount") {
      setLoanState((prev) => ({ ...prev, amount: value }));
      addAiMessage({
        text: `Understood (${label}). Please select your employment profile to match with top banking partners:`,
        intent: "loan",
        step: 2,
        dropdown: {
          id: "loan-employment",
          label: "Select Employment Profile",
          options: EMPLOYMENT_TYPES,
        },
      });
    } else if (dropdownId === "loan-employment") {
      const updatedLoan = { ...loanState, employment: value };
      setLoanState(updatedLoan);

      const summaryText = `*💳 R.K. Automobiles - Car Loan & Finance Application*\n• *Loan Amount:* ${updatedLoan.amount}\n• *Employment:* ${updatedLoan.employment}\n• *Partners:* HDFC, ICICI, SBI, Axis, IDFC\n• *Tenure Options:* Up to 7 Years (84 Months)\n• *Source:* Website AI Assistant`;
      const waUrl = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent(summaryText)}`;

      addAiMessage({
        text: `🎉 Great! Profiles under *${label}* are eligible for minimal documentation and interest rates starting from 8.99% p.a. with fast 24-hour sanction.`,
        intent: "loan",
        step: 3,
        summaryCard: {
          title: "Pre-Approved Loan Eligibility",
          items: [
            { label: "Required Loan", value: updatedLoan.amount },
            { label: "Applicant Profile", value: label },
            { label: "Approval Time", value: "24 - 48 Hours" },
            { label: "Down Payment", value: "Starting from as low as 10%" },
          ],
          waMessage: summaryText,
        },
        actionLink: {
          text: "💳 Send Application on WhatsApp for Instant Approval",
          url: waUrl,
          isWhatsApp: true,
        },
      });
    }
  };

  // Free-text Input Handler with intelligent NLP keyword detection
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.trim();
    addUserMessage(query);
    setInputText("");

    const qLower = query.toLowerCase();

    // Intent recognition
    if (qLower.includes("buy") || qLower.includes("purchase") || qLower.includes("car") || qLower.includes("suv") || qLower.includes("price") || qLower.includes("budget") || qLower.includes("sedan")) {
      addAiMessage({
        text: "I can help you find certified pre-owned cars! Let's narrow down your search using the dropdown:",
        intent: "buy",
        step: 1,
        dropdown: {
          id: "buy-body-type",
          label: "Select Body Type / Segment",
          options: BUY_BODY_TYPES,
        },
      });
    } else if (qLower.includes("sell") || qLower.includes("valuation") || qLower.includes("exchange") || qLower.includes("evaluat")) {
      addAiMessage({
        text: "Looking to sell your car? We offer top instant market prices and same-day payment in Delhi NCR. What brand is your car?",
        intent: "sell",
        step: 1,
        dropdown: {
          id: "sell-brand",
          label: "Select Car Brand",
          options: SELL_BRANDS,
        },
      });
    } else if (qLower.includes("service") || qLower.includes("repair") || qLower.includes("paint") || qLower.includes("dent") || qLower.includes("warranty") || qLower.includes("workshop")) {
      addAiMessage({
        text: "Our Delhi workshop handles denting/painting, detailing, and 7-day free machinery warranty claims. What service do you require?",
        intent: "service",
        step: 1,
        dropdown: {
          id: "service-type",
          label: "Select Workshop Service",
          options: SERVICE_TYPES,
        },
      });
    } else if (qLower.includes("loan") || qLower.includes("finance") || qLower.includes("emi") || qLower.includes("bank") || qLower.includes("interest")) {
      addAiMessage({
        text: "We provide hassle-free car financing with up to 90% funding. How much loan amount do you require?",
        intent: "loan",
        step: 1,
        dropdown: {
          id: "loan-amount",
          label: "Select Loan Amount",
          options: LOAN_AMOUNTS,
        },
      });
    } else if (qLower.includes("location") || qLower.includes("address") || qLower.includes("where") || qLower.includes("timing") || qLower.includes("hours")) {
      const waUrl = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent("Hi R.K. Automobiles, I'd like directions and visiting details for your Nehru Vihar showroom.")}`;
      addAiMessage({
        text: `📍 *R.K. Automobiles Showroom & Workshop:*\n• *Address:* ${brandInfo.address}\n• *Phone / WhatsApp:* +91 ${brandInfo.phone1} / +91 ${brandInfo.whatsapp}\n• *Hours:* Open 7 Days a Week (10:00 AM - 8:30 PM)\n• *Landmark:* Near Timarpur, North Delhi\n\nWould you like to schedule a visit or get live Google Maps directions on WhatsApp?`,
        actionLink: {
          text: "Get Directions & Book Showroom Visit on WhatsApp",
          url: waUrl,
          isWhatsApp: true,
        },
      });
    } else {
      const waUrl = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent(`Hi R.K. Automobiles, I have a question: "${query}"`)}`;
      addAiMessage({
        text: `Thank you for your question! I can connect you immediately with our chief sales manager on WhatsApp to give you accurate answers and custom car photos.`,
        actionLink: {
          text: "💬 Chat on WhatsApp with Showroom Manager",
          url: waUrl,
          isWhatsApp: true,
        },
      });
    }
  };

  return (
    <>
      {/* Floating Trigger & Notification Tooltip */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 font-sans">
        <AnimatePresence>
          {showBubble && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={handleOpen}
              className="group cursor-pointer max-w-[280px] bg-[#0c1017]/95 border border-brand-lime/40 text-white p-3.5 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.6)] backdrop-blur-md flex items-start gap-3 transition-transform hover:scale-[1.02]"
            >
              <div className="relative flex-shrink-0 mt-0.5">
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-brand-blue to-brand-lime flex items-center justify-center text-slate-950 font-bold">
                  <Bot className="h-4 w-4" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#0c1017]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-brand-lime flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> RK AI Advisor
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowBubble(false);
                    }}
                    className="text-white/40 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <p className="text-[12px] text-slate-200 mt-1 leading-snug">
                  Need help buying, selling, or loan assistance? Chat with our AI!
                </p>
                <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-brand-blue group-hover:underline">
                  Start Chat <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger Button */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            } else {
              handleOpen();
            }
          }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#050608] via-[#0d121c] to-[#121a29] text-white border-2 border-brand-lime/60 shadow-[0_0_25px_rgba(212,255,0,0.35)] transition-shadow hover:shadow-[0_0_35px_rgba(212,255,0,0.55)]"
          aria-label={isOpen ? "Close AI Chatbot" : "Open AI Chatbot"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <>
              <div className="relative">
                <Bot className="h-7 w-7 text-brand-lime animate-pulse" />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#25d366] text-[9px] font-black text-black">
                  <MessageCircle className="h-2.5 w-2.5" />
                </span>
              </div>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-brand-red text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#050608] animate-bounce">
                  1
                </span>
              )}
            </>
          )}
        </motion.button>
      </div>

      {/* Expanded AI Chatbot Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] max-h-[82vh] h-[640px] flex flex-col overflow-hidden rounded-2xl border border-slate-700/80 bg-[#07090e] shadow-[0_25px_70px_rgba(0,0,0,0.85)] backdrop-blur-xl font-sans text-white"
          >
            {/* Chatbot Header */}
            <div className="relative bg-gradient-to-r from-[#0d121c] via-[#101726] to-[#0a101d] p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-lime flex items-center justify-center text-slate-950 shadow-inner">
                    <Bot className="h-6 w-6 font-bold" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#07090e] animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-black text-white tracking-wide">R.K. AI Car Advisor</span>
                    <span className="rounded bg-brand-lime/20 px-1.5 py-0.5 text-[9px] font-bold text-brand-lime">
                      PRO
                    </span>
                  </div>
                  <div className="text-[11px] text-white/60 flex items-center gap-1">
                    <span>Delhi Showroom</span> • <span className="text-emerald-400">Online & Active</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Restart conversation"
                  className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <a
                  href={`https://wa.me/${brandInfo.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Direct WhatsApp"
                  className="p-2 rounded-lg text-[#25d366] hover:bg-[#25d366]/10 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Quick Intent Navigation Bar */}
            <div className="bg-[#0b0f17] px-3 py-2 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={startBuyFlow}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/5 hover:bg-brand-blue/20 hover:text-brand-blue border border-white/5 transition-colors flex items-center gap-1"
              >
                <Car className="h-3 w-3 text-brand-blue" /> Buy Car
              </button>
              <button
                onClick={startSellFlow}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/5 hover:bg-brand-lime/20 hover:text-brand-lime border border-white/5 transition-colors flex items-center gap-1"
              >
                <IndianRupee className="h-3 w-3 text-brand-lime" /> Sell Car
              </button>
              <button
                onClick={startServiceFlow}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/5 hover:bg-brand-red/20 hover:text-brand-red border border-white/5 transition-colors flex items-center gap-1"
              >
                <Wrench className="h-3 w-3 text-brand-red" /> Service
              </button>
              <button
                onClick={startLoanFlow}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/5 hover:bg-amber-400/20 hover:text-amber-400 border border-white/5 transition-colors flex items-center gap-1"
              >
                <ShieldCheck className="h-3 w-3 text-amber-400" /> Loans
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm bg-gradient-to-b from-[#07090e] via-[#090d14] to-[#06080c]">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                      m.sender === "user"
                        ? "bg-brand-blue text-white rounded-br-none shadow-md font-medium"
                        : "bg-[#131926] text-slate-100 border border-white/10 rounded-tl-none shadow-lg"
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>

                    {/* Dropdown Options inside AI Message */}
                    {m.dropdown && (
                      <div className="mt-3.5 pt-3 border-t border-white/10">
                        <label className="block text-[11px] font-bold text-brand-lime mb-1.5 flex items-center gap-1">
                          <Sparkles className="h-3 w-3" /> {m.dropdown.label}
                        </label>
                        <select
                          defaultValue=""
                          onChange={(e) => {
                            const val = e.target.value;
                            if (!val) return;
                            const opt = m.dropdown?.options.find((o) => o.value === val);
                            if (opt && m.dropdown?.id) {
                              handleDropdownSelect(m.dropdown.id, val, opt.label);
                            }
                          }}
                          className="w-full bg-[#0a0e17] border border-brand-lime/40 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-brand-lime/50 transition-all cursor-pointer"
                        >
                          <option value="" disabled>
                            -- Choose an option --
                          </option>
                          {m.dropdown.options.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-[#0f1420] text-white py-1">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Matching Inventory Cards (if available) */}
                    {m.recommendations && m.recommendations.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <div className="text-[11px] font-bold text-white/70 uppercase tracking-wider">
                          Recommended Vehicles:
                        </div>
                        {m.recommendations.map((car) => (
                          <div
                            key={car.id}
                            className="bg-[#0b0f17] border border-white/10 rounded-xl p-2.5 flex items-center gap-3 hover:border-brand-lime/40 transition-colors"
                          >
                            <img
                              src={car.image}
                              alt={car.name}
                              className="h-12 w-16 object-cover rounded-lg bg-black/40 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-xs text-white truncate">{car.name}</div>
                              <div className="text-[10px] text-white/60">
                                {car.year} • {car.fuel} • {car.kmDriven.toLocaleString()} km
                              </div>
                              <div className="text-xs font-black text-brand-lime mt-0.5">
                                ₹{(car.price / 100000).toFixed(2)} Lakh
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Summary Card */}
                    {m.summaryCard && (
                      <div className="mt-3 bg-[#0a0e17] border border-brand-lime/30 rounded-xl p-3 space-y-2">
                        <div className="text-xs font-black text-brand-lime flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-[#25d366]" /> {m.summaryCard.title}
                        </div>
                        <div className="space-y-1 text-[11px]">
                          {m.summaryCard.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between border-b border-white/5 pb-1">
                              <span className="text-white/60">{item.label}:</span>
                              <span className="font-semibold text-white text-right">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Link (Final Reroute to WhatsApp) */}
                    {m.actionLink && (
                      <a
                        href={m.actionLink.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3.5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25d366] hover:bg-[#20bd5a] text-black px-4 py-2.5 text-xs sm:text-sm font-black transition-all shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.5)] transform hover:-translate-y-0.5"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {m.actionLink.text}
                        <ExternalLink className="h-3.5 w-3.5 ml-0.5" />
                      </a>
                    )}
                  </div>
                  <span className="text-[10px] text-white/30 mt-1 px-1">{m.timestamp}</span>
                </div>
              ))}

              {/* Quick Prompt Cards on fresh start */}
              {messages.length === 1 && !currentIntent && (
                <div className="pt-2 space-y-2">
                  <div className="text-[11px] font-bold text-white/50 uppercase tracking-wider">
                    Quick Starting Options:
                  </div>
                  <button
                    onClick={startBuyFlow}
                    className="w-full text-left p-3 rounded-xl bg-[#101624] hover:bg-[#151e30] border border-white/10 hover:border-brand-blue/50 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-brand-blue/20 text-brand-blue flex items-center justify-center font-bold">
                        <Car className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-brand-blue transition-colors">
                          Find a Certified Pre-Owned Car
                        </div>
                        <div className="text-[11px] text-white/50">150+ point inspected, non-accidental</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-brand-blue transition-colors" />
                  </button>

                  <button
                    onClick={startSellFlow}
                    className="w-full text-left p-3 rounded-xl bg-[#101624] hover:bg-[#151e30] border border-white/10 hover:border-brand-lime/50 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-brand-lime/20 text-brand-lime flex items-center justify-center font-bold">
                        <IndianRupee className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-brand-lime transition-colors">
                          Sell / Value My Car
                        </div>
                        <div className="text-[11px] text-white/50">Instant quote, same day payment & free RC transfer</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-brand-lime transition-colors" />
                  </button>

                  <button
                    onClick={startServiceFlow}
                    className="w-full text-left p-3 rounded-xl bg-[#101624] hover:bg-[#151e30] border border-white/10 hover:border-brand-red/50 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-brand-red/20 text-brand-red flex items-center justify-center font-bold">
                        <Wrench className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-brand-red transition-colors">
                          Workshop Service & 7-Day Warranty
                        </div>
                        <div className="text-[11px] text-white/50">Nehru Vihar Delhi workshop & roadside support</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-brand-red transition-colors" />
                  </button>

                  <button
                    onClick={startDirectWa}
                    className="w-full text-left p-3 rounded-xl bg-[#101624] hover:bg-[#151e30] border border-white/10 hover:border-[#25d366]/50 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-[#25d366]/20 text-[#25d366] flex items-center justify-center font-bold">
                        <MessageCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#25d366] transition-colors">
                          Direct WhatsApp with Showroom
                        </div>
                        <div className="text-[11px] text-white/50">Talk directly with our dealership owner</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-[#25d366] transition-colors" />
                  </button>
                </div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-white/50 text-xs py-1">
                  <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center">
                    <Bot className="h-3.5 w-3.5 text-brand-lime" />
                  </div>
                  <div className="flex items-center gap-1 bg-[#131926] px-3 py-2 rounded-xl border border-white/5">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-lime animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-lime animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-lime animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-[#0a0e17] border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask anything or type requirements..."
                className="flex-1 bg-[#121824] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-brand-lime focus:ring-1 focus:ring-brand-lime transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="h-10 w-10 rounded-xl bg-brand-blue disabled:opacity-40 hover:bg-[#007fba] text-white flex items-center justify-center transition-all flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AiChatbot;
