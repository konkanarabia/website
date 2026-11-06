import {
  Car,
  Plane,
  Sparkles,
  Utensils,
  Hotel,
  ShieldCheck,
  Award,
} from "lucide-react";
import TranslatedText from "@/components/TranslatedText";

const items = [
  { icon: Car, label: "PedneCar Goa Tourist Taxi & MUV Fleet" },
  { icon: Plane, label: "24/7 Airport Transfers: MOPA & Dabolim" },
  { icon: Sparkles, label: "Curated Dubai Luxury Holidays & Safaris" },
  { icon: Utensils, label: "Mumbai to Malabar Food Express Franchise" },
  { icon: Hotel, label: "Handpicked Beachfront Resorts & Villas" },
  { icon: ShieldCheck, label: "Zero Hidden Charges & Verified Chauffeurs" },
  { icon: Award, label: "Certified UAE Visa & VIP Concierge Desk" },
];

export default function ServiceMarquee() {
  const track = [...items, ...items];

  return (
    <section
      aria-label="Service highlights"
      className="border-y border-amber-900/10 bg-gradient-to-r from-amber-50 via-white to-amber-50 py-3.5 sm:py-4 overflow-hidden"
    >
      <div className="group/marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul
          className="animate-marquee flex w-max items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
          style={{ ["--marquee-duration" as string]: "32s" }}
        >
          {track.map((item, i) => (
            <li
              key={`${item.label}-${i}`}
              aria-hidden={i >= items.length ? "true" : undefined}
              className="flex shrink-0 items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider"
            >
              <item.icon
                className="w-4 h-4 text-amber-600 sm:w-4.5 sm:h-4.5 shrink-0"
                aria-hidden="true"
              />
              <span>
                <TranslatedText text={item.label} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
