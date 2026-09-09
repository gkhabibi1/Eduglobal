-- ==============================================================================
-- EDUGLOBAL SUMMIT - SUPABASE DATABASE SCHEMA
-- Table: public.applications
-- 
-- Cocok untuk: Form Checkout / Registrasi & Admin Dashboard EduGlobal Summit
-- Jalankan script SQL ini di Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Buat Tabel Utama (Jika Belum Ada)
CREATE TABLE IF NOT EXISTS public.applications (
  -- Primary & Identifiers
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Primary Applicant & Standard Fields
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  school TEXT,
  package_type TEXT,
  category TEXT DEFAULT 'Student delegate',
  status TEXT DEFAULT 'pending',

  -- Full Dynamic Payload JSONB (menyimpan seluruh state form secara fleksibel)
  form_details JSONB DEFAULT '{}'::jsonb,

  -- Section 2A: Student Delegate Dedicated Columns
  preferred_name TEXT,
  dob TEXT,
  gender TEXT,
  nationality TEXT,
  residence_country TEXT,
  nationality_and_residence TEXT,
  passport_status TEXT,
  passport_expiry TEXT,
  school_city_country TEXT,
  grade_year TEXT,
  mun_experience TEXT,
  previous_conferences TEXT,
  english_proficiency TEXT,
  why_join_reason TEXT,
  skills_to_develop TEXT[] DEFAULT '{}'::text[],
  committee_pref_1 TEXT,
  committee_pref_2 TEXT,
  committee_pref_3 TEXT,
  committee_styles TEXT[] DEFAULT '{}'::text[],
  registration_channel TEXT,

  -- Section 2B: Parent / Guardian
  student_full_name TEXT,
  relationship_to_student TEXT,
  requested_role TEXT,
  room_preference TEXT,
  travel_arrangement TEXT,

  -- Section 2C: Teacher / School Group
  primary_contact_position TEXT,
  estimated_delegates INTEGER,
  estimated_teachers INTEGER,
  estimated_parents INTEGER,
  student_age_ranges TEXT[] DEFAULT '{}'::text[],
  preconference_training TEXT,
  payment_arrangement TEXT,
  required_documents TEXT[] DEFAULT '{}'::text[],

  -- Section 3: Parent Info for Minor Students
  parent_full_name TEXT,
  parent_relationship TEXT,
  parent_email TEXT,
  parent_whatsapp TEXT,
  parent_address TEXT,
  parent_accompanying TEXT,
  parent_approval_status TEXT,

  -- Section 4: Travel & Visa
  departure_city TEXT,
  travel_requirement TEXT,
  accommodation_preference TEXT,
  visa_status TEXT,
  china_visa_status TEXT,
  thai_immigration_status TEXT,
  visa_letter_required TEXT,
  visa_city TEXT,
  flight_arrangement TEXT,
  winter_readiness TEXT,
  harvard_extension TEXT,
  preferred_package TEXT,

  -- Section 5: Health & Emergency
  dietary_requirements TEXT[] DEFAULT '{}'::text[],
  food_allergies TEXT,
  medical_conditions TEXT,
  regular_medication TEXT,
  emergency_contact TEXT,
  travel_insurance TEXT,
  chicken_protein_allergy TEXT,

  -- Section 6: Declarations & Admin
  completed_by TEXT,
  additional_questions TEXT,
  admin_notes TEXT
);

-- ==============================================================================
-- 2. Migrasi Penambahan Kolom (Jika tabel 'applications' sudah pernah dibuat sebelumnya)
-- ==============================================================================
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS form_details JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS preferred_name TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS dob TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS nationality TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS residence_country TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS nationality_and_residence TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS passport_status TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS passport_expiry TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS school_city_country TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS grade_year TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS mun_experience TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS previous_conferences TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS english_proficiency TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS why_join_reason TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS skills_to_develop TEXT[] DEFAULT '{}'::text[];
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS committee_pref_1 TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS committee_pref_2 TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS committee_pref_3 TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS committee_styles TEXT[] DEFAULT '{}'::text[];
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS registration_channel TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS student_full_name TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS relationship_to_student TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS requested_role TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS room_preference TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS travel_arrangement TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS primary_contact_position TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS estimated_delegates INTEGER;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS estimated_teachers INTEGER;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS estimated_parents INTEGER;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS student_age_ranges TEXT[] DEFAULT '{}'::text[];
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS preconference_training TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS payment_arrangement TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS required_documents TEXT[] DEFAULT '{}'::text[];
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS parent_full_name TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS parent_relationship TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS parent_email TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS parent_whatsapp TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS parent_address TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS parent_accompanying TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS parent_approval_status TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS departure_city TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS travel_requirement TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS accommodation_preference TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS visa_status TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS china_visa_status TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS thai_immigration_status TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS visa_letter_required TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS visa_city TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS flight_arrangement TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS winter_readiness TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS harvard_extension TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS preferred_package TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS dietary_requirements TEXT[] DEFAULT '{}'::text[];
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS food_allergies TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS medical_conditions TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS regular_medication TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS emergency_contact TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS travel_insurance TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS chicken_protein_allergy TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS completed_by TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS additional_questions TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- ==============================================================================
-- 3. Indexes untuk Kecepatan Query & Pencarian di Admin Dashboard
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON public.applications (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_email ON public.applications (email);
CREATE INDEX IF NOT EXISTS idx_applications_category ON public.applications (category);
CREATE INDEX IF NOT EXISTS idx_applications_package ON public.applications (package_type);

-- ==============================================================================
-- 4. Row Level Security (RLS) & Policies
-- ==============================================================================
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Izinkan publik/anon untuk INSERT (submit formulir dari website)
DROP POLICY IF EXISTS "Enable insert for everyone" ON public.applications;
CREATE POLICY "Enable insert for everyone" 
ON public.applications 
FOR INSERT 
TO public, anon, authenticated 
WITH CHECK (true);

-- Izinkan read/select untuk admin (anon & authenticated agar Dashboard Admin bisa membaca data)
DROP POLICY IF EXISTS "Enable read access for all" ON public.applications;
CREATE POLICY "Enable read access for all" 
ON public.applications 
FOR SELECT 
TO public, anon, authenticated 
USING (true);

-- Izinkan update untuk authenticated/anon jika nanti ingin update status dari dashboard admin
DROP POLICY IF EXISTS "Enable update for all" ON public.applications;
CREATE POLICY "Enable update for all" 
ON public.applications 
FOR UPDATE 
TO public, anon, authenticated 
USING (true)
WITH CHECK (true);
