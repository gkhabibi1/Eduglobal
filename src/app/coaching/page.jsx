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

  return (
    <div className="min-h-screen font-sans bg-white text-slate-900 overflow-x-hidden">
      {/* FontAwesome CDN Link import for icons */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      />

      {/* NAVIGATION */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#0a1628] via-[#1e3a5f] to-[#1a6dd4] flex items-center pt-36 pb-20 px-6 md:px-10 overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_20%_50%,_white_1px,_transparent_1px)] bg-[size:60px_60px]"></div>
        <div className="absolute w-[400px] h-[400px] bg-[#3b82f6] -top-24 -right-24 rounded-full blur-[80px] opacity-40"></div>
        <div className="absolute w-[300px] h-[300px] bg-[#00c853] -bottom-12 -left-12 rounded-full blur-[80px] opacity-20"></div>

        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          <div className="lg:col-span-7 text-white">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-xs font-semibold text-white mb-7">
              <i className="fas fa-check-circle text-[#00c853]"></i>
              #EduGlobalOnlineCoaching2026
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-[58px] font-black leading-tight mb-6 tracking-tight">
              Prepare with Confidence,
              <span className="text-[#60a5fa] block mt-1">Succeed with Purpose</span>
            </h1>
            <p className="text-base md:text-lg text-white/85 leading-relaxed mb-10 max-w-xl">
              Great global experiences start with strong, strategic preparation. Our specialized online coaching programs are designed to equip you with the essential skills, knowledge, and mindset needed to thrive and excel in competitive international academic environments.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/checkout" className="bg-[#00c853] hover:bg-[#00a844] text-white px-8 py-4 rounded-full text-sm font-bold transition-all hover:-translate-y-1 shadow-lg shadow-[#00c853]/30 inline-flex items-center gap-2.5">
                <i className="fas fa-rocket"></i> Apply Now
              </Link>
              <a href="#learn" className="bg-transparent hover:bg-white/15 text-white border-2 border-white/40 hover:border-white px-8 py-4 rounded-full text-sm font-bold transition-all inline-flex items-center gap-2.5">
                <i className="fas fa-play-circle"></i> Explore Program
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=1000&fit=crop" 
                alt="Student coaching session"
                className="w-full h-[480px] lg:h-[580px] object-cover block"
              />
            </div>
            
            {/* Floating Card 1 */}
            <div className="hidden sm:flex absolute -bottom-6 -left-8 bg-white rounded-2xl p-5 shadow-2xl items-center gap-4 animate-bounce hover:animation-none">
              <div className="w-[50px] h-[50px] rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white text-xl">
                <i className="fas fa-globe"></i>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0a1628]">MUN Training</h4>
                <p className="text-xs text-slate-500">Expert coaching</p>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div className="hidden sm:flex absolute top-10 -right-6 bg-white rounded-2xl p-5 shadow-2xl items-center gap-4">
              <div className="w-[50px] h-[50px] rounded-xl bg-gradient-to-br from-[#f093fb] to-[#f5576c] flex items-center justify-center text-white text-xl">
                <i className="fas fa-comments"></i>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0a1628]">Live Sessions</h4>
                <div className="text-lg font-extrabold text-[#1a6dd4]">500+</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU WILL LEARN SECTION */}
      <section className="py-24 px-6 md:px-10 bg-gradient-to-b from-slate-100 to-white" id="learn">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center text-xs font-bold tracking-[3px] uppercase text-[#3b82f6] mb-3">Our Programs</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0a1628] mb-4">What You Will Learn</h2>
          <p className="text-base text-slate-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
            We focus on developing the core competencies most valued on the global academic stage:
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
                <h3 className="text-xl font-bold text-[#0a1628] mb-3">Academic Writing Excellence</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Build a robust foundation in essay structuring, research methodologies, and citation standards required by top-tier international universities.</p>
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
                <p className="text-sm text-slate-500 leading-relaxed">Hone your ability to articulate complex ideas clearly, construct logical arguments, and speak with unwavering confidence in any forum or discussion.</p>
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

      {/* WHY IT MATTERS SECTION */}
      <section className="py-24 px-6 md:px-10 bg-[#0a1628] text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs font-bold tracking-[3px] uppercase text-white/50 mb-3">Why It Matters</div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Why This Preparation <span className="text-[#60a5fa]">Matters</span>
            </h2>
            <p className="text-base text-white/75 leading-relaxed mb-6">
              In the global arena, competition is fierce. Many students participate, but only a few truly leave a lasting impact. With the right guidance, structured learning, and proven strategies from experienced coaches, you won't just be another participant — <strong className="text-white">you will stand out as a leader.</strong>
            </p>
            <p className="text-base text-white/75 leading-relaxed mb-8">
              Transform your potential into tangible achievements that open doors to future academic and professional opportunities.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#00c853] text-lg shrink-0">
                  <i className="fas fa-trophy"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Stand Out</h4>
                  <p className="text-xs text-white/60">From participant to leader</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#00c853] text-lg shrink-0">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Grow Skills</h4>
                  <p className="text-xs text-white/60">Real-world competencies</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#00c853] text-lg shrink-0">
                  <i className="fas fa-door-open"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Open Doors</h4>
                  <p className="text-xs text-white/60">Future opportunities</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#00c853] text-lg shrink-0">
                  <i className="fas fa-users"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Expert Coaches</h4>
                  <p className="text-xs text-white/60">Proven strategies</p>
                </div>
              </div>
            </div>

            <Link href="/checkout" className="inline-flex items-center gap-2 bg-[#00c853] hover:bg-[#00a844] text-white px-8 py-3.5 rounded-full text-sm font-bold transition-all shadow-md">
              <i className="fas fa-rocket"></i> Start Your Journey
            </Link>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=900&fit=crop" 
              alt="Students collaborating" 
              className="w-full rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-7 shadow-2xl text-slate-900">
              <div className="text-4xl font-black text-[#1a6dd4] leading-none mb-1">95%</div>
              <div className="text-sm font-semibold text-slate-500">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 md:px-10 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] text-white text-center relative overflow-hidden">
        <div className="max-w-[1000px] mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md px-5 py-2 rounded-full text-xs font-bold mb-6">
            <i className="fas fa-star"></i> Limited Spots Available
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">Ready to Elevate Your Global Potential?</h2>
          <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto mb-10">
            Don't leave your success to chance. Take the first step toward your international academic journey today and build the confidence you need to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/checkout" className="bg-white text-[#0a1628] hover:bg-slate-100 px-8 py-4 rounded-full text-sm font-bold transition-all hover:-translate-y-1 shadow-xl inline-flex items-center gap-2">
              <i className="fas fa-paper-plane"></i> Apply Now & Secure Your Spot
            </Link>
            <Link href="/about" className="border-2 border-white/50 hover:border-white hover:bg-white/10 text-[#0a1628] md:text-white px-8 py-4 rounded-full text-sm font-bold transition-all inline-flex items-center gap-2">
              <i className="fas fa-envelope"></i> Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
