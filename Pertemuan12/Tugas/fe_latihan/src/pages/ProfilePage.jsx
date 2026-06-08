import { getUser, getToken } from "../services/auth";
import Swal from "sweetalert2";

export default function ProfilePage() {
  const user = getUser();

  const handleShowToken = () => {
    const token = getToken();
    Swal.fire({
      title: "Token JWT",
      text: token || "Token tidak ditemukan",
      icon: "info",
      confirmButtonText: "Tutup",
      confirmButtonColor: "#3b82f6",
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-950">Profil</h2>
            <p className="text-sm text-slate-600">Informasi akun yang sedang login.</p>
          </div>
          <button
            type="button"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
            onClick={handleShowToken}
          >
            Lihat Token
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Username
            </span>
            <span className="text-base font-semibold text-slate-800">
              {user?.username ?? "-"}
            </span>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Role
            </span>
            <span className="text-base font-semibold text-slate-800">
              {user?.role ?? "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
