import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../components/atoms/Button";
import SelectInput from "../components/atoms/SelectInput";
import TextInput from "../components/atoms/TextInput";
import PageTitle from "../components/molecules/PageTitle";
import MahasiswaTable from "../components/organisms/MahasiswaTable";
import { deleteMahasiswa, getMahasiswa } from "../services/api";

const PRODI_OPTIONS = [
  "S2 Manajemen Logistik",
  "S1 Manajemen Logistik",
  "S1 Manajemen Rekayasa",
  "S1 Manajemen Transportasi",
  "S1 Bisnis Digital",
  "S1 Sains Data",
  "D4 Akuntansi",
  "D4 Teknik Informatika",
  "D4 Logistik Bisnis",
  "D4 Akuntansi Keuangan",
  "D4 Manajemen Perusahaan",
  "D3 Administrasi Logistik",
  "D3 Manajemen Pemasaran",
  "D3 Teknik Informatika",
];

export default function MahasiswaListPage() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [prodiFilter, setProdiFilter] = useState("");

  const filteredMahasiswa = useMemo(() => {
    let result = mahasiswa;

    if (prodiFilter) {
      result = result.filter((mhs) => mhs.prodi === prodiFilter);
    }

    const keyword = search.trim().toLowerCase();
    if (keyword) {
      result = result.filter((mhs) =>
        Object.values(mhs).some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(keyword)
        )
      );
    }

    return result;
  }, [mahasiswa, search, prodiFilter]);

  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      try {
        const data = await getMahasiswa();

        if (isMounted) {
          setMahasiswa(data);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      setError("");
      const data = await getMahasiswa();
      setMahasiswa(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setRefreshing(false);
    }
  };

  const handleReset = () => {
    setSearch("");
    setProdiFilter("");
  };

  const handleDelete = async (npm) => {
    const result = await Swal.fire({
      title: "Hapus data mahasiswa?",
      text: "Data yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      setError("");
      await deleteMahasiswa(npm);
      setMahasiswa((prev) => prev.filter((item) => item.npm !== npm));
      await Swal.fire({
        title: "Berhasil",
        text: "Data mahasiswa berhasil dihapus.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      setError(err.message);
      await Swal.fire({
        title: "Gagal",
        text: err.message || "Gagal menghapus data.",
        icon: "error",
        confirmButtonText: "Tutup",
      });
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="space-y-4">
      <PageTitle
        title="Daftar Mahasiswa"
        description="Kelola data mahasiswa, tambahkan, edit, dan lihat detail."
        actions={
          <div className="flex flex-wrap gap-2">
            <Link to="/dashboard">
              <Button type="button" variant="ghost">Kembali ke Dashboard</Button>
            </Link>
            <Link to="/mahasiswa/add">
              <Button type="button">Tambah Mahasiswa</Button>
            </Link>
          </div>
        }
      />

      <p className="text-sm text-gray-600">
        Total Mahasiswa:{" "}
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-semibold">
          {mahasiswa.length}
        </span>
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center w-full">
          <TextInput
            type="text"
            placeholder="Cari semua data..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="sm:max-w-xs"
          />
          <SelectInput
            value={prodiFilter}
            onChange={(event) => setProdiFilter(event.target.value)}
            className="sm:max-w-xs"
          >
            <option value="">Semua Prodi</option>
            {PRODI_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </SelectInput>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={handleRefresh}
          disabled={refreshing}
          className="whitespace-nowrap"
        >
          {refreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      {error && <p className="text-sm text-red-500">Error: {error}</p>}

      <MahasiswaTable data={filteredMahasiswa} onDelete={handleDelete} />
    </div>
  );
}
