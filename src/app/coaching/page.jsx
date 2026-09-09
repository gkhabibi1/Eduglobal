"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OnlineCoachingPage() {
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

  const awardees = [
    {
      name: "Nadia Rahma",
      award: "Best Delegate",
      conference: "HMUN Boston",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      quote: "The structured coaching at EduGlobal Academy gave me the strategic edge I needed. Writing position papers and mastering the rules of procedure transformed how I debated in committee. Winning Best Delegate at HMUN Boston proved that thorough preparation makes all the difference.",
    },
    {
      name: "Kenzo Tan",
      award: "Outstanding Delegate",
      conference: "HMUN China",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face",
      quote: "Stepping into an international committee of 100+ delegates felt daunting at first, but our coach taught us how to lead unmoderated caucuses and build winning draft resolutions. My confidence skyrocketed, and receiving the Outstanding Delegate award was a milestone I’ll never forget.",
    },
    {
      name: "Alya Putri",
      award: "Best Position Paper",
      conference: "Thai National MUN",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
      quote: "The intensive research methodologies and policy debate sessions taught during online coaching completely elevated my diplomacy skills. I was able to represent our assigned nation with precision and earn Best Position Paper in Bangkok.",
    },
    {
      name: "David Alexander",
      award: "Honorable Mention",
      conference: "HMUN Boston",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      quote: "Before EduGlobal, I struggled with public speaking in large rooms. My coach helped me find my voice, structure persuasive speeches under pressure, and negotiate effectively. That preparation earned me an Honorable Mention at Boston.",
    },
  ];

  return (
    <div className="min-h-screen font-sans bg-white text-slate-900 overflow-x-hidden">
      {/* FontAwesome CDN Link import for icons */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      />

      {/* NAVIGATION */}
      <Navbar />

      {/* ================= HERO SECTION / MAIN COACHING INTRODUCTION ================= */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#0a1628] via-[#1e3a5f] to-[#1a6dd4] flex items-center pt-36 pb-20 px-6 md:px-10 overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_20%_50%,_white_1px,_transparent_1px)] bg-[size:60px_60px]"></div>
        <div className="absolute w-[400px] h-[400px] bg-[#3b82f6] -top-24 -right-24 rounded-full blur-[80px] opacity-40"></div>
        <div className="absolute w-[300px] h-[300px] bg-[#00c853] -bottom-12 -left-12 rounded-full blur-[80px] opacity-20"></div>

        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          <div className="lg:col-span-7 text-white">
            
            {/* Hashtag badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-xs font-semibold text-white mb-6">
              <i className="fas fa-check-circle text-[#00c853]"></i>
              #EduGlobalMUNCoaching
            </div>

            {/* Section Tag */}
            <div className="text-xs font-extrabold tracking-[3px] uppercase text-[#60a5fa] mb-2.5">
              MUN COACHING
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black leading-tight mb-6 tracking-tight">
              MUN Coaching: Prepare with Confidence,
              <span className="text-[#60a5fa] block mt-1">Lead with Purpose</span>
            </h1>

            {/* Paragraph 1 */}
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 max-w-2xl font-normal">
              Success at Model United Nations starts with the right preparation. Our specialized MUN Coaching Program equips students with the practical skills, knowledge, and confidence needed to perform effectively at national and international MUN conferences.
            </p>

            {/* Paragraph 2 */}
            <p className="text-sm md:text-base text-white/80 leading-relaxed mb-4 max-w-2xl font-normal">
              Students strengthen their skills in MUN procedures, research, position paper writing, public speaking, negotiation, diplomacy, resolution writing, and debate through structured online coaching led by experienced MUN coaches.
            </p>

            {/* Paragraph 3 */}
            <p className="text-sm md:text-base text-white/80 leading-relaxed mb-8 max-w-2xl font-normal">
              Whether joining MUN for the first time or preparing for an international conference, EduGlobal Academy helps students arrive prepared, confident, and ready to represent their delegation.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/checkout" 
                className="bg-[#00c853] hover:bg-[#00a844] text-white px-8 py-4 rounded-full text-sm font-bold transition-all hover:-translate-y-1 shadow-lg shadow-[#00c853]/30 inline-flex items-center gap-2.5"
              >
                <i className="fas fa-rocket"></i> Apply Now
              </Link>
              <a 
                href="#learn" 
                className="bg-transparent hover:bg-white/15 text-white border-2 border-white/40 hover:border-white px-8 py-4 rounded-full text-sm font-bold transition-all inline-flex items-center gap-2.5"
              >
                <i className="fas fa-play-circle"></i> Explore Program
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=1000&fit=crop" 
                alt="Student MUN coaching session"
                className="w-full h-[480px] lg:h-[580px] object-cover block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating Card 1 */}
            <div className="hidden sm:flex absolute -bottom-6 -left-8 bg-white rounded-2xl p-5 shadow-2xl items-center gap-4 animate-bounce hover:animation-none border border-slate-100">
              <div className="w-[50px] h-[50px] rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white text-xl shadow-md">
                <i className="fas fa-award"></i>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0a1628]">Award-Winning Mentorship</h4>
                <p className="text-xs text-slate-500">Expert MUN Coaches</p>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div className="hidden sm:flex absolute top-10 -right-6 bg-white rounded-2xl p-5 shadow-2xl items-center gap-4 border border-slate-100">
              <div className="w-[50px] h-[50px] rounded-xl bg-gradient-to-br from-[#11998e] to-[#38ef7d] flex items-center justify-center text-white text-xl shadow-md">
                <i className="fas fa-globe-americas"></i>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0a1628]">Global Summits</h4>
                <div className="text-sm font-extrabold text-[#1a6dd4]">Boston • Bangkok • Shenzhen</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT YOU WILL LEARN SECTION ================= */}
      <section className="py-24 px-6 md:px-10 bg-gradient-to-b from-slate-100 to-white" id="learn">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center text-xs font-bold tracking-[3px] uppercase text-[#3b82f6] mb-3">Our Core Modules</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0a1628] mb-4">What You Will Learn</h2>
          <p className="text-base text-slate-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
            We focus on developing the essential competencies required to excel at international conferences:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 border border-slate-200">
              <div className="h-52 relative overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1575320189272-7e34510a604b?w=600&h=400&fit=crop" alt="MUN Conference" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-5 left-6 w-14 h-14 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white text-2xl z-10">
                  <i className="fas fa-globe-americas"></i>
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-bold text-[#0a1628] mb-3">Model United Nations (MUN) Training</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Master diplomatic protocols, negotiation tactics, and resolution drafting just like a professional delegate on the international stage.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 delay-100 bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 border border-slate-200">
              <div className="h-52 relative overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop" alt="Academic Writing" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-5 left-6 w-14 h-14 rounded-xl bg-gradient-to-br from-[#11998e] to-[#38ef7d] flex items-center justify-center text-white text-2xl z-10">
                  <i className="fas fa-pen-fancy"></i>
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-bold text-[#0a1628] mb-3">Research & Position Paper Writing</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Build a robust foundation in policy research, country stance alignment, and award-winning position paper writing for major international summits.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 delay-200 bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 border border-slate-200">
              <div className="h-52 relative overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=600&h=400&fit=crop" alt="Public Speaking" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-5 left-6 w-14 h-14 rounded-xl bg-gradient-to-br from-[#fc4a1a] to-[#f7b733] flex items-center justify-center text-white text-2xl z-10">
                  <i className="fas fa-microphone-alt"></i>
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-bold text-[#0a1628] mb-3">Public Speaking & Debate</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Hone your ability to articulate complex ideas clearly, construct logical arguments, and speak with unwavering confidence in any committee session.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/checkout" className="inline-flex items-center gap-2 bg-[#1a6dd4] hover:bg-[#165bb3] text-white px-8 py-3.5 rounded-full text-sm font-bold transition-all shadow-md">
              <i className="fas fa-arrow-right"></i> Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* ================= WHY IT MATTERS SECTION ================= */}
      <section className="py-24 px-6 md:px-10 bg-[#0a1628] text-white relative overflow-hidden">
        {/* Subtle Background Lighting */}
        <div className="absolute w-[500px] h-[500px] bg-[#1a6dd4]/10 rounded-full blur-[100px] -top-20 -left-20 pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            {/* Tag */}
            <div className="text-xs font-bold tracking-[3px] uppercase text-white/50 mb-3">
              WHY IT MATTERS
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
              Why MUN Preparation <span className="text-[#60a5fa]">Matters</span>
            </h2>

            {/* Paragraph 1 */}
            <p className="text-base text-white/80 leading-relaxed mb-4 font-normal">
              Model United Nations is more than attending a conference. Students are expected to research, debate, negotiate, collaborate, and represent their assigned country with confidence.
            </p>

            {/* Paragraph 2 */}
            <p className="text-base text-white/80 leading-relaxed mb-4 font-normal">
              With structured coaching and guidance from experienced MUN coaches, students learn to understand committee procedures, develop strong arguments, communicate diplomatically, and participate effectively throughout the conference.
            </p>

            {/* Paragraph 3 */}
            <p className="text-base text-white/90 leading-relaxed mb-8 font-semibold text-[#60a5fa]">
              The goal is not simply to attend MUN — it is to arrive prepared, confident, and ready to make an impact.
            </p>

            {/* 4 Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {/* Highlight 1 */}
              <div className="flex items-start gap-3.5 bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#00c853] text-lg shrink-0">
                  <i className="fas fa-crown"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Stand Out</h4>
                  <p className="text-xs text-white/60 mt-0.5">From delegate to confident leader</p>
                </div>
              </div>

              {/* Highlight 2 */}
              <div className="flex items-start gap-3.5 bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#00c853] text-lg shrink-0">
                  <i className="fas fa-comments"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Build MUN Skills</h4>
                  <p className="text-xs text-white/60 mt-0.5">Debate, diplomacy & negotiation</p>
                </div>
              </div>

              {/* Highlight 3 */}
              <div className="flex items-start gap-3.5 bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#00c853] text-lg shrink-0">
                  <i className="fas fa-bullhorn"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Speak with Confidence</h4>
                  <p className="text-xs text-white/60 mt-0.5">Communicate ideas effectively</p>
                </div>
              </div>

              {/* Highlight 4 */}
              <div className="flex items-start gap-3.5 bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#00c853] text-lg shrink-0">
                  <i className="fas fa-check-double"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Be Conference-Ready</h4>
                  <p className="text-xs text-white/60 mt-0.5">Prepared for committee sessions</p>
                </div>
              </div>
            </div>

            <Link href="/checkout" className="inline-flex items-center gap-2 bg-[#00c853] hover:bg-[#00a844] text-white px-8 py-3.5 rounded-full text-sm font-bold transition-all shadow-md hover:-translate-y-0.5">
              <i className="fas fa-rocket"></i> Apply Now
            </Link>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=900&fit=crop" 
                alt="Students collaborating during MUN preparation" 
                className="w-full object-cover block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl text-slate-900 border border-slate-100">
              <div className="text-3xl font-black text-[#1a6dd4] leading-none mb-1">100%</div>
              <div className="text-xs font-bold text-slate-700">Conference Preparation</div>
              <div className="text-[11px] text-slate-400">Rules • Debates • Resolutions</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS: HEAR FROM OUR AWARDEES & COACH ================= */}
      <section className="py-24 px-6 md:px-10 bg-[#F8FAFC] border-t border-slate-200/80 relative" id="testimonials">
        <div className="max-w-[1240px] mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-[#12AAF0] font-bold text-[11px] tracking-[3px] uppercase mb-3 bg-white px-4 py-1.5 rounded-full border border-sky/20 shadow-xs">
              EDUGLOBAL MUN COACHING
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1628] tracking-tight mb-4">
              Hear From Our Awardees & Coach
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Real experiences from EduGlobal Academy delegates who turned preparation into achievement, together with insights from the coach who supported their MUN journey.
            </p>
          </div>

          {/* 4-Card Layout for Awardees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {awardees.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 flex flex-col justify-between border border-[#E7EEF7] shadow-[0_8px_24px_rgba(10,22,40,0.04)] hover:shadow-[0_16px_36px_rgba(10,22,40,0.08)] transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  {/* Photo & Award Badge Header */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border-2 border-[#12AAF0]/30 shadow-sm">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-[#0A1628] leading-snug">{item.name}</h4>
                      <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1">
                        <span>🏆</span> {item.award}
                      </div>
                    </div>
                  </div>

                  {/* Conference Tag */}
                  <div className="text-[11px] font-bold text-[#12AAF0] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <i className="fas fa-landmark text-xs"></i>
                    <span>{item.conference}</span>
                  </div>

                  {/* Quote */}
                  <p className="text-xs text-slate-600 leading-relaxed italic font-normal">
                    "{item.quote}"
                  </p>
                </div>

                {/* Rating Stars */}
                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex text-amber-400 text-xs gap-0.5">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">EduGlobal Delegate</span>
                </div>
              </div>
            ))}
          </div>

          {/* Coach Testimonial Feature Card (Larger Horizontal Feature Card Underneath) */}
          <div className="bg-gradient-to-r from-[#0A1628] via-[#112444] to-[#1A3660] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-white/10 relative overflow-hidden">
            {/* Background Decorative Blur */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#12AAF0]/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-center relative z-10">
              
              {/* Coach Avatar & Info */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center gap-4 shrink-0 lg:w-56">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face" 
                    alt="EduGlobal Academy MUN Coach" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/40 to-transparent"></div>
                </div>

                <div>
                  <span className="inline-block bg-[#12AAF0]/20 text-[#60a5fa] border border-[#12AAF0]/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-1.5">
                    Coach Testimonial
                  </span>
                  <h3 className="text-lg font-black text-white">Nicholas Vance</h3>
                  <p className="text-xs text-white/70 font-medium">EduGlobal Academy MUN Coach</p>
                </div>
              </div>

              {/* Coach Quote & Tagline */}
              <div className="border-t sm:border-t-0 lg:border-l lg:border-white/15 pt-6 sm:pt-0 lg:pt-0 lg:pl-8 flex flex-col justify-between">
                <div className="relative mb-6">
                  <span className="text-5xl text-[#12AAF0]/30 font-serif leading-none absolute -top-4 -left-2 select-none">“</span>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal relative z-10 pl-5">
                    Preparing delegates for international MUN conferences is about empowering young voices to command the room with substance, diplomacy, and poise. Our coaching framework doesn’t just teach parliamentary procedure — we train students to think critically under pressure, construct impactful resolutions, and build genuine coalitions with peers from around the world. Seeing our students step onto global stages and consistently achieve recognition is the ultimate testament to the power of structured preparation.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00c853] animate-pulse"></span>
                    <span className="text-xs sm:text-sm font-extrabold text-[#60a5fa] tracking-wide">
                      From preparation to performance. From delegates to awardees.
                    </span>
                  </div>

                  <Link 
                    href="/checkout"
                    className="bg-[#00c853] hover:bg-[#00a844] text-white text-xs font-extrabold px-6 py-3 rounded-full transition-all shadow-md hover:-translate-y-0.5 inline-flex items-center gap-2 shrink-0"
                  >
                    <i className="fas fa-paper-plane"></i> Apply Now
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
