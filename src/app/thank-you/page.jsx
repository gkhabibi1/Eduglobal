"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";

const WHATSAPP_GROUPS = {
  "hmun-boston-2027": {
    eventName: "Harvard Model UN Boston 2027",
    dates: "January 26 – February 2, 2027",
    location: "Boston, Massachusetts, USA",
    flag: "🇺🇸",
    flagCode: "us",
    whatsappLink: "https://chat.whatsapp.com/EduGlobal-HMUN-Boston-2027",
    groupName: "EduGlobal HMUN Boston 2027 Cohort",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  "thai-mun-2027": {
    eventName: "Thai National Model UN 2027",
    dates: "January 13–19, 2027",
    location: "Bangkok, Thailand",
    flag: "🇹🇭",
    flagCode: "th",
    whatsappLink: "https://chat.whatsapp.com/EduGlobal-Thai-MUN-2027",
    groupName: "EduGlobal Thai MUN 2027 Cohort",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  "hmun-china-2027": {
    eventName: "Harvard Model UN China 2027",
    dates: "August 12–18, 2027",
    location: "Shenzhen, China",
    flag: "🇨🇳",
    flagCode: "cn",
    whatsappLink: "https://chat.whatsapp.com/EduGlobal-HMUN-China-2027",
    groupName: "EduGlobal HMUN China 2027 Cohort",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
  },
  "online-coaching": {
    eventName: "EduGlobal Online Coaching & Mentorship",
    dates: "Flexible Cohort 2026/2027",
    location: "Online / Virtual Campus",
    flag: "🎓",
    flagCode: "us",
    whatsappLink: "https://chat.whatsapp.com/EduGlobal-Online-Coaching",
    groupName: "EduGlobal Mentorship Mentees",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
  },
  "default": {
    eventName: "EduGlobal Summit Experience 2027",
    dates: "Official 2027 Schedule",
    location: "International Summit",
    flag: "🌐",
    flagCode: "us",
    whatsappLink: "https://chat.whatsapp.com/EduGlobal-Official-Delegates",
    groupName: "EduGlobal Delegate Community",
    badgeColor: "bg-slate-50 text-slate-700 border-slate-200",
  },
};

function ThankYouContent() {
  const searchParams = useSearchParams();
  const eventParam = searchParams.get("event") || "default";
  const nameParam = searchParams.get("name") || "Participant";
  const emailParam = searchParams.get("email") || "";

  const eventData = WHATSAPP_GROUPS[eventParam] || WHATSAPP_GROUPS["default"];

  return (
    <div className="min-h-screen bg-[#F5F8FC] font-poppins pb-24 text-navy">
      <Navbar />

      {/* FontAwesome CDN Link */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      />

      <main className="max-w-[800px] mx-auto px-6 pt-[130px]">
        {/* Success Card */}
        <div className="bg-white rounded-[32px] p-8 md:p-14 text-center shadow-[0_16px_45px_rgba(11,16,80,0.08)] border border-[#E7EEF7]">
          {/* Animated Success Checkmark Icon */}
          <div className="w-24 h-24 bg-green/10 text-green rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-sm border border-green/20 animate-bounce">
            ✓
          </div>

          <span className="inline-block bg-green/15 text-green font-bold text-xs px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            Application Received
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">
            Thank You, {nameParam}!
          </h1>

          <p className="text-muted leading-relaxed max-w-[560px] mx-auto mb-8 text-sm sm:text-base">
            Your application for <strong>{eventData.eventName}</strong> has been successfully submitted. We have sent a confirmation email to <strong>{emailParam || "your email address"}</strong>.
          </p>

          {/* Event Summary Box */}
          <div className="bg-[#F8FAFC] border border-gray-200/80 rounded-2xl p-6 mb-8 text-left max-w-[600px] mx-auto">
            <div className="text-xs font-extrabold uppercase tracking-wider text-muted mb-3 flex justify-between items-center">
              <span>Selected Event Summary</span>
              <span className={`text-xs px-3 py-1 rounded-full border font-bold ${eventData.badgeColor}`}>
                {eventData.flag} Verified
              </span>
            </div>
            
            <div className="flex flex-col gap-2.5">
              <div className="text-lg font-bold text-navy">{eventData.eventName}</div>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-muted">
                <span className="flex items-center gap-1.5">
                  <i className="far fa-calendar-alt text-sky"></i> {eventData.dates}
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fas fa-map-marker-alt font-red text-red-500"></i> {eventData.location}
                </span>
              </div>
            </div>
          </div>

          {/* ================= WHATSAPP GROUP JOIN BOX ================= */}
          <div className="bg-gradient-to-br from-[#128C7E] to-[#075E54] rounded-3xl p-8 text-white shadow-xl mb-10 text-center relative overflow-hidden">
            <div className="absolute w-40 h-40 bg-white/10 rounded-full -top-10 -right-10 blur-xl pointer-events-none"></div>
            
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 backdrop-blur-sm">
              <i className="fab fa-whatsapp text-white"></i>
            </div>

            <h3 className="text-2xl font-bold mb-2">Join Official Delegate Group</h3>
            <p className="text-white/85 text-sm max-w-[480px] mx-auto leading-relaxed mb-6">
              Please join the official WhatsApp group for <strong>{eventData.groupName}</strong> to receive delegate briefings, schedule updates, and preparation documents.
            </p>

            <a
              href={eventData.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-base px-8 py-4 rounded-full transition-all duration-300 shadow-[0_10px_28px_rgba(37,211,102,0.45)] hover:-translate-y-1 hover:scale-105"
            >
              <i className="fab fa-whatsapp text-2xl"></i>
              Join {eventData.title} Group →
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4 border-t border-gray-100 pt-6">
            <Link
              href="/"
              className="px-7 py-3 rounded-full font-bold text-xs bg-navy text-white hover:bg-sky transition-all hover:-translate-y-0.5"
            >
              Return to Homepage
            </Link>
            <Link
              href="/experience-2027"
              className="px-7 py-3 rounded-full font-bold text-xs border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all hover:-translate-y-0.5"
            >
              Explore Other 2027 Events
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F5F8FC] flex items-center justify-center font-poppins text-navy font-bold">
        Loading Thank You Details...
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
