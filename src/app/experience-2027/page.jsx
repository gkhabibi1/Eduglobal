"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Experience2027Page() {
  const events = [
    {
      id: "hmun-boston-2027",
      flag: "🇺🇸",
      flagCode: "us",
      title: "EduGlobal Summit Experience 2027",
      subtitle: "Participating in Harvard Model United Nations Boston",
      dates: "January 26 – February 2, 2027",
      location: "Boston, Massachusetts, USA",
      image: "/boston_hmun.jpg",
      price: "Tentative",
      status: "Registration Open",
      highlights: [
        "Participation in Harvard Model United Nations Boston",
        "Exclusive Ivy League campus immersion at Harvard & MIT",
        "Diplomacy & resolution drafting workshops",
        "Global leadership networking gala",
      ],
      applyUrl: "/checkout?event=hmun-boston-2027",
    },
    {
      id: "thai-mun-2027",
      flag: "🇹🇭",
      flagCode: "th",
      title: "EduGlobal Summit Experience 2027",
      subtitle: "Participating in Thai National Model United Nations",
      dates: "January 13–19, 2027",
      location: "Bangkok, Thailand",
      image: "/thailand_mun.jpg",
      price: "Tentative",
      status: "Registration Open",
      highlights: [
        "Participation in Thai National Model United Nations",
        "International delegate networking across 20+ countries",
        "Cultural immersion & Bangkok landmark tours",
        "Interactive diplomacy & public speaking training",
      ],
      applyUrl: "/checkout?event=thai-mun-2027",
    },
    {
      id: "hmun-china-2027",
      flag: "🇨🇳",
      flagCode: "cn",
      title: "EduGlobal Summit Experience 2027",
      subtitle: "Participating in Harvard Model United Nations China",
      dates: "August 12–18, 2027",
      location: "Shenzhen, China",
      image: "/china_hmun.jpg",
      price: "Tentative",
      status: "Registration Open",
      highlights: [
        "Participation in Harvard Model United Nations China",
        "Futuristic tech ecosystem & innovation lab visits in Shenzhen",
        "Multicultural committee simulations",
        "Leadership certification & delegate awards",
      ],
      applyUrl: "/checkout?event=hmun-china-2027",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F5F8FC] font-poppins pb-24 text-navy">
      <Navbar />

      {/* ================= HERO HEADER ================= */}
      <section className="relative min-h-[440px] pt-[130px] pb-[70px] bg-navy overflow-hidden flex flex-col justify-center items-center text-center px-6">
        <Image
          src="/hero_bg.jpg"
          alt="EduGlobal Summit Experience 2027 Header"
          fill
          priority
          className="object-cover object-center z-0 opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/95 via-[#0A1628]/85 to-[#0A1628]/98 z-[1]" />
        
        <div className="relative z-10 max-w-[840px] mx-auto">
          <span className="inline-flex items-center gap-2 bg-sky/20 border border-sky/40 text-sky-light font-bold text-xs sm:text-sm px-6 py-2 rounded-full mb-6 backdrop-blur-md tracking-wider uppercase">
            🌟 Upcoming International Conferences
          </span>
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-5 tracking-tight">
            EduGlobal Summit <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-light via-white to-sky">Experience 2027</span>
          </h1>
          <p className="text-white/85 text-base sm:text-lg max-w-[620px] mx-auto font-normal leading-relaxed">
            Step onto world-class academic stages, represent global delegations, and build competitive international credentials across North America and Asia.
          </p>
        </div>
      </section>

      {/* ================= EVENT LIST SECTION ================= */}
      <section className="max-w-[1180px] mx-auto px-6 pt-16">
        <div className="text-center mb-16">
          <span className="inline-block text-sky font-bold text-xs tracking-widest uppercase mb-3">Official Schedule</span>
          <h2 className="text-3xl md:text-4xl text-navy font-extrabold mb-3">2027 Global Event Calendar</h2>
          <p className="text-muted text-base max-w-[540px] mx-auto">
            Choose your preferred summit conference and secure your spot today.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-[#E7EEF7] rounded-[28px] overflow-hidden shadow-[0_12px_36px_rgba(11,16,80,0.06)] hover:shadow-[0_20px_45px_rgba(11,16,80,0.12)] transition-all duration-300 grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] group"
            >
              {/* Event Image Container */}
              <div className="relative min-h-[300px] lg:min-h-[420px] overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent"></div>
                
                {/* Status & Flag Badges */}
                <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
                  <span className="bg-white/90 backdrop-blur-md text-navy text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
                    <img
                      src={`https://flagcdn.com/w40/${event.flagCode}.png`}
                      alt={event.location}
                      className="w-4 h-3 object-cover rounded-[2px]"
                    />
                    {event.location.split(',').pop()?.trim()}
                  </span>
                  <span className="bg-green text-white text-xs font-bold px-4 py-2 rounded-full shadow-md">
                    {event.status}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                  <span className="text-sky-light text-xs font-bold uppercase tracking-widest block mb-1">
                    📅 {event.dates}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                    {event.subtitle}
                  </h3>
                </div>
              </div>

              {/* Event Information & Details */}
              <div className="p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-2 text-sky font-bold text-xs uppercase tracking-wider mb-1">
                        <span>{event.flag}</span> {event.title}
                      </div>
                      <h3 className="text-2xl font-bold text-navy">{event.subtitle}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted font-medium uppercase tracking-wider">Package Fee</div>
                      <div className="text-xl font-extrabold text-navy bg-sky-pale px-4 py-1.5 rounded-xl border border-sky/20 inline-block mt-1">
                        {event.price}
                      </div>
                    </div>
                  </div>

                  <p className="text-muted text-sm leading-relaxed mb-6">
                    Join outstanding delegates for an intensive international experience combining diplomatic simulations, academic enrichment, and global networking.
                  </p>

                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-navy mb-3">Program Highlights:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                    {event.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs font-medium text-navy/80">
                        <span className="w-4 h-4 rounded-full bg-green/15 text-green font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                  <div className="text-xs text-muted flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green"></span> Seats available for 2027 cohort
                  </div>
                  <Link
                    href={event.applyUrl}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm font-poppins bg-navy text-white hover:bg-sky transition-all duration-300 hover:shadow-[0_10px_24px_rgba(18,170,240,0.35)] hover:-translate-y-0.5"
                  >
                    Apply For Event →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
