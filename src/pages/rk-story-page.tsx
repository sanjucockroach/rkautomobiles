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
        <section className="relative bg-[#05070a] text-white overflow-hidden py-10 lg:py-0 lg:min-h-[80svh] lg:flex lg:items-center">
          {/* Desktop Full bleed background image */}
          <motion.img 
            initial={reduceMotion ? false : { scale: 1.03, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src="/rk-owner.jpeg" 
            alt="R.K. Automobiles Showroom" 
            className="hidden lg:block absolute inset-0 h-full w-full object-cover object-[18%_center] pointer-events-none" 
          />
          
          {/* Desktop gradient (keeps left owner & car 100% clear, fades to dark on right for text) */}
          <div className="absolute inset-0 hidden lg:block bg-[linear-gradient(90deg,rgba(5,7,10,0.05)_0%,rgba(5,7,10,0.35)_35%,rgba(5,7,10,0.92)_65%,#05070a_100%)] z-[1]" />
          
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 z-[2]">
            {/* MOBILE LAYOUT: Clean Vertical Stack with Full Crisp Image and Text Below (Zero Blur) */}
            <div className="flex flex-col lg:hidden gap-6">
              {/* Crisp, unblurred, fully visible image container on Mobile */}
              <motion.div 
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.7)] bg-black/60"
              >
                <img 
                  src="/rk-owner.jpeg" 
                  alt="R.K. Automobiles Owner and Showroom" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg">
                  <div className="text-[11px] font-black text-brand-lime">R.K. Automobiles</div>
                  <div className="text-[9px] text-white/70">Delhi Showroom</div>
                </div>
              </motion.div>

              {/* Text content below image on Mobile (No blur, 100% readable) */}
              <motion.div 
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-left"
              >
                <p className="mb-3 flex items-center gap-2 text-xs font-bold text-brand-lime">
                  <MapPin className="h-3.5 w-3.5 text-brand-blue" /> A Delhi showroom connecting journeys across India
                </p>
                <h1 className="text-balance text-3xl sm:text-4xl font-black leading-[1.15] text-white">
                  Between one goodbye and another person's first drive.
                </h1>
                <p className="mt-4 text-base leading-7 text-white/80 font-medium">
                  That is where the R.K. story lives.
                </p>
              </motion.div>
            </div>

            {/* DESKTOP LAYOUT (lg:): Text shifted to the right over subtle dark fade */}
            <div className="hidden lg:grid grid-cols-12 gap-8 items-center py-20">
              <motion.div 
                initial={reduceMotion ? false : { opacity: 0, x: 35 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                className="col-start-7 col-span-6 flex flex-col justify-center text-left"
              >
                <p className="mb-5 flex items-center gap-2 text-sm font-bold text-brand-lime">
                  <MapPin className="h-4 w-4 text-brand-blue" /> A Delhi showroom connecting journeys across India
                </p>
                <h1 className="text-balance text-4xl font-black leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                  Between one goodbye and another person's first drive.
                </h1>
                <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/85 font-medium">
                  That is where the R.K. story lives.
                </p>
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

