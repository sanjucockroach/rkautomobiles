import { Header } from "@/components/rk/header";
import { Hero } from "@/components/rk/hero";
import { StatsBar } from "@/components/rk/stats-bar";
import { CarInventory } from "@/components/rk/car-inventory";
import { Services } from "@/components/rk/services";
import { WhyChooseUs } from "@/components/rk/why-choose-us";
import { EmiCalculator } from "@/components/rk/emi-calculator";
import { Process } from "@/components/rk/process";
import { SellCarForm } from "@/components/rk/sell-car-form";
import { Testimonials } from "@/components/rk/testimonials";
import { ContactMap } from "@/components/rk/contact-map";
import { Footer } from "@/components/rk/footer";
import { WhatsAppFloat } from "@/components/rk/whatsapp-float";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <CarInventory />
        <Services />
        <WhyChooseUs />
        <EmiCalculator />
        <Process />
        <SellCarForm />
        <Testimonials />
        <ContactMap />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
