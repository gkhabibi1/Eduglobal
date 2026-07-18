"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  // --- Form, Package & Validation State ---
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    school: "",
  });
  const [selectedPackage, setSelectedPackage] = useState("standard");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // --- Slider State & Logic ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderImages = [
    "https://picsum.photos/seed/summit1/800/400",
    "https://picsum.photos/seed/summit2/800/400",
    "https://picsum.photos/seed/summit3/800/400",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Hapus pesan error saat user mulai mengetik ulang
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9+\-\s()]+$/; // Hanya angka dan simbol telepon

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email format is invalid.";
    
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Phone number can only contain numbers and + symbol.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setSubmitting(true);
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            school: formData.school,
            package: selectedPackage,
          }),
        });

        const result = await response.json();
        
        if (response.ok && result.success) {
          setIsSubmitted(true);
        } else {
          alert("Gagal mengirim pendaftaran: " + (result.message || "Unknown error"));
        }
      } catch (err) {
        console.error("Submit error:", err);
        alert("Terjadi kesalahan koneksi saat mengirim pendaftaran.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  // --- Jika Form Berhasil Disubmit (Tampilkan Success State) ---
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] font-poppins flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl p-10 md:p-14 max-w-[600px] w-full text-center shadow-xl border border-[#E7EEF7]">
          <div className="w-24 h-24 bg-green/10 text-green rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
            ✓
          </div>
          <h2 className="text-3xl font-extrabold text-navy mb-4">Application Received!</h2>
          <p className="text-muted leading-relaxed mb-8">
            Thank you, <strong>{formData.fullName}</strong>. Your application for the EduGlobal Summit 2026 has been successfully submitted. We have sent a confirmation email to <strong>{formData.email}</strong> with the next steps for your payment.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-navy hover:bg-[#1a1f4b] text-white font-bold py-4 px-10 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8FC] font-poppins pb-20">
      {/* Header */}
      <header className="bg-navy py-6 px-8 mb-10 shadow-md">
        <div className="max-w-[1180px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-extrabold text-[19px] text-white">
            <span className="w-[34px] h-[34px] rounded-[10px] bg-sky flex items-center justify-center text-white font-black text-sm">E</span>
            EduGlobal Experience
          </Link>
          <Link href="/" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
            Cancel & Return
          </Link>
        </div>
      </header>

      <main className="max-w-[1180px] mx-auto px-8">
        <div className="mb-10">
          <h1 className="text-3xl md:text-[40px] text-navy font-extrabold mb-3">Complete Your Application</h1>
          <p className="text-muted text-[15px]">Fill out the details below to secure your spot for the EduGlobal Summit 2026.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
          
          {/* Kiri: Slider & Form */}
          <div className="flex flex-col gap-8">
            
            {/* ================= IMAGE SLIDER ================= */}
            <div className="relative w-full h-[250px] md:h-[320px] rounded-2xl overflow-hidden shadow-sm group">
              {sliderImages.map((src, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                >
                  <Image src={src} alt={`EduGlobal Slide ${idx + 1}`} fill className="object-cover" priority={idx === 0} />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent z-10"></div>
              <div className="absolute bottom-6 left-6 z-20 text-white">
                <h3 className="font-bold text-xl mb-1">Harvard MUN China</h3>
                <p className="text-sm text-white/80">Experience world-class diplomacy</p>
              </div>
              <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-navy flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all">&#8592;</button>
              <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-navy flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all">&#8594;</button>
              <div className="absolute bottom-4 right-6 z-20 flex gap-2">
                {sliderImages.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-2.5 h-2.5 rounded-full transition-all ${currentSlide === idx ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"}`}></button>
                ))}
              </div>
            </div>

            {/* ================= FORM PENDAFTARAN ================= */}
            <form id="checkout-form" onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl p-8 shadow-sm border border-[#E7EEF7]">
              <h3 className="text-xl text-navy font-bold mb-6 border-b border-gray-100 pb-4">Participant Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-[13.5px] font-bold text-navy">Full Name *</label>
                  <input 
                    type="text" id="fullName" name="fullName" 
                    value={formData.fullName} onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm ${errors.fullName ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-sky focus:ring-2 focus:ring-sky/20"}`}
                    placeholder="e.g. Jason Widjaja"
                  />
                  {errors.fullName && <span className="text-xs text-red-500 font-medium mt-1">{errors.fullName}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[13.5px] font-bold text-navy">Email Address *</label>
                  <input 
                    type="email" id="email" name="email" 
                    value={formData.email} onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm ${errors.email ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-sky focus:ring-2 focus:ring-sky/20"}`}
                    placeholder="jason@example.com"
                  />
                  {errors.email && <span className="text-xs text-red-500 font-medium mt-1">{errors.email}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-[13.5px] font-bold text-navy">Phone Number *</label>
                  <input 
                    type="tel" id="phone" name="phone" 
                    value={formData.phone} onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm ${errors.phone ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-sky focus:ring-2 focus:ring-sky/20"}`}
                    placeholder="+62 812 3456 7890"
                  />
                  {errors.phone && <span className="text-xs text-red-500 font-medium mt-1">{errors.phone}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="school" className="text-[13.5px] font-bold text-navy">Current School/University</label>
                  <input 
                    type="text" id="school" name="school"
                    value={formData.school} onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky focus:ring-2 focus:ring-sky/20 outline-none transition-all text-sm"
                    placeholder="e.g. Jakarta Intercultural School"
                  />
                </div>
              </div>

              <h3 className="text-xl text-navy font-bold mb-6 border-b border-gray-100 pb-4 pt-4">Select Package</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div onClick={() => setSelectedPackage("standard")} className={`cursor-pointer p-5 rounded-xl border-2 transition-all ${selectedPackage === "standard" ? "border-sky bg-sky/5" : "border-gray-200 hover:border-sky/50"}`}>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-navy">Standard Pass</h4>
                    {selectedPackage === "standard" && <span className="w-5 h-5 rounded-full bg-sky text-white flex items-center justify-center text-xs">✓</span>}
                  </div>
                  <p className="text-xs text-muted leading-relaxed">Includes MUN participation, standard accommodation, and campus tours.</p>
                </div>

                <div onClick={() => setSelectedPackage("premium")} className={`cursor-pointer p-5 rounded-xl border-2 transition-all ${selectedPackage === "premium" ? "border-sky bg-sky/5" : "border-gray-200 hover:border-sky/50"}`}>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-navy">Premium Immersion</h4>
                    {selectedPackage === "premium" && <span className="w-5 h-5 rounded-full bg-sky text-white flex items-center justify-center text-xs">✓</span>}
                  </div>
                  <p className="text-xs text-muted leading-relaxed">Everything in Standard, plus exclusive industry visits and VIP networking dinners.</p>
                </div>
              </div>
            </form>
          </div>

          {/* Kanan: Summary */}
          <div className="bg-navy rounded-2xl p-8 text-white h-fit sticky top-8 shadow-xl">
            <h3 className="text-xl font-bold mb-6 border-b border-white/20 pb-4">Application Summary</h3>
            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="text-white/70">Program</span>
              <span className="font-bold text-right">EduGlobal Summit 2026</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="text-white/70">Selected Package</span>
              <span className="font-bold capitalize">{selectedPackage}</span>
            </div>
            <div className="flex justify-between items-center mb-6 text-sm">
              <span className="text-white/70">Application Fee</span>
              <span className="font-bold">$50.00</span>
            </div>
            <div className="border-t border-white/20 pt-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total Due Today</span>
                <span className="font-extrabold text-2xl text-sky">$50.00</span>
              </div>
              <p className="text-xs text-white/50 mt-2 text-right">Remaining balance billed later.</p>
            </div>
            <button 
              type="submit" 
              form="checkout-form" 
              disabled={submitting}
              className="w-full bg-green hover:bg-[#1db365] text-white font-bold py-4 rounded-full transition-all hover:shadow-[0_10px_24px_rgba(32,201,114,0.4)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
            <p className="text-center text-xs text-white/50 mt-4 flex items-center justify-center gap-2">
              🔒 Secure encrypted process
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
