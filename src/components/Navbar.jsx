"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on pathname change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const isParticipationActive = pathname === "/checkout" || pathname === "/payment";

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b border-slate-200 px-6 md:px-12 h-[82px] flex items-center justify-between shadow-xs">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center gap-2.5 shrink-0 z-10 py-1">
        <img src="/logo.png" alt="EduGlobal Academy" className="h-12 md:h-14 w-auto object-contain" />
      </Link>

      {/* Center: Navigation Links */}
      <ul className="hidden md:flex gap-8 lg:gap-9 list-none items-center justify-center absolute left-1/2 -translate-x-1/2 z-10">
        <li>
          <Link
            href="/"
            className={`text-[14px] font-semibold tracking-wide transition-colors ${
              isActive("/") ? "text-[#12AAF0] font-bold" : "text-slate-700 hover:text-[#12AAF0]"
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/experience-2027"
            className={`text-[14px] font-semibold tracking-wide transition-colors ${
              isActive("/experience-2027") ? "text-[#12AAF0] font-bold" : "text-slate-700 hover:text-[#12AAF0]"
            }`}
          >
            Programs 2027
          </Link>
        </li>
        <li>
          <Link
            href="/coaching"
            className={`text-[14px] font-semibold tracking-wide transition-colors ${
              isActive("/coaching") ? "text-[#12AAF0] font-bold" : "text-slate-700 hover:text-[#12AAF0]"
            }`}
          >
            MUN Coaching
          </Link>
        </li>

        {/* Dropdown: Participation */}
        <li
          ref={dropdownRef}
          className="relative group"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            type="button"
            className={`text-[14px] font-semibold tracking-wide transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer py-2 ${
              isParticipationActive || dropdownOpen
                ? "text-[#12AAF0] font-bold"
                : "text-slate-700 hover:text-[#12AAF0]"
            }`}
            aria-expanded={dropdownOpen}
          >
            Participation
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180 text-[#12AAF0]" : "text-slate-400 group-hover:text-[#12AAF0]"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Desktop Dropdown Box */}
          <div
            className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-60 transition-all duration-200 ${
              dropdownOpen
                ? "opacity-100 visible translate-y-0 pointer-events-auto"
                : "opacity-0 invisible -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-2.5 flex flex-col gap-1.5 backdrop-blur-md">
              <Link
                href="/checkout"
                onClick={() => setDropdownOpen(false)}
                className={`flex flex-col px-3.5 py-2.5 rounded-xl transition-all ${
                  pathname === "/checkout"
                    ? "bg-[#12AAF0]/10 text-[#12AAF0]"
                    : "hover:bg-slate-50 text-slate-800 hover:text-[#12AAF0]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider">Registration</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200/50">Open</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-0.5 font-normal">Apply for 2027 Programs</span>
              </Link>

              <Link
                href="/payment"
                onClick={() => setDropdownOpen(false)}
                className={`flex flex-col px-3.5 py-2.5 rounded-xl transition-all ${
                  pathname === "/payment"
                    ? "bg-[#12AAF0]/10 text-[#12AAF0]"
                    : "hover:bg-slate-50 text-slate-800 hover:text-[#12AAF0]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider">Payment</span>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold border border-amber-200/60">Coming Soon</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-0.5 font-normal">Online fee payment</span>
              </Link>
            </div>
          </div>
        </li>

        <li>
          <Link
            href="/contact"
            className={`text-[14px] font-semibold tracking-wide transition-colors ${
              isActive("/contact") ? "text-[#12AAF0] font-bold" : "text-slate-700 hover:text-[#12AAF0]"
            }`}
          >
            Contact Us
          </Link>
        </li>
      </ul>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-slate-800 p-2 focus:outline-none ml-auto"
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
        <div className="absolute top-[82px] left-0 right-0 bg-white border-b border-slate-200 p-6 flex flex-col gap-3.5 shadow-lg md:hidden z-50">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`text-base font-semibold py-1 transition-colors ${
              isActive("/") ? "text-[#12AAF0] font-bold" : "text-slate-700 hover:text-[#12AAF0]"
            }`}
          >
            Home
          </Link>
          <Link
            href="/experience-2027"
            onClick={() => setMobileMenuOpen(false)}
            className={`text-base font-semibold py-1 transition-colors ${
              isActive("/experience-2027") ? "text-[#12AAF0] font-bold" : "text-slate-700 hover:text-[#12AAF0]"
            }`}
          >
            Programs 2027
          </Link>
          <Link
            href="/coaching"
            onClick={() => setMobileMenuOpen(false)}
            className={`text-base font-semibold py-1 transition-colors ${
              isActive("/coaching") ? "text-[#12AAF0] font-bold" : "text-slate-700 hover:text-[#12AAF0]"
            }`}
          >
            MUN Coaching
          </Link>

          {/* Mobile Participation Accordion */}
          <div className="flex flex-col border-y border-slate-100 py-2.5 my-1">
            <button
              onClick={() => setMobileDropdownOpen((prev) => !prev)}
              type="button"
              className={`flex items-center justify-between text-base font-semibold py-1 transition-colors w-full text-left ${
                isParticipationActive ? "text-[#12AAF0] font-bold" : "text-slate-700 hover:text-[#12AAF0]"
              }`}
            >
              <span>Participation</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileDropdownOpen ? "rotate-180 text-[#12AAF0]" : "text-slate-400"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {mobileDropdownOpen && (
              <div className="flex flex-col gap-2 pl-4 pt-2.5 pb-1">
                <Link
                  href="/checkout"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between text-sm font-semibold py-1.5 transition-colors ${
                    pathname === "/checkout" ? "text-[#12AAF0] font-bold" : "text-slate-600 hover:text-[#12AAF0]"
                  }`}
                >
                  <span>Registration</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200/50">Open</span>
                </Link>
                <Link
                  href="/payment"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between text-sm font-semibold py-1.5 transition-colors ${
                    pathname === "/payment" ? "text-[#12AAF0] font-bold" : "text-slate-600 hover:text-[#12AAF0]"
                  }`}
                >
                  <span>Payment</span>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold border border-amber-200/60">Coming Soon</span>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`text-base font-semibold py-1 transition-colors ${
              isActive("/contact") ? "text-[#12AAF0] font-bold" : "text-slate-700 hover:text-[#12AAF0]"
            }`}
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}
