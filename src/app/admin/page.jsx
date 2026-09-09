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
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);
  const [adminNotesInput, setAdminNotesInput] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/admin/login");
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    if (selectedApp) {
      setAdminNotesInput(selectedApp.admin_notes || "");
      setShowRawJson(false);
    }
  }, [selectedApp]);

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
      alert("Terjadi kesalahan saat memuat data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getWaLink = (phoneStr) => {
    if (!phoneStr) return "#";
    const cleaned = phoneStr.replace(/\D/g, "");
    const formatted = cleaned.startsWith("0") ? "62" + cleaned.slice(1) : cleaned;
    return `https://wa.me/${formatted}`;
  };

  // Dual Extraction Helper (checks form_details JSONB AND raw SQL columns)
  const getVal = (app, detailKey, sqlColumn, fallback = "-") => {
    if (!app) return fallback;
    const d = app.form_details || {};
    const val = d[detailKey] !== undefined && d[detailKey] !== null && d[detailKey] !== "" 
      ? d[detailKey] 
      : app[sqlColumn];

    if (val === undefined || val === null || val === "") return fallback;
    if (typeof val === "boolean") return val ? "Yes" : "No";
    if (Array.isArray(val)) return val.length > 0 ? val.join(", ") : fallback;
    return String(val);
  };

  const getBool = (app, detailKey) => {
    if (!app) return false;
    const d = app.form_details || {};
    return Boolean(d[detailKey]);
  };

  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      setSavingStatus(true);
      const { error } = await supabase
        .from("applications")
        .update({ status: newStatus })
        .eq("id", appId);

      if (error) throw error;

      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
      );

      if (selectedApp && selectedApp.id === appId) {
        setSelectedApp((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error("Status update error:", err);
      alert("Gagal mengubah status: " + err.message);
    } finally {
      setSavingStatus(false);
    }
  };

  const handleSaveNotes = async (appId) => {
    try {
      setSavingNotes(true);
      const { error } = await supabase
        .from("applications")
        .update({ admin_notes: adminNotesInput })
        .eq("id", appId);

      if (error) throw error;

      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, admin_notes: adminNotesInput } : a))
      );

      if (selectedApp && selectedApp.id === appId) {
        setSelectedApp((prev) => ({ ...prev, admin_notes: adminNotesInput }));
      }
      alert("Catatan internal admin berhasil disimpan!");
    } catch (err) {
      console.error("Notes save error:", err);
      alert("Gagal menyimpan catatan: " + err.message);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleCopySummary = (app) => {
    if (!app) return;
    const isChina = (app.package_type || "").toLowerCase().includes("china");
    const isThai = (app.package_type || "").toLowerCase().includes("thai");
    const isBoston = !isChina && !isThai;

    const text = `
=== EDUGLOBAL REGISTRATION SUMMARY ===
Registration ID: #${app.id}
Status: ${(app.status || "pending").toUpperCase()}
Summit Event: ${app.package_type}
Applied At: ${formatDate(app.created_at)}
Registration Category: ${app.category || "Student delegate"}

--- PRIMARY CONTACT ---
Name: ${app.full_name}
Email: ${app.email}
Phone/WA: ${app.phone}
School/Institution: ${app.school || getVal(app, "schoolName", "school_city_country")}

--- SECTION DETAILS ---
${(app.category || "").includes("Parent") ? `
[Section 2B - Accompanying Parent or Guardian]
Parent Legal Name: ${app.full_name}
Student Name: ${getVal(app, "studentFullName", "student_full_name")}
Relationship to Student: ${getVal(app, "relationshipToStudent", "relationship_to_student")}
Parent DOB & Gender: ${getVal(app, "dob", "dob")} / ${getVal(app, "gender", "gender")}
Nationality & Residence: ${getVal(app, "nationalityResidence", "nationality_and_residence")}
Passport: ${getVal(app, "passportStatus", "passport_status")} (Expiry: ${getVal(app, "passportExpiry", "passport_expiry")})
Requested Role: ${getVal(app, "requestedRole", "requested_role")}
Room Preference: ${getVal(app, "roomPreference", "room_preference")}
Travel Arrangement: ${getVal(app, "travelArrangement", "travel_arrangement")}
Cultural/Educational Extension: ${getVal(app, "culturalActivities", "educational_cultural_prog")}
` : (app.category || "").includes("Teacher") || (app.category || "").includes("School") ? `
[Section 2C - Teacher or School Group Representative]
School/Org Address: ${getVal(app, "schoolOrgAddress", "school_city_country", app.school)}
Primary Contact & Position: ${getVal(app, "primaryContactPosition", "primary_contact_position", app.full_name)}
Official Contact: ${getVal(app, "officialEmailWhatsapp", "email", app.email)} / ${app.phone}
Estimated Counts: ${getVal(app, "estDelegates", "estimated_delegates")} Delegates | ${getVal(app, "estTeachers", "estimated_teachers")} Teachers | ${getVal(app, "estParents", "estimated_parents")} Parents
Student Age Ranges: ${getVal(app, "studentAgeRange", "student_age_ranges")}
Group MUN Experience: ${getVal(app, "groupMunExp", "mun_experience")}
Pre-Conference Training: ${getVal(app, "trainingRequired", "preconference_training")}
Payment Arrangement: ${getVal(app, "paymentArrangement", "payment_arrangement")}
Required Documents: ${getVal(app, "requiredDocuments", "required_documents")}
Additional Requests: ${getVal(app, "additionalRequests", "additional_questions")}
` : `
[Section 2A - Student Delegate Details]
Legal Name: ${app.full_name} (Badge/Preferred: ${getVal(app, "preferredName", "preferred_name")})
DOB / Gender: ${getVal(app, "dob", "dob")} / ${getVal(app, "gender", "gender")}
Nationality & Residence: ${getVal(app, "nationalityResidence", "nationality_and_residence")}
Passport: ${getVal(app, "passportStatus", "passport_status")} (Expiry: ${getVal(app, "passportExpiry", "passport_expiry")})
School / Grade: ${app.school || getVal(app, "schoolName", "school_city_country")} (${getVal(app, "gradeYear", "grade_year")})
MUN Experience: ${getVal(app, "munExperience", "mun_experience")}
Previous Conferences: ${getVal(app, "previousConferences", "previous_conferences")}
English Proficiency: ${getVal(app, "englishProficiency", "english_proficiency")}
Skills Aiming to Develop: ${getVal(app, "skillsToDevelop", "skills_to_develop")}
Committee Preferences: 1. ${getVal(app, "committeePref1", "committee_pref_1")} | 2. ${getVal(app, "committeePref2", "committee_pref_2")} | 3. ${getVal(app, "committeePref3", "committee_pref_3")}
Committee Styles: ${getVal(app, "committeeStyles", "committee_styles")}
Registration Channel: ${getVal(app, "regChannel", "registration_channel")}
Why Join Reason: ${getVal(app, "whyJoin", "why_join_reason")}

[Section 3 - Parent Info for Student Delegate]
Parent Full Name: ${getVal(app, "parentFullName", "parent_full_name")}
Relationship: ${getVal(app, "parentRelationship", "parent_relationship")}
Parent Email / WA: ${getVal(app, "parentEmail", "parent_email")} / ${getVal(app, "parentWhatsapp", "parent_whatsapp")}
Parent Accompanying: ${getVal(app, "parentAccompanying", "parent_accompanying")}
Parent Approval Status: ${getVal(app, "parentApproval", "parent_approval_status")}
Parent Residential Address: ${getVal(app, "parentAddress", "parent_address")}
`}

--- SECTION 4: TRAVEL, VISA & ACCOMMODATION ---
Departure City/Country: ${getVal(app, "departureCity", "departure_city")}
Flight Arrangement: ${getVal(app, "flightArrangement", "flight_arrangement")}
Accommodation Preference: ${getVal(app, "accommodationPref", "accommodation_preference")}
${isChina ? `China Visa Status: ${getVal(app, "chinaVisaStatus", "china_visa_status")}
Visa Application City: ${getVal(app, "visaCity", "visa_city")}
Previous China Travel: ${getVal(app, "previousChinaTravel", "previous_china_travel")}
Educational & Cultural Prog: ${getVal(app, "educationalCulturalProg", "educational_cultural_prog")}` : isThai ? `Thailand Immigration Status: ${getVal(app, "thaiImmigrationStatus", "thai_immigration_status")}
Travel Requirement: ${getVal(app, "travelRequirement", "travel_requirement")}
Preferred Package: ${getVal(app, "preferredPackage", "preferred_package")}
Local Transport: ${getVal(app, "localTransportRequired", "local_transport_required")}` : `U.S. Visa Status: ${getVal(app, "visaStatus", "visa_status")}
Visa Application City: ${getVal(app, "visaCity", "visa_city")}
Winter Readiness Confirmed: ${getVal(app, "winterReadiness", "winter_readiness")}
Harvard Extension: ${getVal(app, "harvardExtension", "harvard_extension")}`}
Visa Letter Required: ${getVal(app, "visaLetterRequired", "visa_letter_required")}
Booking Deadlines Confirmed: ${getVal(app, "visaAccommodationConfirm", "visa_accommodation_confirm")}

--- SECTION 5: HEALTH & EMERGENCY ---
Dietary Requirements: ${getVal(app, "dietaryReqs", "dietary_requirements")}
Food Allergies: ${getVal(app, "foodAllergies", "food_allergies")}
Chicken / Protein Restriction: ${getVal(app, "chickenProteinAllergy", "chicken_protein_allergy")}
Medical Conditions: ${getVal(app, "medicalConditions", "medical_conditions")}
Regular Medication: ${getVal(app, "regularMedication", "regular_medication")}
Emergency Contact (24/7): ${getVal(app, "emergencyContact", "emergency_contact")}
Travel Insurance: ${getVal(app, "travelInsurance", "travel_insurance")}

--- SECTION 6/7: DECLARATIONS & NOTES ---
Completed By: ${getVal(app, "completedBy", "completed_by", app.full_name)}
Special Requests / Questions: ${getVal(app, "additionalQuestions", "additional_questions")}
======================================
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2500);
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
        app.package_type?.toLowerCase().includes(q) ||
        app.id?.toLowerCase().includes(q);

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

      const st = (app.status || "pending").toLowerCase();
      let matchesStatus = true;
      if (statusFilter !== "all") matchesStatus = st === statusFilter.toLowerCase();

      return matchesSearch && matchesCategory && matchesEvent && matchesStatus;
    });
  }, [applications, searchQuery, activeTab, eventFilter, statusFilter]);

  const counts = useMemo(() => {
    let student = 0, parent = 0, teacher = 0, pending = 0, approved = 0;
    applications.forEach((app) => {
      const cat = (app.category || "").toLowerCase();
      if (cat.includes("student")) student++;
      else if (cat.includes("parent")) parent++;
      else if (cat.includes("teacher") || cat.includes("school")) teacher++;

      const st = (app.status || "pending").toLowerCase();
      if (st === "pending") pending++;
      else if (st === "approved") approved++;
    });
    return { total: applications.length, student, parent, teacher, pending, approved };
  }, [applications]);

  const getStatusBadge = (status) => {
    const st = (status || "pending").toLowerCase();
    switch (st) {
      case "approved":
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">✓ Approved</span>;
      case "reviewed":
        return <span className="bg-sky-100 text-sky-800 border border-sky-300 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">👁 In Review</span>;
      case "rejected":
        return <span className="bg-rose-100 text-rose-800 border border-rose-300 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">✕ Rejected</span>;
      default:
        return <span className="bg-amber-100 text-amber-800 border border-amber-300 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">⏳ Pending</span>;
    }
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
            <p className="text-muted text-sm mt-1">Manage and view 1-to-1 submissions for HMUN Boston, Thai National MUN, and HMUN China 2027.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchApplications}
              className="inline-flex items-center gap-2 bg-white hover:bg-sky-pale text-navy border border-gray-200 px-4 py-2.5 rounded-full text-xs font-bold shadow-sm transition-all"
            >
              <i className={`fas fa-sync-alt ${loading ? "fa-spin" : ""}`}></i> Refresh Data
            </button>
          </div>
        </div>

        {/* Quick Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div 
            onClick={() => setActiveTab("all")}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm ${activeTab === "all" ? "bg-navy text-white border-navy" : "bg-white text-navy border-gray-200/80 hover:border-navy/40"}`}
          >
            <div className="text-xs uppercase tracking-wider opacity-75 font-bold mb-1">Total Submissions</div>
            <div className="text-3xl font-extrabold">{counts.total}</div>
          </div>

          <div 
            onClick={() => setActiveTab("student")}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm ${activeTab === "student" ? "bg-sky text-white border-sky" : "bg-white text-navy border-gray-200/80 hover:border-sky/40"}`}
          >
            <div className="text-xs uppercase tracking-wider opacity-75 font-bold mb-1">Students</div>
            <div className="text-3xl font-extrabold">{counts.student}</div>
          </div>

          <div 
            onClick={() => setActiveTab("parent")}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm ${activeTab === "parent" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-navy border-gray-200/80 hover:border-indigo-400"}`}
          >
            <div className="text-xs uppercase tracking-wider opacity-75 font-bold mb-1">Parents</div>
            <div className="text-3xl font-extrabold">{counts.parent}</div>
          </div>

          <div 
            onClick={() => setActiveTab("teacher")}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm ${activeTab === "teacher" ? "bg-amber-600 text-white border-amber-600" : "bg-white text-navy border-gray-200/80 hover:border-amber-400"}`}
          >
            <div className="text-xs uppercase tracking-wider opacity-75 font-bold mb-1">Schools/Teachers</div>
            <div className="text-3xl font-extrabold">{counts.teacher}</div>
          </div>

          <div 
            onClick={() => setStatusFilter(statusFilter === "pending" ? "all" : "pending")}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm col-span-2 lg:col-span-1 ${statusFilter === "pending" ? "bg-amber-500 text-white border-amber-500" : "bg-white text-navy border-gray-200/80 hover:border-amber-400"}`}
          >
            <div className="text-xs uppercase tracking-wider opacity-75 font-bold mb-1">Needs Review</div>
            <div className="text-3xl font-extrabold">{counts.pending} <span className="text-xs font-normal opacity-80">pending</span></div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-[#E7EEF7] mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:w-96">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input
              type="text"
              placeholder="Search by name, email, phone, school..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-full text-xs text-navy focus:outline-none focus:border-sky focus:bg-white transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <span className="text-xs font-bold text-muted mr-1">Summit:</span>
            {[
              { id: "all", label: "All" },
              { id: "boston", label: "🇺🇸 Boston" },
              { id: "thai", label: "🇹🇭 Thailand" },
              { id: "china", label: "🇨🇳 China" },
            ].map((ev) => (
              <button
                key={ev.id}
                onClick={() => setEventFilter(ev.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  eventFilter === ev.id ? "bg-navy text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {ev.label}
              </button>
            ))}

            <div className="h-4 w-[1px] bg-gray-200 mx-1"></div>

            <span className="text-xs font-bold text-muted mr-1">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#F8FAFC] border border-gray-200 rounded-full px-3 py-1.5 text-xs font-bold text-navy focus:outline-none focus:border-sky"
            >
              <option value="all">All Status</option>
              <option value="pending">⏳ Pending</option>
              <option value="reviewed">👁 In Review</option>
              <option value="approved">✓ Approved</option>
              <option value="rejected">✕ Rejected</option>
            </select>
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
                  <th className="p-5 whitespace-nowrap">Status</th>
                  <th className="p-5 whitespace-nowrap">Applied Date</th>
                  <th className="p-5 whitespace-nowrap text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="p-12 text-center text-muted font-medium">
                      <div className="inline-block w-8 h-8 border-3 border-sky border-t-transparent rounded-full animate-spin mb-2"></div>
                      <p className="text-xs font-bold">Loading registrations from Supabase...</p>
                    </td>
                  </tr>
                ) : filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-12 text-center text-muted">
                      <div className="text-4xl mb-2">🔍</div>
                      <p className="text-sm font-bold text-navy">No matching registrations found.</p>
                      <p className="text-xs text-muted mt-1">Try changing filters or submit a new registration on the website.</p>
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => {
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

                        <td className="p-5 whitespace-nowrap">
                          {getStatusBadge(app.status)}
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

        {/* ================= COMPLETE 1-TO-1 BLUEPRINT MATCHING CUSTOMER DETAIL MODAL ================= */}
        {selectedApp && (() => {
          const isChina = (selectedApp.package_type || "").toLowerCase().includes("china");
          const isThai = (selectedApp.package_type || "").toLowerCase().includes("thai");
          const isBoston = !isChina && !isThai;

          return (
            <div className="fixed inset-0 z-50 bg-navy/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
              <div className="bg-white rounded-3xl max-w-[960px] w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-[#E7EEF7] text-navy">
                
                {/* Sticky Top Bar */}
                <div className="sticky top-0 bg-white/95 backdrop-blur-md px-8 py-5 border-b border-gray-100 flex items-center justify-between z-20">
                  <div className="flex items-center gap-3">
                    <span className="bg-sky/15 text-sky font-extrabold text-xs px-3 py-1 rounded-full uppercase">
                      ID #{selectedApp.id}
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
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">{isChina ? "🇨🇳" : isThai ? "🇹🇭" : "🇺🇸"}</span>
                        <span className="text-xs font-bold text-sky-light uppercase tracking-wider">
                          {selectedApp.package_type}
                        </span>
                      </div>
                      <h2 className="text-2xl font-extrabold">{selectedApp.full_name}</h2>
                      <p className="text-xs text-white/80 mt-1">
                        🏫 {selectedApp.school || getVal(selectedApp, "schoolName", "school_city_country") || getVal(selectedApp, "schoolOrgAddress", "school_city_country") || "School / Institution not specified"}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2.5">
                      <div className="flex items-center gap-2">
                        <span className="bg-white/20 backdrop-blur-sm px-3.5 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                          {selectedApp.category || "Student delegate"}
                        </span>
                        {getStatusBadge(selectedApp.status)}
                      </div>

                      {selectedApp.phone && (
                        <a
                          href={getWaLink(selectedApp.phone)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-extrabold px-4 py-2 rounded-full transition-all flex items-center gap-2 shadow-md hover:scale-105"
                        >
                          <i className="fab fa-whatsapp text-sm"></i> WhatsApp Applicant
                        </a>
                      )}
                    </div>
                  </div>

                  {/* ADMIN WORKFLOW CONTROL: STATUS & INTERNAL NOTES */}
                  <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-900">
                        <i className="fas fa-shield-alt text-amber-600"></i>
                        <span>Admin Application Management</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-amber-900 font-bold">Update Status:</span>
                        <select
                          value={selectedApp.status || "pending"}
                          disabled={savingStatus}
                          onChange={(e) => handleUpdateStatus(selectedApp.id, e.target.value)}
                          className="bg-white border border-amber-300 text-xs font-extrabold rounded-full px-3 py-1.5 text-navy focus:outline-none focus:border-amber-500 shadow-sm cursor-pointer"
                        >
                          <option value="pending">⏳ Pending Review</option>
                          <option value="reviewed">👁 In Review</option>
                          <option value="approved">✓ Approved / Confirmed</option>
                          <option value="rejected">✕ Rejected</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-amber-200/60 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                      <input
                        type="text"
                        placeholder="Add internal admin notes (e.g., 'Passport verified', 'Deposit received', 'Interview passed')..."
                        value={adminNotesInput}
                        onChange={(e) => setAdminNotesInput(e.target.value)}
                        className="flex-1 w-full bg-white border border-amber-200 rounded-xl px-4 py-2 text-xs text-navy focus:outline-none focus:border-amber-500"
                      />
                      <button
                        onClick={() => handleSaveNotes(selectedApp.id)}
                        disabled={savingNotes}
                        className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-5 py-2 rounded-xl transition-all shadow-sm whitespace-nowrap"
                      >
                        {savingNotes ? "Saving..." : "Save Notes"}
                      </button>
                    </div>
                  </div>

                  {/* ================= SECTION 1 — REGISTRATION CATEGORY ================= */}
                  <div className="bg-sky/5 p-6 rounded-2xl border border-sky/20">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-navy mb-3 border-b border-sky/15 pb-2">
                      <span className="w-5 h-5 rounded-md bg-sky text-white font-bold flex items-center justify-center text-[10px]">1</span>
                      <span>Section 1 — Registration Category</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted font-semibold">1. Registration Category Chosen:</span>
                        <strong className="text-sm font-extrabold text-sky bg-white px-4 py-1.5 rounded-full border border-sky/30 shadow-sm">
                          {selectedApp.category || "Student delegate"}
                        </strong>
                      </div>
                      <div className="text-xs text-muted">
                        Summit Conference: <span className="font-bold text-navy">{selectedApp.package_type}</span>
                      </div>
                    </div>
                  </div>

                  {/* ================= SECTION 2 — CATEGORY-SPECIFIC FORM FIELDS ================= */}
                  {(selectedApp.category || "").includes("Parent") ? (
                    /* Section 2B: Accompanying Parent or Guardian */
                    <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-900 border-b border-indigo-200 pb-2">
                        <span className="w-5 h-5 rounded-md bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">2B</span>
                        <span>Section 2B — Accompanying Parent or Guardian Details</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">1. Full Legal Name (Parent)</span>
                          <strong className="text-navy text-sm">{selectedApp.full_name}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">2. Student's Full Legal Name</span>
                          <strong className="text-navy text-sm">{getVal(selectedApp, "studentFullName", "student_full_name")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">3. Relationship to Student</span>
                          <strong className="text-navy">{getVal(selectedApp, "relationshipToStudent", "relationship_to_student")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">4. Date of Birth & Gender</span>
                          <strong className="text-navy">{getVal(selectedApp, "dob", "dob")} ({getVal(selectedApp, "gender", "gender")})</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">5. Nationality & Country of Residence</span>
                          <strong className="text-navy">{getVal(selectedApp, "nationalityResidence", "nationality_and_residence")} {getVal(selectedApp, "nationality", "nationality") !== "-" ? `(${getVal(selectedApp, "nationality", "nationality")}, ${getVal(selectedApp, "residenceCountry", "residence_country")})` : ""}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">6. Passport Status & Expiry</span>
                          <span className="inline-block bg-sky/15 text-sky font-bold px-2.5 py-0.5 rounded-full">
                            {getVal(selectedApp, "passportStatus", "passport_status")} (Exp: {getVal(selectedApp, "passportExpiry", "passport_expiry")})
                          </span>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">7. Parent Contact Email</span>
                          <strong className="text-navy">{selectedApp.email}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">8. Parent WhatsApp Number</span>
                          <strong className="text-sky font-semibold">{selectedApp.phone}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">9. Requested Parent Role</span>
                          <strong className="text-navy">{getVal(selectedApp, "requestedRole", "requested_role")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">10. Rooming Preference</span>
                          <strong className="text-navy">{getVal(selectedApp, "roomPreference", "room_preference")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">11. Flight & Travel Arrangement</span>
                          <strong className="text-navy">{getVal(selectedApp, "travelArrangement", "travel_arrangement")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">12. Cultural & Academic Activities</span>
                          <strong className="text-navy">{getVal(selectedApp, "culturalActivities", "educational_cultural_prog")}</strong>
                        </div>
                      </div>
                    </div>
                  ) : (selectedApp.category || "").includes("Teacher") || (selectedApp.category || "").includes("School") ? (
                    /* Section 2C: Teacher or School Group Representative */
                    <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-200/80 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-900 border-b border-amber-200 pb-2">
                        <span className="w-5 h-5 rounded-md bg-amber-600 text-white font-bold flex items-center justify-center text-[10px]">2C</span>
                        <span>Section 2C — Teacher or School Group Representative Details</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs mb-4">
                        <div className="sm:col-span-2">
                          <span className="text-muted block font-semibold mb-0.5">1. School / Institution Name & Address</span>
                          <strong className="text-navy text-sm">{getVal(selectedApp, "schoolOrgAddress", "school_city_country", selectedApp.school)}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">2. Primary Contact Name & Position</span>
                          <strong className="text-navy text-sm">{getVal(selectedApp, "primaryContactPosition", "primary_contact_position", selectedApp.full_name)}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">3. Official School Email & WhatsApp</span>
                          <strong className="text-sky font-semibold">{getVal(selectedApp, "officialEmailWhatsapp", "email", selectedApp.email)} ({selectedApp.phone})</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">4. Estimated Student Delegates</span>
                          <strong className="text-navy font-extrabold text-sm">{getVal(selectedApp, "estDelegates", "estimated_delegates")} Students</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">5. Estimated Teachers / Chaperones</span>
                          <strong className="text-navy">{getVal(selectedApp, "estTeachers", "estimated_teachers")} Teachers</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">6. Estimated Accompanying Parents</span>
                          <strong className="text-navy">{getVal(selectedApp, "estParents", "estimated_parents")} Parents</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">7. Student Age Ranges</span>
                          <strong className="text-navy">{getVal(selectedApp, "studentAgeRange", "student_age_ranges")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">8. Group MUN Experience Level</span>
                          <strong className="text-navy">{getVal(selectedApp, "groupMunExp", "mun_experience")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">9. Pre-Conference Training Required</span>
                          <strong className="text-navy">{getVal(selectedApp, "trainingRequired", "preconference_training")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">10. Payment Arrangement</span>
                          <strong className="text-navy">{getVal(selectedApp, "paymentArrangement", "payment_arrangement")}</strong>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-muted block font-semibold mb-0.5">12. Additional Group Requests & Academic Needs</span>
                          <strong className="text-navy">{getVal(selectedApp, "additionalRequests", "additional_questions")}</strong>
                        </div>
                      </div>

                      {getVal(selectedApp, "requiredDocuments", "required_documents") !== "-" && (
                        <div className="pt-3 border-t border-amber-200/60">
                          <span className="text-muted block text-xs font-bold mb-2">11. Required Administrative Documents:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {getVal(selectedApp, "requiredDocuments", "required_documents").split(", ").map((doc, idx) => (
                              <span key={idx} className="bg-amber-100 text-amber-900 text-[11px] font-bold px-3 py-1 rounded-full">
                                📄 {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Section 2A: Student Delegate Details */
                    <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-gray-200/80 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-navy border-b pb-2">
                        <span className="w-5 h-5 rounded-md bg-sky text-white font-bold flex items-center justify-center text-[10px]">2A</span>
                        <span>Section 2A — Student Delegate Details</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs mb-2">
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">1. Full Legal Name (Passport)</span>
                          <strong className="text-navy text-sm">{selectedApp.full_name}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">2. Preferred / Badge Name</span>
                          <strong className="text-navy">{getVal(selectedApp, "preferredName", "preferred_name")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">3. Date of Birth</span>
                          <strong className="text-navy">{getVal(selectedApp, "dob", "dob")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">4. Gender</span>
                          <strong className="text-navy">{getVal(selectedApp, "gender", "gender")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">5. Nationality & Country of Residence</span>
                          <strong className="text-navy">
                            {getVal(selectedApp, "nationalityResidence", "nationality_and_residence")}
                            {getVal(selectedApp, "nationality", "nationality") !== "-" && getVal(selectedApp, "nationality", "nationality") !== getVal(selectedApp, "nationalityResidence", "nationality_and_residence")
                              ? ` (${getVal(selectedApp, "nationality", "nationality")}, ${getVal(selectedApp, "residenceCountry", "residence_country")})`
                              : ""}
                          </strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">6 & 7. Passport Status & Expiry</span>
                          <span className="inline-block bg-sky/15 text-sky font-bold px-2 py-0.5 rounded-full">
                            {getVal(selectedApp, "passportStatus", "passport_status")} (Exp: {getVal(selectedApp, "passportExpiry", "passport_expiry")})
                          </span>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">8. School Name, City & Country</span>
                          <strong className="text-navy">
                            {selectedApp.school || getVal(selectedApp, "schoolName", "school_city_country") || getVal(selectedApp, "schoolNameCityCountry", "school_city_country")}
                          </strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">9. Grade / Year Level</span>
                          <strong className="text-navy">{getVal(selectedApp, "gradeYear", "grade_year")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">10 & 11. Student Email & WhatsApp</span>
                          <strong className="text-sky font-semibold">{selectedApp.email} / {selectedApp.phone}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">12. MUN Experience Level</span>
                          <strong className="text-navy">{getVal(selectedApp, "munExperience", "mun_experience")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">13. Previous Conferences & Awards</span>
                          <strong className="text-navy">{getVal(selectedApp, "previousConferences", "previous_conferences")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">14. English Proficiency</span>
                          <strong className="text-navy">{getVal(selectedApp, "englishProficiency", "english_proficiency")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">21. Registration Channel</span>
                          <strong className="text-navy">{getVal(selectedApp, "regChannel", "registration_channel")}</strong>
                        </div>
                        <div className="sm:col-span-2 md:col-span-3">
                          <span className="text-muted block font-semibold mb-0.5">15. Why You Want to Join</span>
                          <p className="text-navy bg-white p-3 rounded-xl border border-gray-200 leading-relaxed">
                            {getVal(selectedApp, "whyJoin", "why_join_reason")}
                          </p>
                        </div>
                      </div>

                      {/* Skills to Develop */}
                      {getVal(selectedApp, "skillsToDevelop", "skills_to_develop") !== "-" && (
                        <div className="pt-3 border-t border-gray-200/60">
                          <span className="text-muted block text-xs font-bold mb-2">16. Skills Aiming to Develop:</span>
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
                      <div className="pt-3 border-t border-gray-200/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="bg-white p-3 rounded-xl border border-gray-200">
                          <span className="text-muted block text-[10px] uppercase font-bold">17. 1st Committee Choice</span>
                          <strong className="text-navy">{getVal(selectedApp, "committeePref1", "committee_pref_1")}</strong>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-gray-200">
                          <span className="text-muted block text-[10px] uppercase font-bold">18. 2nd Committee Choice</span>
                          <strong className="text-navy">{getVal(selectedApp, "committeePref2", "committee_pref_2")}</strong>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-gray-200">
                          <span className="text-muted block text-[10px] uppercase font-bold">19. 3rd Committee Choice</span>
                          <strong className="text-navy">{getVal(selectedApp, "committeePref3", "committee_pref_3")}</strong>
                        </div>
                      </div>

                      {/* Committee Style Preferences */}
                      {getVal(selectedApp, "committeeStyles", "committee_styles") !== "-" && (
                        <div className="pt-2">
                          <span className="text-muted block text-xs font-bold mb-1.5">20. Preferred Committee Styles:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {getVal(selectedApp, "committeeStyles", "committee_styles").split(", ").map((st, idx) => (
                              <span key={idx} className="bg-indigo-50 text-indigo-700 text-[11px] font-bold px-3 py-1 rounded-full border border-indigo-200">
                                🏛 {st}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ================= SECTION 3 — PARENT INFO FOR STUDENT DELEGATES ================= */}
                  {!(selectedApp.category || "").includes("Parent") && !(selectedApp.category || "").includes("Teacher") && (
                    <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-gray-200/80 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-navy border-b pb-2">
                        <span className="w-5 h-5 rounded-md bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">3</span>
                        <span>Section 3 — Parent Information for Student Delegates</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">1. Parent / Guardian Full Legal Name</span>
                          <strong className="text-navy text-sm">{getVal(selectedApp, "parentFullName", "parent_full_name") || getVal(selectedApp, "parentNameRelationship", "parent_full_name")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">2. Relationship to Student</span>
                          <strong className="text-navy">{getVal(selectedApp, "parentRelationship", "parent_relationship")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">3. Parent Email</span>
                          <strong className="text-navy">{getVal(selectedApp, "parentEmail", "parent_email")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">4. Parent WhatsApp / Phone</span>
                          <strong className="text-sky font-semibold">{getVal(selectedApp, "parentWhatsapp", "parent_whatsapp")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">5. Accompanying Student to Summit?</span>
                          <strong className="text-navy">{getVal(selectedApp, "parentAccompanying", "parent_accompanying")}</strong>
                        </div>
                        <div>
                          <span className="text-muted block font-semibold mb-0.5">6. Parent Approval Status</span>
                          <span className="inline-block bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                            {getVal(selectedApp, "parentApproval", "parent_approval_status")}
                          </span>
                        </div>
                        <div className="sm:col-span-3">
                          <span className="text-muted block font-semibold mb-0.5">7. Parent Residential Address</span>
                          <strong className="text-navy">{getVal(selectedApp, "parentAddress", "parent_address")}</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ================= SECTION 4 — TRAVEL, VISA & ACCOMMODATION ================= */}
                  <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-gray-200/80 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-navy border-b pb-2">
                      <span className="w-5 h-5 rounded-md bg-sky text-white font-bold flex items-center justify-center text-[10px]">4</span>
                      <span>Section 4 — Travel, Visa & Accommodation</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-muted block font-semibold mb-0.5">City & Country of Departure</span>
                        <strong className="text-navy">{getVal(selectedApp, "departureCity", "departure_city") || getVal(selectedApp, "departureCityCountry", "departure_city")}</strong>
                      </div>
                      <div>
                        <span className="text-muted block font-semibold mb-0.5">Flight Arrangement</span>
                        <strong className="text-navy">{getVal(selectedApp, "flightArrangement", "flight_arrangement")}</strong>
                      </div>
                      <div>
                        <span className="text-muted block font-semibold mb-0.5">Accommodation Preference</span>
                        <strong className="text-navy">{getVal(selectedApp, "accommodationPref", "accommodation_preference")}</strong>
                      </div>

                      {/* Event Specific Visa Status */}
                      {isChina ? (
                        <>
                          <div>
                            <span className="text-muted block font-semibold mb-0.5">China Visa Status</span>
                            <span className="inline-block bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full">
                              {getVal(selectedApp, "chinaVisaStatus", "china_visa_status")}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted block font-semibold mb-0.5">Visa Application City / Embassy</span>
                            <strong className="text-navy">{getVal(selectedApp, "visaCity", "visa_city")}</strong>
                          </div>
                          <div>
                            <span className="text-muted block font-semibold mb-0.5">Previous China Travel</span>
                            <strong className="text-navy">{getVal(selectedApp, "previousChinaTravel", "previous_china_travel")}</strong>
                          </div>
                          <div>
                            <span className="text-muted block font-semibold mb-0.5">Educational & Cultural Programme</span>
                            <strong className="text-navy">{getVal(selectedApp, "educationalCulturalProg", "educational_cultural_prog")}</strong>
                          </div>
                        </>
                      ) : isThai ? (
                        <>
                          <div>
                            <span className="text-muted block font-semibold mb-0.5">Thailand Immigration Status</span>
                            <span className="inline-block bg-sky/15 text-sky font-bold px-2.5 py-0.5 rounded-full">
                              {getVal(selectedApp, "thaiImmigrationStatus", "thai_immigration_status")}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted block font-semibold mb-0.5">Travel Package Requirement</span>
                            <strong className="text-navy">{getVal(selectedApp, "travelRequirement", "travel_requirement")}</strong>
                          </div>
                          <div>
                            <span className="text-muted block font-semibold mb-0.5">Preferred Package</span>
                            <strong className="text-navy">{getVal(selectedApp, "preferredPackage", "preferred_package")}</strong>
                          </div>
                          <div>
                            <span className="text-muted block font-semibold mb-0.5">Local Bangkok Transportation</span>
                            <strong className="text-navy">{getVal(selectedApp, "localTransportRequired", "local_transport_required")}</strong>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <span className="text-muted block font-semibold mb-0.5">U.S. Visa Status</span>
                            <span className="inline-block bg-blue-100 text-blue-900 font-bold px-2.5 py-0.5 rounded-full">
                              {getVal(selectedApp, "visaStatus", "visa_status")}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted block font-semibold mb-0.5">Visa Application City / Embassy</span>
                            <strong className="text-navy">{getVal(selectedApp, "visaCity", "visa_city")}</strong>
                          </div>
                          <div>
                            <span className="text-muted block font-semibold mb-0.5">Boston Winter Readiness</span>
                            <span className="inline-block bg-sky/10 text-sky font-bold px-2 py-0.5 rounded-full">
                              ✓ {getVal(selectedApp, "winterReadiness", "winter_readiness")}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted block font-semibold mb-0.5">Harvard Campus Extension</span>
                            <strong className="text-navy">{getVal(selectedApp, "harvardExtension", "harvard_extension")}</strong>
                          </div>
                        </>
                      )}

                      <div>
                        <span className="text-muted block font-semibold mb-0.5">Visa Support / Invitation Letter</span>
                        <strong className="text-navy">{getVal(selectedApp, "visaLetterRequired", "visa_letter_required")}</strong>
                      </div>

                      <div>
                        <span className="text-muted block font-semibold mb-0.5">Booking Deadlines Acknowledged</span>
                        <strong className="text-navy">{getVal(selectedApp, "visaAccommodationConfirm", "visa_accommodation_confirm")}</strong>
                      </div>

                      {getVal(selectedApp, "specialArrivalDeparture", "special_arrival_departure") !== "-" && (
                        <div className="sm:col-span-3">
                          <span className="text-muted block font-semibold mb-0.5">Special Arrival / Departure Requests</span>
                          <strong className="text-navy">{getVal(selectedApp, "specialArrivalDeparture", "special_arrival_departure")}</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ================= SECTION 5 — HEALTH, DIETARY & EMERGENCY DETAILS ================= */}
                  <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-gray-200/80 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-navy border-b pb-2">
                      <span className="w-5 h-5 rounded-md bg-red-500 text-white font-bold flex items-center justify-center text-[10px]">5</span>
                      <span>Section 5 — Health, Dietary & Emergency Information</span>
                    </div>

                    {/* Allergy Highlight Card */}
                    {(getVal(selectedApp, "chickenProteinAllergy", "chicken_protein_allergy") === "Yes" || (getVal(selectedApp, "foodAllergies", "food_allergies") !== "-" && getVal(selectedApp, "foodAllergies", "food_allergies").toLowerCase() !== "none")) && (
                      <div className="bg-red-50 border-2 border-red-300 p-4 rounded-xl text-xs text-red-900 shadow-sm">
                        <div className="font-extrabold flex items-center gap-2 mb-1.5 text-red-700">
                          <span className="text-base">⚠️</span> CRITICAL ALLERGY ALERT
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <p><strong>Chicken / Protein Restriction:</strong> {getVal(selectedApp, "chickenProteinAllergy", "chicken_protein_allergy")}</p>
                          <p><strong>Food Allergies:</strong> {getVal(selectedApp, "foodAllergies", "food_allergies")}</p>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-muted block font-semibold mb-0.5">Dietary Requirements</span>
                        {getVal(selectedApp, "dietaryReqs", "dietary_requirements") !== "-" ? (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {getVal(selectedApp, "dietaryReqs", "dietary_requirements").split(", ").map((item, idx) => (
                              <span key={idx} className="bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                                🥗 {item}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <strong className="text-navy">-</strong>
                        )}
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
                        <span className="text-muted block font-semibold mb-0.5">24/7 Emergency Contact Info</span>
                        <strong className="text-red-700 font-bold text-sm block">{getVal(selectedApp, "emergencyContact", "emergency_contact")}</strong>
                      </div>
                      <div>
                        <span className="text-muted block font-semibold mb-0.5">Travel Insurance Status</span>
                        <strong className="text-navy">{getVal(selectedApp, "travelInsurance", "travel_insurance")}</strong>
                      </div>
                    </div>
                  </div>

                  {/* ================= SECTION 6 — CHINA TRAVEL READINESS (CHINA SPECIFIC) ================= */}
                  {isChina && (
                    <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-200/80 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-rose-900 border-b border-rose-200 pb-2">
                        <span className="w-5 h-5 rounded-md bg-rose-600 text-white font-bold flex items-center justify-center text-[10px]">🇨🇳</span>
                        <span>China Summit Travel Readiness Acknowledgments</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="bg-white p-3 rounded-xl border border-rose-100 flex items-center justify-between">
                          <span className="font-semibold text-rose-950">1. Internet & Mobile App Access (WeChat/Alipay/VPN):</span>
                          <span className={`font-bold px-2 py-0.5 rounded-full ${getBool(selectedApp, "chinaAppAccess") ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"}`}>
                            {getBool(selectedApp, "chinaAppAccess") ? "✓ Confirmed" : "Not Confirmed"}
                          </span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-rose-100 flex items-center justify-between">
                          <span className="font-semibold text-rose-950">2. Civil Aviation Power Bank Regulations:</span>
                          <span className={`font-bold px-2 py-0.5 rounded-full ${getBool(selectedApp, "chinaPowerBank") ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"}`}>
                            {getBool(selectedApp, "chinaPowerBank") ? "✓ Confirmed" : "Not Confirmed"}
                          </span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-rose-100 flex items-center justify-between">
                          <span className="font-semibold text-rose-950">3. Compliance with Chinese Laws & Hotel Rules:</span>
                          <span className={`font-bold px-2 py-0.5 rounded-full ${getBool(selectedApp, "chinaLawsComply") ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"}`}>
                            {getBool(selectedApp, "chinaLawsComply") ? "✓ Agreed" : "Not Agreed"}
                          </span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-rose-100 flex items-center justify-between">
                          <span className="font-semibold text-rose-950">4. Arrival & Passport Details Commitment:</span>
                          <span className={`font-bold px-2 py-0.5 rounded-full ${getBool(selectedApp, "chinaArrivalDetails") ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"}`}>
                            {getBool(selectedApp, "chinaArrivalDetails") ? "✓ Agreed" : "Not Agreed"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ================= SECTION 6 & 7 — DECLARATIONS & FORM COMPLETION ================= */}
                  <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-gray-200/80 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-navy border-b pb-2">
                      <span className="w-5 h-5 rounded-md bg-navy text-white font-bold flex items-center justify-center text-[10px]">6/7</span>
                      <span>Declarations & Form Completion Sign-Off</span>
                    </div>

                    {/* Declarations Checklist Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-[11px]">
                      <div className="bg-white p-2.5 rounded-xl border border-gray-200 flex items-center gap-2">
                        <span className={`text-xs ${getBool(selectedApp, "declAccurate") ? "text-emerald-600 font-bold" : "text-gray-400"}`}>
                          {getBool(selectedApp, "declAccurate") ? "✓" : "✕"}
                        </span>
                        <span className="text-navy font-medium">Information Accuracy Confirmed</span>
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-gray-200 flex items-center gap-2">
                        <span className={`text-xs ${getBool(selectedApp, "declPrefNotGuaranteed") ? "text-emerald-600 font-bold" : "text-gray-400"}`}>
                          {getBool(selectedApp, "declPrefNotGuaranteed") ? "✓" : "✕"}
                        </span>
                        <span className="text-navy font-medium">Committee Prefs Not Guaranteed</span>
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-gray-200 flex items-center gap-2">
                        <span className={`text-xs ${getBool(selectedApp, "declConductRules") ? "text-emerald-600 font-bold" : "text-gray-400"}`}>
                          {getBool(selectedApp, "declConductRules") ? "✓" : "✕"}
                        </span>
                        <span className="text-navy font-medium">Code of Conduct Agreed</span>
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-gray-200 flex items-center gap-2">
                        <span className={`text-xs ${getBool(selectedApp, "declPaymentTerms") ? "text-emerald-600 font-bold" : "text-gray-400"}`}>
                          {getBool(selectedApp, "declPaymentTerms") ? "✓" : "✕"}
                        </span>
                        <span className="text-navy font-medium">Payment & Refund Policy Accepted</span>
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-gray-200 flex items-center gap-2">
                        <span className={`text-xs ${getBool(selectedApp, "declDataSharing") ? "text-emerald-600 font-bold" : "text-gray-400"}`}>
                          {getBool(selectedApp, "declDataSharing") ? "✓" : "✕"}
                        </span>
                        <span className="text-navy font-medium">Data Processing Consent Given</span>
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-gray-200 flex items-center gap-2">
                        <span className={`text-xs ${getBool(selectedApp, "declParentApproval") ? "text-emerald-600 font-bold" : "text-gray-400"}`}>
                          {getBool(selectedApp, "declParentApproval") ? "✓" : "✕"}
                        </span>
                        <span className="text-navy font-medium">Parent / Guardian Consent Confirmed</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                      <div>
                        <span className="text-muted block font-semibold mb-0.5">Form Completed By (Full Name & Relationship)</span>
                        <strong className="text-navy text-sm">{getVal(selectedApp, "completedBy", "completed_by", selectedApp.full_name)}</strong>
                      </div>
                      <div>
                        <span className="text-muted block font-semibold mb-0.5">Additional Notes / Questions Submitted</span>
                        <p className="text-navy bg-white p-3 rounded-xl border border-gray-200">
                          {getVal(selectedApp, "additionalQuestions", "additional_questions")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* OPTIONAL RAW JSON INSPECTOR FOR DEVELOPER / AUDITING */}
                  <div className="pt-2">
                    <button
                      onClick={() => setShowRawJson(!showRawJson)}
                      className="text-xs font-bold text-gray-500 hover:text-navy flex items-center gap-1.5 transition-colors"
                    >
                      <i className={`fas fa-chevron-${showRawJson ? "down" : "right"}`}></i>
                      <span>{showRawJson ? "Hide Raw Payload JSON" : "Inspect Raw Payload JSON (Developer View)"}</span>
                    </button>
                    {showRawJson && (
                      <div className="mt-3 bg-slate-900 text-slate-100 p-4 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-72 border border-slate-700">
                        <pre>{JSON.stringify(selectedApp.form_details || selectedApp, null, 2)}</pre>
                      </div>
                    )}
                  </div>

                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-8 py-5 border-t border-gray-100 flex items-center justify-between z-20">
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
          );
        })()}

      </main>
    </div>
  );
}
