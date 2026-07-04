"use client";

import { Users, Car, Calendar, Star } from "lucide-react";
import { stats } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  car: Car,
  calendar: Calendar,
  star: Star,
};

export function StatsBar() {
  return (
    <section className="relative py-10 border-y border-white/10 bg-gradient-to-r from-[#0a0c10] via-[#0d0f14] to-[#0a0c10]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Users;
            const colors = ["text-brand-lime", "text-brand-cyan", "text-brand-red", "text-brand-blue"];
            return (
              <div key={s.label} className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-white/5 ${colors[i % 4]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className={`text-2xl lg:text-3xl font-black ${colors[i % 4]}`}>{s.value}</div>
                  <div className="text-xs lg:text-sm text-gray-400">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StatsBar;
