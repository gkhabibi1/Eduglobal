"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Programs 2027", href: "/experience-2027" },
    { name: "MUN Coaching", href: "/coaching" },
    { name: "For Schools", href: "/partnership" },
    { name: "About", href: "/about" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b border-slate-200 px-6 md:px-12 h-[82px] flex items-center justify-between shadow-xs">
      {/* Left: Logo (Considerably Larger) */}
      <Link href="/" className="flex items-center gap-2.5 shrink-0 z-10 py-1">
        <img src="/logo.png" alt="EduGlobal Academy" className="h-12 md:h-14 w-auto object-contain" />
      </Link>

      {/* Center: Navigation Links */}
      <ul className="hidden md:flex gap-9 list-none items-center justify-center absolute left-1/2 -translate-x-1/2 z-10">
        {navLinks.map((link) => {
          const active = isActive(link.href);
          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`text-[14px] font-semibold tracking-wide transition-colors ${
                  active
                    ? "text-[#12AAF0] font-bold"
                    : "text-slate-700 hover:text-[#12AAF0]"
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Right: Explore Programs CTA */}
      <div className="hidden md:flex items-center gap-4 shrink-0 z-10">
        <Link
          href="/checkout"
          className="bg-[#0A1628] hover:bg-[#12AAF0] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
        >
          Explore Programs
        </Link>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-slate-800 p-2 focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[82px] left-0 right-0 bg-white border-b border-slate-200 p-6 flex flex-col gap-4 shadow-lg md:hidden z-50">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold py-1 transition-colors ${
                  active ? "text-[#12AAF0] font-bold" : "text-slate-700 hover:text-[#12AAF0]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/checkout"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-[#0A1628] text-white text-center px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#12AAF0] transition-all mt-2"
          >
            Explore Programs
          </Link>
        </div>
      )}
    </nav>
  );
}
