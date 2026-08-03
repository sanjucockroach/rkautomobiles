import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Car, Clock, MapPin, MessageCircle, Phone, Wallet } from "lucide-react";
import { SiteHeader } from "@/components/rk/site-header";
import { ContactMap } from "@/components/rk/contact-map";
import { Footer } from "@/components/rk/footer";
import { brandInfo } from "@/lib/data";

const reasons = [
  { icon: Car, title: "Find a car", text: "Tell us your budget, preferred model and delivery city." },
  { icon: Wallet, title: "Sell or finance", text: "Start a valuation or discuss an EMI plan with the team." },
  { icon: MapPin, title: "Visit the showroom", text: "See cars in person at Nehru Vihar, near Timarpur, Delhi." },
];

export function ContactPage() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.title = "Contact R.K. Automobiles | Delhi Showroom & India-wide Support";
  }, []);

  return (
    <div className="public-page min-h-screen">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-[#05070a] py-20 text-white sm:py-28">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
            <img src="/cars/car-5.png" alt="Car available through the R.K. Automobiles showroom" className="h-full w-full object-cover opacity-55" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] to-transparent" />
          </div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-sm font-bold text-white/65"><MessageCircle className="h-4 w-4 text-brand-red" /> A real showroom team, seven days a week</p>
              <h1 className="mt-5 text-balance text-5xl font-black leading-[1.03] sm:text-6xl">Bring us the car decision on your mind.</h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-white/70">Buying, selling, finance, insurance, service or delivery: tell us where you are in the journey and we will help you find the next clear step.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`tel:${brandInfo.phone1}`} className="inline-flex h-12 items-center gap-2 rounded-sm bg-brand-blue px-6 font-bold text-white transition hover:bg-[#007fba]"><Phone className="h-4 w-4" /> Call {brandInfo.phone1}</a>
                <a href={`https://wa.me/${brandInfo.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-sm border border-white/30 px-6 font-bold text-white transition hover:bg-white hover:text-slate-950"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl divide-y divide-slate-200 px-4 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">
            {reasons.map((reason, index) => (
              <motion.div key={reason.title} initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="flex gap-4 py-7 md:px-7 md:first:pl-0 md:last:pr-0">
                <reason.icon className={`mt-1 h-6 w-6 shrink-0 ${index === 1 ? "text-brand-red" : "text-brand-blue"}`} />
                <div><h2 className="font-black text-slate-950">{reason.title}</h2><p className="mt-1 text-sm leading-6 text-slate-600">{reason.text}</p></div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-slate-50 pt-16 sm:pt-20">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-4 sm:px-6 md:flex-row md:items-end lg:px-8">
            <div><h2 className="text-balance text-4xl font-black text-slate-950 sm:text-5xl">Choose how you want to reach us.</h2><p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">Use the form for a detailed request, call for a quick answer, or open directions when you are ready to visit.</p></div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-600"><Clock className="h-4 w-4 text-brand-blue" /> Mon-Sun, 9:00 AM-8:00 PM</div>
          </div>
        </section>

        <ContactMap showHeading={false} />
      </main>
      <Footer />
    </div>
  );
}

