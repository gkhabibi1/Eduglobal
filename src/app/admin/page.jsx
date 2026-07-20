"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    router.push("/admin/login");
  };

  // Mengambil data dari Supabase saat halaman pertama kali dimuat
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false }); // Mengurutkan dari yang terbaru

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error("Gagal mengambil data:", error.message);
      alert("Terjadi kesalahan saat memuat data.");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk memformat tanggal
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] font-poppins pb-20">
      {/* CDN FontAwesome */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      />

      {/* Header Admin */}
      <header className="bg-navy py-6 px-8 mb-10 shadow-md">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-extrabold text-[19px] text-white">
            <span className="w-[34px] h-[34px] rounded-[10px] bg-sky flex items-center justify-center text-white font-black text-sm">A</span>
            Admin Dashboard
          </div>
          <div className="flex items-center gap-5">
            <Link href="/" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
              View Live Site ↗
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

      <main className="max-w-[1280px] mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl text-navy font-extrabold mb-2">Applications</h1>
            <p className="text-muted text-[15px]">Manage and view all incoming registrations for the EduGlobal Summit.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-[#E7EEF7] shadow-sm text-sm font-bold text-navy">
            Total Applicants: <span className="text-sky text-lg ml-1">{applications.length}</span>
          </div>
        </div>

        {/* Tabel Data */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E7EEF7] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F5F8FC] border-b border-[#E7EEF7] text-navy text-sm font-bold">
                  <th className="p-5 whitespace-nowrap">Date Applied</th>
                  <th className="p-5 whitespace-nowrap">Participant Info</th>
                  <th className="p-5 whitespace-nowrap">School/University</th>
                  <th className="p-5 whitespace-nowrap">Package</th>
                  <th className="p-5 whitespace-nowrap text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-10 text-center text-muted font-medium">
                      Loading data from database...
                    </td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-10 text-center text-muted font-medium">
                      No applications found yet.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="p-5 text-[13.5px] text-muted whitespace-nowrap">
                        {formatDate(app.created_at)}
                      </td>
                      <td className="p-5">
                        <div className="font-bold text-navy text-[14.5px] mb-1">{app.full_name}</div>
                        <div className="text-[13px] text-muted">{app.email}</div>
                        <div className="text-[13px] text-muted">{app.phone}</div>
                      </td>
                      <td className="p-5 text-[14px] text-navy">
                        {app.school || <span className="text-gray-400 italic">Not provided</span>}
                      </td>
                      <td className="p-5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold capitalize ${
                          app.package_type === 'premium' ? 'bg-sky/10 text-sky' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {app.package_type}
                        </span>
                      </td>
                      <td className="p-5 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green/10 text-green">
                          Received
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
