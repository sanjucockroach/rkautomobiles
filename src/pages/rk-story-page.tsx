import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, HeartHandshake, KeyRound, MapPin, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/rk/site-header";
import { Footer } from "@/components/rk/footer";

const promises = [
  { icon: ShieldCheck, title: "Tell the truth about the car", text: "Condition, history, paperwork and cost deserve plain answers before any commitment." },
  { icon: HeartHandshake, title: "Respect both sides of the handover", text: "The seller is closing a chapter. The buyer is trusting us with the beginning of another." },
  { icon: KeyRound, title: "Stay present after delivery", text: "The relationship should not disappear the moment the key changes hands." },
];

export function RkStoryPage() {
  const storyRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.title = "Our Story | R.K. Automobiles";
  }, []);

  return (
    <div ref={storyRef} className="public-page min-h-screen">
      <SiteHeader />
      <main>
        <section className="relative min-h-[80svh] bg-[#05070a] text-white flex items-center overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,168,238,0.06)_0%,transparent_60%)]" />
          
          <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 z-[2]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-center">
              {/* Text column */}
              <motion.div 
                initial={reduceMotion ? false : { opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-7 flex flex-col justify-center text-left"
              >
                <p className="mb-5 flex items-center gap-2 text-sm font-bold text-white/70">
                  <MapPin className="h-4 w-4 text-brand-blue" /> A Delhi showroom connecting journeys across India
                </p>
                <h1 className="text-balance text-4xl font-black leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                  Between one goodbye and another person's first drive.
                </h1>
                <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/72">
                  That is where the R.K. story lives.
                </p>
              </motion.div>

              {/* Image column */}
              <motion.div 
                initial={reduceMotion ? false : { opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.15 }}
                className="lg:col-span-5 flex justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-[380px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] bg-black/40 p-2">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent z-[1] pointer-events-none" />
                  <img 
                    src="/rk-owner.jpeg" 
                    alt="R.K. Automobiles Owner" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-6 left-6 right-6 z-[2]">
                    <div className="text-sm font-black text-brand-lime">R.K. Automobiles</div>
                    <div className="text-xs text-white/70 mt-0.5">Delhi Showroom</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20 lg:px-8">
            <motion.p initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-sm font-bold text-brand-red">The story behind the showroom</motion.p>
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.65 }} className="space-y-7 text-xl leading-9 text-slate-700">
              <p>Every car was once chosen for a reason. It may have carried someone to a first job, brought a child home, made a long commute easier, or waited outside during a day the family still remembers.</p>
              <p>Then life moves. A family needs more space. A new city calls. A dream changes shape. The owner decides to let the car go, while somewhere else another person is searching for a car they can finally call their own.</p>
              <p className="font-bold text-slate-950">R.K. Automobiles was built around that handover: to help one owner leave with peace of mind and the next owner begin without doubt.</p>
            </motion.div>
          </div>
        </section>

        <section className="overflow-hidden border-y border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
            <motion.div initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }} whileInView={{ clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }} className="min-h-[420px] overflow-hidden lg:min-h-[620px]">
              <img src="/cars/car-2.png" alt="A pre-owned car prepared for a new journey" className="h-full w-full object-cover transition duration-700 hover:scale-[1.025]" />
            </motion.div>
            <div className="flex items-center px-6 py-16 sm:px-12 lg:px-16">
              <motion.div initial={reduceMotion ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.65 }} className="max-w-xl">
                <h2 className="text-balance text-4xl font-black text-slate-950 sm:text-5xl">A showroom became a bridge.</h2>
                <div className="mt-7 space-y-5 text-lg leading-8 text-slate-600">
                  <p>People did not need another place that simply displayed cars. They needed someone to inspect carefully, explain honestly, organise paperwork and remain reachable when the questions began.</p>
                  <p>Our showroom in Delhi became the physical anchor for that promise. Our work now reaches beyond the city through sourcing, guidance and delivery support across India.</p>
                  <p>Distance may change the way a customer meets us. It should never change the clarity they receive.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-[#05070a] py-20 text-white sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.blockquote initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-5xl text-balance text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              “A used car is not an old dream. It is a good journey ready for a new name.”
            </motion.blockquote>
            <p className="mt-6 text-white/55">The belief that guides every handover at R.K. Automobiles.</p>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="max-w-3xl text-balance text-4xl font-black text-slate-950 sm:text-5xl">What must survive every handover</h2>
            <div className="mt-12 border-y border-slate-200">
              {promises.map((promise, index) => (
                <motion.div key={promise.title} initial={reduceMotion ? false : { opacity: 0, x: index % 2 ? 24 : -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55 }} className="grid gap-5 border-b border-slate-200 py-8 last:border-0 sm:grid-cols-[72px_0.7fr_1.3fr] sm:items-center">
                  <promise.icon className={`h-8 w-8 ${index === 1 ? "text-brand-red" : "text-brand-blue"}`} />
                  <h3 className="text-xl font-black text-slate-950">{promise.title}</h3>
                  <p className="max-w-xl leading-7 text-slate-600">{promise.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50 py-20 text-center">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-balance text-4xl font-black text-slate-950">The next chapter can begin calmly.</h2>
            <p className="mt-4 text-lg text-slate-600">See the cars. Ask every question. Choose only when it feels right.</p>
            <a href="/#inventory" className="mt-8 inline-flex h-12 items-center gap-2 rounded-sm bg-brand-blue px-6 font-bold text-white transition hover:bg-[#007fba]">Explore available cars <ArrowRight className="h-4 w-4" /></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

