import { useState } from "react";
import Swal from "sweetalert2";
import Button from "../components/atoms/Button";
import TextInput from "../components/atoms/TextInput";
import FormField from "../components/molecules/FormField";
import { changePassword } from "../services/api";

export default function ChangePasswordPage() {
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.new_password !== form.confirm_password) {
      await Swal.fire({
        title: "Gagal",
        text: "Konfirmasi password baru tidak cocok.",
        icon: "error",
        confirmButtonText: "Tutup",
      });
      return;
    }

    try {
      setLoading(true);
      await changePassword({
        old_password: form.old_password,
        new_password: form.new_password,
        confirm_password: form.confirm_password,
      });

      await Swal.fire({
        title: "Berhasil",
        text: "Password berhasil diubah.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setForm({ old_password: "", new_password: "", confirm_password: "" });
    } catch (error) {
      await Swal.fire({
        title: "Gagal",
        text: error.message || "Gagal mengubah password.",
        icon: "error",
        confirmButtonText: "Tutup",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-w-2xl">
        <div className="border-b border-slate-100 pb-4 mb-6">
          <h2 className="text-xl font-bold text-slate-950">Ubah Password</h2>
          <p className="text-sm text-slate-600">Gunakan password lama untuk membuat password baru.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Password Lama" htmlFor="old_password">
            <TextInput
              id="old_password"
              name="old_password"
              type="password"
              value={form.old_password}
              onChange={handleChange}
              placeholder="Masukkan password lama"
              required
            />
          </FormField>

          <FormField label="Password Baru" htmlFor="new_password">
            <TextInput
              id="new_password"
              name="new_password"
              type="password"
              value={form.new_password}
              onChange={handleChange}
              placeholder="Masukkan password baru"
              required
            />
          </FormField>

          <FormField label="Konfirmasi Password Baru" htmlFor="confirm_password">
            <TextInput
              id="confirm_password"
              name="confirm_password"
              type="password"
              value={form.confirm_password}
              onChange={handleChange}
              placeholder="Ulangi password baru"
              required
            />
          </FormField>

          <div className="pt-2">
            <Button type="submit" disabled={loading} className="w-auto px-6">
              {loading ? "Memproses..." : "Ubah Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
