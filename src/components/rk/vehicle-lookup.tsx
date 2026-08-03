import { FormEvent, useState } from "react";
import { ArrowRight, CarFront, LoaderCircle, ShieldCheck } from "lucide-react";

type VehicleResult = {
  registrationNumber: string;
  make?: string;
  model?: string;
  fuel?: string;
  registrationDate?: string;
};

export function VehicleLookup() {
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VehicleResult | null>(null);
  const [message, setMessage] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const registrationNumber = number.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (registrationNumber.length < 7 || registrationNumber.length > 11) {
      setMessage("Enter a valid Indian vehicle registration number.");
      return;
    }
    setLoading(true);
    setMessage("");
    setResult(null);
    try {
      const response = await fetch("/api/vehicle-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationNumber }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Vehicle lookup is unavailable.");
      setResult(payload.vehicle);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Vehicle lookup is unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border-y border-slate-200 bg-white py-12 sm:py-16" aria-labelledby="vehicle-lookup-title">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-sky-50 text-brand-blue"><CarFront className="h-6 w-6" /></div>
          <h2 id="vehicle-lookup-title" className="mt-5 text-3xl font-black text-slate-950">Start with your vehicle number</h2>
          <p className="mt-3 max-w-lg leading-7 text-slate-600">Looking to sell or exchange? Enter the registration number to begin with verified vehicle details when our authorized data connection is available.</p>
        </div>

        <div className="border border-slate-200 bg-slate-50 p-5 sm:p-7">
          <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="registration-number" className="sr-only">Vehicle registration number</label>
            <input id="registration-number" value={number} onChange={(event) => setNumber(event.target.value.toUpperCase())} placeholder="DL 01 AB 1234" autoComplete="off" className="h-12 min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-4 text-lg font-black uppercase text-slate-950 placeholder:text-slate-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-sky-100" />
            <button type="submit" disabled={loading} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-blue px-6 font-bold text-slate-950 transition hover:bg-[#007fba] disabled:opacity-60">
              {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />} Check vehicle
            </button>
          </form>
          <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-slate-500"><ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-blue" /> Registration data is requested only after you submit it and is never embedded in the browser.</p>
          {message && <div role="status" className="mt-4 border-l-4 border-brand-red bg-white px-4 py-3 text-sm text-slate-700">{message} <a href="#sell" className="font-bold text-brand-blue hover:underline">Continue with manual valuation</a>.</div>}
          {result && <div className="mt-4 grid gap-3 border border-slate-200 bg-white p-4 sm:grid-cols-2"><strong className="text-slate-900">{result.registrationNumber}</strong><span className="text-slate-600">{[result.make, result.model, result.fuel].filter(Boolean).join(" · ")}</span></div>}
        </div>
      </div>
    </section>
  );
}

