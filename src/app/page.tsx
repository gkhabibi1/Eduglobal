import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="id-home" id="home">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative min-h-[620px] pt-[140px] pb-[90px] overflow-hidden flex flex-col justify-center items-center">
        {/* Full Header Background Image */}
        <Image
          src="/china_hmun.jpg"
          alt="EduGlobal HMUN China Delegation"
          fill
          priority
          className="object-cover object-center z-0 scale-105"
        />

        {/* Gradation Overlays for Optimal Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/92 via-[#0A1628]/80 to-[#0A1628]/95 z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,170,240,0.18),transparent_75%)] z-[1]" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-[880px] mx-auto text-center px-6 pt-[30px] pb-[30px]">
          <span className="inline-flex items-center gap-2 bg-white/12 border border-white/25 text-white font-semibold text-xs px-5 py-2 rounded-full mb-6 backdrop-blur-md tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#12AAF0]"></span>
            EDUCATION BEYOND BORDERS
          </span>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-poppins font-extrabold leading-[1.2] mb-5 tracking-tight max-w-[780px] mx-auto drop-shadow-sm">
            Where Young Leaders <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7fd8ff] via-white to-[#12AAF0]">Meet the World</span>
          </h1>
          <p className="text-white/85 text-base sm:text-lg max-w-[640px] mx-auto mb-9 font-normal leading-relaxed">
            Global learning programs that turn curiosity into confidence, leadership, and meaningful international connections.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/experience-2027" 
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-[14px] font-poppins bg-[#12AAF0] hover:bg-[#0A6FD8] text-white transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
            >
              Explore 2027 Programs →
            </Link>
            <Link 
              href="/partnership" 
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-[14px] font-poppins border border-white/40 hover:border-white text-white hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button (Clean single button) */}
      <a 
        href="https://wa.me/66992690860" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Contact on WhatsApp"
        className="fixed right-6 bottom-6 z-50 w-13 h-13 md:w-14 md:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
      >
        <i className="fab fa-whatsapp text-2xl"></i>
        <span className="sr-only">Contact on WhatsApp</span>
      </a>

      {/* ================= DESIGNED FOR STUDENTS ACROSS ASIA ================= */}
      <section className="relative bg-[#0A1628] py-20 md:py-24 text-white overflow-hidden border-t border-b border-white/10" id="about">
        {/* Subtle background ambient glow and grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(18,170,240,0.18),transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="relative max-w-[1180px] mx-auto px-6 sm:px-8">
          {/* Section Header */}
          <div className="text-center max-w-[820px] mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md mb-4 shadow-inner">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12AAF0] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#12AAF0]"></span>
              </span>
              <span className="text-white/80 text-[11px] font-semibold tracking-wider uppercase font-poppins">
                Regional Hub & Delegate Network
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-extrabold tracking-tight text-white mb-4">
              Designed for Students Across Asia
            </h2>
            <p className="text-white/80 text-base md:text-lg font-normal leading-relaxed">
              Based in Bangkok and serving students, families, and schools across Thailand, Indonesia, the Philippines, Cambodia, and beyond.
            </p>
          </div>

          {/* Regional Network Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {/* Card 1: Bangkok HQ */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 hover:border-[#12AAF0]/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#12AAF0]/20 flex items-center justify-center text-[#12AAF0] border border-[#12AAF0]/30 group-hover:bg-[#12AAF0] group-hover:text-white transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#12AAF0]/20 text-[#7fd8ff] border border-[#12AAF0]/30">
                  HQ Hub
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-[#7fd8ff] transition-colors">
                Bangkok, Thailand
              </h3>
              <p className="text-xs text-[#12AAF0] font-medium mb-2.5">Regional Operations & Delegation Base</p>
              <p className="text-xs text-white/70 leading-relaxed">
                Central headquarters managing program logistics, in-person training workshops, and comprehensive pre-departure briefings.
              </p>
            </div>

            {/* Card 2: Indonesia */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 hover:border-[#12AAF0]/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/90 border border-white/20 group-hover:bg-[#12AAF0] group-hover:text-white transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-white/80 border border-white/15">
                  Community
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-[#7fd8ff] transition-colors">
                Indonesia
              </h3>
              <p className="text-xs text-[#12AAF0] font-medium mb-2.5">Delegation Network & School Alliances</p>
              <p className="text-xs text-white/70 leading-relaxed">
                Active student cohorts, academic mentoring, and school partnerships across Jakarta, Surabaya, Bali, and nationwide.
              </p>
            </div>

            {/* Card 3: Philippines */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 hover:border-[#12AAF0]/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/90 border border-white/20 group-hover:bg-[#12AAF0] group-hover:text-white transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-white/80 border border-white/15">
                  Delegations
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-[#7fd8ff] transition-colors">
                The Philippines
              </h3>
              <p className="text-xs text-[#12AAF0] font-medium mb-2.5">Diplomacy & Public Speaking Scholars</p>
              <p className="text-xs text-white/70 leading-relaxed">
                Preparing ambitious delegates from top institutions through structured speech coaching, resolution drafting, and MUN simulation.
              </p>
            </div>

            {/* Card 4: Cambodia & Beyond */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 hover:border-[#12AAF0]/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/90 border border-white/20 group-hover:bg-[#12AAF0] group-hover:text-white transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-white/80 border border-white/15">
                  Regional Reach
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-[#7fd8ff] transition-colors">
                Cambodia & Beyond
              </h3>
              <p className="text-xs text-[#12AAF0] font-medium mb-2.5">Southeast & East Asia Access</p>
              <p className="text-xs text-white/70 leading-relaxed">
                Empowering aspiring students across Southeast Asia with equal access to premier global conferences and leadership platforms.
              </p>
            </div>
          </div>

          {/* Value Strip / Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-center">
            <div className="p-3">
              <p className="text-lg font-bold text-white font-poppins">Bangkok</p>
              <p className="text-[12px] text-white/60">Central Regional HQ</p>
            </div>
            <div className="p-3">
              <p className="text-lg font-bold text-[#7fd8ff] font-poppins">Multi-Country</p>
              <p className="text-[12px] text-white/60">Collaborative Cohorts</p>
            </div>
            <div className="p-3">
              <p className="text-lg font-bold text-white font-poppins">Comprehensive</p>
              <p className="text-[12px] text-white/60">Pre-Departure Guidance</p>
            </div>
            <div className="p-3">
              <p className="text-lg font-bold text-[#7fd8ff] font-poppins">Direct Care</p>
              <p className="text-[12px] text-white/60">For Families & Schools</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT EDUGLOBAL ACADEMY ================= */}
      <section className="py-20 md:py-28 max-w-[1180px] mx-auto px-8" id="about-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Delegation Photograph */}
          <div className="relative rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(11,16,80,0.08)] border border-[#E7EEF7] aspect-[4/3] group">
            <Image 
              src="/china_hmun.jpg" 
              alt="EduGlobal Academy HMUN China Delegation" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xs">
              <p className="text-[11px] font-bold text-navy uppercase tracking-wider">EduGlobal Delegation</p>
              <p className="text-sm font-semibold text-slate-700">Harvard Model United Nations China</p>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="flex flex-col items-start gap-5">
            <span className="inline-block text-[#12AAF0] font-bold text-[12px] tracking-widest uppercase bg-sky-pale px-3.5 py-1.5 rounded-full border border-sky/20">
              Who We Are
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-navy font-poppins font-extrabold leading-tight">
              Learning Without Borders
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              EduGlobal Academy designs meaningful international learning programs for young people. We combine Model United Nations, academic preparation, university and industry exposure, cultural discovery, and leadership development in one carefully supported journey.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              Our programs help students become more confident speakers, thoughtful leaders, and globally minded individuals—inside and beyond the conference room.
            </p>
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[14px] font-poppins bg-[#0A1628] hover:bg-[#12AAF0] text-white transition-all duration-200 hover:-translate-y-0.5 shadow-sm mt-2"
            >
              Discover Our Story →
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SUMMIT FEATURE CARDS (2027 EVENTS) ================= */}
      <section className="max-w-[1180px] mx-auto px-8 pb-20 md:pb-28" id="summit">
        <div className="text-center mb-12">
          <span className="inline-block text-[#12AAF0] font-bold text-[12px] tracking-widest uppercase mb-3">Featured Programs</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-navy font-poppins font-extrabold mb-3">Explore Our 2027 Global Programs</h2>
          <p className="text-muted max-w-[660px] mx-auto text-base leading-relaxed font-normal">
            From international Model United Nations conferences to university visits and cultural learning, every program is designed to help students grow with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              id: "hmun-boston-2027",
              flagCode: "us",
              title: "HMUN Boston 2027",
              dates: "January 26–February 2, 2027",
              location: "Boston, United States",
              description: "Participate in Harvard Model United Nations and experience an inspiring academic journey featuring MUN preparation, university exposure, cultural learning, and guided group support.",
              buttonText: "View Boston Program",
              image: "/boston_hmun.jpg",
              applyUrl: "/checkout?event=hmun-boston-2027",
            },
            {
              id: "thai-mun-2027",
              flagCode: "th",
              title: "Thailand National MUN 2027",
              dates: "January 13–19, 2027",
              location: "Bangkok, Thailand",
              description: "Experience international diplomacy in Bangkok through structured MUN preparation, committee sessions, cultural exploration, and meaningful connections with students from different backgrounds.",
              buttonText: "View Bangkok Program",
              image: "/thailand_mun.jpg",
              applyUrl: "/checkout?event=thai-mun-2027",
            },
            {
              id: "hmun-china-2027",
              flagCode: "cn",
              title: "HMUN China 2027",
              dates: "August 2027",
              location: "China",
              description: "Join Harvard Model United Nations China alongside a complete educational journey featuring academic preparation, university and industry exposure, cultural discovery, and international networking.",
              buttonText: "View China Program",
              image: "/china_hmun.jpg",
              applyUrl: "/checkout?event=hmun-china-2027",
            },
          ].map((event, idx) => (
            <div 
              key={idx}
              className="bg-white border border-[#E7EEF7] rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(11,16,80,0.05)] hover:shadow-[0_16px_40px_rgba(11,16,80,0.1)] transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              <div className="relative h-[220px] overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-transparent"></div>
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-navy text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-xs">
                  <img
                    src={`https://flagcdn.com/w40/${event.flagCode}.png`}
                    alt={event.location}
                    className="w-4 h-3 object-cover rounded-[2px]"
                  />
                  {event.location}
                </span>
                <span className="absolute top-4 right-4 bg-sky-pale text-navy border border-sky/30 text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  Registration Opening Soon
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[12px] text-sky-light font-semibold uppercase tracking-wider">{event.dates}</div>
                  <h3 className="text-lg font-bold font-poppins">{event.title}</h3>
                </div>
              </div>

              <div className="p-7 flex flex-col flex-grow justify-between gap-5">
                <div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                  <Link
                    href={event.applyUrl}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0A1628] hover:bg-[#12AAF0] text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
                  >
                    {event.buttonText} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clear Institutional Notice & Disclaimer Callout */}
        <div className="mt-10 max-w-[860px] mx-auto text-center text-xs text-slate-500 bg-slate-50 border border-slate-200/80 rounded-2xl p-5 leading-relaxed">
          <strong className="text-slate-700 font-semibold">Institutional Notice:</strong> EduGlobal Academy operates independently as a delegate preparatory academy and mentor. EduGlobal Academy organizes delegation training, travel, and on-site support for external conferences and is not an organizer, affiliate, or sponsor of Harvard University, Harvard Model United Nations, or other host university institutions.
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/experience-2027" 
            className="inline-flex items-center gap-2 bg-white hover:bg-sky-pale border border-[#E7EEF7] text-navy font-semibold px-8 py-3.5 rounded-full text-sm font-poppins transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
          >
            Explore All 2027 Programs →
          </Link>
        </div>
      </section>

      {/* ================= WHY FAMILIES AND SCHOOLS CHOOSE EDUGLOBAL ================= */}
      <section className="py-20 md:py-28 max-w-[1180px] mx-auto px-8" id="why-us">
        <div className="text-center max-w-[760px] mx-auto mb-14">
          <span className="inline-block text-[#12AAF0] font-bold text-[12px] tracking-widest uppercase mb-3 bg-sky-pale px-3.5 py-1.5 rounded-full border border-sky/20">
            Why EduGlobal Academy
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-navy font-poppins font-extrabold tracking-tight">
            Why Families and Schools Choose EduGlobal
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              svg: (
                <svg className="w-6 h-6 text-[#12AAF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Carefully Guided Journeys", 
              desc: "Support before departure, throughout the program, and until students return home." 
            },
            { 
              svg: (
                <svg className="w-6 h-6 text-[#12AAF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              ),
              title: "Expert MUN Preparation", 
              desc: "Structured coaching in research, diplomacy, public speaking, negotiation, and committee procedures." 
            },
            { 
              svg: (
                <svg className="w-6 h-6 text-[#12AAF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Meaningful Global Exposure", 
              desc: "International conferences combined with university, cultural, and industry learning." 
            },
            { 
              svg: (
                <svg className="w-6 h-6 text-[#12AAF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              title: "Student-Centred Support", 
              desc: "Programs designed around student wellbeing, confidence, inclusion, and personal growth." 
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-[#E7EEF7] rounded-3xl p-7 shadow-[0_10px_30px_rgba(11,16,80,0.04)] hover:shadow-[0_16px_36px_rgba(11,16,80,0.08)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div>
                <div className="w-13 h-13 rounded-2xl bg-sky-pale flex items-center justify-center mb-5 border border-sky/20">
                  {item.svg}
                </div>
                <h4 className="text-[16.5px] text-navy font-poppins font-bold mb-2.5 leading-snug">{item.title}</h4>
                <p className="text-[13.5px] text-slate-600 leading-relaxed font-normal">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= THEIR JOURNEY, IN THEIR OWN WORDS ================= */}
      <section className="py-20 md:py-28 bg-[#F8FAFC] border-t border-b border-slate-200/60" id="testimonials">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-[#12AAF0] font-bold text-[12px] tracking-widest uppercase mb-3 bg-white px-3.5 py-1.5 rounded-full border border-sky/20 shadow-xs">
              Participant Reflections
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-navy font-poppins font-extrabold mb-3 tracking-tight">
              Their Journey, In Their Own Words
            </h2>
            <p className="text-slate-600 max-w-[620px] mx-auto text-base leading-relaxed font-normal">
              Real reflections from students, parents, and educators who have experienced EduGlobal Academy programs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                text: "Participating in HMUN China with EduGlobal gave me the confidence to speak in front of international committees. Beyond diplomacy, visiting innovation hubs and learning alongside peers across Asia opened my mind to global possibilities.",
                name: "Shenzhen Delegation Participant",
                details: "Delegate · Thailand & Indonesia",
                program: "Harvard Model UN China",
                image: "/china_hmun.jpg"
              },
              { 
                text: "Representing our delegation at Harvard MUN in Boston was an extraordinary milestone. The pre-conference coaching prepared us thoroughly for committee debates, and the campus visits to Harvard and MIT were deeply inspiring.",
                name: "Boston Delegation Participant",
                details: "Delegate · Southeast Asian Delegation",
                program: "Harvard Model UN Boston",
                image: "/boston_hmun.jpg"
              },
              { 
                text: "The structured preparation and welcoming mentorship made my first international MUN conference unforgettable. I built lifelong friendships and gained valuable leadership skills in Bangkok.",
                name: "Bangkok Delegation Participant",
                details: "Delegate · International School Community",
                program: "Thai National Model UN",
                image: "/thailand_mun.jpg"
              }
            ].map((testi, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-7 flex flex-col justify-between border border-[#E7EEF7] shadow-[0_10px_30px_rgba(11,16,80,0.04)] hover:shadow-[0_16px_36px_rgba(11,16,80,0.08)] transition-all duration-300 group hover:-translate-y-1">
                <div>
                  <div className="relative w-full h-[190px] rounded-2xl overflow-hidden mb-6 shadow-xs">
                    <Image 
                      src={testi.image} 
                      alt={testi.program} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent"></div>
                    <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-navy text-[11px] font-bold px-3 py-1 rounded-full border border-white/50 shadow-xs">
                      {testi.program}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#12AAF0] uppercase tracking-wider mb-2">Student Reflection</div>
                  <p className="text-[14px] text-slate-700 leading-relaxed mb-6 font-normal">
                    "{testi.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-sky-pale border border-sky/25 flex items-center justify-center text-navy font-bold text-xs shrink-0">
                    EG
                  </div>
                  <div>
                    <div className="font-bold text-[13.5px] text-navy">{testi.name}</div>
                    <div className="text-[12px] text-slate-500 font-normal">{testi.details}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MORE THAN A CONFERENCE ================= */}
      <section className="relative bg-[#0A1628] py-20 md:py-28 overflow-hidden" id="experience">
        {/* Subtle Background Accent */}
        <div className="absolute w-[500px] h-[500px] rounded-full border border-white/5 -top-[200px] -left-[160px]"></div>
        
        <div className="relative z-10 max-w-[1180px] mx-auto px-8 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-14 lg:gap-16 items-center">
          <div>
            <span className="inline-block text-sky-light font-bold text-[12px] tracking-widest uppercase mb-3.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
              The EduGlobal Experience
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-poppins font-extrabold mb-4 tracking-tight">
              More Than a Conference
            </h2>
            <p className="text-white/90 text-base leading-relaxed mb-4 font-normal">
              Every EduGlobal Academy program is designed to help students learn, connect, and grow through four essential experiences.
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Students do more than attend a conference. They develop practical skills, discover new perspectives, explore academic possibilities, and form meaningful international connections.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { 
                svg: (
                  <svg className="w-6 h-6 text-[#12AAF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                ),
                label: "Diplomacy and Leadership" 
              },
              { 
                svg: (
                  <svg className="w-6 h-6 text-[#12AAF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                label: "University and Career Exposure" 
              },
              { 
                svg: (
                  <svg className="w-6 h-6 text-[#12AAF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                label: "Cultural Discovery" 
              },
              { 
                svg: (
                  <svg className="w-6 h-6 text-[#12AAF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                label: "International Friendships" 
              }
            ].map((pill, idx) => (
              <div key={idx} className="flex items-center gap-3.5 bg-white/5 border border-white/10 rounded-2xl p-4.5 hover:bg-white/10 transition-all duration-200">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shadow-xs">{pill.svg}</div>
                <span className="text-white font-semibold text-sm leading-snug">{pill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 md:py-28" id="apply">
        <div className="max-w-[1116px] mx-auto px-8">
          <div className="relative bg-gradient-to-br from-[#0A1628] via-[#0D213A] to-[#12AAF0] rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden shadow-xl border border-white/10">
            {/* Background Accents */}
            <div className="absolute w-[350px] h-[350px] rounded-full bg-[#12AAF0]/20 blur-3xl -right-[80px] -bottom-[80px] pointer-events-none"></div>
            <div className="absolute w-[250px] h-[250px] rounded-full bg-white/5 blur-2xl -left-[60px] -top-[60px] pointer-events-none"></div>
            
            <div className="flex flex-col text-center md:text-left relative z-10 max-w-[600px]">
              <span className="inline-block text-sky-light font-bold text-[11px] tracking-widest uppercase mb-3 bg-white/10 px-3.5 py-1 rounded-full border border-white/15 self-center md:self-start">
                Get Started Today
              </span>
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-poppins font-extrabold leading-tight mb-3.5 tracking-tight">
                Your Global Journey Starts Here
              </h2>
              <p className="text-white/85 text-base font-normal leading-relaxed">
                Explore international learning opportunities designed to build confidence, leadership, and a broader view of the world.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3.5 relative z-10 shrink-0 w-full sm:w-auto justify-center md:justify-start">
              <Link 
                href="/experience-2027" 
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-[14px] font-poppins bg-[#12AAF0] hover:bg-[#0A6FD8] text-white transition-all duration-200 shadow-sm hover:-translate-y-0.5"
              >
                Explore Programs
              </Link>
              <Link 
                href="https://wa.me/66992690860" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-[14px] font-poppins border border-white/40 hover:border-white text-white transition-all duration-200 backdrop-blur-xs hover:bg-white/10 hover:-translate-y-0.5"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </main>
  );
}
