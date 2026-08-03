import { useState } from "react";
import { ArrowRight, Car, MessageCircle, Search, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandInfo } from "@/lib/data";
import { SiteHeader } from "./site-header";

const heroScenes = [
  { label: "Showroom", src: "https://cdn.pixabay.com/video/2021/09/13/88481-606110665_large.mp4", poster: "/cars/hero-car.png" },
  { label: "Test drive", src: "https://cdn.pixabay.com/video/2017/08/20/11490-230853032_large.mp4", poster: "/cars/car-5.png" },
  { label: "Car detail", src: "https://cdn.pixabay.com/video/2023/10/12/184734-873923034_large.mp4", poster: "/cars/car-8.png" },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const scene = heroScenes[active];
  const whatsapp = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent("Hi R.K. Automobiles, please help me find the right used car.")}`;

  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[#f7f9fc] lg:min-h-screen">
      <div className="absolute inset-0 lg:left-[37%]">
        <img src={scene.poster} alt="Premium used car available through R.K. Automobiles" className="h-full w-full object-cover" />
        {!failed[active] && (
          <video
            key={scene.src}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay muted loop playsInline poster={scene.poster}
            onError={() => setFailed((value) => ({ ...value, [active]: true }))}
          >
            <source src={scene.src} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="cinematic-overlay absolute inset-0" />

      <div className="relative z-20">
        <SiteHeader overlay />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center px-4 pb-24 pt-8 sm:px-6 lg:min-h-[calc(100vh-80px)] lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 border-l-4 border-brand-red bg-white/90 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm backdrop-blur">
            <Truck className="h-4 w-4 text-brand-blue" />
            Buy, sell and deliver across India
          </div>
          <h1 className="max-w-3xl text-5xl font-black leading-[1.02] text-slate-950 sm:text-6xl lg:text-7xl">
            The right car should feel right from day one.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-700 sm:text-lg">
            Carefully inspected pre-owned cars, clear pricing, finance support and delivery across India, backed by our Delhi showroom team.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-md bg-brand-blue px-6 font-bold text-white hover:bg-[#007fba]">
              <a href="#inventory"><Search className="h-4 w-4" /> Explore cars</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-md border-slate-300 bg-white/90 px-6 font-bold text-slate-900 hover:bg-white">
              <a href="#sell"><Car className="h-4 w-4" /> Sell your car</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="h-12 rounded-md px-4 font-bold text-slate-800 hover:bg-white/80">
              <a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4 text-brand-red" /> WhatsApp</a>
            </Button>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-2 gap-px overflow-hidden border border-slate-200 bg-slate-200 shadow-sm sm:grid-cols-3">
            {["200+ point checks", "Transparent pricing", "Pan India support"].map((item) => (
              <div key={item} className="flex min-h-16 items-center gap-2 bg-white/95 px-3 text-sm font-semibold text-slate-700">
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand-blue" /> {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-4 right-4 z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8">
        <div className="flex gap-5">
          {heroScenes.map((item, index) => (
            <button key={item.label} type="button" onClick={() => setActive(index)} className={`border-b-2 pb-1 text-sm font-bold transition ${active === index ? "border-brand-red text-slate-950" : "border-transparent text-slate-600 hover:text-slate-950"}`} aria-pressed={active === index}>
              {item.label}
            </button>
          ))}
        </div>
        <a href="/rk-story" className="hidden items-center gap-2 text-sm font-bold text-slate-800 hover:text-brand-blue sm:flex">Read the RK story <ArrowRight className="h-4 w-4" /></a>
      </div>
    </section>
  );
}

export default Hero;
