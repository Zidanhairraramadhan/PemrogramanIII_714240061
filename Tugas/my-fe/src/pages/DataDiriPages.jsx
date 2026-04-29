export default function DataDiriPages() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Data Diri
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Informasi mahasiswa praktikum Pemrograman III
        </p>
      </div>

      {/* Profile Card */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-xl">

        <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center">

          {/* Avatar */}
          <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/40 bg-white/20 text-5xl shadow-lg backdrop-blur">
            👨‍💻
          </div>

          {/* Biodata */}
          <div className="text-white">
            <h2 className="text-3xl font-bold">
              Zidan Hairra Ramadhan
            </h2>

            <p className="mt-1 text-blue-100">
              Mahasiswa D4 Teknik Informatika
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">

              <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-blue-100">
                  NPM
                </p>

                <p className="mt-1 font-semibold">
                  714240061
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-blue-100">
                  Kelas
                </p>

                <p className="mt-1 font-semibold">
                  D4 TI 2C
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-blue-100">
                  Mata Kuliah
                </p>

                <p className="mt-1 font-semibold">
                  Pemrograman III
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-blue-100">
                  Praktikum
                </p>

                <p className="mt-1 font-semibold">
                  Pertemuan 07
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* About Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <h3 className="text-lg font-semibold text-slate-800">
          Tentang Saya
        </h3>

        <p className="mt-3 leading-relaxed text-slate-600">
          Saya merupakan mahasiswa D4 Teknik Informatika yang sedang
          mempelajari pengembangan aplikasi frontend menggunakan
          React, Tailwind CSS, Axios, dan Web Service API.
        </p>

      </div>
    </div>
  );
}