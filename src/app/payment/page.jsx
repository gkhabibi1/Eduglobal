"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 selection:bg-[#12AAF0] selection:text-white">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 px-6 md:px-12 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#12AAF0]/12 via-[#20C972]/8 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="w-full max-w-xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200/80 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            Payment Portal — Coming Soon
          </div>

          {/* Icon */}
          <div className="w-20 h-20 mx-auto rounded-3xl bg-white border border-slate-200/80 shadow-md flex items-center justify-center text-[#0A1628] mb-6">
            <svg className="w-10 h-10 text-[#12AAF0]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1628] tracking-tight mb-4">
            Online Payment Gateway
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
            Our automated online payment gateway is currently under development. In the meantime, please complete your registration form, and our admissions office will provide official payment details and invoices directly.
          </p>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm mb-8 text-left">
            <h3 className="text-sm font-bold text-[#0A1628] uppercase tracking-wider mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#12AAF0]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Payment & Invoice Instructions:
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-[#12AAF0] font-bold">•</span>
                <span>Program registration fees can be settled via official bank wire transfer or school-sponsored invoice.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#12AAF0] font-bold">•</span>
                <span>Provisional delegate slots are reserved once your registration form is submitted and reviewed.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#12AAF0] font-bold">•</span>
                <span>Official receipts and visa support letters will be issued immediately upon payment verification.</span>
              </li>
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/checkout"
              className="w-full sm:w-auto bg-[#0A1628] hover:bg-[#12AAF0] text-white px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 shadow-sm inline-flex items-center justify-center gap-2"
            >
              Go to Registration Form
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <a
              href="https://wa.me/66992690860"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 shadow-sm inline-flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              Contact Support
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
