import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CertificateShowcase from "../components/certificate-showcase";
import { CheckCircle2, Globe, Users, Award, ShieldCheck, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/hero/hero-2.jpg"
          alt="About KonkanArabia"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Our Story</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium">
            Hospitality is our passion, travel is our culture.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20 lg:px-20">
        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="/logo/KonkanArabia-logo.png" 
              alt="KonkanArabia" 
              fill
              className="object-contain bg-slate-50 p-12"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              A Journey from <span className="text-[#0066a1]">Konkan to Arabia</span>
            </h2>
            <div className="w-20 h-1.5 bg-[#0066a1] rounded-full"></div>
            <p className="text-lg text-slate-600 leading-relaxed">
              KonkanArabia is a combined word reflecting a journey between two unique regions: 
              the lush **Konkan Region** of Maharashtra, India, and the dynamic **Arabia** of the United Arab Emirates.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              More than just a name, it embodies a vision of connecting nations through exceptional hospitality. 
              Our journey is one of continuous progress, seeking new business opportunities while sharing the 
              rich heritage of these two diverse cultures with the world.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-3xl font-bold text-[#0066a1] mb-1">10+</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Years Experience</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-3xl font-bold text-[#0066a1] mb-1">5000+</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Happy Travelers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <Card className="p-8 rounded-3xl border-none shadow-xl bg-slate-900 text-white overflow-hidden relative group">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-[#0066a1]/20 transition-all duration-500"></div>
            <Globe className="h-10 w-10 text-[#0066a1] mb-6" />
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              To encourage, promote, and develop tourism as a major socioeconomic activity, 
              generating value and spreading the benefits of travel to both local communities and global travelers.
            </p>
          </Card>
          
          <Card className="p-8 rounded-3xl border-none shadow-xl bg-slate-50 overflow-hidden relative group">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-[#0066a1]/5 rounded-full blur-3xl group-hover:bg-[#0066a1]/10 transition-all duration-500"></div>
            <Heart className="h-10 w-10 text-[#0066a1] mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-slate-900">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              To be the most trusted link between India and the Middle East, providing seamless, 
              high-quality travel experiences that inspire and connect people across borders.
            </p>
          </Card>
        </div>

        {/* Why Choose Us */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose <span className="text-[#0066a1]">KonkanArabia</span></h2>
            <p className="text-slate-500 text-lg">Excellence in every mile, hospitality in every smile.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Expertly Curated", icon: Globe, desc: "Personalized itineraries tailored to your unique style." },
              { title: "24/7 Support", icon: Users, desc: "Our team is always available to assist you anywhere." },
              { title: "Best Pricing", icon: Award, desc: "Competitive rates without compromising on quality." },
              { title: "Secure Travel", icon: ShieldCheck, desc: "Your safety and comfort are our top priorities." },
              { title: "Local Insight", icon: Heart, desc: "Authentic experiences led by local experts." },
              { title: "Quality Stays", icon: CheckCircle2, desc: "Handpicked accommodation options across all budgets." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#0066a1]/10 flex items-center justify-center text-[#0066a1] mb-6">
                  <item.icon className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <CertificateShowcase />
      </div>
    </div>
  );
}

