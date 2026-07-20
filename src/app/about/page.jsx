"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  useEffect(() => {
    // Scroll animation trigger
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('opacity-100', 'translate-y-0');
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-element').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white text-slate-900 overflow-x-hidden">
      {/* FontAwesome CDN Link */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      />

      {/* NAVIGATION */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 px-6 md:px-10 bg-gradient-to-br from-slate-100 to-white overflow-hidden">
        {/* Background Blob Decorative */}
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-[#3b82f6]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          <div className="lg:col-span-7 fade-in-element opacity-0 translate-y-8 transition-all duration-700">
            <div className="inline-flex items-center gap-2 bg-[#1a6dd4]/10 text-[#1a6dd4] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <i className="fas fa-star"></i> About EduGlobal
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0a1628] leading-tight mb-6 tracking-tight">
              Empowering the Next Generation of <span className="text-[#1a6dd4]">Global Leaders</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-8 max-w-xl">
              We are EduGlobal Experience International — a premier global education platform dedicated to bridging the gap between ambitious students and world-class academic, diplomatic, and cultural opportunities.
            </p>
            <Link href="/checkout" className="bg-[#00c853] hover:bg-[#00a844] text-white px-8 py-4 rounded-full text-sm font-bold transition-all hover:-translate-y-1 shadow-lg shadow-[#00c853]/25 inline-flex items-center gap-2.5">
              Register Now <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="lg:col-span-5 relative fade-in-element opacity-0 translate-y-8 transition-all duration-700 delay-100">
            <div className="rounded-3xl overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=900&fit=crop" 
                alt="Students collaborating globally" 
                className="w-full h-[450px] lg:h-[500px] object-cover block"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl z-20 flex items-center gap-4 border border-slate-100">
              <div className="text-3xl text-[#1a6dd4]">
                <i className="fas fa-globe-asia"></i>
              </div>
              <div>
                <h4 className="text-base font-extrabold text-[#0a1628]">Global Reach</h4>
                <p className="text-xs text-slate-500">16+ Partner Countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE SECTION */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 relative fade-in-element opacity-0 translate-y-8 transition-all duration-700">
            <div className="absolute -top-5 -right-5 w-28 h-28 bg-[#1a6dd4] rounded-2xl -z-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop" 
              alt="Team meeting and planning" 
              className="w-full rounded-3xl shadow-xl relative z-10 object-cover"
            />
          </div>

          <div className="lg:col-span-7 fade-in-element opacity-0 translate-y-8 transition-all duration-700 delay-100">
            <span className="text-xs font-bold tracking-[2px] uppercase text-[#1a6dd4] mb-3 block">Who We Are</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1628] mb-6 leading-snug">
              A Catalyst for Transformation in Global Education
            </h2>
            <p className="text-base text-slate-500 leading-relaxed mb-5">
              Headquartered in the vibrant heart of Bangkok, Thailand, EduGlobal Experience International is more than just an educational program provider.
            </p>
            <p className="text-base text-slate-500 leading-relaxed mb-5">
              We collaborate closely with top-tier international institutions, Model United Nations (MUN) organizers, and global educational partners to craft immersive, life-changing learning journeys for students across Asia and beyond.
            </p>
            <p className="text-base text-slate-500 leading-relaxed">
              We believe that true education extends far beyond the traditional classroom. That’s why our flagship programs seamlessly blend rigorous academic training with cultural exploration, institutional visits, and exposure to global innovation. Whether through our signature <strong className="text-[#0a1628]">"EduTrip + International MUN"</strong> experiences or specialized skill-building workshops, we are committed to equipping students with vital 21st-century competencies: dynamic leadership, effective diplomacy, compelling public speaking, and profound global awareness.
            </p>
          </div>
        </div>
      </section>

      {/* CORE PILLARS SECTION */}
      <section className="py-24 px-6 md:px-10 bg-slate-50 relative">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 fade-in-element opacity-0 translate-y-8 transition-all duration-700">
            <span className="text-xs font-bold tracking-[2px] uppercase text-[#1a6dd4] mb-3 block">Our Foundation</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1628] mb-4">Our Core Pillars</h2>
            <p className="text-base text-slate-500 leading-relaxed">
              The guiding principles that drive everything we do and every program we create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Mission */}
            <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all relative border border-slate-100 group">
              <div className="w-20 h-20 rounded-full bg-[#1a6dd4]/10 text-[#1a6dd4] flex items-center justify-center text-3xl mx-auto mb-6">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3 className="text-xl font-bold text-[#0a1628] mb-4">Our Mission</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                To catalyze student growth by providing authentic, real-world academic experiences that challenge, inspire, and prepare them for the complexities of a globalized world.
              </p>
            </div>

            {/* Pillar 2: Vision */}
            <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 delay-100 bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all relative border border-slate-100 group">
              <div className="w-20 h-20 rounded-full bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center text-3xl mx-auto mb-6">
                <i className="fas fa-eye"></i>
              </div>
              <h3 className="text-xl font-bold text-[#0a1628] mb-4">Our Vision</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                To ignite and nurture a generation of empathetic, globally minded learners who are ready to lead with purpose and make a tangible impact on the world stage.
              </p>
            </div>

            {/* Pillar 3: Team */}
            <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 delay-200 bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all relative border border-slate-100 group">
              <div className="w-20 h-20 rounded-full bg-[#00c853]/10 text-[#00c853] flex items-center justify-center text-3xl mx-auto mb-6">
                <i className="fas fa-users-cog"></i>
              </div>
              <h3 className="text-xl font-bold text-[#0a1628] mb-4">Our Team</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                A passionate, diverse, and dedicated group of educators, mentors, and global citizens. We are committed to guiding, supporting, and empowering our students at every single step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 md:px-10 bg-[#0a1628] text-white text-center relative overflow-hidden">
        {/* Radial Background Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(26,109,212,0.25)_0%,_transparent_50%),radial-gradient(circle_at_70%_50%,_rgba(0,200,83,0.15)_0%,_transparent_50%)] pointer-events-none"></div>

        <div className="max-w-[800px] mx-auto relative z-10 fade-in-element opacity-0 translate-y-8 transition-all duration-700">
          <h2 className="text-3xl md:text-5xl font-black mb-5 leading-tight">Ready to Begin Your Global Journey?</h2>
          <p className="text-base md:text-lg text-white/70 leading-relaxed mb-10">
            Join hundreds of students who have transformed their academic trajectory and broadened their horizons with EduGlobal Experience. Your future on the global stage starts here.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/checkout" className="bg-[#00c853] hover:bg-[#00a844] text-white px-9 py-4 rounded-full text-sm font-bold transition-all hover:-translate-y-1 shadow-lg shadow-[#00c853]/25 inline-flex items-center gap-2.5">
              <i className="fas fa-user-plus"></i> Register Now
            </Link>
            <Link href="/" className="bg-transparent hover:bg-white/10 text-white border-2 border-white/30 hover:border-white px-9 py-4 rounded-full text-sm font-bold transition-all inline-flex items-center gap-2.5">
              <i className="fas fa-compass"></i> Explore Our Programs
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a1628] py-8 px-6 md:px-10 text-center text-white/40 border-t border-white/5">
        <p className="text-xs">© 2026 EduGlobal Experience International. All rights reserved.</p>
      </footer>
    </div>
  );
}
