"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

const EVENT_MAP = {
  "hmun-boston-2027": {
    type: "boston",
    name: "EduGlobal Academy — HMUN Boston 2027 Registration Form",
    subtitle: "74th Session of Harvard Model United Nations (Boston)",
    dates: "January 28–31, 2027",
    location: "Boston, Massachusetts, USA",
    flag: "🇺🇸",
    image: "/boston_hmun.jpg",
    descriptionText: `Register for the EduGlobal Academy delegation to the 74th Session of Harvard Model United Nations in Boston, held January 28–31, 2027. EduGlobal Academy has a limited allocation of 20 delegate places. Submission does not confirm a place; registration is confirmed only after eligibility review, written confirmation, and payment.`,
    minorText: `For students under 18, a parent or legal guardian must approve the registration. Enter all legal names exactly as shown in the passport. Passport copies, visa records, and detailed medical documents will be collected securely after provisional acceptance.`,
  },
  "thai-mun-2027": {
    type: "thai",
    name: "EduGlobal Academy — Thai National MUN 2027 Registration Form",
    subtitle: "Thai National Model United Nations 2027 (Bangkok)",
    dates: "January 13–19, 2027",
    location: "Bangkok, Thailand",
    flag: "🇹🇭",
    image: "/thailand_mun.jpg",
    descriptionText: `Register for Thai National Model United Nations 2027 with EduGlobal Academy in Bangkok, Thailand. This form is for student delegates, accompanying parents or guardians, and teachers or school groups. Submission does not confirm a place. Registration is confirmed after eligibility review, written confirmation, and payment.`,
    minorText: `For participants under 18, parent or legal-guardian approval is required. EduGlobal Academy manages minor-participant administration and safeguarding. Sensitive identity and medical documents will be requested separately after provisional acceptance.`,
  },
  "hmun-china-2027": {
    type: "china",
    name: "EduGlobal Academy — HMUN China 2027 Registration Form",
    subtitle: "Harvard Model United Nations China 2027 (Shenzhen)",
    dates: "August 12–18, 2027",
    location: "Shenzhen, China",
    flag: "🇨🇳",
    image: "/china_hmun.jpg",
    descriptionText: `Register for the EduGlobal Academy delegation to Harvard Model United Nations China 2027. The experience combines the HMUN China conference with EduGlobal academic preparation, international travel support, cultural learning, and educational activities.`,
    minorText: `Submission does not confirm a place. Registration is confirmed after eligibility review, written confirmation, and payment. For students under 18, parent or legal-guardian approval is required. Enter legal names exactly as shown in the passport. Passport copies, visa records, and detailed medical documents will be collected securely after provisional acceptance.`,
  },
};

const SKILLS_OPTIONS_BOSTON = [
  "Public speaking",
  "Debate",
  "Research",
  "Leadership",
  "Negotiation",
  "Diplomacy",
  "Confidence",
  "Cross-cultural communication",
  "Other",
];

const SKILLS_OPTIONS_THAI = [
  "Public speaking",
  "Debate",
  "Research",
  "Leadership",
  "Negotiation",
  "Diplomacy",
  "Confidence",
  "Networking",
  "Other",
];

const SKILLS_OPTIONS_CHINA = [
  "Speaking",
  "Debate",
  "Research",
  "Leadership",
  "Negotiation",
  "Diplomacy",
  "Confidence",
  "Cultural understanding",
  "Other",
];

const STYLES_OPTIONS_BOSTON = [
  "General Assembly",
  "ECOSOC",
  "Regional Body",
  "Specialized Body",
  "Crisis",
  "No preference",
];

const STYLES_OPTIONS_CHINA = [
  "GA",
  "ECOSOC",
  "Regional",
  "Specialized",
  "Crisis",
  "No preference",
];

const DIETARY_OPTIONS = [
  "Halal",
  "Vegetarian",
  "Vegan",
  "No pork",
  "No beef",
  "No seafood",
  "None",
  "Other",
];

const AGE_RANGES = ["13–14", "15–16", "17–18", "18+"];

const REQUIRED_DOCUMENTS_THAI = [
  "Proposal",
  "Quotation",
  "Invoice",
  "Partnership letter",
  "Invitation",
  "Visa support",
  "Other",
];

const REQUIRED_DOCUMENTS_BOSTON = [
  "Proposal",
  "Quotation",
  "Invoice",
  "Partnership letter",
  "School invitation",
  "Individual invitation",
  "Visa support",
  "None yet",
];

