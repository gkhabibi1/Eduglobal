import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="id-home font-sans bg-white text-slate-900" id="home">
      {/* Navigation */}
      <Navbar />

      {/* ========================================================================= */}
      {/* HIGHLIGHT 1 — HERO SECTION                                                */}
      {/* ========================================================================= */}
      <section className="relative min-h-[700px] md:min-h-[780px] pt-[150px] pb-[100px] overflow-hidden flex flex-col justify-center items-center">
        {/* Delegation Background Image */}
        <Image
          src="/china_hmun.jpg"
          alt="EduGlobal Academy International Delegation"
          fill
          priority
          className="object-cover object-center z-0 scale-105"
        />

        {/* Gradation Overlays for High Legibility & Brand Prominence */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/95 via-[#0A1628]/85 to-[#0A1628]/95 z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,170,240,0.18),transparent_75%)] z-[1]" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-[940px] mx-auto text-center px-6">
          {/* Prominent Brand Tag */}
          <div className="inline-flex items-center gap-2 bg-[#12AAF0]/15 border border-[#12AAF0]/30 text-white font-extrabold text-xs px-5 py-2 rounded-full mb-6 backdrop-blur-md tracking-[3px] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#12AAF0] animate-pulse"></span>
            EDUGLOBAL ACADEMY
          </div>

          {/* Main Headline */}
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-poppins font-black leading-[1.15] mb-6 tracking-tight drop-shadow-sm">
            Where Young Leaders{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7fd8ff] via-white to-[#12AAF0]">
              Meet the World
            </span>
          </h1>

          {/* Paragraph 1 */}
          <p className="text-white/90 text-base sm:text-lg max-w-[760px] mx-auto mb-4 font-normal leading-relaxed">
            EduGlobal Academy connects ambitious students across Asia with international Model United Nations conferences, academic experiences, and global learning opportunities.
          </p>

          {/* Paragraph 2 */}
          <p className="text-white/80 text-sm sm:text-base max-w-[740px] mx-auto mb-6 font-normal leading-relaxed">
            From preparation to participation, we guide our delegates through MUN coaching, international conferences, educational visits, cultural experiences, and on-site support.
          </p>

          {/* Tagline Pill */}
          <div className="inline-block bg-white/10 border border-white/20 text-white/90 font-medium text-xs sm:text-sm px-5 py-1.5 rounded-full mb-8 backdrop-blur-sm">
            ✨ Education Beyond Borders. Experiences Beyond the Classroom.
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center flex-wrap mb-7">
            <Link 
              href="/experience-2027" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm font-poppins bg-[#12AAF0] hover:bg-[#0A6FD8] text-white transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-[#12AAF0]/25"
            >
              Explore EduGlobal Academy Programs →
            </Link>
            <a 
              href="https://wa.me/66992690860" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm font-poppins border-2 border-white/40 hover:border-white text-white hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
            >
              <i className="fab fa-whatsapp text-emerald-400"></i> Talk to Our Team
            </a>
          </div>

          {/* Under Buttons Tagline */}
          <p className="text-xs font-semibold tracking-wider text-white/60 uppercase">
            Bangkok-Based · Asia-Focused · Globally Connected
          </p>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/66992690860" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Contact on WhatsApp"
        className="fixed right-6 bottom-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
      >
        <i className="fab fa-whatsapp text-2xl"></i>
        <span className="sr-only">Contact on WhatsApp</span>
      </a>

      {/* ========================================================================= */}
      {/* HIGHLIGHT 2 — EDUGLOBAL 2027 PROGRAMS                                    */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 max-w-[1240px] mx-auto px-6 sm:px-8" id="programs">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-[780px] mx-auto">
          <span className="inline-block text-[#12AAF0] font-bold text-xs tracking-[3px] uppercase mb-3 bg-[#12AAF0]/10 px-4 py-1.5 rounded-full border border-[#12AAF0]/20">
            EDUGLOBAL ACADEMY 2027
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-black text-[#0A1628] mb-4 tracking-tight">
            Your Next Global Experience Starts Here
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            Join EduGlobal Academy delegations participating in leading Model United Nations experiences around the world.
          </p>
        </div>

        {/* 3 Program Cards with Brand Priority */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Card 1: Bangkok */}
          <div className="bg-white border border-[#E7EEF7] rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(11,16,80,0.05)] hover:shadow-[0_18px_45px_rgba(11,16,80,0.1)] transition-all duration-300 flex flex-col group hover:-translate-y-1">
            <div className="relative h-[250px] overflow-hidden">
              <Image
                src="/thailand_mun.jpg"
                alt="EduGlobal Summit Experience - Thailand National MUN"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-[#0A1628]/40 to-transparent"></div>
              
              {/* Date & Flag Tag */}
              <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#0A1628] text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-xs">
                <span>🇹🇭</span> Bangkok · 13–19 January 2027
              </span>

              {/* In-Card Title Header */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-extrabold tracking-[2px] text-[#7fd8ff] block mb-1">
                  EDUGLOBAL SUMMIT EXPERIENCE
                </span>
                <h3 className="text-lg font-bold font-poppins leading-snug">
                  Thailand National Model United Nations
                </h3>
              </div>
            </div>

            <div className="p-7 flex flex-col flex-grow justify-between gap-6">
              <div>
                <p className="text-[#12AAF0] font-semibold text-xs mb-3">
                  MUN · Bangkok Learning Journey · International Connections
                </p>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  Experience international diplomacy in Bangkok through structured MUN preparation, committee sessions, cultural exploration, and meaningful connections with students across Asia.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/checkout?event=thai-mun-2027"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0A1628] hover:bg-[#12AAF0] text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                >
                  View Program →
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Boston */}
          <div className="bg-white border border-[#E7EEF7] rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(11,16,80,0.05)] hover:shadow-[0_18px_45px_rgba(11,16,80,0.1)] transition-all duration-300 flex flex-col group hover:-translate-y-1">
            <div className="relative h-[250px] overflow-hidden">
              <Image
                src="/boston_hmun.jpg"
                alt="EduGlobal Summit Experience - HMUN Boston"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-[#0A1628]/40 to-transparent"></div>
              
              {/* Date & Flag Tag */}
              <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#0A1628] text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-xs">
                <span>🇺🇸</span> Boston · 26 January–2 February 2027
              </span>

              {/* In-Card Title Header */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-extrabold tracking-[2px] text-[#7fd8ff] block mb-1">
                  EDUGLOBAL SUMMIT EXPERIENCE
                </span>
                <h3 className="text-lg font-bold font-poppins leading-snug">
                  Harvard Model United Nations Boston
                </h3>
              </div>
            </div>

            <div className="p-7 flex flex-col flex-grow justify-between gap-6">
              <div>
                <p className="text-[#12AAF0] font-semibold text-xs mb-3">
                  MUN · University Exposure · Boston Learning Journey
                </p>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  Participate in the prestigious Harvard Model United Nations and experience an inspiring academic journey featuring MUN preparation, Harvard and MIT visits, and guided delegation support.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/checkout?event=hmun-boston-2027"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0A1628] hover:bg-[#12AAF0] text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                >
                  View Program →
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3: China */}
          <div className="bg-white border border-[#E7EEF7] rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(11,16,80,0.05)] hover:shadow-[0_18px_45px_rgba(11,16,80,0.1)] transition-all duration-300 flex flex-col group hover:-translate-y-1">
            <div className="relative h-[250px] overflow-hidden">
              <Image
                src="/china_hmun.jpg"
                alt="EduGlobal Summit Experience - HMUN China"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-[#0A1628]/40 to-transparent"></div>
              
              {/* Date & Flag Tag */}
              <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#0A1628] text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-xs">
                <span>🇨🇳</span> China · August 2027
              </span>

              {/* In-Card Title Header */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-extrabold tracking-[2px] text-[#7fd8ff] block mb-1">
                  EDUGLOBAL SUMMIT EXPERIENCE
                </span>
                <h3 className="text-lg font-bold font-poppins leading-snug">
                  Harvard Model United Nations China
                </h3>
              </div>
            </div>

            <div className="p-7 flex flex-col flex-grow justify-between gap-6">
              <div>
                <p className="text-[#12AAF0] font-semibold text-xs mb-3">
                  MUN · University & Industry Exposure · Cultural Discovery
                </p>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  Join Harvard Model United Nations China alongside an enriching educational journey featuring academic preparation, university & tech industry exposure, and global networking.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/checkout?event=hmun-china-2027"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0A1628] hover:bg-[#12AAF0] text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                >
                  View Program →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main CTA */}
        <div className="text-center">
          <Link 
            href="/experience-2027" 
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-[#0A1628] hover:text-[#12AAF0] font-bold px-9 py-4 rounded-full text-sm font-poppins transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
          >
            Explore All EduGlobal 2027 Programs →
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* HIGHLIGHT 3 — EVENT TESTIMONIALS                                          */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#F8FAFC] border-t border-b border-slate-200/80" id="stories">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-[780px] mx-auto">
            <span className="inline-block text-[#12AAF0] font-bold text-xs tracking-[3px] uppercase mb-3 bg-white px-4 py-1.5 rounded-full border border-sky/20 shadow-xs">
              THE EDUGLOBAL EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-black text-[#0A1628] mb-4 tracking-tight">
              Their Journey. Their Stories.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Hear from students, parents, and educators who have experienced international programs with EduGlobal Academy.
            </p>
          </div>

          {/* 4 Testimonial Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Card 1: Student Delegate (China) */}
            <div className="bg-white rounded-3xl p-7 flex flex-col justify-between border border-[#E7EEF7] shadow-[0_8px_24px_rgba(10,22,40,0.04)] hover:shadow-[0_16px_36px_rgba(10,22,40,0.08)] transition-all duration-300 group hover:-translate-y-1">
              <div>
                <div className="relative w-full h-[160px] rounded-2xl overflow-hidden mb-5 shadow-xs">
                  <Image 
                    src="/china_hmun.jpg" 
                    alt="HMUN China Delegation" 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 via-transparent to-transparent"></div>
                  <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-[#0A1628] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    HMUN China
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#12AAF0] uppercase tracking-wider">
                    Student Delegate
                  </span>
                  <div className="flex text-amber-400 text-xs">
                    {"★".repeat(5)}
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-medium mb-3">
                  EduGlobal Academy Delegation · HMUN China
                </p>

                <p className="text-[13px] text-slate-700 leading-relaxed font-normal italic">
                  "Participating in HMUN China with EduGlobal gave me the confidence to speak before large international committees. Beyond the debates, visiting innovation hubs and learning alongside peers across Asia opened my mind to global possibilities."
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#12AAF0]/15 text-[#12AAF0] font-bold text-xs flex items-center justify-center shrink-0">
                  SD
                </div>
                <div className="text-xs font-bold text-[#0A1628]">Conference Delegate</div>
              </div>
            </div>

            {/* Card 2: Student Delegate (Boston) */}
            <div className="bg-white rounded-3xl p-7 flex flex-col justify-between border border-[#E7EEF7] shadow-[0_8px_24px_rgba(10,22,40,0.04)] hover:shadow-[0_16px_36px_rgba(10,22,40,0.08)] transition-all duration-300 group hover:-translate-y-1">
              <div>
                <div className="relative w-full h-[160px] rounded-2xl overflow-hidden mb-5 shadow-xs">
                  <Image 
                    src="/boston_hmun.jpg" 
                    alt="HMUN Boston Delegation" 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 via-transparent to-transparent"></div>
                  <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-[#0A1628] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    HMUN Boston
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#12AAF0] uppercase tracking-wider">
                    Student Delegate
                  </span>
                  <div className="flex text-amber-400 text-xs">
                    {"★".repeat(5)}
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-medium mb-3">
                  EduGlobal Academy Delegation · HMUN Boston
                </p>

                <p className="text-[13px] text-slate-700 leading-relaxed font-normal italic">
                  "Representing our delegation at Harvard MUN in Boston was an extraordinary milestone. The pre-conference coaching prepared us thoroughly for committee debates, and the campus visits to Harvard and MIT were deeply inspiring."
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0">
                  SD
                </div>
                <div className="text-xs font-bold text-[#0A1628]">Conference Delegate</div>
              </div>
            </div>

            {/* Card 3: Teacher / School Representative */}
            <div className="bg-white rounded-3xl p-7 flex flex-col justify-between border border-[#E7EEF7] shadow-[0_8px_24px_rgba(10,22,40,0.04)] hover:shadow-[0_16px_36px_rgba(10,22,40,0.08)] transition-all duration-300 group hover:-translate-y-1">
              <div>
                <div className="relative w-full h-[160px] rounded-2xl overflow-hidden mb-5 shadow-xs">
                  <Image 
                    src="/partnership_hero.jpg" 
                    alt="School Partner Delegation" 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 via-transparent to-transparent"></div>
                  <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-[#0A1628] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Partner School
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                    Teacher / Representative
                  </span>
                  <div className="flex text-amber-400 text-xs">
                    {"★".repeat(5)}
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-medium mb-3">
                  EduGlobal Academy Partner School
                </p>

                <p className="text-[13px] text-slate-700 leading-relaxed font-normal italic">
                  "Partnering with EduGlobal Academy gave our students an exceptionally well-organized international pathway. The communication, safeguarding, and mentorship provided before and during the conference exceeded all our expectations."
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0">
                  TR
                </div>
                <div className="text-xs font-bold text-[#0A1628]">Faculty Advisor</div>
              </div>
            </div>

            {/* Card 4: Parent */}
            <div className="bg-white rounded-3xl p-7 flex flex-col justify-between border border-[#E7EEF7] shadow-[0_8px_24px_rgba(10,22,40,0.04)] hover:shadow-[0_16px_36px_rgba(10,22,40,0.08)] transition-all duration-300 group hover:-translate-y-1">
              <div>
                <div className="relative w-full h-[160px] rounded-2xl overflow-hidden mb-5 shadow-xs">
                  <Image 
                    src="/thailand_mun.jpg" 
                    alt="Thai National MUN Delegation" 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 via-transparent to-transparent"></div>
                  <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-[#0A1628] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Family & Delegate
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                    Parent
                  </span>
                  <div className="flex text-amber-400 text-xs">
                    {"★".repeat(5)}
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-medium mb-3">
                  EduGlobal Academy Delegation
                </p>

                <p className="text-[13px] text-slate-700 leading-relaxed font-normal italic">
                  "Sending my child to their first overseas conference felt daunting, but EduGlobal’s dedicated staff, constant updates, and comprehensive support gave our family total peace of mind. The growth in my child's independence is remarkable."
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center justify-center shrink-0">
                  PR
                </div>
                <div className="text-xs font-bold text-[#0A1628]">Accompanying Parent</div>
              </div>
            </div>
          </div>

          {/* CTA Link */}
          <div className="text-center">
            <Link 
              href="/coaching#testimonials"
              className="inline-flex items-center gap-2 text-[#12AAF0] hover:text-[#0A6FD8] font-bold text-sm transition-colors"
            >
              See More EduGlobal Stories →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* HIGHLIGHT 4 — WHY EDUGLOBAL ACADEMY (4 PILLARS & FINAL CTA)               */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 max-w-[1240px] mx-auto px-6 sm:px-8" id="why-eduglobal">
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <span className="inline-block text-[#12AAF0] font-bold text-xs tracking-[3px] uppercase mb-3 bg-[#12AAF0]/10 px-4 py-1.5 rounded-full border border-[#12AAF0]/20">
            WHY EDUGLOBAL ACADEMY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-black text-[#0A1628] mb-4 tracking-tight">
            More Than Attending a Conference
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            At EduGlobal Academy, we believe international education should be more than simply travelling to an event.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Pillar 1: Prepare */}
          <div className="bg-white border border-[#E7EEF7] rounded-3xl p-7 shadow-[0_10px_30px_rgba(11,16,80,0.04)] hover:shadow-[0_16px_36px_rgba(11,16,80,0.08)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center mb-5 text-2xl border border-sky-100 group-hover:scale-110 transition-transform">
                🎓
              </div>
              <h3 className="text-xl text-[#0A1628] font-poppins font-bold mb-2">Prepare</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Structured MUN coaching and academic preparation.
              </p>
            </div>
          </div>

          {/* Pillar 2: Experience */}
          <div className="bg-white border border-[#E7EEF7] rounded-3xl p-7 shadow-[0_10px_30px_rgba(11,16,80,0.04)] hover:shadow-[0_16px_36px_rgba(11,16,80,0.08)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-5 text-2xl border border-emerald-100 group-hover:scale-110 transition-transform">
                🌏
              </div>
              <h3 className="text-xl text-[#0A1628] font-poppins font-bold mb-2">Experience</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                International conferences, universities, industries, and cultures.
              </p>
            </div>
          </div>

          {/* Pillar 3: Connect */}
          <div className="bg-white border border-[#E7EEF7] rounded-3xl p-7 shadow-[0_10px_30px_rgba(11,16,80,0.04)] hover:shadow-[0_16px_36px_rgba(11,16,80,0.08)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-5 text-2xl border border-amber-100 group-hover:scale-110 transition-transform">
                🤝
              </div>
              <h3 className="text-xl text-[#0A1628] font-poppins font-bold mb-2">Connect</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Build meaningful friendships and networks with students from different countries.
              </p>
            </div>
          </div>

          {/* Pillar 4: Grow */}
          <div className="bg-white border border-[#E7EEF7] rounded-3xl p-7 shadow-[0_10px_30px_rgba(11,16,80,0.04)] hover:shadow-[0_16px_36px_rgba(11,16,80,0.08)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-5 text-2xl border border-indigo-100 group-hover:scale-110 transition-transform">
                🚀
              </div>
              <h3 className="text-xl text-[#0A1628] font-poppins font-bold mb-2">Grow</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Return home with greater confidence, independence, leadership skills, and global perspective.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="relative bg-gradient-to-br from-[#0A1628] via-[#0D213A] to-[#12AAF0] rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden shadow-xl border border-white/10">
          <div className="absolute w-[350px] h-[350px] rounded-full bg-[#12AAF0]/20 blur-3xl -right-[80px] -bottom-[80px] pointer-events-none"></div>
          <div className="absolute w-[250px] h-[250px] rounded-full bg-white/5 blur-2xl -left-[60px] -top-[60px] pointer-events-none"></div>
          
          <div className="flex flex-col text-center md:text-left relative z-10 max-w-[620px]">
            <span className="inline-block text-[#7fd8ff] font-bold text-xs tracking-widest uppercase mb-3 bg-white/10 px-4 py-1 rounded-full border border-white/15 self-center md:self-start">
              Start Your Journey
            </span>
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-poppins font-black leading-tight mb-3 tracking-tight">
              Your Global Journey Starts With EduGlobal Academy.
            </h2>
            <p className="text-white/80 text-sm sm:text-base font-normal leading-relaxed">
              Explore delegation openings and coaching programs designed to transform international learning into personal growth.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3.5 relative z-10 shrink-0 w-full sm:w-auto justify-center md:justify-start">
            <Link 
              href="/experience-2027" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-sm font-poppins bg-[#12AAF0] hover:bg-[#0A6FD8] text-white transition-all duration-200 shadow-md hover:-translate-y-0.5 text-center"
            >
              Explore 2027 Programs
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm font-poppins border-2 border-white/40 hover:border-white text-white transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5 text-center"
            >
              Contact EduGlobal Academy
            </Link>
          </div>
        </div>

        {/* Clear Institutional Notice & Disclaimer Callout */}
        <div className="mt-10 max-w-[920px] mx-auto text-center text-xs text-slate-500 bg-slate-50 border border-slate-200/80 rounded-2xl p-5 leading-relaxed">
          <strong className="text-slate-700 font-semibold">Institutional Notice:</strong> EduGlobal Academy operates independently as a delegate preparatory academy and mentor. EduGlobal Academy organizes delegation training, travel, and on-site support for external conferences and is not an organizer, affiliate, or sponsor of Harvard University, Harvard Model United Nations, or other host university institutions.
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
