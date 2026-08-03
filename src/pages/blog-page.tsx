import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Clock, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/rk/site-header";
import { Footer } from "@/components/rk/footer";
import { brandInfo } from "@/lib/data";
import { blogPosts } from "@/lib/blog-data";

const postImages = ["/cars/car-3.png", "/cars/car-4.png", "/cars/car-7.png", "/cars/car-2.png", "/cars/car-6.png", "/cars/car-8.png"];

const questions = [
  { question: "Is a lower odometer always better?", answer: "No. Consistent servicing, use pattern and overall condition matter alongside kilometres. A neglected low-kilometre car can cost more than a well-maintained higher-kilometre one." },
  { question: "How much should I keep after the purchase?", answer: "Keep a buffer for insurance, transfer work, preventive service, tyres or battery. Spending the full budget on the sticker price leaves no room to settle into ownership." },
  { question: "What should a seller never skip?", answer: "A signed handover record and follow-up until RC transfer is completed. Payment alone does not close the responsibility attached to the registration." },
];

export function BlogPage() {
  const reduceMotion = useReducedMotion();
  const [featured, ...guides] = blogPosts;
  const whatsapp = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent("Hi R.K. Automobiles, I have a used-car question after reading the RK Journal.")}`;

  useEffect(() => {
    document.title = "Used Car Buying & Ownership Guides | RK Journal";
  }, []);

  return (
    <div className="public-page min-h-screen">
      <SiteHeader />
      <main>
        <section className="overflow-hidden bg-[#05070a] text-white">
          <div className="mx-auto grid min-h-[540px] max-w-7xl lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div initial={reduceMotion ? false : { opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex items-center px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
              <div className="max-w-xl">
                <p className="text-sm font-bold text-brand-red">RK Journal</p>
                <h1 className="mt-5 text-balance text-5xl font-black leading-[1.03] sm:text-6xl">Know the car before it becomes yours.</h1>
                <p className="mt-6 max-w-lg text-pretty text-lg leading-8 text-white/68">Practical guidance for buying, owning and selling a used car in India, written to make the decision clearer rather than louder.</p>
              </div>
            </motion.div>
            <motion.div initial={reduceMotion ? false : { clipPath: "inset(0 0 0 100%)" }} animate={{ clipPath: "inset(0 0 0 0%)" }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="min-h-[360px] overflow-hidden lg:min-h-[540px]">
              <img src="/cars/hero-car.png" alt="Used car shown for a careful buying decision" className="h-full w-full object-cover" />
            </motion.div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <motion.article initial={reduceMotion ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.65 }}>
                <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                  <img src={postImages[0]} alt="Affordable used car for an Indian first-time buyer" className="h-full w-full object-cover transition duration-700 hover:scale-[1.025]" />
                </div>
                <div className="mt-7 flex items-center gap-4 text-sm font-bold text-slate-500"><span className="text-brand-blue">{featured.category}</span><span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {featured.readTime}</span></div>
                <h2 className="mt-4 max-w-3xl text-balance text-4xl font-black text-slate-950 sm:text-5xl">{featured.title}</h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{featured.description} The most sensible choice is rarely the flashiest listing; it is the car whose condition, running costs and paperwork still make sense after the excitement settles.</p>
                <a href={`/blog/${featured.slug}.html`} className="mt-7 inline-flex min-h-11 items-center gap-2 font-bold text-slate-950 transition hover:text-brand-blue">Read the complete guide <ArrowRight className="h-4 w-4" /></a>
              </motion.article>

              <motion.aside initial={reduceMotion ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.65, delay: 0.1 }} className="bg-slate-50 p-6 sm:p-8 lg:sticky lg:top-28">
                <h3 className="text-2xl font-black text-slate-950">Before you shortlist a car</h3>
                <div className="mt-6 space-y-5">
                  {featured.points.map((point) => (
                    <div key={point} className="flex gap-3 border-b border-slate-200 pb-5 last:border-0 last:pb-0"><Check className="mt-1 h-5 w-5 shrink-0 text-brand-red" /><p className="leading-7 text-slate-600">{point}</p></div>
                  ))}
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <h2 className="max-w-2xl text-balance text-4xl font-black text-slate-950 sm:text-5xl">Guides for the decisions after “I like this car.”</h2>
              <p className="max-w-sm text-pretty leading-7 text-slate-600">Inspection, valuation, paperwork, maintenance and finance, explained without sales language.</p>
            </div>

            <div className="mt-12 border-t border-slate-300">
              {guides.map((post, index) => (
                <motion.article key={post.slug} initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} className="group grid gap-6 border-b border-slate-300 py-8 md:grid-cols-[220px_1fr_auto] md:items-center">
                  <div className="aspect-[4/3] overflow-hidden bg-white">
                    <img src={postImages[index + 1]} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 text-sm font-bold"><span className={index % 2 ? "text-brand-red" : "text-brand-blue"}>{post.category}</span><span className="text-slate-500">{post.readTime}</span></div>
                    <h3 className="mt-3 max-w-3xl text-balance text-2xl font-black text-slate-950 sm:text-3xl">{post.title}</h3>
                    <p className="mt-3 max-w-2xl leading-7 text-slate-600">{post.description}</p>
                  </div>
                  <a href={`/blog/${post.slug}.html`} aria-label={`Read ${post.title}`} className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 text-slate-900 transition group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white"><ArrowUpRight className="h-5 w-5" /></a>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-balance text-4xl font-black text-slate-950 sm:text-5xl">Three questions worth asking early</h2>
            <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
              {questions.map((item, index) => (
                <motion.div key={item.question} initial={reduceMotion ? false : { opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }} className="grid gap-4 py-7 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
                  <h3 className="text-xl font-black text-slate-950">{item.question}</h3>
                  <p className="leading-7 text-slate-600">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-blue py-16 text-white">
          <div className="mx-auto flex max-w-6xl flex-col justify-between gap-7 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
            <div><h2 className="text-balance text-3xl font-black sm:text-4xl">Still unsure about a car?</h2><p className="mt-2 text-white/75">Ask the RK team before you make the decision.</p></div>
            <a href={whatsapp} target="_blank" rel="noreferrer" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-sm bg-[#05070a] px-6 font-bold text-white transition hover:bg-white hover:text-slate-950"><MessageCircle className="h-4 w-4" /> Ask on WhatsApp</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

