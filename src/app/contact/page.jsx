"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const email = "info@eduglobalacademy.com";
  const phoneNumber = "+66 99 269 0860";
  const whatsappNumber = "+66 99 269 0860";
  const whatsappUrl = "https://wa.me/66992690860";

  const officeAddress = {
    title: "EduGlobal Academy — Indonesia Office",
    building: "Infiniti Office, Bellezza BSA",
    floorUnit: "1st Floor, Unit 106",
    street: "Jl. Letjen Soepeno, Permata Hijau",
    districtCity: "Kebayoran Lama, Jakarta Selatan",
    countryPostal: "Indonesia 12210",
  };

  const fullAddressText = `${officeAddress.title}
${officeAddress.building}
${officeAddress.floorUnit}
${officeAddress.street}
${officeAddress.districtCity}
${officeAddress.countryPostal}`;

  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Infiniti+Office+The+Bellezza+BSA+Jl+Letjen+Soepeno+Permata+Hijau+Jakarta+Selatan";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddressText);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const socialLinks = [
    {
      name: "Instagram",
      handle: "@eduglobalmun",
      url: "https://www.instagram.com/eduglobalmun",
      color: "from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      handle: "@eduglobalmun",
      url: "https://www.tiktok.com/@eduglobalmun",
      color: "from-[#000000] to-[#25F4EE]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.72 1.13-.07 2.17-.74 2.67-1.75.22-.44.32-.93.33-1.42.02-4.74.01-9.48.01-14.22h.2z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      handle: "EduGlobal Academy",
      url: "https://www.facebook.com/eduglobalacademy",
      color: "from-[#1877F2] to-[#0D65D9]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 selection:bg-[#12AAF0] selection:text-white">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pt-32 pb-20 px-6 md:px-12 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#12AAF0]/12 via-[#20C972]/8 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="w-full max-w-2xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-[#12AAF0]/10 text-[#12AAF0] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-[#12AAF0]/20">
            <span className="w-2 h-2 rounded-full bg-[#12AAF0] animate-pulse"></span>
            Direct Support & Inquiries
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1628] tracking-tight mb-3">
            Contact Us
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Have questions about our global programs, MUN coaching, or school partnerships? Reach out to us through any of the channels below.
          </p>
        </div>

        {/* Contact Cards Container */}
        <div className="w-full max-w-xl flex flex-col gap-6">

          {/* 1. OFFICE ADDRESS CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl border border-sky-100 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#12AAF0]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            
            <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#12AAF0] text-white flex items-center justify-center shadow-md shadow-[#12AAF0]/25 shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold text-[#0A1628]">Office Address</h2>
                    <span className="bg-sky-100 text-[#0983bd] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Indonesia Office
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-[#0A1628] mb-1">
                    {officeAddress.title}
                  </h3>
                  <div className="text-sm text-slate-600 leading-relaxed font-normal">
                    <p>{officeAddress.building}</p>
                    <p>{officeAddress.floorUnit}</p>
                    <p>{officeAddress.street}</p>
                    <p>{officeAddress.districtCity}</p>
                    <p className="font-semibold text-slate-700">{officeAddress.countryPostal}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10 pt-2 border-t border-slate-100">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0A1628] hover:bg-[#12AAF0] text-white py-3 px-5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open in Maps
              </a>

              <button
                onClick={handleCopyAddress}
                type="button"
                className={`py-3 px-5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border transition-all duration-200 ${
                  copiedAddress
                    ? "bg-sky-50 border-sky-400 text-sky-700"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                }`}
              >
                {copiedAddress ? (
                  <>
                    <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Address Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Address
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 2. PHONE & WHATSAPP PRIMARY CONTACT */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl border border-emerald-100 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            
            <div className="flex items-start justify-between gap-4 mb-5 relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/25 shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.028.572 1.913.883 3.137.883 3.182 0 5.768-2.587 5.768-5.766.001-3.18-2.585-5.766-5.769-5.766zm9.969 5.766c0 5.514-4.486 10-10 10-1.802 0-3.488-.479-4.947-1.312l-5.053 1.374 1.398-4.935c-.933-1.508-1.468-3.281-1.468-5.127 0-5.514 4.486-10 10-10s10 4.486 10 10zm-5.411 3.864c-.212-.107-1.253-.618-1.447-.689-.195-.071-.337-.107-.479.107-.142.213-.55 0.689-.674.832-.124.142-.248.16-.46.053-.213-.107-.899-.331-1.713-1.056-.633-.564-1.061-1.261-1.185-1.474-.124-.213-.013-.328.093-.434.096-.096.213-.249.32-.373.107-.125.142-.213.213-.356.071-.142.036-.267-.018-.374-.053-.106-.479-1.155-.657-1.581-.173-.415-.349-.359-.479-.365-.124-.006-.266-.007-.408-.007s-.373.053-.568.267c-.195.213-.746.729-.746 1.777s.764 2.062.87 2.204c.107.142 1.505 2.298 3.647 3.223.51.22 0.908.351 1.218.45.512.162.978.139 1.346.084.41-.061 1.253-.513 1.43-1.008.177-.496.177-.922.124-1.008-.053-.087-.195-.141-.408-.248z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-[#0A1628]">Phone & WhatsApp Hotline</h2>
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Fastest Reply
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">{phoneNumber}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-emerald-500/20 active:translate-y-0"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                Chat via WhatsApp
              </a>

              <a
                href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 border border-slate-200"
              >
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Phone
              </a>
            </div>
          </div>

          {/* 3. EMAIL CONTACT */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl border border-slate-200/80 transition-all duration-300 relative overflow-hidden group">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#0A1628] text-white flex items-center justify-center shadow-md shadow-slate-900/10 shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0A1628]">Official Email</h2>
                  <p className="text-sm text-slate-500 font-medium break-all">{email}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`mailto:${email}`}
                className="bg-[#0A1628] hover:bg-[#12AAF0] text-white py-3 px-5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Email
              </a>

              <button
                onClick={handleCopyEmail}
                type="button"
                className={`py-3 px-5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border transition-all duration-200 ${
                  copiedEmail
                    ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                }`}
              >
                {copiedEmail ? (
                  <>
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Email Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Email
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 4. SOCIAL MEDIA ACCOUNTS */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl border border-slate-200/80 transition-all duration-300">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-[#0A1628] mb-1">Social Media</h2>
              <p className="text-sm text-slate-500">
                Follow our official channels for program updates, highlights, and announcements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center p-4 rounded-2xl bg-slate-50 hover:bg-[#12AAF0]/10 border border-slate-100 hover:border-[#12AAF0]/30 transition-all duration-200 group/social hover:-translate-y-1"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${social.color} text-white flex items-center justify-center mb-2.5 shadow-sm group-hover/social:scale-110 transition-transform`}>
                    {social.icon}
                  </div>
                  <span className="text-sm font-bold text-[#0A1628]">{social.name}</span>
                  <span className="text-xs text-slate-500 group-hover/social:text-[#12AAF0] transition-colors mt-0.5">
                    {social.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
