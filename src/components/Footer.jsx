import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] pt-16 pb-10 text-white/80 border-t border-white/10" id="contact">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-14">
          {/* Col 1: Brand Info */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <img src="/logo.png" alt="EduGlobal Academy" className="h-14 md:h-16 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-sky-light font-bold text-sm mb-2 tracking-wide">
              Education beyond borders.
            </p>
            <p className="text-white/70 text-sm leading-relaxed max-w-[340px]">
              We create international learning programs that develop confidence, leadership, cultural understanding, and meaningful global connections.
            </p>
          </div>
          
          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <h5 className="text-white text-sm font-bold tracking-wider uppercase mb-1">Quick Links</h5>
            <Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">Home</Link>
            <Link href="/experience-2027" className="text-sm text-white/70 hover:text-white transition-colors">Programs</Link>
            <Link href="/coaching" className="text-sm text-white/70 hover:text-white transition-colors">MUN Coaching</Link>
            <Link href="/partnership" className="text-sm text-white/70 hover:text-white transition-colors">For Schools</Link>
            <Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors">About</Link>
            <a href="https://wa.me/66992690860" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Contact</a>
          </div>
          
          {/* Col 3: Social Accounts */}
          <div className="flex flex-col gap-3">
            <h5 className="text-white text-sm font-bold tracking-wider uppercase mb-1">Social Accounts</h5>
            <a href="https://www.instagram.com/eduglobalmun" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2.5">
              <i className="fab fa-instagram text-sky text-base"></i> @eduglobalmun
            </a>
            <a href="https://www.tiktok.com/@eduglobalmun" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2.5">
              <i className="fab fa-tiktok text-sky text-base"></i> @eduglobalmun
            </a>
            <a href="https://www.facebook.com/eduglobalacademy" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2.5">
              <i className="fab fa-facebook text-sky text-base"></i> EduGlobal Academy
            </a>
          </div>
          
          {/* Col 4: Contact */}
          <div className="flex flex-col gap-3">
            <h5 className="text-white text-sm font-bold tracking-wider uppercase mb-1">Contact</h5>
            <a href="https://wa.me/66992690860" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2.5">
              <i className="fab fa-whatsapp text-emerald-400 text-base"></i> +66 99 269 0860
            </a>
            <a href="mailto:info@eduglobalacademy.com" className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2.5">
              <i className="fas fa-envelope text-sky text-base"></i> info@eduglobalacademy.com
            </a>
          </div>
        </div>
        
        {/* Institutional & Conference Disclaimer */}
        <div className="pt-8 pb-8 border-t border-white/10 text-xs text-white/50 leading-relaxed">
          <p className="max-w-[1020px]">
            <strong className="text-white/75 font-semibold">Institutional Notice & Disclaimer:</strong> EduGlobal Academy is an independent preparatory academy and delegation mentor. We prepare, coach, and accompany student delegations to participate in external international conferences, including the Harvard Model United Nations (HMUN) sessions and Thai National Model United Nations. EduGlobal Academy is not affiliated with, endorsed by, sponsored by, or an organizer of Harvard University, Harvard Model United Nations, or host university committees.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap justify-between items-center gap-4 pt-6 border-t border-white/10 text-xs text-white/50">
          <span>© 2026 EduGlobal Academy. All rights reserved.</span>
          <div className="flex gap-3">
            <a href="https://www.instagram.com/eduglobalmun" target="_blank" rel="noopener noreferrer" title="Instagram" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-sky transition-colors">
              <i className="fab fa-instagram text-xs"></i>
            </a>
            <a href="https://www.tiktok.com/@eduglobalmun" target="_blank" rel="noopener noreferrer" title="TikTok" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-sky transition-colors">
              <i className="fab fa-tiktok text-xs"></i>
            </a>
            <a href="https://www.facebook.com/eduglobalacademy" target="_blank" rel="noopener noreferrer" title="Facebook" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-sky transition-colors">
              <i className="fab fa-facebook-f text-xs"></i>
            </a>
            <a href="https://wa.me/66992690860" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-sky transition-colors">
              <i className="fab fa-whatsapp text-xs"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
