import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="id-home" id="home">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative min-h-[640px] pt-[130px] pb-[80px] overflow-hidden flex flex-col justify-center items-center">
        {/* Full Header Background Image */}
        <Image
          src="/hero_bg.jpg"
          alt="EduGlobal Summit Experience"
          fill
          priority
          className="object-cover object-center z-0 scale-105"
        />

        {/* Gradation Overlays for Optimal Text Contrast */}
        {/* 1. Deep linear dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/92 via-[#0A1628]/78 to-[#0A1628]/95 z-[1]" />
        {/* 2. Soft radial blue glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,170,240,0.22),transparent_75%)] z-[1]" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-[880px] mx-auto text-center px-6 pt-[40px] pb-[30px]">
          <span className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full mb-6 backdrop-blur-md shadow-lg tracking-wide uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-[#12AAF0] animate-pulse"></span>
            #EduGlobalSummitExperience2026
          </span>
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-poppins font-extrabold leading-[1.15] mb-6 tracking-tight drop-shadow-md">
            Step Into a Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7fd8ff] via-white to-[#12AAF0]">Academic Experience</span>
          </h1>
          <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-[620px] mx-auto mb-[38px] font-medium leading-relaxed drop-shadow-sm">
            Experience global conferences, build confidence, and prepare your future on world-class academic stages.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/checkout" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-[15px] font-poppins bg-[#12AAF0] hover:bg-[#0A6FD8] text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(18,170,240,0.45)]"
            >
              Apply Now →
            </Link>
            <Link 
              href="#programs" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-[15px] font-poppins border-2 border-white/70 text-white transition-all duration-300 backdrop-blur-xs hover:bg-white/15 hover:border-white hover:-translate-y-1"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Contact */}
      <Link href="https://wa.me/66946326025" className="fixed right-6 bottom-6 z-50 flex items-center gap-2.5 bg-green text-white px-6 py-3.5 rounded-full font-poppins font-bold text-sm shadow-[0_12px_28px_rgba(32,201,114,0.45)] transition-all hover:scale-105 hover:-translate-y-1">
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span> Contact Us · +66 94 632 6025
      </Link>

      {/* ================= PARTNER BAND ================= */}
      <section className="bg-[#0A1628] py-14 text-center border-t border-b border-white/10" id="about">
        <div className="max-w-[1180px] mx-auto px-8">
          <h3 className="text-sky-light text-[13px] tracking-[0.2em] uppercase font-extrabold mb-6">Global Partner Countries</h3>
          <div className="flex flex-wrap gap-3 justify-center max-w-[960px] mx-auto mb-7">
            {[
              { code: 'bd', name: 'Bangladesh' },
              { code: 'ca', name: 'Canada' },
              { code: 'cn', name: 'China' },
              { code: 'fr', name: 'France' },
              { code: 'hk', name: 'Hong Kong' },
              { code: 'jp', name: 'Japan' },
              { code: 'my', name: 'Malaysia' },
              { code: 'tw', name: 'Taiwan' },
              { code: 'au', name: 'Australia' },
              { code: 'pk', name: 'Pakistan' },
              { code: 'qa', name: 'Qatar' },
              { code: 'kr', name: 'South Korea' },
              { code: 'ph', name: 'Philippines' },
              { code: 'gb', name: 'United Kingdom' },
              { code: 'us', name: 'United States' },
              { code: 'es', name: 'Spain' },
            ].map((country, idx) => (
              <div 
                key={idx} 
                className="bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/40 rounded-full px-4 py-2 flex items-center gap-2.5 text-white transition-all duration-200 shadow-sm hover:scale-105 cursor-default"
              >
                <img
                  src={`https://flagcdn.com/w40/${country.code}.png`}
                  alt={country.name}
                  className="w-5 h-3.5 object-cover rounded-[2px] shadow-xs"
                />
                <span className="font-inter text-xs font-semibold tracking-wide text-white/90">{country.name}</span>
              </div>
            ))}
          </div>
          <p className="text-white/80 text-[15px] max-w-[520px] mx-auto leading-relaxed">
            EduGlobal partners with organizers across <b className="text-white font-bold">16 countries</b> to deliver educational trips and Model United Nations conferences worldwide.
          </p>
        </div>
      </section>

      {/* ================= ABOUT & PROGRAMS ================= */}
      <section className="py-24 max-w-[1180px] mx-auto px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-sky font-bold text-[13px] tracking-widest uppercase mb-3.5">Who we are</span>
          <h2 className="text-3xl md:text-[38px] text-navy font-poppins font-extrabold">About EduGlobal</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-sky-pale border border-[#e2edf8] rounded-[32px] p-8 md:p-10 flex flex-col gap-5 transition-all duration-300 hover:shadow-[0_16px_36px_rgba(11,16,80,0.08)] hover:-translate-y-1">
            <div className="w-full h-[200px] rounded-2xl overflow-hidden relative mb-2 shadow-sm">
              <Image 
                src="https://picsum.photos/seed/eduglobal-team/600/400" 
                alt="Students" 
                fill 
                className="object-cover transition-transform duration-500 hover:scale-105" 
              />
            </div>
            <div className="w-[52px] h-[52px] rounded-2xl bg-navy text-white flex items-center justify-center text-2xl shadow-md">🌐</div>
            <h3 className="text-[22px] font-poppins font-bold text-navy">About EduGlobal</h3>
            <p className="text-muted text-[15px] leading-relaxed">
              EduGlobal Experience is an international education platform connecting students with global academic opportunities through educational trips and international Model United Nations conferences.
            </p>
            <Link href="#about" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-[15px] font-poppins border-2 border-navy text-navy transition-all hover:bg-navy hover:text-white mt-auto self-start">
              Learn More
            </Link>
          </div>
          {/* Card 2 */}
          <div className="bg-navy rounded-[32px] p-8 md:p-10 flex flex-col gap-5 transition-all duration-300 hover:shadow-[0_16px_36px_rgba(11,16,80,0.25)] hover:-translate-y-1">
            <div className="w-full h-[200px] rounded-2xl overflow-hidden relative mb-2 shadow-sm">
              <Image 
                src="https://picsum.photos/seed/eduglobal-programs/600/400" 
                alt="Graduation" 
                fill 
                className="object-cover transition-transform duration-500 hover:scale-105" 
              />
            </div>
            <div className="w-[52px] h-[52px] rounded-2xl bg-sky-light text-navy flex items-center justify-center text-2xl shadow-md">🎓</div>
            <h3 className="text-[22px] font-poppins font-bold text-white">Other Global Programs</h3>
            <p className="text-white/70 text-[15px] leading-relaxed">
              Explore a range of international academic experiences tailored to broaden perspectives and enhance academic profiles.
            </p>
            <Link href="#programs" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-[15px] font-poppins bg-green text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(32,201,114,0.4)] mt-auto self-start">
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SUMMIT FEATURE CARD ================= */}
      <section className="max-w-[1180px] mx-auto px-8 pb-24" id="summit">
        <div className="relative bg-gradient-to-br from-navy via-navy-2 to-navy rounded-[32px] p-8 md:p-14 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="absolute w-[340px] h-[340px] rounded-full bg-sky-light/35 blur-3xl -top-[120px] -right-[80px]"></div>
          <div className="relative z-10 text-white">
            <span className="inline-block bg-white/10 border border-white/30 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4">EduGlobal Summit Experience 2026</span>
            <h2 className="text-3xl md:text-[42px] font-poppins font-extrabold leading-tight mb-4">EduGlobal Summit Experience 2026</h2>
            <p className="text-sky-light font-bold text-base mb-4">Includes participation in Harvard Model United Nations China</p>
            <p className="text-white/80 text-[15px] leading-relaxed mb-6 max-w-[460px]">
              Participate in one of the world's most prestigious academic conferences, designed to challenge and inspire the next generation of global leaders.
            </p>
            <div className="flex gap-3.5 flex-wrap">
              <Link href="/checkout" className="px-8 py-3.5 rounded-full font-bold text-[15px] font-poppins bg-white text-navy transition-all hover:shadow-[0_10px_24px_rgba(0,0,0,0.15)] hover:-translate-y-0.5">Apply Now</Link>
              <Link href="#contact" className="px-8 py-3.5 rounded-full font-bold text-[15px] font-poppins border-2 border-white/70 text-white transition-all hover:bg-white/10 hover:-translate-y-0.5">Contact Us</Link>
            </div>
          </div>
          <div className="relative z-10 flex flex-col gap-5">
            <div className="w-full h-[200px] rounded-2xl overflow-hidden relative border border-white/20 mb-2">
              <Image 
                src="https://picsum.photos/seed/eduglobal-mun/700/400" 
                alt="MUN" 
                fill 
                className="object-cover opacity-90" 
              />
            </div>
            {[
              { title: "Educational Trips & MUN Conferences", desc: "Immersive diplomacy simulations alongside student delegates from around the world." },
              { title: "University Visits & Innovation Exposure", desc: "Step onto leading global campuses and see innovation ecosystems firsthand." },
              { title: "Cultural Exploration", desc: "Discover new cities, traditions, and perspectives beyond the classroom." }
            ].map((item, i) => (
              <div key={i} className="flex gap-3.5 items-start">
                <div className="w-[34px] h-[34px] shrink-0 rounded-full border-2 border-sky-light flex items-center justify-center text-sky-light font-bold">✓</div>
                <div>
                  <h4 className="text-white font-poppins font-bold text-base mb-1">{item.title}</h4>
                  <p className="text-white/70 text-[13.5px] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US 4-CARD ================= */}
      <section className="py-24 max-w-[1180px] mx-auto px-8" id="partnership">
        <div className="flex flex-wrap justify-between items-end gap-6 mb-12">
          <div>
            <span className="inline-block text-sky font-bold text-[13px] tracking-widest uppercase mb-3.5">Our Promise</span>
            <h2 className="text-3xl md:text-[40px] text-navy font-poppins font-extrabold">Why Choose Us or Partnership</h2>
          </div>
          <div className="flex items-center gap-2.5 bg-navy text-white px-2 py-2 pl-4 rounded-full text-[13px] font-bold">
            you get everything 
            <span className="w-[38px] h-[20px] rounded-full bg-green relative">
              <span className="absolute w-[14px] h-[14px] rounded-full bg-white top-[3px] right-[3px]"></span>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: "🌍", title: "Global Academic Resources", desc: "Access to internationally recognized programs and academic platforms." },
            { icon: "🧑🏫", title: "Expert Mentorship", desc: "Guidance from experienced mentors with strong international backgrounds." },
            { icon: "📋", title: "Structured Preparation", desc: "Comprehensive training designed to maximize student performance and outcomes." },
            { icon: "⭐", title: "Proven Outcomes", desc: "Supporting students in building competitive academic profiles for global opportunities." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-[#E7EEF7] rounded-2xl p-7 shadow-[0_10px_30px_rgba(11,16,80,0.05)]">
              <div className="w-14 h-14 rounded-2xl bg-sky-pale flex items-center justify-center text-[26px] mb-5 relative">
                {item.icon}
                <span className="absolute -bottom-1.5 -right-1.5 w-[22px] h-[22px] rounded-full bg-navy text-white flex items-center justify-center text-[11px] font-bold">✓</span>
              </div>
              <h4 className="text-[16.5px] text-navy font-poppins font-bold mb-2">{item.title}</h4>
              <p className="text-[13.5px] text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 bg-sky-pale">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-sky font-bold text-[13px] tracking-widest uppercase mb-3.5">Testimonials</span>
            <h2 className="text-3xl md:text-[36px] text-navy font-poppins font-extrabold mb-3">Real stories. Real growth. Real global exposure.</h2>
            <p className="text-muted max-w-[560px] mx-auto text-[15.5px] leading-relaxed">
              Hear from the students who stepped out of their comfort zones and into the global arena. Discover how EduGlobal Experience has shaped their confidence, perspectives, and future ambitions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                text: "Joining the EduGlobal Summit Experience was such a meaningful experience for me. I improved my public speaking skills during the MUN sessions, met students from different countries, and learned so much from the university and company visits in China. It really helped me become more confident and open-minded.",
                name: "Sarah Kirana", role: "EduGlobal Summit Experience 2025", img: "47"
              },
              { 
                text: "The programme was not only about MUN, but also about leadership, teamwork, and global exposure. My favorite part was interacting with international students and experiencing the academic environment in Shenzhen.",
                name: "Jason W.", role: "EduGlobal Summit Experience 2025", img: "12"
              },
              { 
                text: "My child became much more confident after joining the programme. The combination of Harvard MUN participation, cultural activities, and educational visits made it a very valuable learning experience.",
                name: "Grace Widjaja", role: "Mother of Jason W.", img: "45"
              }
            ].map((testi, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-7 flex flex-col gap-5 shadow-sm">
                <div className="font-poppins text-[40px] text-sky font-extrabold leading-none">“</div>
                <p className="text-[14.5px] text-[#2b2f5c] leading-relaxed flex-grow">{testi.text}</p>
                <div className="flex items-center gap-3 mt-auto pt-2">
                  <div className="w-[42px] h-[42px] shrink-0 rounded-full bg-navy overflow-hidden relative">
                    <Image src={`https://i.pravatar.cc/100?img=${testi.img}`} alt={testi.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-[14px] text-navy">{testi.name}</div>
                    <div className="text-[12px] text-muted">{testi.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BEYOND CLASSROOM (navy 4-pill) ================= */}
      <section className="relative bg-navy py-24 overflow-hidden" id="programs">
        {/* Background Circle */}
        <div className="absolute w-[520px] h-[520px] rounded-full border border-white/10 -top-[200px] -left-[160px]"></div>
        
        <div className="relative z-10 max-w-[1180px] mx-auto px-8 grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
          <div>
            <span className="inline-block text-sky-light font-bold text-[13px] tracking-widest uppercase mb-3.5">The Journey</span>
            <h2 className="text-3xl md:text-[36px] text-white font-poppins font-extrabold mb-4">Beyond the Classroom: The EduGlobal Journey</h2>
            <p className="text-white/70 text-[15px] leading-relaxed max-w-[400px]">
              Every program is meticulously designed to challenge your limits, expand your worldview, and prepare you for a global future. Here is a glimpse into what you will experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
            {[
              { icon: "🤝", label: "Global Diplomacy in Action" },
              { icon: "🏛️", label: "Exclusive Campus Immersion" },
              { icon: "🎭", label: "Authentic Cultural Exploration" },
              { icon: "🌐", label: "Lifelong Global Connections" }
            ].map((pill, idx) => (
              <div key={idx} className="flex items-center gap-3.5 bg-white/5 border border-white/15 rounded-full px-5 py-4">
                <div className="shrink-0 w-11 h-11 rounded-full bg-sky text-white flex items-center justify-center text-lg">{pill.icon}</div>
                <span className="text-white font-bold text-sm leading-snug">{pill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24" id="apply">
        <div className="max-w-[1116px] mx-auto px-8">
          <div className="relative bg-gradient-to-br from-sky to-sky-light rounded-[32px] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute w-[300px] h-[300px] rounded-full bg-white/10 -right-[100px] -bottom-[140px]"></div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-8 relative z-10 w-full">
              <div className="w-[110px] h-[110px] shrink-0 rounded-full border-[4px] border-white overflow-hidden shadow-[0_12px_26px_rgba(11,16,80,0.25)] relative">
                <Image src="https://i.pravatar.cc/220?img=33" alt="Student" fill className="object-cover" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 bg-navy text-white px-4 py-2 pl-3 rounded-full text-xs font-bold mb-4">
                  <span className="w-[22px] h-[22px] rounded-full bg-white text-navy flex items-center justify-center text-[12px]">★</span> 
                  Best Program
                </div>
                <h2 className="text-white text-3xl md:text-[38px] font-poppins font-extrabold leading-tight max-w-[460px]">
                  Take the first step toward your global academic journey.
                </h2>
              </div>
            </div>
            
            <div className="flex gap-3.5 relative z-10 shrink-0 flex-wrap justify-center md:justify-start">
              <Link href="/checkout" className="px-8 py-4 rounded-full font-bold text-[15px] font-poppins bg-navy text-white transition-all hover:shadow-[0_10px_24px_rgba(11,16,80,0.35)] hover:-translate-y-0.5">Apply Now</Link>
              <Link href="#contact" className="px-8 py-4 rounded-full font-bold text-[15px] font-poppins bg-green text-white transition-all hover:shadow-[0_10px_24px_rgba(32,201,114,0.4)] hover:-translate-y-0.5">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-navy-2 pt-16 pb-8 text-white/75" id="contact">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 mb-14">
            <div>
              <div className="flex items-center gap-2.5 font-poppins font-extrabold text-[19px] text-white mb-4">
                <span className="w-[34px] h-[34px] rounded-[10px] bg-sky flex items-center justify-center text-white font-black text-sm">E</span>
                EduGlobal Experience
              </div>
              <p className="max-w-[280px] text-sm leading-relaxed">
                Connecting students with global academic opportunities through educational trips and international Model United Nations conferences.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <h5 className="text-white text-sm font-bold tracking-wide mb-1">Quick Links</h5>
              <Link href="#home" className="text-sm hover:text-white transition-colors">Home</Link>
              <Link href="#about" className="text-sm hover:text-white transition-colors">About</Link>
              <Link href="#contact" className="text-sm hover:text-white transition-colors">Contact</Link>
            </div>
            
            <div className="flex flex-col gap-3">
              <h5 className="text-white text-sm font-bold tracking-wide mb-1">Connect</h5>
              <a href="#" className="text-sm hover:text-white transition-colors">Facebook</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-sm hover:text-white transition-colors">LinkedIn</a>
            </div>
            
            <div className="flex flex-col gap-3">
              <h5 className="text-white text-sm font-bold tracking-wide mb-1">Contact</h5>
              <p className="text-sm">Tel: +66 94 632 6025</p>
              <p className="text-sm">Email: info@eduglobalexperience.com</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-between items-center gap-4 pt-6 border-t border-white/10 text-[13px] text-white/50">
            <span>© 2026 by Edu Global Experience</span>
            <div className="flex gap-3.5">
              <a href="#" className="w-[34px] h-[34px] rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">f</a>
              <a href="#" className="w-[34px] h-[34px] rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">x</a>
              <a href="#" className="w-[34px] h-[34px] rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">in</a>
            </div>
            <span>Proudly designed by Edu Global</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
