export default function DataDiriPage() {
  return (
    <div className="space-y-6 pb-6">
      {/* Hero Profile Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 px-6 py-10 shadow-xl sm:px-10">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <div className="relative">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white/20 bg-gradient-to-br from-blue-400 to-indigo-600 text-5xl font-bold text-white shadow-2xl backdrop-blur-sm">
              M
            </div>
            <div className="absolute bottom-1 right-1 h-6 w-6 rounded-full border-4 border-indigo-900 bg-emerald-400"></div>
          </div>
          
          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Muhammad Malik Nur
            </h1>
            <p className="text-lg font-medium text-blue-200">
              Mahasiswa D4 Teknik Informatika
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                Semester 4
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                🎓 D4 Teknik Informatika 2C
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Detail Informasi */}
        <div className="col-span-1 space-y-6 lg:col-span-2">
          {/* Card: Detail Akademik */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800">Detail Akademik</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div className="space-y-1 border-b border-slate-100 pb-4 sm:border-0 sm:pb-0">
                <p className="text-sm font-medium text-slate-500">Nomor Pokok Mahasiswa</p>
                <p className="text-lg font-semibold text-slate-900">714240062</p>
              </div>
              <div className="space-y-1 border-b border-slate-100 pb-4 sm:border-0 sm:pb-0">
                <p className="text-sm font-medium text-slate-500">Program Studi</p>
                <p className="text-lg font-semibold text-slate-900">D4 Teknik Informatika</p>
              </div>
              <div className="space-y-1 border-b border-slate-100 pb-4 sm:border-0 sm:pb-0">
                <p className="text-sm font-medium text-slate-500">Mata Kuliah</p>
                <p className="text-lg font-semibold text-slate-900">Pemrograman III - Web Service</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-500">Tahun Angkatan</p>
                <p className="text-lg font-semibold text-slate-900">2024</p>
              </div>
            </div>
          </div>

          {/* Card: Tentang */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800">Tentang Tugas</h2>
            </div>
            <ul className="space-y-3 leading-relaxed text-slate-600 list-disc pl-5">
              <li>
                Halaman ini menampilkan data diri mahasiwa. Halaman ini dikembangkan sebagai bagian dari Latihan Mandiri Pertemuan 7. yaitu menambahkan menu baru "Data Diri" di sidebar dan membuat halaman statis untuk menampilkan menu tersebut
               </li>
            </ul>
          </div>
        </div>

        {/* Right Column - Contact & Motivation */}
        <div className="col-span-1 space-y-6">
          {/* Card: Kontak */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-5 text-lg font-bold text-slate-800">Kontak</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 rounded-2xl bg-slate-50 p-3 transition hover:bg-slate-100 hover:shadow-sm cursor-default">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                  📧
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">Email Mahasiswa</p>
                  <p className="truncate text-sm font-bold text-slate-700">714240062@politeknik.ac.id</p>
                </div>
              </li>
              <li className="flex items-center gap-4 rounded-2xl bg-slate-50 p-3 transition hover:bg-slate-100 hover:shadow-sm cursor-default">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                  📍
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">Lokasi</p>
                  <p className="truncate text-sm font-bold text-slate-700">Kampus Logistik dan Bisnis Internasional</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
