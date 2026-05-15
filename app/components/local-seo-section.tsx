import Link from 'next/link'
import { MapPin, Phone, Star, Users, Plane, Building2 } from 'lucide-react'

const services = [
  {
    icon: Plane,
    title: 'Dubai Group Tours from Vashi',
    desc: 'Affordable Dubai packages curated exclusively for families and groups departing from Navi Mumbai & Vashi.',
    href: '/destinations',
  },
  {
    icon: Star,
    title: 'Honeymoon Packages for Navi Mumbai Couples',
    desc: 'Romantic getaways to Dubai, Maldives, and Southeast Asia — designed for couples based in Navi Mumbai.',
    href: '/destinations',
  },
  {
    icon: Users,
    title: 'School & Corporate Study Tours',
    desc: 'Organised study tours and corporate offsite trips for schools, colleges, and businesses in Vashi & Navi Mumbai.',
    href: '/events',
  },
  {
    icon: Building2,
    title: 'Hotel & Hospitality Bookings',
    desc: 'Premium hotel accommodations across India and UAE — trusted by thousands of travelers from Navi Mumbai.',
    href: '/hotels',
  },
]

export default function LocalSeoSection() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066a1]/10 rounded-full mb-5">
            <MapPin className="w-4 h-4 text-[#0066a1]" />
            <span className="text-[#0066a1] font-semibold text-sm tracking-wide uppercase">
              Your Local Travel Experts
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4 leading-tight">
            Serving Travelers in{' '}
            <span className="text-[#0066a1]">Vashi</span> and{' '}
            <span className="text-[#0066a1]">Navi Mumbai</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Based at Haware Fantasia Business Park, Sector 30A, Vashi — we are Navi Mumbai's most trusted 
            holiday planning partner for Dubai tours, international packages, and corporate travel.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {services.map((service, i) => (
            <Link
              key={i}
              href={service.href}
              className="group flex gap-5 p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-[#0066a1]/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0066a1]/10 flex items-center justify-center text-[#0066a1] shrink-0 group-hover:bg-[#0066a1] group-hover:text-white transition-all duration-300">
                <service.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-[#0066a1] transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Office Call-Out Banner */}
        <div className="bg-gradient-to-r from-[#0066a1] to-[#004e7c] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-white text-center md:text-left">
            <p className="text-sm font-bold uppercase tracking-widest text-white/70 mb-2">Walk In or Call Us</p>
            <h3 className="text-2xl md:text-3xl font-bold mb-1">Our Office in Vashi, Navi Mumbai</h3>
            <p className="text-white/80 text-sm leading-relaxed max-w-md">
              Office No. S-144, 2nd Floor, Haware Fantasia Business Park, Sector 30A,
              Behind Inorbit Mall, Near Railway Station, Vashi, Navi Mumbai – 400703
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="tel:+919370528517"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0066a1] font-bold rounded-xl hover:bg-slate-100 transition-colors text-sm whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              +91-9370528517
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-colors text-sm whitespace-nowrap"
            >
              Get a Free Quote →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