const REQUIRED_DOCUMENTS_CHINA = [
  "Proposal",
  "Quotation",
  "Invoice",
  "Partnership letter",
  "School invitation",
  "Individual invitations",
  "Visa support",
];

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventParam = searchParams.get("event") || "hmun-china-2027";
  const eventInfo = EVENT_MAP[eventParam] || EVENT_MAP["hmun-china-2027"];
  
  const isThaiEvent = eventInfo.type === "thai";
  const isChinaEvent = eventInfo.type === "china";

  // --- Main Category State (Section 1) ---
  const [category, setCategory] = useState("Student delegate");

  // --- Form Fields State ---
  const [formData, setFormData] = useState({
    // Section 2A: Student Delegate
    fullName: "",
    preferredName: "",
    dob: "",
    gender: "",
    nationality: "",
    residenceCountry: "",
    nationalityResidence: "",
    passportStatus: "",
    passportExpiry: "",
    schoolName: "",
    schoolCityCountry: "",
    schoolNameCityCountry: "",
    gradeYear: "",
    email: "",
    whatsapp: "",
    studentEmailWhatsapp: "",
    munExperience: "",
    previousConferences: "",
    englishProficiency: "",
    whyJoin: "",
    skillsToDevelop: [],
    committeePref1: "",
    committeePref2: "",
    committeePref3: "",
    committeeStyles: [],
    regChannel: "",

    // Section 2B: Accompanying Parent or Guardian
    studentFullName: "",
    relationshipToStudent: "",
    requestedRole: "",
    roomPreference: "",
    travelArrangement: "",
    culturalActivities: "",

    // Section 2C: Teacher or School Group
    schoolOrgAddress: "",
    primaryContactPosition: "",
    officialEmailWhatsapp: "",
    estDelegates: "",
    estTeachers: "",
    estParents: "",
    studentAgeRange: [],
    groupMunExp: "",
    trainingRequired: "",
    paymentArrangement: "",
    requiredDocuments: [],
    additionalRequests: "",

    // Section 3: Parent Info for Student
    parentFullName: "",
    parentNameRelationship: "",
    parentRelationship: "",
    parentEmail: "",
    parentWhatsapp: "",
    parentEmailWhatsapp: "",
    parentAddress: "",
    parentAccompanying: "",
    parentApproval: "",

    // Section 4: Visa, Travel & Accommodation
    departureCity: "",
    departureCityCountry: "",
    travelRequirement: "",
    flightArrangement: "",
    accommodationPref: "",
    thaiImmigrationStatus: "",
    chinaVisaStatus: "",
    visaStatus: "",
    visaLetterRequired: "",
    visaCity: "",
    winterReadiness: "",
    harvardExtension: "",
    visaAccommodationConfirm: "",
    preferredPackage: "",
    localTransportRequired: "",
    educationalCulturalProg: "",
    previousChinaTravel: "",
    specialArrivalDeparture: "",

    // Section 5: Health & Emergency
    dietaryReqs: [],
    foodAllergies: "",
    medicalConditions: "",
    regularMedication: "",
    emergencyContact: "",
    travelInsurance: "",
    chickenProteinAllergy: "",

    // Section 6: China Travel Readiness (China specific)
    chinaAppAccess: false,
    chinaPowerBank: false,
    chinaLawsComply: false,
    chinaArrivalDetails: false,

    // Section 6 or 7: Declarations
    declAccurate: false,
    declNoGuarantee: false,
    declPrefNotGuaranteed: false,
    declConductRules: false,
    declPaymentTerms: false,
    declDataSharing: false,
    declParentApproval: false,
    completedBy: "",
    additionalQuestions: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // --- Slider Images ---
  const sliderImages = [
    eventInfo.image,
    "/hero_bg.jpg",
    "/partnership_hero.jpg",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));

  // --- Handlers ---
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCheckboxArrayToggle = (fieldName, item) => {
    setFormData((prev) => {
      const currentList = prev[fieldName] || [];
      const updated = currentList.includes(item)
        ? currentList.filter((i) => i !== item)
        : [...currentList, item];
      return { ...prev, [fieldName]: updated };
    });
    if (errors[fieldName]) setErrors((prev) => ({ ...prev, [fieldName]: "" }));
  };

  const handleSingleBooleanToggle = (fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));
    if (errors[fieldName]) setErrors((prev) => ({ ...prev, [fieldName]: "" }));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;

    const checkRequired = (field, nameLabel) => {
      if (!formData[field] || (typeof formData[field] === "string" && !formData[field].trim())) {
        newErrors[field] = `${nameLabel} is required.`;
      }
    };

    if (!category) newErrors.category = "Please select a registration category.";

    // Section 2A: Student Delegate
    if (category === "Student delegate") {
      checkRequired("fullName", "Full legal name");
      checkRequired("dob", "Date of birth");
      checkRequired("gender", "Gender");

      if (isThaiEvent) {
        checkRequired("nationalityResidence", "Nationality and country of residence");
        checkRequired("passportStatus", "Passport/ID status");
        checkRequired("schoolNameCityCountry", "School name, city, and country");
        checkRequired("gradeYear", "Grade/year level");
        checkRequired("studentEmailWhatsapp", "Student email and WhatsApp");
        checkRequired("munExperience", "MUN experience");
        checkRequired("englishProficiency", "English proficiency");
        checkRequired("whyJoin", "Why you want to join Thai National MUN");
      } else if (isChinaEvent) {
        checkRequired("nationalityResidence", "Nationality and country of residence");
        checkRequired("passportStatus", "Passport status");
        if (
          formData.passportStatus === "Valid" ||
          formData.passportStatus === "Application/renewal in progress"
        ) {
          checkRequired("passportExpiry", "Passport expiry date");
        }
        checkRequired("schoolNameCityCountry", "School name, city, and country");
        checkRequired("gradeYear", "Grade/year");
        checkRequired("studentEmailWhatsapp", "Student email and WhatsApp");
        checkRequired("munExperience", "MUN experience");
        checkRequired("englishProficiency", "English proficiency");
        checkRequired("whyJoin", "Why you want to join HMUN China");
      } else {
        // Boston
        checkRequired("nationality", "Nationality");
        checkRequired("residenceCountry", "Country of residence");
        checkRequired("passportStatus", "Passport status");
        if (
          formData.passportStatus === "Valid passport" ||
          formData.passportStatus === "Application/renewal in progress"
        ) {
          checkRequired("passportExpiry", "Passport expiry date");
        }
        checkRequired("schoolName", "School name");
        checkRequired("schoolCityCountry", "School city and country");
        checkRequired("gradeYear", "Current grade/year");

        if (!formData.email.trim()) {
          newErrors.email = "Student email is required.";
        } else if (!emailRegex.test(formData.email)) {
          newErrors.email = "Invalid email format.";
        }
        checkRequired("whatsapp", "Student WhatsApp number");
        checkRequired("munExperience", "MUN experience");
        checkRequired("englishProficiency", "English proficiency");
        checkRequired("whyJoin", "Why you would like to join");
      }

      if (!formData.skillsToDevelop || formData.skillsToDevelop.length === 0) {
        newErrors.skillsToDevelop = "Select at least one skill to develop.";
      }

      checkRequired("committeePref1", "Committee preference 1");
      checkRequired("committeePref2", "Committee preference 2");
      checkRequired("committeePref3", "Committee preference 3");

      // Section 3: Parent Info for Students
      if (isThaiEvent || isChinaEvent) {
        checkRequired("parentNameRelationship", "Parent/guardian name and relationship");
        checkRequired("parentEmailWhatsapp", "Email and WhatsApp");
        checkRequired("parentAddress", "Residential address");
        checkRequired("parentApproval", "Parent approval");
      } else {
        checkRequired("parentFullName", "Parent/guardian full name");
        checkRequired("parentRelationship", "Parent relationship");
        if (!formData.parentEmail.trim()) {
          newErrors.parentEmail = "Parent email is required.";
        } else if (!emailRegex.test(formData.parentEmail)) {
          newErrors.parentEmail = "Invalid email format.";
        }
        checkRequired("parentWhatsapp", "Parent WhatsApp number");
        checkRequired("parentAddress", "Residential address");
        checkRequired("parentApproval", "Registration approval");
      }
    }

    // Section 2B: Accompanying Parent or Guardian
    if (category === "Accompanying parent or guardian") {
      checkRequired("fullName", "Full legal name");
      checkRequired("studentFullName", "Student's full name");

      if (isThaiEvent || isChinaEvent) {
        checkRequired("nationalityResidence", "Date of birth, nationality, and residence");
        checkRequired("officialEmailWhatsapp", "Email and WhatsApp");
        checkRequired("passportStatus", "Passport status");
      } else {
        checkRequired("dob", "Date of birth");
        checkRequired("nationalityResidence", "Nationality & country of residence");
        if (!formData.email.trim()) {
          newErrors.email = "Email is required.";
        } else if (!emailRegex.test(formData.email)) {
          newErrors.email = "Invalid email format.";
        }
        checkRequired("whatsapp", "WhatsApp number");
      }
    }

    // Section 2C: Teacher or School Group
    if (category === "Teacher or school-group representative") {
      checkRequired("schoolOrgAddress", "School name and address");
      checkRequired("primaryContactPosition", "Primary contact and position");
      checkRequired("officialEmailWhatsapp", "Official email and WhatsApp");
      checkRequired("estDelegates", "Estimated delegates");
      checkRequired("estTeachers", "Estimated teachers/advisors");
      checkRequired("estParents", "Estimated accompanying parents");
    }

    // Section 4: Visa, Travel & Accommodation
    if (isChinaEvent) {
      checkRequired("chinaVisaStatus", "China visa status");
      checkRequired("visaLetterRequired", "Visa-support letter request");
      if (
        formData.chinaVisaStatus === "Need to apply" ||
        formData.chinaVisaStatus === "Application in progress"
      ) {
        checkRequired("visaCity", "Visa application country/city");
      }
      checkRequired("departureCity", "Preferred departure city");
      checkRequired("flightArrangement", "Flight arrangement");
      checkRequired("accommodationPref", "Accommodation preference");
      checkRequired("educationalCulturalProg", "Educational and cultural programme preference");
      checkRequired("visaAccommodationConfirm", "Accommodation confirmation status");
      checkRequired("previousChinaTravel", "Previous travel to mainland China");
    } else if (isThaiEvent) {
      checkRequired("departureCityCountry", "City and country of departure");
      checkRequired("travelRequirement", "Travel requirement");
      checkRequired("accommodationPref", "Accommodation preference");
      checkRequired("thaiImmigrationStatus", "Thailand immigration status");
      checkRequired("visaLetterRequired", "Visa-support or invitation required?");
      checkRequired("preferredPackage", "Preferred package");
      checkRequired("localTransportRequired", "Local transportation requirement");
    } else {
      checkRequired("visaStatus", "U.S. visa status");
      checkRequired("visaLetterRequired", "Visa-support letter request");
      if (
        formData.visaStatus === "Need to apply" ||
        formData.visaStatus === "Application in progress"
      ) {
        checkRequired("visaCity", "Visa application country/city");
      }
      checkRequired("departureCity", "Preferred departure city");
      checkRequired("flightArrangement", "Flight arrangement");
      checkRequired("accommodationPref", "Accommodation preference");
      checkRequired("winterReadiness", "Winter readiness declaration");
      checkRequired("harvardExtension", "Harvard/MIT extension preference");
      checkRequired("visaAccommodationConfirm", "Accommodation confirmation status");
    }

    // Section 5: Health & Emergency
    checkRequired("foodAllergies", "Food allergies field");
    checkRequired("medicalConditions", "Medical conditions field");
    checkRequired("regularMedication", "Medication details field");
    checkRequired("emergencyContact", "Emergency contact info");
    checkRequired("travelInsurance", "Travel insurance status");
    if (isChinaEvent) {
      checkRequired("chickenProteinAllergy", "Chicken allergy or protein restrictions");
    }

    // Section 6: China Travel Readiness (China specific)
    if (isChinaEvent) {
      if (!formData.chinaAppAccess) newErrors.chinaAppAccess = "You must acknowledge internet/app access rules in China.";
      if (!formData.chinaPowerBank) newErrors.chinaPowerBank = "You must acknowledge airline power bank rules.";
      if (!formData.chinaLawsComply) newErrors.chinaLawsComply = "You must agree to follow Chinese laws and hotel rules.";
      if (!formData.chinaArrivalDetails) newErrors.chinaArrivalDetails = "You must agree to provide arrival details by deadline.";
    }

    // Section 6 or 7: Declarations (All 7 checkboxes required)
    if (!formData.declAccurate) newErrors.declAccurate = "You must confirm information accuracy.";
    if (!formData.declNoGuarantee) newErrors.declNoGuarantee = "You must acknowledge placement terms.";
    if (!formData.declPrefNotGuaranteed) newErrors.declPrefNotGuaranteed = "You must acknowledge preference terms.";
    if (!formData.declConductRules) newErrors.declConductRules = "You must agree to conduct rules.";
    if (!formData.declPaymentTerms) newErrors.declPaymentTerms = "You must accept payment terms.";
    if (!formData.declDataSharing) newErrors.declDataSharing = "You must consent to data sharing.";
    if (!formData.declParentApproval) newErrors.declParentApproval = "Parent/guardian approval confirmation is required.";
    checkRequired("completedBy", "Name and relationship of person completing form");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setSubmitting(true);

        const primaryName = category === "Teacher or school-group representative"
          ? formData.primaryContactPosition
          : formData.fullName;

        const primaryEmail = category === "Teacher or school-group representative"
          ? formData.officialEmailWhatsapp
          : (formData.email || formData.studentEmailWhatsapp || formData.officialEmailWhatsapp);

        const primaryPhone = category === "Teacher or school-group representative"
          ? formData.officialEmailWhatsapp
          : (formData.whatsapp || formData.studentEmailWhatsapp || formData.officialEmailWhatsapp);

        const primarySchool = category === "Teacher or school-group representative"
          ? formData.schoolOrgAddress
          : (formData.schoolName || formData.schoolNameCityCountry || formData.schoolOrgAddress);

        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: primaryName || "Applicant",
            email: primaryEmail || "",
            phone: primaryPhone || "",
            school: primarySchool || "",
            package: `${eventInfo.name} (${category})`,
            category: category,
            formDetails: formData,
          }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          router.push(
            `/thank-you?event=${encodeURIComponent(eventParam)}&name=${encodeURIComponent(primaryName || "Delegate")}&email=${encodeURIComponent(primaryEmail || "")}`
          );
        } else {
          alert("Gagal mengirim pendaftaran: " + (result.message || "Unknown error"));
        }
      } catch (err) {
        console.error("Submit error:", err);
        alert("Terjadi kesalahan koneksi saat mengirim pendaftaran.");
      } finally {
        setSubmitting(false);
      }
    } else {
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const elem = document.getElementById(firstErrorKey);
        if (elem) elem.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const getSkillsOptions = () => {
    if (isChinaEvent) return SKILLS_OPTIONS_CHINA;
    if (isThaiEvent) return SKILLS_OPTIONS_THAI;
    return SKILLS_OPTIONS_BOSTON;
  };

  const getStyleOptions = () => {
    if (isChinaEvent) return STYLES_OPTIONS_CHINA;
    return STYLES_OPTIONS_BOSTON;
  };

  const getRequiredDocOptions = () => {
    if (isChinaEvent) return REQUIRED_DOCUMENTS_CHINA;
    if (isThaiEvent) return REQUIRED_DOCUMENTS_THAI;
    return REQUIRED_DOCUMENTS_BOSTON;
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] font-poppins pb-24 text-navy">
      {/* Header */}
      <header className="bg-navy py-6 px-8 mb-10 shadow-md">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="EduGlobal Experience" className="h-9 w-auto object-contain brightness-0 invert" />
          </Link>
          <Link href="/experience-2027" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
            ← Cancel & Return
          </Link>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 md:px-8">
        
        {/* Banner Section */}
        <div className="bg-white rounded-3xl p-8 md:p-10 mb-10 shadow-sm border border-[#E7EEF7] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="inline-flex items-center gap-2 bg-sky-pale text-navy text-xs font-bold px-4 py-2 rounded-full mb-4 border border-sky/20">
            <span>{eventInfo.flag}</span> {eventInfo.subtitle}
          </div>
          <h1 className="text-3xl md:text-4xl text-navy font-extrabold mb-4 tracking-tight">
            {eventInfo.name}
          </h1>
          
          <div className="space-y-3 text-muted text-sm leading-relaxed max-w-[980px] border-l-4 border-sky pl-4 bg-sky-pale/30 py-3 rounded-r-xl">
            <p>{eventInfo.descriptionText}</p>
            <p className="text-xs text-navy/80 italic font-medium">* {eventInfo.minorText}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
          
          {/* Left Column: Form & Sections */}
          <div className="flex flex-col gap-8">
            
            {/* Slider */}
            <div className="relative w-full h-[220px] md:h-[280px] rounded-2xl overflow-hidden shadow-sm group">
              {sliderImages.map((src, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                >
                  <Image src={src} alt={`${eventInfo.name} Slide ${idx + 1}`} fill className="object-cover" priority={idx === 0} />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-transparent z-10"></div>
              <div className="absolute bottom-6 left-6 z-20 text-white">
                <div className="text-xs text-sky-light font-bold">📅 {eventInfo.dates}</div>
                <h3 className="font-bold text-xl mb-1">{eventInfo.subtitle}</h3>
                <p className="text-xs text-white/80">{eventInfo.location}</p>
              </div>
              <button onClick={prevSlide} type="button" className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-navy flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all">&#8592;</button>
              <button onClick={nextSlide} type="button" className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-navy flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all">&#8594;</button>
            </div>

            <form id="registration-form" onSubmit={handleSubmit} noValidate className="space-y-8">
              
              {/* ================= SECTION 1: REGISTRATION CATEGORY ================= */}
              <div className="bg-white rounded-2xl p-7 md:p-8 shadow-sm border border-[#E7EEF7]">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                  <span className="w-8 h-8 rounded-xl bg-sky/10 text-sky font-bold flex items-center justify-center text-sm">1</span>
                  <h2 className="text-xl font-bold text-navy">Section 1 — Registration category</h2>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                  <label className="text-sm font-bold text-navy mb-1">
                    Registration category <span className="text-red-500">*</span>
                  </label>
                  
                  {[
                    { id: "Student delegate", label: "Student delegate", desc: "For individual middle/high school delegates" },
                    { id: "Accompanying parent or guardian", label: "Accompanying parent or guardian", desc: "For parents/guardians accompanying a student participant" },
                    { id: "Teacher or school-group representative", label: "Teacher or school-group representative", desc: "For educators or leaders registering a school delegation" },
                  ].map((cat) => (
                    <label 
                      key={cat.id} 
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        category === cat.id ? "border-sky bg-sky/5 shadow-sm" : "border-gray-200 hover:border-sky/40"
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="registrationCategory" 
                        value={cat.id}
                        checked={category === cat.id}
                        onChange={() => setCategory(cat.id)}
                        className="mt-1 accent-sky w-4 h-4"
                      />
                      <div>
                        <div className="font-bold text-navy text-sm">{cat.label}</div>
                        <div className="text-xs text-muted">{cat.desc}</div>
                      </div>
                    </label>
                  ))}
                  {errors.category && <span className="text-xs text-red-500 font-medium">{errors.category}</span>}
                </div>
              </div>

              {/* ================= SECTION 2A: STUDENT DELEGATE ================= */}
              {category === "Student delegate" && (
                <div className="bg-white rounded-2xl p-7 md:p-8 shadow-sm border border-[#E7EEF7]">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-sky/10 text-sky font-bold flex items-center justify-center text-sm">2A</span>
                      <h2 className="text-xl font-bold text-navy">Section 2A — Student delegate details</h2>
                    </div>
                    <span className="text-xs font-bold bg-sky-pale text-sky px-3 py-1 rounded-full">Student Path</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 1. Full Legal Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="fullName" className="text-xs font-bold text-navy">1. Full legal name as shown in passport *</label>
                      <input 
                        type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleTextChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.fullName ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        placeholder="Full Legal Name"
                      />
                      {errors.fullName && <span className="text-xs text-red-500">{errors.fullName}</span>}
                    </div>

                    {/* 2. Preferred Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="preferredName" className="text-xs font-bold text-navy">2. Preferred name (Optional)</label>
                      <input 
                        type="text" id="preferredName" name="preferredName" value={formData.preferredName} onChange={handleTextChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky outline-none text-sm"
                        placeholder="Preferred Name"
                      />
                    </div>

                    {/* 3. Date of Birth */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="dob" className="text-xs font-bold text-navy">3. Date of birth *</label>
                      <input 
                        type="date" id="dob" name="dob" value={formData.dob} onChange={handleTextChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.dob ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                      />
                      {errors.dob && <span className="text-xs text-red-500">{errors.dob}</span>}
                    </div>

                    {/* 4. Gender */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="gender" className="text-xs font-bold text-navy">4. Gender *</label>
                      <select 
                        id="gender" name="gender" value={formData.gender} onChange={handleTextChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.gender ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                      >
                        <option value="">Select gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Prefer to self-describe">Prefer to self-describe</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                      {errors.gender && <span className="text-xs text-red-500">{errors.gender}</span>}
                    </div>

                    {/* 5. Nationality & Country of Residence */}
                    {isThaiEvent || isChinaEvent ? (
                      <div className="flex flex-col gap-2">
                        <label htmlFor="nationalityResidence" className="text-xs font-bold text-navy">5. Nationality and country of residence *</label>
                        <input 
                          type="text" id="nationalityResidence" name="nationalityResidence" value={formData.nationalityResidence} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.nationalityResidence ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                          placeholder="e.g. Indonesian, Indonesia"
                        />
                        {errors.nationalityResidence && <span className="text-xs text-red-500">{errors.nationalityResidence}</span>}
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="nationality" className="text-xs font-bold text-navy">5. Nationality *</label>
                          <input 
                            type="text" id="nationality" name="nationality" value={formData.nationality} onChange={handleTextChange}
                            className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.nationality ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                            placeholder="e.g. Indonesian"
                          />
                          {errors.nationality && <span className="text-xs text-red-500">{errors.nationality}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="residenceCountry" className="text-xs font-bold text-navy">6. Country of residence *</label>
                          <input 
                            type="text" id="residenceCountry" name="residenceCountry" value={formData.residenceCountry} onChange={handleTextChange}
                            className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.residenceCountry ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                            placeholder="e.g. Indonesia"
                          />
                          {errors.residenceCountry && <span className="text-xs text-red-500">{errors.residenceCountry}</span>}
                        </div>
                      </>
                    )}

                    {/* 6. Passport Status */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="passportStatus" className="text-xs font-bold text-navy">
                        {isThaiEvent ? "6. Passport/ID status *" : isChinaEvent ? "6. Passport status *" : "7. Passport status *"}
                      </label>
                      <select 
                        id="passportStatus" name="passportStatus" value={formData.passportStatus} onChange={handleTextChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.passportStatus ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                      >
                        <option value="">Select status</option>
                        <option value={isThaiEvent || isChinaEvent ? "Valid" : "Valid passport"}>{isThaiEvent || isChinaEvent ? "Valid" : "Valid passport"}</option>
                        <option value={isThaiEvent ? "In process" : "Application/renewal in progress"}>{isThaiEvent ? "In process" : "Application/renewal in progress"}</option>
                        <option value={isThaiEvent ? "Not available yet" : "No passport yet"}>{isThaiEvent ? "Not available yet" : "No passport yet"}</option>
                      </select>
                      {errors.passportStatus && <span className="text-xs text-red-500">{errors.passportStatus}</span>}
                    </div>

                    {/* Passport Expiry Date (Conditional for Boston & China) */}
                    {(isChinaEvent || !isThaiEvent) && (formData.passportStatus === "Valid" || formData.passportStatus === "Valid passport" || formData.passportStatus === "Application/renewal in progress") && (
                      <div className="flex flex-col gap-2">
                        <label htmlFor="passportExpiry" className="text-xs font-bold text-navy">
                          {isChinaEvent ? "7. Passport expiry *" : "8. Passport expiry date *"}
                        </label>
                        <input 
                          type="date" id="passportExpiry" name="passportExpiry" value={formData.passportExpiry} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.passportExpiry ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        />
                        {errors.passportExpiry && <span className="text-xs text-red-500">{errors.passportExpiry}</span>}
                      </div>
                    )}

                    {/* School Info */}
                    {isThaiEvent || isChinaEvent ? (
                      <div className="flex flex-col gap-2">
                        <label htmlFor="schoolNameCityCountry" className="text-xs font-bold text-navy">
                          {isChinaEvent ? "8. School name, city, and country *" : "7. School name, city, and country *"}
                        </label>
                        <input 
                          type="text" id="schoolNameCityCountry" name="schoolNameCityCountry" value={formData.schoolNameCityCountry} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.schoolNameCityCountry ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                          placeholder="School Name, City, Country"
                        />
                        {errors.schoolNameCityCountry && <span className="text-xs text-red-500">{errors.schoolNameCityCountry}</span>}
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="schoolName" className="text-xs font-bold text-navy">9. School name *</label>
                          <input 
                            type="text" id="schoolName" name="schoolName" value={formData.schoolName} onChange={handleTextChange}
                            className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.schoolName ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                            placeholder="e.g. Jakarta Intercultural School"
                          />
                          {errors.schoolName && <span className="text-xs text-red-500">{errors.schoolName}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="schoolCityCountry" className="text-xs font-bold text-navy">10. School city and country *</label>
                          <input 
                            type="text" id="schoolCityCountry" name="schoolCityCountry" value={formData.schoolCityCountry} onChange={handleTextChange}
                            className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.schoolCityCountry ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                            placeholder="e.g. Jakarta, Indonesia"
                          />
                          {errors.schoolCityCountry && <span className="text-xs text-red-500">{errors.schoolCityCountry}</span>}
                        </div>
                      </>
                    )}

                    {/* Grade/Year Level */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="gradeYear" className="text-xs font-bold text-navy">
                        {isChinaEvent ? "9. Grade/year *" : isThaiEvent ? "8. Grade/year level *" : "11. Current grade/year *"}
                      </label>
                      <select 
                        id="gradeYear" name="gradeYear" value={formData.gradeYear} onChange={handleTextChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.gradeYear ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                      >
                        <option value="">Select grade/year</option>
                        <option value="Grade 7–12">Grade 7–12</option>
                        <option value="Recently graduated">Recently graduated</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gradeYear && <span className="text-xs text-red-500">{errors.gradeYear}</span>}
                    </div>

                    {/* Student Email & WhatsApp */}
                    {isThaiEvent || isChinaEvent ? (
                      <div className="flex flex-col gap-2">
                        <label htmlFor="studentEmailWhatsapp" className="text-xs font-bold text-navy">
                          {isChinaEvent ? "10. Student email and WhatsApp *" : "9. Student email and WhatsApp *"}
                        </label>
                        <input 
                          type="text" id="studentEmailWhatsapp" name="studentEmailWhatsapp" value={formData.studentEmailWhatsapp} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.studentEmailWhatsapp ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                          placeholder="student@example.com / +62 812..."
                        />
                        {errors.studentEmailWhatsapp && <span className="text-xs text-red-500">{errors.studentEmailWhatsapp}</span>}
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="email" className="text-xs font-bold text-navy">12. Student email *</label>
                          <input 
                            type="email" id="email" name="email" value={formData.email} onChange={handleTextChange}
                            className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.email ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                            placeholder="student@example.com"
                          />
                          {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="whatsapp" className="text-xs font-bold text-navy">13. Student WhatsApp number *</label>
                          <input 
                            type="tel" id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleTextChange}
                            className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.whatsapp ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                            placeholder="+62 812 3456 7890"
                          />
                          {errors.whatsapp && <span className="text-xs text-red-500">{errors.whatsapp}</span>}
                        </div>
                      </>
                    )}

                    {/* MUN Experience */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="munExperience" className="text-xs font-bold text-navy">
                        {isChinaEvent ? "11. MUN experience *" : isThaiEvent ? "10. MUN experience *" : "14. MUN experience *"}
                      </label>
                      <select 
                        id="munExperience" name="munExperience" value={formData.munExperience} onChange={handleTextChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.munExperience ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                      >
                        <option value="">Select experience</option>
                        <option value="First MUN">First MUN</option>
                        <option value={isThaiEvent || isChinaEvent ? "1–2" : "1–2 conferences"}>{isThaiEvent || isChinaEvent ? "1–2" : "1–2 conferences"}</option>
                        <option value="3–5">3–5</option>
                        <option value="More than 5">More than 5</option>
                      </select>
                      {errors.munExperience && <span className="text-xs text-red-500">{errors.munExperience}</span>}
                    </div>

                    {/* English Proficiency */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="englishProficiency" className="text-xs font-bold text-navy">
                        {isChinaEvent ? "13. English proficiency *" : isThaiEvent ? "12. English proficiency *" : "16. English proficiency *"}
                      </label>
                      <select 
                        id="englishProficiency" name="englishProficiency" value={formData.englishProficiency} onChange={handleTextChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.englishProficiency ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                      >
                        <option value="">Select level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Upper-intermediate">Upper-intermediate</option>
                        <option value="Advanced/fluent">Advanced/fluent</option>
                      </select>
                      {errors.englishProficiency && <span className="text-xs text-red-500">{errors.englishProficiency}</span>}
                    </div>

                    {/* Registration Channel */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="regChannel" className="text-xs font-bold text-navy">
                        {isChinaEvent ? "20. Registration channel" : isThaiEvent ? "18. Registration channel" : "23. Registration channel"}
                      </label>
                      <select 
                        id="regChannel" name="regChannel" value={formData.regChannel} onChange={handleTextChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky outline-none text-sm"
                      >
                        <option value="">Select channel</option>
                        <option value="Independently">Independently</option>
                        <option value="Through school">Through school</option>
                        <option value={isThaiEvent || isChinaEvent ? "Other organization" : "Through another organization"}>{isThaiEvent || isChinaEvent ? "Other organization" : "Through another organization"}</option>
                      </select>
                    </div>

                    {/* Previous Conferences (Full width) */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label htmlFor="previousConferences" className="text-xs font-bold text-navy">
                        {isChinaEvent ? "12. Previous conferences, committees, roles, and awards (Optional)" : isThaiEvent ? "11. Previous conferences, committees, leadership, and awards (Optional)" : "15. Previous conferences, committees, roles, and awards (Optional)"}
                      </label>
                      <textarea 
                        id="previousConferences" name="previousConferences" rows="3" value={formData.previousConferences} onChange={handleTextChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky outline-none text-sm"
                        placeholder="List past MUN experience or awards..."
                      />
                    </div>

                    {/* Why Join (Full width) */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label htmlFor="whyJoin" className="text-xs font-bold text-navy">
                        {isChinaEvent ? "14. Why do you want to join HMUN China? *" : isThaiEvent ? "13. Why do you want to join Thai National MUN? *" : "17. Why would you like to join HMUN Boston? *"}
                      </label>
                      <textarea 
                        id="whyJoin" name="whyJoin" rows="4" value={formData.whyJoin} onChange={handleTextChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.whyJoin ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        placeholder="Describe your motivations, goals, and interest..."
                      />
                      {errors.whyJoin && <span className="text-xs text-red-500">{errors.whyJoin}</span>}
                    </div>

                    {/* Development Goals / Skills (Full width) */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold text-navy">
                        {isChinaEvent ? "15. Skills to develop (Select all that apply) *" : isThaiEvent ? "14. Development goals (Select all that apply) *" : "18. Skills you want to develop (Select all that apply) *"}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-1">
                        {getSkillsOptions().map((skill) => (
                          <label key={skill} className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${formData.skillsToDevelop.includes(skill) ? "border-sky bg-sky/5 text-navy" : "border-gray-200 hover:border-sky/30"}`}>
                            <input 
                              type="checkbox" 
                              checked={formData.skillsToDevelop.includes(skill)}
                              onChange={() => handleCheckboxArrayToggle("skillsToDevelop", skill)}
                              className="accent-sky w-4 h-4"
                            />
                            <span>{skill}</span>
                          </label>
                        ))}
                      </div>
                      {errors.skillsToDevelop && <span className="text-xs text-red-500">{errors.skillsToDevelop}</span>}
                    </div>

                    {/* Committee Preferences */}
                    <div className="md:col-span-2 space-y-4 border-t border-gray-100 pt-4">
                      <div className="bg-sky-pale/50 p-4 rounded-xl border border-sky/20 text-xs text-navy/80 font-medium">
                        📌 <strong>Note:</strong> {isChinaEvent ? "Official committee options will be added when released. Preferences and country/character roles are not guaranteed." : isThaiEvent ? "Official committee choices will be updated when confirmed. Preferences are not guaranteed." : "Official committee choices will be updated when HMUN releases assignments. Preferences are taken into consideration but not guaranteed."}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="committeePref1" className="text-xs font-bold text-navy">
                            {isChinaEvent ? "16. Committee preference 1 *" : "15. Committee preference 1 *"}
                          </label>
                          <input 
                            type="text" id="committeePref1" name="committeePref1" value={formData.committeePref1} onChange={handleTextChange}
                            className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.committeePref1 ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                            placeholder="1st Preference"
                          />
                          {errors.committeePref1 && <span className="text-xs text-red-500">{errors.committeePref1}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="committeePref2" className="text-xs font-bold text-navy">
                            {isChinaEvent ? "17. Committee preference 2 *" : "16. Committee preference 2 *"}
                          </label>
                          <input 
                            type="text" id="committeePref2" name="committeePref2" value={formData.committeePref2} onChange={handleTextChange}
                            className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.committeePref2 ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                            placeholder="2nd Preference"
                          />
                          {errors.committeePref2 && <span className="text-xs text-red-500">{errors.committeePref2}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="committeePref3" className="text-xs font-bold text-navy">
                            {isChinaEvent ? "18. Committee preference 3 *" : "17. Committee preference 3 *"}
                          </label>
                          <input 
                            type="text" id="committeePref3" name="committeePref3" value={formData.committeePref3} onChange={handleTextChange}
                            className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.committeePref3 ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                            placeholder="3rd Preference"
                          />
                          {errors.committeePref3 && <span className="text-xs text-red-500">{errors.committeePref3}</span>}
                        </div>
                      </div>
                    </div>

                    {(isChinaEvent || !isThaiEvent) && (
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-xs font-bold text-navy">
                          {isChinaEvent ? "19. Committee style preferences" : "22. Acceptable committee styles"}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-1">
                          {getStyleOptions().map((style) => (
                            <label key={style} className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${formData.committeeStyles.includes(style) ? "border-sky bg-sky/5 text-navy" : "border-gray-200 hover:border-sky/30"}`}>
                              <input 
                                type="checkbox" 
                                checked={formData.committeeStyles.includes(style)}
                                onChange={() => handleCheckboxArrayToggle("committeeStyles", style)}
                                className="accent-sky w-4 h-4"
                              />
                              <span>{style}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* ================= SECTION 2B: ACCOMPANYING PARENT OR GUARDIAN ================= */}
              {category === "Accompanying parent or guardian" && (
                <div className="bg-white rounded-2xl p-7 md:p-8 shadow-sm border border-[#E7EEF7]">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-sky/10 text-sky font-bold flex items-center justify-center text-sm">2B</span>
                      <h2 className="text-xl font-bold text-navy">Section 2B — Accompanying parent or guardian</h2>
                    </div>
                    <span className="text-xs font-bold bg-sky-pale text-sky px-3 py-1 rounded-full">Parent Path</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 1. Full Legal Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="fullName" className="text-xs font-bold text-navy">1. Full legal name as shown in passport *</label>
                      <input 
                        type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleTextChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.fullName ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        placeholder="Full Legal Name"
                      />
                      {errors.fullName && <span className="text-xs text-red-500">{errors.fullName}</span>}
                    </div>

                    {/* 2. Student's Full Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="studentFullName" className="text-xs font-bold text-navy">
                        {isChinaEvent ? "2. Student's full name and relationship *" : "2. Student's full name *"}
                      </label>
                      <input 
                        type="text" id="studentFullName" name="studentFullName" value={formData.studentFullName} onChange={handleTextChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.studentFullName ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        placeholder={isChinaEvent ? "e.g. Jason Widjaja (Child)" : "Student's Name"}
                      />
                      {errors.studentFullName && <span className="text-xs text-red-500">{errors.studentFullName}</span>}
                    </div>

                    {/* 3. DOB / Nationality & Residence */}
                    {isThaiEvent || isChinaEvent ? (
                      <div className="flex flex-col gap-2">
                        <label htmlFor="nationalityResidence" className="text-xs font-bold text-navy">
                          {isChinaEvent ? "3. Date of birth, nationality, and residence *" : "4. Date of birth, nationality, and residence *"}
                        </label>
                        <input 
                          type="text" id="nationalityResidence" name="nationalityResidence" value={formData.nationalityResidence} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.nationalityResidence ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                          placeholder="e.g. 15 Jan 1980, Indonesian, Jakarta"
                        />
                        {errors.nationalityResidence && <span className="text-xs text-red-500">{errors.nationalityResidence}</span>}
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="relationshipToStudent" className="text-xs font-bold text-navy">3. Relationship to student *</label>
                          <select 
                            id="relationshipToStudent" name="relationshipToStudent" value={formData.relationshipToStudent} onChange={handleTextChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky outline-none text-sm"
                          >
                            <option value="">Select relationship</option>
                            <option value="Mother">Mother</option>
                            <option value="Father">Father</option>
                            <option value="Legal guardian">Legal guardian</option>
                            <option value="Other authorized adult">Other authorized adult</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="dob" className="text-xs font-bold text-navy">4. Date of birth *</label>
                          <input 
                            type="date" id="dob" name="dob" value={formData.dob} onChange={handleTextChange}
                            className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.dob ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                          />
                          {errors.dob && <span className="text-xs text-red-500">{errors.dob}</span>}
                        </div>
                      </>
                    )}

                    {/* Email and WhatsApp */}
                    {isThaiEvent || isChinaEvent ? (
                      <div className="flex flex-col gap-2">
                        <label htmlFor="officialEmailWhatsapp" className="text-xs font-bold text-navy">
                          {isChinaEvent ? "4. Email and WhatsApp *" : "5. Email and WhatsApp *"}
                        </label>
                        <input 
                          type="text" id="officialEmailWhatsapp" name="officialEmailWhatsapp" value={formData.officialEmailWhatsapp} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.officialEmailWhatsapp ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                          placeholder="email@example.com / +62 812..."
                        />
                        {errors.officialEmailWhatsapp && <span className="text-xs text-red-500">{errors.officialEmailWhatsapp}</span>}
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="email" className="text-xs font-bold text-navy">6. Email *</label>
                          <input 
                            type="email" id="email" name="email" value={formData.email} onChange={handleTextChange}
                            className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.email ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                            placeholder="parent@example.com"
                          />
                          {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="whatsapp" className="text-xs font-bold text-navy">7. WhatsApp number *</label>
                          <input 
                            type="tel" id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleTextChange}
                            className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.whatsapp ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                            placeholder="+62 812 3456 7890"
                          />
                          {errors.whatsapp && <span className="text-xs text-red-500">{errors.whatsapp}</span>}
                        </div>
                      </>
                    )}

                    {/* Passport/ID Status */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="passportStatus" className="text-xs font-bold text-navy">
                        {isChinaEvent ? "5. Passport status and expiry *" : isThaiEvent ? "6. Passport/ID status *" : "8. Passport status"}
                      </label>
                      <select 
                        id="passportStatus" name="passportStatus" value={formData.passportStatus} onChange={handleTextChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky outline-none text-sm"
                      >
                        <option value="">Select status</option>
                        <option value="Valid">Valid</option>
                        <option value="In process">In process</option>
                        <option value={isThaiEvent ? "Not available yet" : "No passport yet"}>{isThaiEvent ? "Not available yet" : "No passport yet"}</option>
                      </select>
                    </div>

                    {/* Requested Role */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="requestedRole" className="text-xs font-bold text-navy">
                        {isChinaEvent ? "6. Requested role" : isThaiEvent ? "7. Requested participation" : "10. Requested role"}
                      </label>
                      <select 
                        id="requestedRole" name="requestedRole" value={formData.requestedRole} onChange={handleTextChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky outline-none text-sm"
                      >
                        <option value="">Select role/participation</option>
                        <option value={isChinaEvent ? "Travel/accommodation only" : isThaiEvent ? "Travel/accommodation only" : "Accommodation/travel only"}>{isChinaEvent || isThaiEvent ? "Travel/accommodation only" : "Accommodation/travel only"}</option>
                        <option value="Advisor if permitted">Advisor if permitted</option>
                        <option value="Observer/guest if permitted">Observer/guest if permitted</option>
                        <option value="Please advise">Please advise</option>
                      </select>
                    </div>

                    {/* Rooming Preference */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="roomPreference" className="text-xs font-bold text-navy">
                        {isChinaEvent ? "7. Rooming" : isThaiEvent ? "8. Accommodation preference" : "11. Room preference"}
                      </label>
                      <select 
                        id="roomPreference" name="roomPreference" value={formData.roomPreference} onChange={handleTextChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky outline-none text-sm"
                      >
                        <option value="">Select preference</option>
                        <option value="With child">With child</option>
                        <option value={isThaiEvent || isChinaEvent ? "Single" : "Single room"}>{isThaiEvent || isChinaEvent ? "Single" : "Single room"}</option>
                        <option value="Share with adult">Share with adult</option>
                        {isThaiEvent && <option value="No accommodation">No accommodation</option>}
                        <option value="Not decided">Not decided</option>
                      </select>
                    </div>

                    {/* Flights */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="travelArrangement" className="text-xs font-bold text-navy">
                        {isChinaEvent ? "8. Flights" : isThaiEvent ? "9. Travel arrangement" : "12. Travel arrangement"}
                      </label>
                      <select 
                        id="travelArrangement" name="travelArrangement" value={formData.travelArrangement} onChange={handleTextChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky outline-none text-sm"
                      >
                        <option value="">Select flights/travel</option>
                        <option value={isChinaEvent ? "EduGlobal group" : isThaiEvent ? "EduGlobal arrangement" : "EduGlobal group flights"}>{isChinaEvent ? "EduGlobal group" : isThaiEvent ? "EduGlobal arrangement" : "EduGlobal group flights"}</option>
                        <option value={isThaiEvent || isChinaEvent ? "Own flights" : "Own flights"}>Own flights</option>
                        <option value="Not decided">Not decided</option>
                      </select>
                    </div>

                    {/* Cultural Activities for China */}
                    {isChinaEvent && (
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="culturalActivities" className="text-xs font-bold text-navy">9. Educational/cultural activities</label>
                        <select 
                          id="culturalActivities" name="culturalActivities" value={formData.culturalActivities} onChange={handleTextChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky outline-none text-sm"
                        >
                          <option value="">Select option</option>
                          <option value="Join">Join</option>
                          <option value="Conference only if permitted">Conference only if permitted</option>
                          <option value="Send details">Send details</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ================= SECTION 2C: TEACHER OR SCHOOL GROUP ================= */}
              {category === "Teacher or school-group representative" && (
                <div className="bg-white rounded-2xl p-7 md:p-8 shadow-sm border border-[#E7EEF7]">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-sky/10 text-sky font-bold flex items-center justify-center text-sm">2C</span>
                      <h2 className="text-xl font-bold text-navy">Section 2C — Teacher or school group</h2>
                    </div>
                    <span className="text-xs font-bold bg-sky-pale text-sky px-3 py-1 rounded-full">School Delegation Path</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 1. School Name & Address */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label htmlFor="schoolOrgAddress" className="text-xs font-bold text-navy">1. School name and address *</label>
                      <input 
                        type="text" id="schoolOrgAddress" name="schoolOrgAddress" value={formData.schoolOrgAddress} onChange={handleTextChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.schoolOrgAddress ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        placeholder="School Name & Full Address"
                      />
                      {errors.schoolOrgAddress && <span className="text-xs text-red-500">{errors.schoolOrgAddress}</span>}
                    </div>

                    {/* 2. Primary Contact & Position */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="primaryContactPosition" className="text-xs font-bold text-navy">2. Primary contact and position *</label>
                      <input 
                        type="text" id="primaryContactPosition" name="primaryContactPosition" value={formData.primaryContactPosition} onChange={handleTextChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.primaryContactPosition ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        placeholder="e.g. Dr. Jane Smith, MUN Advisor"
                      />
                      {errors.primaryContactPosition && <span className="text-xs text-red-500">{errors.primaryContactPosition}</span>}
                    </div>

                    {/* 3. Official Email and WhatsApp */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="officialEmailWhatsapp" className="text-xs font-bold text-navy">3. Official email and WhatsApp *</label>
                      <input 
                        type="text" id="officialEmailWhatsapp" name="officialEmailWhatsapp" value={formData.officialEmailWhatsapp} onChange={handleTextChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.officialEmailWhatsapp ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        placeholder="email@school.edu / +62..."
                      />
                      {errors.officialEmailWhatsapp && <span className="text-xs text-red-500">{errors.officialEmailWhatsapp}</span>}
                    </div>

                    {/* 4. Estimated Delegates, Advisors, Parents */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="estDelegates" className="text-xs font-bold text-navy">4. Estimated student delegates *</label>
                      <input 
                        type="number" id="estDelegates" name="estDelegates" min="1" value={formData.estDelegates} onChange={handleTextChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.estDelegates ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        placeholder="e.g. 10"
                      />
                      {errors.estDelegates && <span className="text-xs text-red-500">{errors.estDelegates}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="estTeachers" className="text-xs font-bold text-navy">Estimated advisors/teachers *</label>
                      <input 
                        type="number" id="estTeachers" name="estTeachers" min="0" value={formData.estTeachers} onChange={handleTextChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.estTeachers ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        placeholder="e.g. 2"
                      />
                      {errors.estTeachers && <span className="text-xs text-red-500">{errors.estTeachers}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="estParents" className="text-xs font-bold text-navy">Estimated accompanying parents *</label>
                      <input 
                        type="number" id="estParents" name="estParents" min="0" value={formData.estParents} onChange={handleTextChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.estParents ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        placeholder="e.g. 3"
                      />
                      {errors.estParents && <span className="text-xs text-red-500">{errors.estParents}</span>}
                    </div>

                    {/* Group MUN Experience */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="groupMunExp" className="text-xs font-bold text-navy">6. Group MUN experience</label>
                      <select 
                        id="groupMunExp" name="groupMunExp" value={formData.groupMunExp} onChange={handleTextChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky outline-none text-sm"
                      >
                        <option value="">Select experience level</option>
                        <option value="First-time">First-time</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Mixed">Mixed</option>
                      </select>
                    </div>

                    {/* Pre-conference Training */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="trainingRequired" className="text-xs font-bold text-navy">7. Pre-conference training required?</label>
                      <select 
                        id="trainingRequired" name="trainingRequired" value={formData.trainingRequired} onChange={handleTextChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky outline-none text-sm"
                      >
                        <option value="">Select option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Send information">Send information</option>
                      </select>
                    </div>

                    {/* Payment Method / Arrangement */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="paymentArrangement" className="text-xs font-bold text-navy">8. Registration/payment arrangement</label>
                      <select 
                        id="paymentArrangement" name="paymentArrangement" value={formData.paymentArrangement} onChange={handleTextChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky outline-none text-sm"
                      >
                        <option value="">Select method</option>
                        <option value={isChinaEvent ? "School" : isThaiEvent ? "School payment" : "School registers and pays"}>{isChinaEvent ? "School" : isThaiEvent ? "School payment" : "School registers and pays"}</option>
                        <option value={isChinaEvent ? "Families" : isThaiEvent ? "Individual family payment" : "Families register individually"}>{isChinaEvent ? "Families" : isThaiEvent ? "Individual family payment" : "Families register individually"}</option>
                        <option value="Combination">Combination</option>
                        <option value="Not decided">Not decided</option>
                      </select>
                    </div>

                    {/* Student Age Range */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold text-navy">5. Student age range (Select all that apply)</label>
                      <div className="flex flex-wrap gap-3">
                        {AGE_RANGES.map((age) => (
                          <label key={age} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer ${formData.studentAgeRange.includes(age) ? "border-sky bg-sky/5 text-navy" : "border-gray-200"}`}>
                            <input 
                              type="checkbox" 
                              checked={formData.studentAgeRange.includes(age)}
                              onChange={() => handleCheckboxArrayToggle("studentAgeRange", age)}
                              className="accent-sky w-4 h-4"
                            />
                            <span>{age}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Required Documents */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold text-navy">9. Required documents from EduGlobal</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {getRequiredDocOptions().map((doc) => (
                          <label key={doc} className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold cursor-pointer ${formData.requiredDocuments.includes(doc) ? "border-sky bg-sky/5 text-navy" : "border-gray-200"}`}>
                            <input 
                              type="checkbox" 
                              checked={formData.requiredDocuments.includes(doc)}
                              onChange={() => handleCheckboxArrayToggle("requiredDocuments", doc)}
                              className="accent-sky w-4 h-4"
                            />
                            <span>{doc}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Additional Needs / Requirements */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label htmlFor="additionalRequests" className="text-xs font-bold text-navy">
                        {isChinaEvent ? "10. Additional needs" : "10. Additional requirements"}
                      </label>
                      <textarea 
                        id="additionalRequests" name="additionalRequests" rows="3" value={formData.additionalRequests} onChange={handleTextChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky outline-none text-sm"
                        placeholder="Any special notes or group requirements..."
                      />
                    </div>

                    <div className="md:col-span-2 bg-amber-50 border border-amber-200 text-amber-900 text-xs p-4 rounded-xl font-medium">
                      ℹ️ Each student must subsequently submit an individual participant form.
                    </div>
                  </div>
                </div>
              )}

              {/* ================= SECTION 3: PARENT INFO FOR STUDENT REGISTRATIONS ================= */}
              {category === "Student delegate" && (
                <div className="bg-white rounded-2xl p-7 md:p-8 shadow-sm border border-[#E7EEF7]">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                    <span className="w-8 h-8 rounded-xl bg-sky/10 text-sky font-bold flex items-center justify-center text-sm">3</span>
                    <h2 className="text-xl font-bold text-navy">Section 3 — Parent information for students</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Parent Name & Relationship */}
                    {isThaiEvent || isChinaEvent ? (
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="parentNameRelationship" className="text-xs font-bold text-navy">1. Parent/legal guardian name and relationship *</label>
                        <input 
                          type="text" id="parentNameRelationship" name="parentNameRelationship" value={formData.parentNameRelationship} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.parentNameRelationship ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                          placeholder="e.g. Robert Widjaja (Father)"
                        />
                        {errors.parentNameRelationship && <span className="text-xs text-red-500">{errors.parentNameRelationship}</span>}
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="parentFullName" className="text-xs font-bold text-navy">1. Parent/legal guardian full name *</label>
                          <input 
                            type="text" id="parentFullName" name="parentFullName" value={formData.parentFullName} onChange={handleTextChange}
                            className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.parentFullName ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                            placeholder="Parent / Guardian Full Name"
                          />
                          {errors.parentFullName && <span className="text-xs text-red-500">{errors.parentFullName}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="parentRelationship" className="text-xs font-bold text-navy">2. Relationship *</label>
                          <select 
                            id="parentRelationship" name="parentRelationship" value={formData.parentRelationship} onChange={handleTextChange}
                            className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.parentRelationship ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                          >
                            <option value="">Select relationship</option>
                            <option value="Mother">Mother</option>
                            <option value="Father">Father</option>
                            <option value="Legal guardian">Legal guardian</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.parentRelationship && <span className="text-xs text-red-500">{errors.parentRelationship}</span>}
                        </div>
                      </>
                    )}

                    {/* Email and WhatsApp */}
                    {isThaiEvent || isChinaEvent ? (
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="parentEmailWhatsapp" className="text-xs font-bold text-navy">2. Email and WhatsApp *</label>
                        <input 
                          type="text" id="parentEmailWhatsapp" name="parentEmailWhatsapp" value={formData.parentEmailWhatsapp} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.parentEmailWhatsapp ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                          placeholder="parent@example.com / +62 812..."
                        />
                        {errors.parentEmailWhatsapp && <span className="text-xs text-red-500">{errors.parentEmailWhatsapp}</span>}
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="parentEmail" className="text-xs font-bold text-navy">3. Parent Email *</label>
                          <input 
                            type="email" id="parentEmail" name="parentEmail" value={formData.parentEmail} onChange={handleTextChange}
                            className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.parentEmail ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                            placeholder="parent@example.com"
                          />
                          {errors.parentEmail && <span className="text-xs text-red-500">{errors.parentEmail}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="parentWhatsapp" className="text-xs font-bold text-navy">4. Parent WhatsApp number *</label>
                          <input 
                            type="tel" id="parentWhatsapp" name="parentWhatsapp" value={formData.parentWhatsapp} onChange={handleTextChange}
                            className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.parentWhatsapp ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                            placeholder="+62 812 3456 7890"
                          />
                          {errors.parentWhatsapp && <span className="text-xs text-red-500">{errors.parentWhatsapp}</span>}
                        </div>
                      </>
                    )}

                    {/* Residential Address */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label htmlFor="parentAddress" className="text-xs font-bold text-navy">3. Residential address *</label>
                      <textarea 
                        id="parentAddress" name="parentAddress" rows="3" value={formData.parentAddress} onChange={handleTextChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.parentAddress ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        placeholder="Street Address, City, Postal Code, Country"
                      />
                      {errors.parentAddress && <span className="text-xs text-red-500">{errors.parentAddress}</span>}
                    </div>

                    {/* Accompanying & Approval */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="parentAccompanying" className="text-xs font-bold text-navy">
                        {isChinaEvent ? "4. Accompanying the student?" : "4. Will the parent accompany the student?"}
                      </label>
                      <select 
                        id="parentAccompanying" name="parentAccompanying" value={formData.parentAccompanying} onChange={handleTextChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky outline-none text-sm"
                      >
                        <option value="">Select option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Not decided">Not decided</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="parentApproval" className="text-xs font-bold text-navy">5. Registration approval *</label>
                      <select 
                        id="parentApproval" name="parentApproval" value={formData.parentApproval} onChange={handleTextChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.parentApproval ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                      >
                        <option value="">Select approval status</option>
                        <option value="I approve">I approve</option>
                        <option value="Approval pending">Approval pending</option>
                      </select>
                      {errors.parentApproval && <span className="text-xs text-red-500">{errors.parentApproval}</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* ================= SECTION 4: VISA, FLIGHTS & ACCOMMODATION ================= */}
              <div className="bg-white rounded-2xl p-7 md:p-8 shadow-sm border border-[#E7EEF7]">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                  <span className="w-8 h-8 rounded-xl bg-sky/10 text-sky font-bold flex items-center justify-center text-sm">4</span>
                  <h2 className="text-xl font-bold text-navy">
                    {isChinaEvent ? "Section 4 — China visa, flights, and accommodation" : isThaiEvent ? "Section 4 — Travel, accommodation, and package" : "Section 4 — U.S. visa and travel"}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {isChinaEvent ? (
                    <>
                      {/* 1. China Visa Status */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="chinaVisaStatus" className="text-xs font-bold text-navy">1. China visa status *</label>
                        <select 
                          id="chinaVisaStatus" name="chinaVisaStatus" value={formData.chinaVisaStatus} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.chinaVisaStatus ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select visa status</option>
                          <option value="Valid visa">Valid visa</option>
                          <option value="Need to apply">Need to apply</option>
                          <option value="Application in progress">Application in progress</option>
                          <option value="May qualify for visa-free entry">May qualify for visa-free entry</option>
                          <option value="Not sure">Not sure</option>
                        </select>
                        {errors.chinaVisaStatus && <span className="text-xs text-red-500">{errors.chinaVisaStatus}</span>}
                      </div>

                      {/* 2. Visa Support Letter */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="visaLetterRequired" className="text-xs font-bold text-navy">2. Customized visa-support letter required? *</label>
                        <select 
                          id="visaLetterRequired" name="visaLetterRequired" value={formData.visaLetterRequired} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.visaLetterRequired ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                          <option value="Not sure">Not sure</option>
                        </select>
                        {errors.visaLetterRequired && <span className="text-xs text-red-500">{errors.visaLetterRequired}</span>}
                      </div>

                      {/* 3. Visa Application Location (Conditional) */}
                      {(formData.chinaVisaStatus === "Need to apply" || formData.chinaVisaStatus === "Application in progress") && (
                        <div className="flex flex-col gap-2">
                          <label htmlFor="visaCity" className="text-xs font-bold text-navy">3. Visa application country/city *</label>
                          <input 
                            type="text" id="visaCity" name="visaCity" value={formData.visaCity} onChange={handleTextChange}
                            className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.visaCity ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                            placeholder="e.g. Jakarta, Indonesia"
                          />
                          {errors.visaCity && <span className="text-xs text-red-500">{errors.visaCity}</span>}
                        </div>
                      )}

                      {/* 4. Preferred Departure City */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="departureCity" className="text-xs font-bold text-navy">4. Preferred departure city *</label>
                        <input 
                          type="text" id="departureCity" name="departureCity" value={formData.departureCity} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.departureCity ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                          placeholder="e.g. Jakarta (CGK) / Surabaya (SUB)"
                        />
                        {errors.departureCity && <span className="text-xs text-red-500">{errors.departureCity}</span>}
                      </div>

                      {/* 5. Flight Arrangement */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="flightArrangement" className="text-xs font-bold text-navy">5. Flight arrangement *</label>
                        <select 
                          id="flightArrangement" name="flightArrangement" value={formData.flightArrangement} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.flightArrangement ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select flight option</option>
                          <option value="EduGlobal group flights">EduGlobal group flights</option>
                          <option value="Own flights">Own flights</option>
                          <option value="Not decided">Not decided</option>
                        </select>
                        {errors.flightArrangement && <span className="text-xs text-red-500">{errors.flightArrangement}</span>}
                      </div>

                      {/* 6. Accommodation */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="accommodationPref" className="text-xs font-bold text-navy">6. Accommodation *</label>
                        <select 
                          id="accommodationPref" name="accommodationPref" value={formData.accommodationPref} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.accommodationPref ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select option</option>
                          <option value="Twin sharing">Twin sharing</option>
                          <option value="Single at extra cost">Single at extra cost</option>
                          <option value="Parent/student room">Parent/student room</option>
                          <option value="School arrangement">School arrangement</option>
                          <option value="Not decided">Not decided</option>
                        </select>
                        {errors.accommodationPref && <span className="text-xs text-red-500">{errors.accommodationPref}</span>}
                      </div>

                      {/* 7. Educational and Cultural Programme */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="educationalCulturalProg" className="text-xs font-bold text-navy">7. Educational and cultural programme *</label>
                        <select 
                          id="educationalCulturalProg" name="educationalCulturalProg" value={formData.educationalCulturalProg} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.educationalCulturalProg ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select option</option>
                          <option value="Interested">Interested</option>
                          <option value="Conference only">Conference only</option>
                          <option value="Send details">Send details</option>
                        </select>
                        {errors.educationalCulturalProg && <span className="text-xs text-red-500">{errors.educationalCulturalProg}</span>}
                      </div>

                      {/* 8. Accommodation Confirmation Needed for Visa? */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="visaAccommodationConfirm" className="text-xs font-bold text-navy">8. Accommodation confirmation needed for visa? *</label>
                        <select 
                          id="visaAccommodationConfirm" name="visaAccommodationConfirm" value={formData.visaAccommodationConfirm} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.visaAccommodationConfirm ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                          <option value="Not sure">Not sure</option>
                        </select>
                        {errors.visaAccommodationConfirm && <span className="text-xs text-red-500">{errors.visaAccommodationConfirm}</span>}
                      </div>

                      {/* 9. Previous Travel to Mainland China */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="previousChinaTravel" className="text-xs font-bold text-navy">9. Previous travel to mainland China *</label>
                        <select 
                          id="previousChinaTravel" name="previousChinaTravel" value={formData.previousChinaTravel} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.previousChinaTravel ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.previousChinaTravel && <span className="text-xs text-red-500">{errors.previousChinaTravel}</span>}
                      </div>

                      {/* 10. Special Arrival/Departure Arrangements */}
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="specialArrivalDeparture" className="text-xs font-bold text-navy">10. Special arrival/departure arrangements (Optional)</label>
                        <textarea 
                          id="specialArrivalDeparture" name="specialArrivalDeparture" rows="3" value={formData.specialArrivalDeparture} onChange={handleTextChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky outline-none text-sm"
                          placeholder="Note any specific travel, flight timing, or arrival needs..."
                        />
                      </div>
                    </>
                  ) : isThaiEvent ? (
                    <>
                      {/* Thai fields */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="departureCityCountry" className="text-xs font-bold text-navy">1. City and country of departure *</label>
                        <input 
                          type="text" id="departureCityCountry" name="departureCityCountry" value={formData.departureCityCountry} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.departureCityCountry ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                          placeholder="e.g. Jakarta, Indonesia"
                        />
                        {errors.departureCityCountry && <span className="text-xs text-red-500">{errors.departureCityCountry}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="travelRequirement" className="text-xs font-bold text-navy">2. Travel requirement *</label>
                        <select 
                          id="travelRequirement" name="travelRequirement" value={formData.travelRequirement} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.travelRequirement ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select requirement</option>
                          <option value="Bangkok-based/no travel">Bangkok-based/no travel</option>
                          <option value="Domestic support">Domestic support</option>
                          <option value="International support">International support</option>
                          <option value="Own arrangements">Own arrangements</option>
                        </select>
                        {errors.travelRequirement && <span className="text-xs text-red-500">{errors.travelRequirement}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="accommodationPref" className="text-xs font-bold text-navy">3. Accommodation *</label>
                        <select 
                          id="accommodationPref" name="accommodationPref" value={formData.accommodationPref} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.accommodationPref ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select option</option>
                          <option value="None">None</option>
                          <option value="Twin sharing">Twin sharing</option>
                          <option value="Single at extra cost">Single at extra cost</option>
                          <option value="Parent/student room">Parent/student room</option>
                          <option value="School group arrangement">School group arrangement</option>
                        </select>
                        {errors.accommodationPref && <span className="text-xs text-red-500">{errors.accommodationPref}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="thaiImmigrationStatus" className="text-xs font-bold text-navy">4. Thailand immigration status for international participants *</label>
                        <select 
                          id="thaiImmigrationStatus" name="thaiImmigrationStatus" value={formData.thaiImmigrationStatus} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.thaiImmigrationStatus ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select status</option>
                          <option value="No visa required">No visa required</option>
                          <option value="Valid visa/permission to stay">Valid visa/permission to stay</option>
                          <option value="Need guidance/support">Need guidance/support</option>
                          <option value="Not sure">Not sure</option>
                        </select>
                        {errors.thaiImmigrationStatus && <span className="text-xs text-red-500">{errors.thaiImmigrationStatus}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="visaLetterRequired" className="text-xs font-bold text-navy">5. Visa-support or customized invitation required? *</label>
                        <select 
                          id="visaLetterRequired" name="visaLetterRequired" value={formData.visaLetterRequired} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.visaLetterRequired ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                          <option value="Not sure">Not sure</option>
                        </select>
                        {errors.visaLetterRequired && <span className="text-xs text-red-500">{errors.visaLetterRequired}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="preferredPackage" className="text-xs font-bold text-navy">6. Preferred package *</label>
                        <select 
                          id="preferredPackage" name="preferredPackage" value={formData.preferredPackage} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.preferredPackage ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select package tier</option>
                          <option value="Registration only">Registration only</option>
                          <option value="Conference and training">Conference and training</option>
                          <option value="Full programme with accommodation/activities">Full programme with accommodation/activities</option>
                          <option value="School group package">School group package</option>
                          <option value="Please advise">Please advise</option>
                        </select>
                        {errors.preferredPackage && <span className="text-xs text-red-500">{errors.preferredPackage}</span>}
                      </div>

                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="localTransportRequired" className="text-xs font-bold text-navy">7. Local transportation required? *</label>
                        <select 
                          id="localTransportRequired" name="localTransportRequired" value={formData.localTransportRequired} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.localTransportRequired ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                          <option value="Not sure">Not sure</option>
                        </select>
                        {errors.localTransportRequired && <span className="text-xs text-red-500">{errors.localTransportRequired}</span>}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Boston fields */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="visaStatus" className="text-xs font-bold text-navy">1. U.S. visa status *</label>
                        <select 
                          id="visaStatus" name="visaStatus" value={formData.visaStatus} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.visaStatus ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select visa status</option>
                          <option value="Valid U.S. visa">Valid U.S. visa</option>
                          <option value="Need to apply">Need to apply</option>
                          <option value="Application in progress">Application in progress</option>
                          <option value="Eligible for ESTA/Visa Waiver Program">Eligible for ESTA/Visa Waiver Program</option>
                          <option value="Not sure">Not sure</option>
                        </select>
                        {errors.visaStatus && <span className="text-xs text-red-500">{errors.visaStatus}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="visaLetterRequired" className="text-xs font-bold text-navy">2. Customized HMUN visa-support letter required? *</label>
                        <select 
                          id="visaLetterRequired" name="visaLetterRequired" value={formData.visaLetterRequired} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.visaLetterRequired ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                          <option value="Not sure">Not sure</option>
                        </select>
                        {errors.visaLetterRequired && <span className="text-xs text-red-500">{errors.visaLetterRequired}</span>}
                      </div>

                      {(formData.visaStatus === "Need to apply" || formData.visaStatus === "Application in progress") && (
                        <div className="flex flex-col gap-2">
                          <label htmlFor="visaCity" className="text-xs font-bold text-navy">3. Visa application country/city *</label>
                          <input 
                            type="text" id="visaCity" name="visaCity" value={formData.visaCity} onChange={handleTextChange}
                            className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.visaCity ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                            placeholder="e.g. Jakarta, Indonesia"
                          />
                          {errors.visaCity && <span className="text-xs text-red-500">{errors.visaCity}</span>}
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        <label htmlFor="departureCity" className="text-xs font-bold text-navy">4. Preferred departure city *</label>
                        <input 
                          type="text" id="departureCity" name="departureCity" value={formData.departureCity} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.departureCity ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                          placeholder="e.g. Jakarta (CGK) / Surabaya (SUB)"
                        />
                        {errors.departureCity && <span className="text-xs text-red-500">{errors.departureCity}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="flightArrangement" className="text-xs font-bold text-navy">5. Flight arrangement *</label>
                        <select 
                          id="flightArrangement" name="flightArrangement" value={formData.flightArrangement} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.flightArrangement ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select flight option</option>
                          <option value="EduGlobal group flight">EduGlobal group flight</option>
                          <option value="Own flights">Own flights</option>
                          <option value="Not decided">Not decided</option>
                        </select>
                        {errors.flightArrangement && <span className="text-xs text-red-500">{errors.flightArrangement}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="accommodationPref" className="text-xs font-bold text-navy">6. Accommodation *</label>
                        <select 
                          id="accommodationPref" name="accommodationPref" value={formData.accommodationPref} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.accommodationPref ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select option</option>
                          <option value="Twin sharing">Twin sharing</option>
                          <option value="Single at extra cost">Single at extra cost</option>
                          <option value="Parent/student room">Parent/student room</option>
                          <option value="School arrangement">School arrangement</option>
                          <option value="Not decided">Not decided</option>
                        </select>
                        {errors.accommodationPref && <span className="text-xs text-red-500">{errors.accommodationPref}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="winterReadiness" className="text-xs font-bold text-navy">7. Winter readiness (Boston in January is sub-zero) *</label>
                        <select 
                          id="winterReadiness" name="winterReadiness" value={formData.winterReadiness} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.winterReadiness ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select readiness status</option>
                          <option value="I understand and will bring suitable clothing">I understand and will bring suitable clothing</option>
                          <option value="I need guidance">I need guidance</option>
                        </select>
                        {errors.winterReadiness && <span className="text-xs text-red-500">{errors.winterReadiness}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="harvardExtension" className="text-xs font-bold text-navy">8. Harvard/MIT educational extension *</label>
                        <select 
                          id="harvardExtension" name="harvardExtension" value={formData.harvardExtension} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.harvardExtension ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select option</option>
                          <option value="Interested">Interested</option>
                          <option value="Conference only">Conference only</option>
                          <option value="Send details">Send details</option>
                        </select>
                        {errors.harvardExtension && <span className="text-xs text-red-500">{errors.harvardExtension}</span>}
                      </div>

                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="visaAccommodationConfirm" className="text-xs font-bold text-navy">9. Do you require an accommodation confirmation for your visa? *</label>
                        <select 
                          id="visaAccommodationConfirm" name="visaAccommodationConfirm" value={formData.visaAccommodationConfirm} onChange={handleTextChange}
                          className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.visaAccommodationConfirm ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        >
                          <option value="">Select option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                          <option value="Not sure">Not sure</option>
                        </select>
                        {errors.visaAccommodationConfirm && <span className="text-xs text-red-500">{errors.visaAccommodationConfirm}</span>}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* ================= SECTION 5: HEALTH, DIETARY, AND EMERGENCY DETAILS ================= */}
              <div className="bg-white rounded-2xl p-7 md:p-8 shadow-sm border border-[#E7EEF7]">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                  <span className="w-8 h-8 rounded-xl bg-sky/10 text-sky font-bold flex items-center justify-center text-sm">5</span>
                  <h2 className="text-xl font-bold text-navy">Section 5 — Health, dietary, and emergency details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Dietary Requirements */}
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs font-bold text-navy">1. Dietary requirements (Select all that apply)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-1">
                      {DIETARY_OPTIONS.map((item) => (
                        <label key={item} className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${formData.dietaryReqs.includes(item) ? "border-sky bg-sky/5 text-navy" : "border-gray-200 hover:border-sky/30"}`}>
                          <input 
                            type="checkbox" 
                            checked={formData.dietaryReqs.includes(item)}
                            onChange={() => handleCheckboxArrayToggle("dietaryReqs", item)}
                            className="accent-sky w-4 h-4"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Food Allergies */}
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="foodAllergies" className="text-xs font-bold text-navy">2. Food allergies * (Write "None" if not applicable)</label>
                    <textarea 
                      id="foodAllergies" name="foodAllergies" rows="2" value={formData.foodAllergies} onChange={handleTextChange}
                      className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.foodAllergies ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                      placeholder='Write "None" if not applicable'
                    />
                    {errors.foodAllergies && <span className="text-xs text-red-500">{errors.foodAllergies}</span>}
                  </div>

                  {/* Medical Conditions */}
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="medicalConditions" className="text-xs font-bold text-navy">3. Medical conditions/accessibility needs * (Write "None" if not applicable)</label>
                    <textarea 
                      id="medicalConditions" name="medicalConditions" rows="2" value={formData.medicalConditions} onChange={handleTextChange}
                      className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.medicalConditions ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                      placeholder='Write "None" if not applicable'
                    />
                    {errors.medicalConditions && <span className="text-xs text-red-500">{errors.medicalConditions}</span>}
                  </div>

                  {/* Regular/Emergency Medication */}
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="regularMedication" className="text-xs font-bold text-navy">
                      {isChinaEvent ? "4. Medication * (Write \"None\" if not applicable)" : "4. Regular/emergency medication * (Write \"None\" if not applicable)"}
                    </label>
                    <textarea 
                      id="regularMedication" name="regularMedication" rows="2" value={formData.regularMedication} onChange={handleTextChange}
                      className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.regularMedication ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                      placeholder='Write "None" if not applicable'
                    />
                    {errors.regularMedication && <span className="text-xs text-red-500">{errors.regularMedication}</span>}
                  </div>

                  {/* Emergency Contact */}
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="emergencyContact" className="text-xs font-bold text-navy">5. Emergency contact name, relationship, and phone *</label>
                    <input 
                      type="text" id="emergencyContact" name="emergencyContact" value={formData.emergencyContact} onChange={handleTextChange}
                      className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.emergencyContact ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                      placeholder="e.g. Mary Widjaja (Mother) - +62 811 2233 4455"
                    />
                    {errors.emergencyContact && <span className="text-xs text-red-500">{errors.emergencyContact}</span>}
                  </div>

                  {/* Travel Insurance */}
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="travelInsurance" className="text-xs font-bold text-navy">6. Travel insurance *</label>
                    <select 
                      id="travelInsurance" name="travelInsurance" value={formData.travelInsurance} onChange={handleTextChange}
                      className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.travelInsurance ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                    >
                      <option value="">Select insurance option</option>
                      <option value="Already covered">Already covered</option>
                      <option value="Will purchase">Will purchase</option>
                      <option value="Need information">Need information</option>
                    </select>
                    {errors.travelInsurance && <span className="text-xs text-red-500">{errors.travelInsurance}</span>}
                  </div>

                  {/* Chicken Allergy / Protein Restrictions for China */}
                  {isChinaEvent && (
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label htmlFor="chickenProteinAllergy" className="text-xs font-bold text-navy">7. Chicken allergy or other protein restrictions * (Write "None" if not applicable)</label>
                      <textarea 
                        id="chickenProteinAllergy" name="chickenProteinAllergy" rows="2" value={formData.chickenProteinAllergy} onChange={handleTextChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.chickenProteinAllergy ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                        placeholder='Write "None" if not applicable'
                      />
                      {errors.chickenProteinAllergy && <span className="text-xs text-red-500">{errors.chickenProteinAllergy}</span>}
                    </div>
                  )}
                </div>
              </div>

              {/* ================= SECTION 6: CHINA TRAVEL READINESS (CHINA SPECIFIC) ================= */}
              {isChinaEvent && (
                <div className="bg-white rounded-2xl p-7 md:p-8 shadow-sm border border-[#E7EEF7]">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                    <span className="w-8 h-8 rounded-xl bg-sky/10 text-sky font-bold flex items-center justify-center text-sm">6</span>
                    <h2 className="text-xl font-bold text-navy">Section 6 — China travel readiness</h2>
                  </div>

                  <p className="text-xs text-muted mb-6">
                    Please review and acknowledge China-specific travel readiness policies.
                  </p>

                  <div className="space-y-4">
                    {[
                      { field: "chinaAppAccess", text: "1. I understand that some international apps/websites may have limited access in mainland China." },
                      { field: "chinaPowerBank", text: "2. I will comply with airline rules for power banks and required safety markings." },
                      { field: "chinaLawsComply", text: "3. I will follow Chinese immigration, hotel registration, customs, and local laws." },
                      { field: "chinaArrivalDetails", text: "4. I will provide arrival details and any independent travel plans by the deadline." },
                    ].map((item) => (
                      <div key={item.field} className="flex flex-col gap-1">
                        <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData[item.field] ? "border-sky bg-sky/5 text-navy" : "border-gray-200 hover:border-sky/30"}`}>
                          <input 
                            type="checkbox"
                            checked={formData[item.field]}
                            onChange={() => handleSingleBooleanToggle(item.field)}
                            className="mt-0.5 accent-sky w-4 h-4 shrink-0"
                          />
                          <span className="text-xs font-semibold leading-relaxed">{item.text}</span>
                        </label>
                        {errors[item.field] && <span className="text-xs text-red-500 pl-2">{errors[item.field]}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= DECLARATIONS SECTION ================= */}
              <div className="bg-white rounded-2xl p-7 md:p-8 shadow-sm border border-[#E7EEF7]">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                  <span className="w-8 h-8 rounded-xl bg-sky/10 text-sky font-bold flex items-center justify-center text-sm">{isChinaEvent ? "7" : "6"}</span>
                  <h2 className="text-xl font-bold text-navy">
                    {isChinaEvent ? "Section 7 — Declarations" : "Section 6 — Declarations"}
                  </h2>
                </div>

                <p className="text-xs text-muted mb-6">
                  Please review and accept each statement below to complete your registration application.
                </p>

                <div className="space-y-4">
                  {[
                    { field: "declAccurate", text: "1. Information submitted is accurate." },
                    { field: "declNoGuarantee", text: "2. Submission does not guarantee acceptance or a place." },
                    { field: "declPrefNotGuaranteed", text: isChinaEvent ? "3. Committee, country/character, room, flight, and activity preferences are not guaranteed." : isThaiEvent ? "3. Committee, country, accommodation, and travel preferences are not guaranteed." : "3. I understand that committee, country, hotel, room, and travel preferences are not guaranteed." },
                    { field: "declConductRules", text: isChinaEvent ? "4. Participant agrees to EduGlobal Academy, HMUN China, hotel, and safeguarding rules." : isThaiEvent ? "4. Participant will follow EduGlobal Academy and Thai National MUN rules." : "4. I agree to follow EduGlobal Academy and HMUN conduct and safeguarding rules." },
                    { field: "declPaymentTerms", text: isChinaEvent ? "5. Payment, cancellation, refund, and replacement terms follow the programme agreement/invoice." : isThaiEvent ? "5. Payment, cancellation, refund, and replacement terms will follow the programme agreement/invoice." : "5. I accept that payment, cancellation, refund, and replacement terms will be stated in the programme agreement/invoice." },
                    { field: "declDataSharing", text: isChinaEvent ? "6. Necessary information may be shared with HMUN China, hotels, airlines, transport providers, insurers, visa-supporting organizations, and emergency providers." : isThaiEvent ? "6. Necessary information may be shared with the organizer, hotels, transport providers, insurers, and emergency providers." : "6. I consent to necessary data being shared with HMUN, hotels, airlines, transport providers, insurers, and visa-supporting organizations for programme administration and safety." },
                    { field: "declParentApproval", text: isChinaEvent ? "7. Parent/legal guardian approval is confirmed for a minor." : isThaiEvent ? "7. Parent/legal guardian approves participation for a minor." : "7. For a participant under 18, I confirm parent/legal guardian approval." },
                  ].map((item) => (
                    <div key={item.field} className="flex flex-col gap-1">
                      <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData[item.field] ? "border-sky bg-sky/5 text-navy" : "border-gray-200 hover:border-sky/30"}`}>
                        <input 
                          type="checkbox"
                          checked={formData[item.field]}
                          onChange={() => handleSingleBooleanToggle(item.field)}
                          className="mt-0.5 accent-sky w-4 h-4 shrink-0"
                        />
                        <span className="text-xs font-semibold leading-relaxed">{item.text}</span>
                      </label>
                      {errors[item.field] && <span className="text-xs text-red-500 pl-2">{errors[item.field]}</span>}
                    </div>
                  ))}

                  {/* 8. Person Completing Form */}
                  <div className="flex flex-col gap-2 pt-4">
                    <label htmlFor="completedBy" className="text-xs font-bold text-navy">8. Name and relationship of person completing the form *</label>
                    <input 
                      type="text" id="completedBy" name="completedBy" value={formData.completedBy} onChange={handleTextChange}
                      className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${errors.completedBy ? "border-red-500" : "border-gray-200 focus:border-sky"}`}
                      placeholder="e.g. Self / Parent / Advisor Name"
                    />
                    {errors.completedBy && <span className="text-xs text-red-500">{errors.completedBy}</span>}
                  </div>

                  {/* 9. Additional Questions */}
                  <div className="flex flex-col gap-2 pt-2">
                    <label htmlFor="additionalQuestions" className="text-xs font-bold text-navy">9. Additional questions (Optional)</label>
                    <textarea 
                      id="additionalQuestions" name="additionalQuestions" rows="3" value={formData.additionalQuestions} onChange={handleTextChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky outline-none text-sm"
                      placeholder="Any questions or special notes for the EduGlobal team..."
                    />
                  </div>
                </div>
              </div>

            </form>

          </div>

          {/* Right Column: Sticky Summary & Action Card */}
          <div className="bg-navy rounded-2xl p-8 text-white h-fit sticky top-8 shadow-xl">
            <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-3">Registration Overview</h3>
            
            <div className="flex justify-between items-start mb-3 text-xs gap-2">
              <span className="text-white/70">Summit Delegation</span>
              <span className="font-bold text-right text-sky-light">{eventInfo.subtitle}</span>
            </div>
            
            <div className="flex justify-between items-center mb-3 text-xs">
              <span className="text-white/70">Conference Dates</span>
              <span className="font-bold text-right">{eventInfo.dates}</span>
            </div>

            <div className="flex justify-between items-center mb-4 text-xs">
              <span className="text-white/70">Selected Role</span>
              <span className="font-bold text-right text-sky capitalize">{category}</span>
            </div>

            <div className="border-t border-white/20 pt-4 mb-6">
              <div className="bg-white/10 p-4 rounded-xl text-xs space-y-2 text-white/80">
                <div className="flex justify-between font-bold text-white">
                  <span>Quota Status</span>
                  <span className="text-green font-extrabold">Open Application</span>
                </div>
                <p className="text-[11px] text-white/60 leading-relaxed">
                  Submission puts your application under eligibility review. Confirmation occurs upon written approval and payment.
                </p>
              </div>
            </div>

            <button 
              type="submit" 
              form="registration-form" 
              disabled={submitting}
              className="w-full bg-green hover:bg-[#1db365] text-white font-extrabold py-4 rounded-full transition-all hover:shadow-[0_10px_24px_rgba(32,201,114,0.4)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
            >
              {submitting ? "Submitting Application..." : "Submit Registration Form"}
            </button>

            <div className="mt-4 text-center">
              <p className="text-[11px] text-white/50 flex items-center justify-center gap-1.5">
                🔒 256-bit Secure Encrypted Registration
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F5F8FC] flex items-center justify-center font-poppins text-navy font-bold">
        Loading Registration Form...
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
