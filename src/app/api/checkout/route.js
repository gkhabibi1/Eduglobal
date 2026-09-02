import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const data = await request.json();
    const details = data.formDetails || {};
    
    // Comprehensive mapped payload
    const record = {
      // Primary standard fields
      full_name: data.fullName || details.fullName || details.completedBy || "Applicant",
      email: data.email || details.email || details.parentEmail || details.officialEmailWhatsapp || "",
      phone: data.phone || details.whatsapp || details.parentWhatsapp || details.officialEmailWhatsapp || "",
      school: data.school || details.schoolName || details.schoolNameCityCountry || details.schoolOrgAddress || "",
      package_type: data.package || "EduGlobal Summit",
      category: data.category || details.registrationCategory || "Student delegate",
      
      // Detailed form JSON storage
      form_details: details,

      // Dedicated column mappings (for relational Supabase schema)
      preferred_name: details.preferredName || null,
      dob: details.dob || null,
      gender: details.gender || null,
      nationality: details.nationality || null,
      residence_country: details.residenceCountry || null,
      nationality_and_residence: details.nationalityResidence || null,
      passport_status: details.passportStatus || null,
      passport_expiry: details.passportExpiry || null,
      school_city_country: details.schoolCityCountry || null,
      grade_year: details.gradeYear || null,
      mun_experience: details.munExperience || details.groupMunExp || null,
      previous_conferences: details.previousConferences || null,
      english_proficiency: details.englishProficiency || null,
      why_join_reason: details.whyJoin || null,
      skills_to_develop: details.skillsToDevelop || [],
      committee_pref_1: details.committeePref1 || null,
      committee_pref_2: details.committeePref2 || null,
      committee_pref_3: details.committeePref3 || null,
      committee_styles: details.committeeStyles || [],
      registration_channel: details.regChannel || null,

      // Parent/Guardian fields
      student_full_name: details.studentFullName || null,
      relationship_to_student: details.relationshipToStudent || null,
      requested_role: details.requestedRole || null,
      room_preference: details.roomPreference || details.rooming || null,
      travel_arrangement: details.travelArrangement || details.flights || null,

      // School Group fields
      primary_contact_position: details.primaryContactPosition || null,
      estimated_delegates: details.estDelegates ? parseInt(details.estDelegates) : null,
      estimated_teachers: details.estTeachers ? parseInt(details.estTeachers) : null,
      estimated_parents: details.estParents ? parseInt(details.estParents) : null,
      student_age_ranges: details.studentAgeRange || [],
      preconference_training: details.trainingRequired || null,
      payment_arrangement: details.paymentArrangement || null,
      required_documents: details.requiredDocuments || [],

      // Parent info for minor students
      parent_full_name: details.parentFullName || details.parentNameRelationship || null,
      parent_relationship: details.parentRelationship || null,
      parent_email: details.parentEmail || null,
      parent_whatsapp: details.parentWhatsapp || null,
      parent_address: details.parentAddress || null,
      parent_accompanying: details.parentAccompanying || null,
      parent_approval_status: details.parentApproval || null,

      // Travel & Visa
      departure_city: details.departureCity || details.departureCityCountry || null,
      travel_requirement: details.travelRequirement || null,
      accommodation_preference: details.accommodationPref || null,
      visa_status: details.visaStatus || null,
      china_visa_status: details.chinaVisaStatus || null,
      thai_immigration_status: details.thaiImmigrationStatus || null,
      visa_letter_required: details.visaLetterRequired || null,
      visa_city: details.visaCity || null,
      flight_arrangement: details.flightArrangement || null,
      winter_readiness: details.winterReadiness || null,
      harvard_extension: details.harvardExtension || null,
      preferred_package: details.preferredPackage || null,

      // Health & Emergency
      dietary_requirements: details.dietaryReqs || [],
      food_allergies: details.foodAllergies || null,
      medical_conditions: details.medicalConditions || null,
      regular_medication: details.regularMedication || null,
      emergency_contact: details.emergencyContact || null,
      travel_insurance: details.travelInsurance || null,
      chicken_protein_allergy: details.chickenProteinAllergy || null,

      // Declarations
      completed_by: details.completedBy || null,
      additional_questions: details.additionalQuestions || null,
    };

    // Helper to strip undefined values
    const cleanPayload = Object.fromEntries(
      Object.entries(record).filter(([_, v]) => v !== undefined && v !== null)
    );

    // 1. Try inserting with all fields
    let { data: insertedData, error } = await supabase
      .from('applications')
      .insert([cleanPayload])
      .select();

    // 2. If table doesn't have custom columns yet, fallback gracefully to standard fields
    if (error) {
      console.warn("Extended Supabase insert warning, trying fallback payload:", error.message);
      
      const fallbackRecord = {
        full_name: record.full_name,
        email: record.email,
        phone: record.phone,
        school: record.school,
        package_type: record.package_type,
      };

      // Try fallback with category & form_details
      const secondTry = await supabase
        .from('applications')
        .insert([{
          ...fallbackRecord,
          category: record.category,
          form_details: record.form_details,
        }])
        .select();

      if (secondTry.error) {
        // Absolute fallback to core columns
        const finalTry = await supabase
          .from('applications')
          .insert([fallbackRecord])
          .select();

        if (finalTry.error) throw finalTry.error;
        insertedData = finalTry.data;
      } else {
        insertedData = secondTry.data;
      }
    }

    return NextResponse.json({ success: true, data: insertedData }, { status: 201 });
    
  } catch (error) {
    console.error("Server error:", error.message || error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
