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
  const whatsapp = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent("Hi R.K. Automobiles, please help me find the right used car.")}`;

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#05070a] text-white">
      <div className="absolute inset-0">
        {heroScenes.map((scene, index) => (
          <div key={scene.label} className={`absolute inset-0 transition-opacity duration-1000 ease-out ${active === index ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={active !== index}>
            <img src={scene.poster} alt="" className="h-full w-full object-cover" />
            {!failed[index] && (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay muted loop playsInline poster={scene.poster}
                preload={active === index ? "auto" : "metadata"}
                onError={() => setFailed((value) => ({ ...value, [index]: true }))}
              >
                <source src={scene.src} type="video/mp4" />
              </video>
            )}
          </div>
        ))}
      </div>
      <div className="cinematic-overlay absolute inset-0" />
      <SiteHeader overlay />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-4 pb-28 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-white/85">
            <Truck className="h-4 w-4 text-brand-blue" />
            Buy, sell and deliver across India
          </div>
          <h1 className="max-w-3xl text-balance text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            The right car should feel right from day one.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-white/78 sm:text-lg">
            Carefully inspected pre-owned cars, clear pricing, finance support and delivery across India, backed by a real Delhi showroom team.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-sm bg-brand-blue px-6 font-bold text-white hover:bg-[#007fba]">
              <a href="#inventory"><Search className="h-4 w-4" /> Explore cars</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-sm border-white/35 bg-black/20 px-6 font-bold text-white backdrop-blur-sm hover:bg-white hover:text-slate-950">
              <a href="#sell"><Car className="h-4 w-4" /> Sell your car</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="h-12 rounded-sm px-4 font-bold text-white hover:bg-white/10 hover:text-white">
              <a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4 text-brand-red" /> WhatsApp</a>
            </Button>
          </div>

          <div className="mt-8 flex max-w-2xl flex-wrap border-y border-white/20 bg-black/20 backdrop-blur-sm">
            {["200+ point checks", "Transparent pricing", "Pan India support"].map((item) => (
              <div key={item} className="flex min-h-14 flex-1 basis-44 items-center gap-2 px-4 text-sm font-semibold text-white/85">
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand-blue" /> {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-4 right-4 z-20 mx-auto flex max-w-7xl items-end justify-between gap-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8">
        <div className="flex gap-5">
          {heroScenes.map((scene, index) => (
            <button key={scene.label} type="button" onClick={() => setActive(index)} className={`min-h-11 border-b-2 pb-1 text-sm font-bold transition ${active === index ? "border-brand-red text-white" : "border-transparent text-white/55 hover:text-white"}`} aria-pressed={active === index}>
              {scene.label}
            </button>
          ))}
        </div>
        <a href="/rk-story" className="hidden min-h-11 items-center gap-2 text-sm font-bold text-white/80 transition hover:text-white sm:flex">Read the RK story <ArrowRight className="h-4 w-4" /></a>
      </div>
    </section>
  );
}

export default Hero;
