"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function PartnershipPage() {
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
      <section className="relative min-h-[90vh] flex items-center justify-center pt-36 pb-24 px-6 md:px-10 overflow-hidden">
        {/* Full Header Background Image */}
        <Image
          src="/partnership_hero.jpg"
          alt="EduGlobal Partnership"
          fill
          priority
          className="object-cover object-center z-0 scale-105"
        />

        {/* Gradation Overlays for Optimal Text Contrast */}
        {/* 1. Deep linear dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/92 via-[#0a1628]/78 to-[#0a1628]/95 z-[1]" />
        {/* 2. Soft radial blue glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,109,212,0.25),transparent_75%)] z-[1]" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-full text-xs font-semibold text-white mb-8 shadow-lg">
            <i className="fas fa-handshake text-[#00c853]"></i>
            Partnership Program 2026
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-tight drop-shadow-md">
            Forge Global Connections.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] via-white to-[#3b82f6]">Grow Together</span>
          </h1>
          <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-12 max-w-2xl mx-auto drop-shadow-sm font-medium">
            We collaborate with forward-thinking partners who share our core vision: empowering students to access transformative, world-class academic experiences across the globe. Let's build the future of international education together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#opportunities" className="bg-[#00c853] hover:bg-[#00a844] text-white px-9 py-4 rounded-full text-sm font-bold transition-all hover:-translate-y-1 shadow-lg shadow-[#00c853]/30 inline-flex items-center gap-2.5">
              <i className="fas fa-rocket"></i> Partner With Us
            </a>
            <a href="#why-partner" className="bg-white/90 hover:bg-white text-[#0a1628] px-9 py-4 rounded-full text-sm font-bold transition-all hover:-translate-y-1 shadow-lg backdrop-blur-xs inline-flex items-center gap-2.5">
              <i className="fas fa-info-circle"></i> Learn More
            </a>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-white py-12 px-6 md:px-10 relative z-20 shadow-md">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 text-center p-4">
            <div className="text-4xl md:text-5xl font-black text-[#1a6dd4] mb-2">16+</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Partner Countries</div>
          </div>
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 delay-100 text-center p-4">
            <div className="text-4xl md:text-5xl font-black text-[#1a6dd4] mb-2">500+</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Students Coached</div>
          </div>
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 delay-200 text-center p-4">
            <div className="text-4xl md:text-5xl font-black text-[#1a6dd4] mb-2">50+</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Partner Institutions</div>
          </div>
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 delay-300 text-center p-4">
            <div className="text-4xl md:text-5xl font-black text-[#1a6dd4] mb-2">95%</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Success Rate</div>
          </div>
        </div>
      </section>

      {/* WHY PARTNER SECTION */}
      <section className="py-24 px-6 md:px-10 bg-slate-100 relative" id="why-partner">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=900&fit=crop" 
                alt="Partnership meeting" 
                className="w-full h-[450px] lg:h-[550px] object-cover block"
              />
            </div>
            <div className="hidden sm:flex absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-br from-[#8b5cf6] to-[#1a6dd4] rounded-3xl flex-col items-center justify-center text-white p-6 shadow-2xl z-10">
              <div className="text-5xl font-black leading-none mb-2">50+</div>
              <div className="text-sm font-semibold text-center leading-tight">Global Partners<br />Worldwide</div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className="text-xs font-bold tracking-[3px] uppercase text-[#3b82f6] mb-3 block">Why Partner With Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1628] mb-4">Why Choose EduGlobal as Your Partner?</h2>
            <p className="text-base text-slate-500 mb-10 leading-relaxed">
              We don't just offer programs; we build lasting, mutually beneficial ecosystems for global education.
            </p>

            <div className="space-y-6">
              <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 flex gap-5 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md hover:translate-x-2 transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white text-2xl shrink-0">
                  <i className="fas fa-globe-americas"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0a1628] mb-1">Premium Global Programs</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">Gain direct access to our rigorously curated, high-quality international academic experiences and Model United Nations conferences.</p>
                </div>
              </div>

              <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 delay-100 flex gap-5 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md hover:translate-x-2 transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#f093fb] to-[#f5576c] flex items-center justify-center text-white text-2xl shrink-0">
                  <i className="fas fa-users"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0a1628] mb-1">Vibrant Student Network</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">Tap into our rapidly expanding community of ambitious, globally minded students who are eager to learn, lead, and make an impact.</p>
                </div>
              </div>

              <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 delay-200 flex gap-5 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md hover:translate-x-2 transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4facfe] to-[#00f2fe] flex items-center justify-center text-white text-2xl shrink-0">
                  <i className="fas fa-cogs"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0a1628] mb-1">Tailored & Flexible Collaboration</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">We adapt to your goals. Whether it's co-branded initiatives, referral programs, or joint ventures, we design partnership models that truly work for you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPPORTUNITIES SECTION */}
      <section className="py-24 px-6 md:px-10 bg-white" id="opportunities">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[3px] uppercase text-[#3b82f6] mb-3 block">Partnership Opportunities</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1628] mb-4">Tailored Partnership Opportunities</h2>
            <p className="text-base text-slate-500 leading-relaxed">
              No matter your role in the education ecosystem, we have a collaboration model designed for your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 bg-white rounded-3xl overflow-hidden border-2 border-slate-200 hover:border-transparent hover:shadow-2xl hover:-translate-y-2 transition-all group relative">
              <div className="h-56 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1560472355-536de3962601?w=600&h=400&fit=crop" alt="Educational Consultants" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white text-2xl shadow-lg z-10">
                  <i className="fas fa-briefcase"></i>
                </div>
              </div>
              <div className="pt-12 p-8">
                <h3 className="text-xl font-bold text-[#0a1628] mb-3">For Educational Agents & Consultants</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Expand your service portfolio by helping your students discover life-changing global opportunities, while building a reliable, sustainable, and rewarding collaboration with us.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 delay-100 bg-white rounded-3xl overflow-hidden border-2 border-slate-200 hover:border-transparent hover:shadow-2xl hover:-translate-y-2 transition-all group relative">
              <div className="h-56 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop" alt="Schools & Institutions" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#11998e] to-[#38ef7d] flex items-center justify-center text-white text-2xl shadow-lg z-10">
                  <i className="fas fa-school"></i>
                </div>
              </div>
              <div className="pt-12 p-8">
                <h3 className="text-xl font-bold text-[#0a1628] mb-3">For Schools & Academic Institutions</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Elevate your curriculum by bringing authentic international academic experiences, cultural exchanges, and MUN programs directly to your student body through seamless joint initiatives.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 delay-200 bg-white rounded-3xl overflow-hidden border-2 border-slate-200 hover:border-transparent hover:shadow-2xl hover:-translate-y-2 transition-all group relative">
              <div className="h-56 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop" alt="Corporate Sponsors" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#fc4a1a] to-[#f7b733] flex items-center justify-center text-white text-2xl shadow-lg z-10">
                  <i className="fas fa-building"></i>
                </div>
              </div>
              <div className="pt-12 p-8">
                <h3 className="text-xl font-bold text-[#0a1628] mb-3">For Corporate Sponsors & Organizations</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Align your brand with purpose. Support high-impact educational initiatives, fulfill your CSR goals, and gain meaningful visibility among a dynamic, future-focused global student audience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 md:px-10 bg-gradient-to-br from-[#8b5cf6] via-[#1a6dd4] to-[#3b82f6] text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-5xl font-black mb-5 leading-tight">Ready to Shape the Future of Global Education?</h2>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-10">
              Join a trusted network of dedicated partners making a real difference in students' lives worldwide. Let's start a conversation about how we can achieve mutual growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:partnerships@eduglobalacademy.com" className="bg-[#00c853] hover:bg-[#00a844] text-white px-8 py-4 rounded-full text-sm font-bold transition-all shadow-lg inline-flex items-center gap-2.5">
                <i className="fas fa-paper-plane"></i> Become a Partner Today
              </a>
              <a href="mailto:partnerships@eduglobalacademy.com" className="bg-white hover:bg-slate-100 text-[#0a1628] px-8 py-4 rounded-full text-sm font-bold transition-all shadow-lg inline-flex items-center gap-2.5">
                <i className="fas fa-envelope"></i> Contact Our Partnership Team
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl text-center text-slate-900 fade-in-element opacity-0 translate-y-8 transition-all duration-700">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00c853] to-[#00a844] rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-6">
                <i className="fas fa-headset"></i>
              </div>
              <h3 className="text-2xl font-extrabold text-[#0a1628] mb-3">Let's Talk</h3>
              <p className="text-sm text-slate-500 mb-6">Have questions about partnership opportunities? We're here to help!</p>
              <div className="flex items-center justify-center gap-2.5 text-sm font-semibold text-slate-700 bg-slate-100 p-4 rounded-2xl">
                <i className="fas fa-envelope text-[#1a6dd4]"></i>
                partnerships@eduglobalacademy.com
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a1628] py-12 px-6 md:px-10 text-center text-white/70">
        <h3 className="text-xl font-bold text-white mb-4">Have questions? We're here to help.</h3>
        <div className="flex justify-center gap-6 text-sm flex-wrap mb-6">
          <a href="mailto:partnerships@eduglobalacademy.com" className="hover:text-white transition-colors"><i className="fas fa-envelope mr-2"></i>Contact Your Coach</a>
          <span className="text-white/20">|</span>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <span className="text-white/20">|</span>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>
        <div className="w-16 h-0.5 bg-white/10 mx-auto mb-6"></div>
        <p className="text-xs text-white/40">© 2026 EduGlobal Academy. All rights reserved.</p>
      </footer>
    </div>
  );
}
