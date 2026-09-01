import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const data = await request.json();
    
    // 1. Simpan ke Supabase
    const { data: insertedData, error } = await supabase
      .from('applications')
      .insert([{
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        school: data.school,
        package_type: data.package,
      }])
      .select();

    // 2. Jika ada error dari database, lempar errornya
    if (error) {
      console.error("Supabase Error Details:", error);
      throw error;
    }

    // 3. Kembalikan respons sukses
    return NextResponse.json({ success: true, data: insertedData }, { status: 201 });
    
  } catch (error) {
    console.error("Server error:", error.message || error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
