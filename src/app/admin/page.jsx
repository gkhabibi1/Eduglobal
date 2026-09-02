"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedStatus, setCopiedStatus] = useState(false);

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/admin/login");
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error("Gagal mengambil data:", error.message);
      alert("Terjadi kesalahan saat memuat data.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        app.full_name?.toLowerCase().includes(q) ||
        app.email?.toLowerCase().includes(q) ||
        app.phone?.toLowerCase().includes(q) ||
        app.school?.toLowerCase().includes(q) ||
        app.package_type?.toLowerCase().includes(q);

      const cat = (app.category || "").toLowerCase();
      let matchesCategory = true;
      if (activeTab === "student") matchesCategory = cat.includes("student");
      else if (activeTab === "parent") matchesCategory = cat.includes("parent");
      else if (activeTab === "teacher") matchesCategory = cat.includes("teacher") || cat.includes("school");

      const pkg = (app.package_type || "").toLowerCase();
      let matchesEvent = true;
      if (eventFilter === "boston") matchesEvent = pkg.includes("boston");
      else if (eventFilter === "thai") matchesEvent = pkg.includes("thai");
      else if (eventFilter === "china") matchesEvent = pkg.includes("china");

      return matchesSearch && matchesCategory && matchesEvent;
    });
  }, [applications, searchQuery, activeTab, eventFilter]);

  const counts = useMemo(() => {
    let student = 0, parent = 0, teacher = 0;
    applications.forEach((app) => {
      const cat = (app.category || "").toLowerCase();
      if (cat.includes("student")) student++;
      else if (cat.includes("parent")) parent++;
      else if (cat.includes("teacher") || cat.includes("school")) teacher++;
    });
    return { total: applications.length, student, parent, teacher };
  }, [applications]);

  const getWaLink = (phoneStr) => {
    if (!phoneStr) return "#";
    const cleaned = phoneStr.replace(/\D/g, "");
    const formatted = cleaned.startsWith("0") ? "62" + cleaned.slice(1) : cleaned;
    return `https://wa.me/${formatted}`;
  };

  // Helper extraction for both form_details JSON and raw SQL columns
  const getVal = (app, detailKey, sqlColumn, fallback = "-") => {
    if (!app) return fallback;
    const d = app.form_details || {};
    const val = d[detailKey] !== undefined && d[detailKey] !== null && d[detailKey] !== "" 
      ? d[detailKey] 
      : app[sqlColumn];

    if (val === undefined || val === null || val === "") return fallback;
    if (Array.isArray(val)) return val.length > 0 ? val.join(", ") : fallback;
    return String(val);
  };

  const handleCopySummary = (app) => {
    if (!app) return;
    const text = `
=== EDUGLOBAL REGISTRATION SUMMARY ===
ID: #${app.id}
Event: ${app.package_type}
Date: ${formatDate(app.created_at)}
Category: ${app.category || "Participant"}

--- PARTICIPANT INFO ---
Name: ${app.full_name}
Email: ${app.email}
Phone/WA: ${app.phone}
School: ${app.school || getVal(app, "schoolName", "school_city_country")}
DOB / Gender: ${getVal(app, "dob", "dob")} / ${getVal(app, "gender", "gender")}
Nationality/Residence: ${getVal(app, "nationalityResidence", "nationality_and_residence")}
Passport Status: ${getVal(app, "passportStatus", "passport_status")}

--- SECTION 2: MUN & ACADEMIC ---
MUN Level: ${getVal(app, "munExperience", "mun_experience")}
1st Committee Pref: ${getVal(app, "committeePref1", "committee_pref_1")}
2nd Committee Pref: ${getVal(app, "committeePref2", "committee_pref_2")}
Skills: ${getVal(app, "skillsToDevelop", "skills_to_develop")}

--- SECTION 3: PARENT INFO ---
Parent Name: ${getVal(app, "parentFullName", "parent_full_name")}
Parent Relationship: ${getVal(app, "parentRelationship", "parent_relationship")}
Parent Email/WA: ${getVal(app, "parentEmail", "parent_email")} / ${getVal(app, "parentWhatsapp", "parent_whatsapp")}

--- EMERGENCY & HEALTH ---
Emergency Contact: ${getVal(app, "emergencyContact", "emergency_contact")}
Dietary / Allergies: ${getVal(app, "dietaryReqs", "dietary_requirements")} | ${getVal(app, "foodAllergies", "food_allergies")}
Chicken Allergy: ${getVal(app, "chickenProteinAllergy", "chicken_protein_allergy")}
Medical Conditions: ${getVal(app, "medicalConditions", "medical_conditions")}
======================================
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] font-poppins pb-24 text-navy">
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      />

      {/* Header Admin */}
      <header className="bg-navy py-5 px-8 mb-8 shadow-md">
        <div className="max-w-[1380px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="EduGlobal Academy" className="h-9 w-auto object-contain brightness-0 invert" />
            <span className="text-white/60 font-normal text-sm">| Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/" className="text-white/80 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5">
              <span>Live Website</span> ↗
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-white border border-red-500/30 px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2"
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1380px] mx-auto px-6 md:px-8">
        
        {/* Page Title & Refresh */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl text-navy font-extrabold tracking-tight">Participant Registrations</h1>
            <p className="text-muted text-sm mt-1">Manage and view detailed submissions for HMUN Boston, Thai National MUN, and HMUN China 2027.</p>
          </div>
          <button 
            onClick={fetchApplications}
            className="inline-flex items-center gap-2 bg-white hover:bg-sky-pale text-navy border border-gray-200 px-4 py-2.5 rounded-full text-xs font-bold shadow-sm transition-all"
          >
            <i className={`fas fa-sync-alt ${loading ? "fa-spin" : ""}`}></i> Refresh Data
          </button>
        </div>

        {/* Quick Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div 
            onClick={() => setActiveTab("all")}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm ${activeTab === "all" ? "bg-navy text-white border-navy" : "bg-white text-navy border-gray-200/80 hover:border-navy/40"}`}
          >
            <div className="text-xs uppercase tracking-wider opacity-75 font-bold mb-1">Total Registrations</div>
            <div className="text-3xl font-extrabold">{counts.total}</div>
          </div>

          <div 
            onClick={() => setActiveTab("student")}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm ${activeTab === "student" ? "bg-sky text-white border-sky" : "bg-white text-navy border-gray-200/80 hover:border-sky/40"}`}
          >
            <div className="text-xs uppercase tracking-wider opacity-75 font-bold mb-1">Student Delegates</div>
            <div className="text-3xl font-extrabold">{counts.student}</div>
          </div>

          <div 
            onClick={() => setActiveTab("parent")}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm ${activeTab === "parent" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-navy border-gray-200/80 hover:border-indigo-400"}`}
          >
            <div className="text-xs uppercase tracking-wider opacity-75 font-bold mb-1">Parents / Guardians</div>
            <div className="text-3xl font-extrabold">{counts.parent}</div>
          </div>

          <div 
            onClick={() => setActiveTab("teacher")}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm ${activeTab === "teacher" ? "bg-amber-600 text-white border-amber-600" : "bg-white text-navy border-gray-200/80 hover:border-amber-400"}`}
          >
            <div className="text-xs uppercase tracking-wider opacity-75 font-bold mb-1">Teachers & Schools</div>
            <div className="text-3xl font-extrabold">{counts.teacher}</div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#E7EEF7] mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          {/* Search Bar */}
          <div className="relative w-full lg:w-96">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input
              type="text"
              placeholder="Search by name, email, school, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-full text-xs outline-none focus:border-sky font-medium text-navy"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-navy"
              >
                ✕
              </button>
            )}
          </div>

          {/* Event Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <span className="text-xs font-bold text-muted mr-1">Summit Event:</span>
            {[
              { id: "all", label: "All Summits" },
              { id: "boston", label: "🇺🇸 Boston" },
              { id: "thai", label: "🇹🇭 Thailand" },
              { id: "china", label: "🇨🇳 China" },
            ].map((ev) => (
              <button
                key={ev.id}
                onClick={() => setEventFilter(ev.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  eventFilter === ev.id ? "bg-navy text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {ev.label}
              </button>
            ))}
          </div>
        </div>

        {/* Participant Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#E7EEF7] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E7EEF7] text-navy text-xs font-extrabold uppercase tracking-wider">
                  <th className="p-5 whitespace-nowrap">Applicant & Category</th>
                  <th className="p-5 whitespace-nowrap">Summit Event</th>
                  <th className="p-5 whitespace-nowrap">School / Institution</th>
                  <th className="p-5 whitespace-nowrap">Contact & WA</th>
                  <th className="p-5 whitespace-nowrap">Applied Date</th>
                  <th className="p-5 whitespace-nowrap text-center">UX Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center text-muted font-medium">
                      <div className="inline-block w-8 h-8 border-3 border-sky border-t-transparent rounded-full animate-spin mb-2"></div>
                      <p className="text-xs font-bold">Loading registrations from Supabase...</p>
                    </td>
                  </tr>
                ) : filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center text-muted">
                      <div className="text-4xl mb-2">🔍</div>
                      <p className="text-sm font-bold text-navy">No matching registrations found.</p>
                      <p className="text-xs text-muted mt-1">Try submitting a new registration on the website to test dynamic full data extraction.</p>
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => {
                    const details = app.form_details || {};
                    const chickenAllergy = getVal(app, "chickenProteinAllergy", "chicken_protein_allergy");
                    const foodAllergies = getVal(app, "foodAllergies", "food_allergies");
                    const hasAllergy = chickenAllergy === "Yes" || (foodAllergies !== "-" && foodAllergies.toLowerCase() !== "none");
                    const isChina = (app.package_type || "").toLowerCase().includes("china");
                    const isThai = (app.package_type || "").toLowerCase().includes("thai");

                    return (
                      <tr key={app.id} className="border-b border-gray-100 hover:bg-sky-pale/20 transition-colors group">
                        
                        <td className="p-5">
                          <div className="font-extrabold text-navy text-sm flex items-center gap-2 mb-1">
                            {app.full_name}
                            {hasAllergy && (
                              <span title="Allergy reported" className="bg-red-100 text-red-600 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                                ⚠️ Allergy
                              </span>
                            )}
                          </div>
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            (app.category || "").includes("Student") ? "bg-sky/15 text-sky" :
                            (app.category || "").includes("Parent") ? "bg-indigo-100 text-indigo-700" :
                            "bg-amber-100 text-amber-800"
                          }`}>
                            {app.category || "Participant"}
                          </span>
                        </td>

                        <td className="p-5">
                          <div className="text-xs font-bold text-navy flex items-center gap-1.5">
                            <span>{isChina ? "🇨🇳" : isThai ? "🇹🇭" : "🇺🇸"}</span>
                            <span>{app.package_type}</span>
                          </div>
                        </td>

                        <td className="p-5 text-xs font-medium text-navy">
                          {app.school || getVal(app, "schoolName", "school_city_country") !== "-" ? (
                            <span className="flex items-center gap-1">🏫 {app.school || getVal(app, "schoolName", "school_city_country")}</span>
                          ) : (
                            <span className="text-gray-400 italic">Not provided</span>
                          )}
                        </td>

                        <td className="p-5">
                          <div className="text-xs font-semibold text-navy mb-1">{app.email || "-"}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted">{app.phone || "-"}</span>
                            {app.phone && (
                              <a
                                href={getWaLink(app.phone)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-500 hover:bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full transition-all inline-flex items-center gap-1 shadow-sm"
                              >
                                <i className="fab fa-whatsapp"></i> Chat
                              </a>
                            )}
                          </div>
                        </td>

                        <td className="p-5 text-xs text-muted whitespace-nowrap font-medium">
                          {formatDate(app.created_at)}
                        </td>

                        <td className="p-5 text-center whitespace-nowrap">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="bg-navy hover:bg-sky text-white text-xs font-bold px-4 py-2 rounded-full transition-all duration-200 shadow-sm inline-flex items-center gap-1.5 hover:scale-105"
                          >
                            <i className="fas fa-id-card"></i> View Full Customer Detail
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= RICH UX CUSTOMER DETAIL MODAL / DRAWER ================= */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 bg-navy/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-[920px] w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-[#E7EEF7] text-navy">
              
              {/* Sticky Top Bar */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-md px-8 py-5 border-b border-gray-100 flex items-center justify-between z-20">
                <div className="flex items-center gap-3">
                  <span className="bg-sky/15 text-sky font-extrabold text-xs px-3 py-1 rounded-full uppercase">
                    Customer ID #{selectedApp.id}
                  </span>
                  <span className="text-xs text-muted font-medium">
                    Applied: {formatDate(selectedApp.created_at)}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleCopySummary(selectedApp)}
                    className="bg-gray-100 hover:bg-sky-pale text-navy text-xs font-bold px-3.5 py-1.5 rounded-full transition-all border border-gray-200 flex items-center gap-1.5"
                  >
                    <i className="fas fa-copy"></i> {copiedStatus ? "Copied!" : "Copy Summary"}
                  </button>
                  <button 
                    onClick={() => setSelectedApp(null)}
                    className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-navy font-bold flex items-center justify-center transition-all"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Main Modal Body */}
              <div className="p-8 space-y-8">
                
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-navy via-navy/95 to-sky-dark p-6 rounded-2xl text-white shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="text-xs font-bold text-sky-light uppercase tracking-wider mb-1 block">
                      {selectedApp.category || "Participant Registration"}
                    </span>
                    <h2 className="text-2xl font-extrabold">{selectedApp.full_name}</h2>
                    <p className="text-xs text-white/80 mt-1">🏫 {selectedApp.school || getVal(selectedApp, "schoolName", "school_city_country") || "School not specified"}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="bg-white/20 backdrop-blur-sm px-3.5 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                      {selectedApp.package_type}
                    </span>
                    {selectedApp.phone && (
                      <a
                        href={getWaLink(selectedApp.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-extrabold px-4 py-2 rounded-full transition-all flex items-center gap-2 shadow-md hover:scale-105"
                      >
                        <i className="fab fa-whatsapp text-sm"></i> WhatsApp Delegate
                      </a>
                    )}
                  </div>
                </div>

                {/* Section 1: Core Contact & Personal Info */}
                <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-gray-200/80">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-navy mb-4 border-b pb-2">
                    <i className="fas fa-user text-sky"></i>
                    <span>Section 1 — Primary Contact & Personal Info</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Full Legal Name</span>
                      <strong className="text-navy text-sm">{selectedApp.full_name}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Preferred Name</span>
                      <strong className="text-navy">{getVal(selectedApp, "preferredName", "preferred_name")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Email Address</span>
                      <strong className="text-sky font-semibold">{selectedApp.email || getVal(selectedApp, "studentEmailWhatsapp", "email")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">WhatsApp / Phone</span>
                      <strong className="text-navy">{selectedApp.phone || getVal(selectedApp, "studentEmailWhatsapp", "phone")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Date of Birth</span>
                      <strong className="text-navy">{getVal(selectedApp, "dob", "dob")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Gender</span>
                      <strong className="text-navy">{getVal(selectedApp, "gender", "gender")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Nationality & Residence</span>
                      <strong className="text-navy">{getVal(selectedApp, "nationalityResidence", "nationality_and_residence")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Passport Status</span>
                      <span className="inline-block bg-sky/15 text-sky font-bold px-2.5 py-0.5 rounded-full">
                        {getVal(selectedApp, "passportStatus", "passport_status")}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Passport Expiry Date</span>
                      <strong className="text-navy">{getVal(selectedApp, "passportExpiry", "passport_expiry")}</strong>
                    </div>
                  </div>
                </div>

                {/* Section 2: MUN & Academic Background */}
                <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-gray-200/80">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-navy mb-4 border-b pb-2">
                    <i className="fas fa-graduation-cap text-sky"></i>
                    <span>Section 2 — MUN Experience & Academic Profile</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs mb-4">
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">School / Institution</span>
                      <strong className="text-navy">{selectedApp.school || getVal(selectedApp, "schoolName", "school_city_country")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Grade / Year Level</span>
                      <strong className="text-navy">{getVal(selectedApp, "gradeYear", "grade_year")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">MUN Experience Level</span>
                      <strong className="text-navy">{getVal(selectedApp, "munExperience", "mun_experience")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">English Proficiency</span>
                      <strong className="text-navy">{getVal(selectedApp, "englishProficiency", "english_proficiency")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Registration Channel</span>
                      <strong className="text-navy">{getVal(selectedApp, "regChannel", "registration_channel")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Why Joining Reason</span>
                      <strong className="text-navy line-clamp-2">{getVal(selectedApp, "whyJoin", "why_join_reason")}</strong>
                    </div>
                  </div>

                  {/* Skills to Develop */}
                  {getVal(selectedApp, "skillsToDevelop", "skills_to_develop") !== "-" && (
                    <div className="mt-3 pt-3 border-t border-gray-200/60">
                      <span className="text-muted block text-xs font-bold mb-2">Skills Aiming to Develop:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {getVal(selectedApp, "skillsToDevelop", "skills_to_develop").split(", ").map((skill, idx) => (
                          <span key={idx} className="bg-sky/10 text-sky text-[11px] font-bold px-3 py-1 rounded-full">
                            ✓ {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Committee Preferences */}
                  <div className="mt-4 pt-3 border-t border-gray-200/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-gray-200">
                      <span className="text-muted block text-[10px] uppercase font-bold">1st Committee Pref</span>
                      <strong className="text-navy">{getVal(selectedApp, "committeePref1", "committee_pref_1")}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-200">
                      <span className="text-muted block text-[10px] uppercase font-bold">2nd Committee Pref</span>
                      <strong className="text-navy">{getVal(selectedApp, "committeePref2", "committee_pref_2")}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-200">
                      <span className="text-muted block text-[10px] uppercase font-bold">3rd Committee Pref</span>
                      <strong className="text-navy">{getVal(selectedApp, "committeePref3", "committee_pref_3")}</strong>
                    </div>
                  </div>
                </div>

                {/* Section 3: Parent / Guardian Info */}
                <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-gray-200/80">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-navy mb-4 border-b pb-2">
                    <i className="fas fa-users text-indigo-600"></i>
                    <span>Section 3 — Parent / Guardian Information</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Parent / Guardian Name</span>
                      <strong className="text-navy">{getVal(selectedApp, "parentFullName", "parent_full_name")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Relationship to Student</span>
                      <strong className="text-navy">{getVal(selectedApp, "parentRelationship", "parent_relationship")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Parent Email</span>
                      <strong className="text-navy">{getVal(selectedApp, "parentEmail", "parent_email")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Parent WhatsApp / Phone</span>
                      <strong className="text-navy">{getVal(selectedApp, "parentWhatsapp", "parent_whatsapp")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Parent Approval</span>
                      <span className="inline-block bg-green-100 text-green font-bold px-2.5 py-0.5 rounded-full">
                        {getVal(selectedApp, "parentApproval", "parent_approval_status")}
                      </span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-muted block font-semibold mb-0.5">Residential Address</span>
                      <strong className="text-navy">{getVal(selectedApp, "parentAddress", "parent_address")}</strong>
                    </div>
                  </div>
                </div>

                {/* Section 4: Travel, Visa & Accommodation */}
                <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-gray-200/80">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-navy mb-4 border-b pb-2">
                    <i className="fas fa-plane text-sky"></i>
                    <span>Section 4 — Travel, Visa & Accommodation</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Departure City</span>
                      <strong className="text-navy">{getVal(selectedApp, "departureCity", "departure_city")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Flight Arrangement</span>
                      <strong className="text-navy">{getVal(selectedApp, "flightArrangement", "flight_arrangement")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Accommodation Pref</span>
                      <strong className="text-navy">{getVal(selectedApp, "accommodationPref", "accommodation_preference")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Visa Status</span>
                      <strong className="text-navy">{getVal(selectedApp, "chinaVisaStatus", "china_visa_status")} / {getVal(selectedApp, "visaStatus", "visa_status")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Visa Support Letter</span>
                      <strong className="text-navy">{getVal(selectedApp, "visaLetterRequired", "visa_letter_required")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Extension / Package</span>
                      <strong className="text-navy">{getVal(selectedApp, "educationalCulturalProg", "preferred_package")}</strong>
                    </div>
                  </div>
                </div>

                {/* Section 5: Health & Emergency Alerts */}
                <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-gray-200/80">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-navy mb-4 border-b pb-2">
                    <i className="fas fa-heartbeat text-red-500"></i>
                    <span>Section 5 — Health, Dietary & Emergency Information</span>
                  </div>

                  {/* Allergy Highlight Card */}
                  {(getVal(selectedApp, "chickenProteinAllergy", "chicken_protein_allergy") === "Yes" || (getVal(selectedApp, "foodAllergies", "food_allergies") !== "-" && getVal(selectedApp, "foodAllergies", "food_allergies").toLowerCase() !== "none")) && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-xl mb-4 text-xs text-red-900">
                      <div className="font-extrabold flex items-center gap-2 mb-1">
                        <span>⚠️ CRITICAL ALLERGY ALERT</span>
                      </div>
                      <p><strong>Chicken / Protein Restriction:</strong> {getVal(selectedApp, "chickenProteinAllergy", "chicken_protein_allergy")}</p>
                      <p><strong>Food Allergies:</strong> {getVal(selectedApp, "foodAllergies", "food_allergies")}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Dietary Requirements</span>
                      <strong className="text-navy">
                        {getVal(selectedApp, "dietaryReqs", "dietary_requirements")}
                      </strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Medical Conditions</span>
                      <strong className="text-navy">{getVal(selectedApp, "medicalConditions", "medical_conditions")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Regular Medication</span>
                      <strong className="text-navy">{getVal(selectedApp, "regularMedication", "regular_medication")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Emergency Contact</span>
                      <strong className="text-navy">{getVal(selectedApp, "emergencyContact", "emergency_contact")}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Travel Insurance</span>
                      <strong className="text-navy">{getVal(selectedApp, "travelInsurance", "travel_insurance")}</strong>
                    </div>
                  </div>
                </div>

                {/* Section 6 & 7: Declarations */}
                <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-gray-200/80">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-navy mb-4 border-b pb-2">
                    <i className="fas fa-file-signature text-navy"></i>
                    <span>Declarations & Form Completion</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Form Completed By</span>
                      <strong className="text-navy text-sm">{getVal(selectedApp, "completedBy", "completed_by", selectedApp.full_name)}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-semibold mb-0.5">Additional Notes / Questions</span>
                      <strong className="text-navy">{getVal(selectedApp, "additionalQuestions", "additional_questions")}</strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-8 py-5 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => window.print()}
                  className="bg-gray-100 hover:bg-gray-200 text-navy text-xs font-bold px-5 py-2.5 rounded-full transition-all border border-gray-200 flex items-center gap-2"
                >
                  <i className="fas fa-print"></i> Print Details
                </button>

                <button
                  onClick={() => setSelectedApp(null)}
                  className="bg-navy text-white text-xs font-extrabold px-8 py-2.5 rounded-full hover:bg-sky transition-all shadow-md"
                >
                  Close Customer Detail
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
