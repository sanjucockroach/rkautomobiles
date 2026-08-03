import { motion } from "framer-motion";
import { ArrowRight, HeartHandshake, KeyRound, MapPin, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/rk/site-header";
import { Footer } from "@/components/rk/footer";

const values = [
  { icon: ShieldCheck, title: "Clarity before commitment", text: "Condition, paperwork and cost should be understandable before a customer says yes." },
  { icon: HeartHandshake, title: "People before pressure", text: "A car decision is personal. Our role is to guide it patiently, not rush it." },
  { icon: KeyRound, title: "Support after the key", text: "Delivery is a milestone, not the end of the relationship." },
];

export function RkStoryPage() {
  return (
    <div className="public-page min-h-screen">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-white py-20 sm:py-28">
          <div className="page-grid absolute inset-0" />
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="mb-5 flex items-center gap-2 text-sm font-bold text-brand-blue"><MapPin className="h-4 w-4" /> From a Delhi showroom, for journeys across India</p>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.04] text-slate-950 sm:text-6xl">Every car carries somebody's next chapter.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">R.K. Automobiles exists to help that chapter begin with confidence, whether it is a first car, a family upgrade, or the careful sale of a car full of memories.</p>
          </motion.div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div className="text-sm font-bold uppercase text-brand-red">Why we are here</div>
            <div className="space-y-6 text-lg leading-8 text-slate-700">
              <p>The strongest automotive stories began with a practical belief: mobility should improve everyday life. They were shaped through experiments, setbacks, engineering discipline and respect for the people who would eventually sit behind the wheel.</p>
              <p>Our story is simpler. We saw that buying or selling a used car often came with too much uncertainty. So we built our work around clear conversations, careful checks and help with the steps that usually feel complicated.</p>
              <p>We do not believe trust comes from a slogan. It comes from showing the car honestly, explaining the numbers plainly and staying available when a customer needs an answer.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="max-w-2xl text-3xl font-black text-slate-950 sm:text-4xl">What the RK name should mean to you</h2>
            <div className="mt-10 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-3">
              {values.map((value, index) => (
                <motion.div key={value.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.09 }} className="bg-white p-7">
                  <value.icon className="h-7 w-7 text-brand-blue" />
                  <h3 className="mt-8 text-xl font-black text-slate-900">{value.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{value.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-4xl font-black text-slate-950">Your next drive deserves a calm beginning.</h2>
            <p className="mt-4 text-lg text-slate-600">See the cars, ask every question, and choose only when it feels right.</p>
            <a href="/#inventory" className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-brand-blue px-6 font-bold text-white transition hover:bg-[#007fba]">Explore available cars <ArrowRight className="h-4 w-4" /></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

