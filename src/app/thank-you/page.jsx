"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";

const WHATSAPP_GROUPS = {
  "hmun-boston-2027": {
    eventName: "EduGlobal Academy — HMUN Boston 2027",
    dates: "January 28–31, 2027",
    location: "Boston, Massachusetts, USA",
    flag: "🇺🇸",
    whatsappLink: "https://chat.whatsapp.com/EduGlobal-HMUN-Boston-2027",
    groupName: "EduGlobal HMUN Boston 2027 Cohort",
    completionMessage: "Thank you for registering for the EduGlobal Academy HMUN Boston 2027 delegation. Our team will review your submission and contact you regarding availability, fees, payment, visa-support documents, and next steps. Your place is confirmed only after written confirmation and payment.",
    followUpItems: [
      "Registration ID & Passport copy",
      "Passport-size Photo & Visa evidence",
      "School enrolment letter",
      "Signed parental consent",
      "Medical authorization & details",
      "Signed Code of Conduct & Insurance",
      "Flight itinerary & Visa support details",
    ],
  },
  "thai-mun-2027": {
    eventName: "Thai National Model UN 2027",
    dates: "January 13–19, 2027",
    location: "Bangkok, Thailand",
    flag: "🇹🇭",
    whatsappLink: "https://chat.whatsapp.com/EduGlobal-Thai-MUN-2027",
    groupName: "EduGlobal Thai MUN 2027 Cohort",
    completionMessage: "Thank you for registering for Thai National MUN 2027 with EduGlobal Academy. Our team will review your submission and contact you about availability, programme options, payment, and required documents. Your place is confirmed only after written confirmation and payment.",
    followUpItems: [
      "Registration ID & Passport/ID copy",
      "Participant Photo",
      "Immigration document if relevant",
      "School-enrolment confirmation",
      "Signed parent consent",
      "Medical authorization",
      "Signed Code of Conduct",
      "Payment proof & Insurance if required",
      "Medical documents where necessary",
    ],
  },
  "hmun-china-2027": {
    eventName: "Harvard Model UN China 2027",
    dates: "August 12–18, 2027",
    location: "Shenzhen, China",
    flag: "🇨🇳",
    whatsappLink: "https://chat.whatsapp.com/EduGlobal-HMUN-China-2027",
    groupName: "EduGlobal HMUN China 2027 Cohort",
    completionMessage: "Thank you for registering for HMUN China 2027 with EduGlobal Academy. Our team will review your submission and contact you regarding availability, fees, payment, visa support, and next steps. Your place is confirmed only after written confirmation and payment.",
    followUpItems: [
      "Registration ID & Passport number/copy",
      "Participant Photo",
      "China visa or visa-status evidence",
      "School-enrolment letter",
      "Signed parental consent",
      "Medical authorization & Code of conduct",
      "Travel insurance & Flight itinerary",
      "Visa-letter details & Required medical documents",
    ],
  },
  "default": {
    eventName: "Harvard Model UN China 2027",
    dates: "August 12–18, 2027",
    location: "Shenzhen, China",
    flag: "🇨🇳",
    whatsappLink: "https://chat.whatsapp.com/EduGlobal-HMUN-China-2027",
    groupName: "EduGlobal HMUN China 2027 Cohort",
    completionMessage: "Thank you for registering for HMUN China 2027 with EduGlobal Academy. Our team will review your submission and contact you regarding availability, fees, payment, visa support, and next steps. Your place is confirmed only after written confirmation and payment.",
    followUpItems: [
      "Registration ID & Passport number/copy",
      "Participant Photo",
      "China visa or visa-status evidence",
      "School-enrolment letter",
      "Signed parental consent",
      "Medical authorization & Code of conduct",
      "Travel insurance & Flight itinerary",
      "Visa-letter details & Required medical documents",
    ],
  },
};

function ThankYouContent() {
  const searchParams = useSearchParams();
  const eventParam = searchParams.get("event") || "hmun-china-2027";
  const nameParam = searchParams.get("name") || "Participant";
  const emailParam = searchParams.get("email") || "";

  const eventData = WHATSAPP_GROUPS[eventParam] || WHATSAPP_GROUPS["hmun-china-2027"];

  return (
    <div className="min-h-screen bg-[#F5F8FC] font-poppins pb-24 text-navy">
      <Navbar />

      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      />

      <main className="max-w-[860px] mx-auto px-6 pt-[130px]">
        {/* Success Card */}
        <div className="bg-white rounded-[32px] p-8 md:p-14 text-center shadow-[0_16px_45px_rgba(11,16,80,0.08)] border border-[#E7EEF7]">
          
          {/* Animated Success Checkmark Icon */}
          <div className="w-24 h-24 bg-green/10 text-green rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-sm border border-green/20">
            ✓
          </div>

          <span className="inline-block bg-green/15 text-green font-bold text-xs px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            Registration Submitted
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">
            Thank You, {nameParam}!
          </h1>

          {/* Completion Message */}
          <div className="bg-sky-pale/40 border border-sky/20 rounded-2xl p-6 text-left max-w-[700px] mx-auto mb-8 space-y-3">
            <p className="text-navy font-medium text-sm sm:text-base leading-relaxed">
              {eventData.completionMessage}
            </p>
            {emailParam && (
              <p className="text-xs text-muted">
                📧 Confirmation details sent to: <strong>{emailParam}</strong>
              </p>
            )}
          </div>

          {/* Secure Follow-Up Form Info Box */}
          <div className="bg-[#F8FAFC] border border-gray-200/80 rounded-2xl p-6 mb-8 text-left max-w-[700px] mx-auto">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-navy mb-3">
              <span className="w-2 h-2 rounded-full bg-sky"></span>
              <span>Next Steps: Secure Follow-Up Form (After Provisional Acceptance)</span>
            </div>
            
            <p className="text-xs text-muted leading-relaxed mb-3">
              Collect after provisional acceptance:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-navy/80 font-medium">
              {eventData.followUpItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">✓ {item}</li>
              ))}
            </ul>
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
              Join Official Group →
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
