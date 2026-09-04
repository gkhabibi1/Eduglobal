"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Experience2027Page() {
  const events = [
    {
      id: "hmun-boston-2027",
      flagCode: "us",
      title: "HMUN Boston 2027",
      dates: "January 26–February 2, 2027",
      location: "Boston, United States",
      image: "/boston_hmun.jpg",
      status: "Registration Opening Soon",
      description: "Participate in Harvard Model United Nations and experience an inspiring academic journey featuring MUN preparation, university exposure, cultural learning, and guided group support.",
      buttonText: "View Boston Program",
      highlights: [
        "Participation in Harvard Model United Nations Boston",
        "Academic enrichment and university exploration in the Boston area",
        "Diplomacy & resolution drafting workshops",
        "Global leadership networking sessions",
      ],
      applyUrl: "/checkout?event=hmun-boston-2027",
    },
    {
      id: "thai-mun-2027",
      flagCode: "th",
      title: "Thailand National MUN 2027",
      dates: "January 13–19, 2027",
      location: "Bangkok, Thailand",
      image: "/thailand_mun.jpg",
      status: "Registration Opening Soon",
      description: "Experience international diplomacy in Bangkok through structured MUN preparation, committee sessions, cultural exploration, and meaningful connections with students from different backgrounds.",
      buttonText: "View Bangkok Program",
      highlights: [
        "Participation in Thai National Model United Nations",
        "International delegate networking across 20+ countries",
        "Cultural discovery and Bangkok landmark exploration",
        "Interactive diplomacy & public speaking training",
      ],
      applyUrl: "/checkout?event=thai-mun-2027",
    },
    {
      id: "hmun-china-2027",
      flagCode: "cn",
      title: "HMUN China 2027",
      dates: "August 2027",
      location: "China",
      image: "/china_hmun.jpg",
      status: "Registration Opening Soon",
      description: "Join Harvard Model United Nations China alongside a complete educational journey featuring academic preparation, university and industry exposure, cultural discovery, and international networking.",
      buttonText: "View China Program",
      highlights: [
        "Participation in Harvard Model United Nations China",
        "Futuristic tech ecosystem & innovation hub visits in Shenzhen",
        "Multicultural committee simulations",
        "Leadership certification & delegate recognition",
      ],
      applyUrl: "/checkout?event=hmun-china-2027",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F5F8FC] font-poppins pb-24 text-navy">
      <Navbar />

      {/* ================= HERO HEADER ================= */}
      <section className="relative min-h-[440px] pt-[140px] pb-[80px] bg-navy overflow-hidden flex flex-col justify-center items-center text-center px-6">
        <Image
          src="/china_hmun.jpg"
          alt="EduGlobal Programs 2027 Header"
          fill
          priority
          className="object-cover object-center z-0 opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/95 via-[#0A1628]/85 to-[#0A1628]/98 z-[1]" />
        
        <div className="relative z-10 max-w-[840px] mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-sky-light font-semibold text-xs px-5 py-2 rounded-full mb-6 backdrop-blur-md tracking-wider uppercase">
            2027 Global Programs
          </span>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-5 tracking-tight">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-light via-white to-sky">2027 Global Programs</span>
          </h1>
          <p className="text-white/85 text-base sm:text-lg max-w-[660px] mx-auto font-normal leading-relaxed">
            From international Model United Nations conferences to university visits and cultural learning, every program is designed to help students grow with confidence.
          </p>
        </div>
      </section>

      {/* ================= EVENT LIST SECTION ================= */}
      <section className="max-w-[1180px] mx-auto px-6 pt-16">
        <div className="text-center mb-16">
          <span className="inline-block text-[#12AAF0] font-bold text-xs tracking-widest uppercase mb-3">Official Schedule</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-navy font-extrabold mb-3">2027 Global Program Calendar</h2>
          <p className="text-muted text-base max-w-[600px] mx-auto font-normal">
            From international MUN conferences to campus visits and cultural discovery, choose your 2027 journey.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-[#E7EEF7] rounded-3xl overflow-hidden shadow-[0_12px_36px_rgba(11,16,80,0.05)] hover:shadow-[0_20px_45px_rgba(11,16,80,0.1)] transition-all duration-300 grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] group"
            >
              {/* Event Image Container */}
              <div className="relative min-h-[300px] lg:min-h-[400px] overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-transparent"></div>
                
                {/* Status & Flag Badges */}
                <div className="absolute top-6 left-6 flex items-center gap-3 z-10 flex-wrap">
                  <span className="bg-white/95 backdrop-blur-md text-navy text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-xs">
                    <img
                      src={`https://flagcdn.com/w40/${event.flagCode}.png`}
                      alt={event.location}
                      className="w-4 h-3 object-cover rounded-[2px]"
                    />
                    {event.location}
                  </span>
                  <span className="bg-sky-pale text-navy border border-sky/30 text-xs font-bold px-4 py-2 rounded-full shadow-xs">
                    {event.status}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                  <span className="text-sky-light text-xs font-bold uppercase tracking-widest block mb-1">
                    {event.dates}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                    {event.title}
                  </h3>
                </div>
              </div>

              {/* Event Information & Details */}
              <div className="p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b border-gray-100">
                    <div>
                      <div className="text-[#12AAF0] font-bold text-xs uppercase tracking-wider mb-1">
                        {event.location}
                      </div>
                      <h3 className="text-2xl font-bold text-navy">{event.title}</h3>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                    {event.description}
                  </p>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-3">Program Highlights:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                    {event.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs font-medium text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-[#12AAF0]/15 text-[#12AAF0] font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                  <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#12AAF0]"></span> 2027 Cohort Pre-Registration
                  </div>
                  <Link
                    href={event.applyUrl}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider font-poppins bg-[#0A1628] text-white hover:bg-[#12AAF0] transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                  >
                    {event.buttonText} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clear Institutional Notice & Disclaimer */}
        <div className="mt-12 max-w-[860px] mx-auto text-center text-xs text-slate-500 bg-white border border-[#E7EEF7] rounded-2xl p-5 shadow-xs leading-relaxed">
          <strong className="text-slate-700 font-semibold">Institutional Notice & Disclaimer:</strong> EduGlobal Academy is an independent preparatory entity organizing delegation preparation and travel mentorship. EduGlobal Academy is not affiliated with, endorsed by, or an organizer of Harvard University, Harvard Model United Nations, or other host university institutions.
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
