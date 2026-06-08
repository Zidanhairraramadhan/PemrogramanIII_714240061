import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  GraduationCap, 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  BookOpen, 
  User, 
  Key,
  AlertCircle,
  CheckCircle,
  Database
} from 'lucide-react';
import api from '../api/axios';

const Dashboard = () => {
  const [mahasiswaList, setMahasiswaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form state
  const [npm, setNpm] = useState('');
  const [nama, setNama] = useState('');
  const [prodi, setProdi] = useState('');
  const [alamat, setAlamat] = useState('');
  const [email, setEmail] = useState('');
  const [noHp, setNoHp] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const navigate = useNavigate();

  // Load user info and fetch student data
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }
    fetchMahasiswa();
  }, []);

  const showToast = (type, message) => {
    if (type === 'success') {
      setSuccess(message);
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(message);
      setTimeout(() => setError(''), 5000);
    }
  };

  const fetchMahasiswa = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/mahasiswa');
      if (response.data && response.data.data) {
        // If API returns null data (empty table), default to empty array
        setMahasiswaList(response.data.data || []);
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 403) {
        showToast('error', 'Akses ditolak: Anda tidak memiliki wewenang untuk melihat data ini.');
      } else {
        showToast('error', 'Gagal memuat data mahasiswa dari database.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setNpm('');
    setNama('');
    setProdi('');
    setAlamat('');
    setEmail('');
    setNoHp('');
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!npm || !nama || !prodi) {
      showToast('error', 'NPM, Nama, dan Program Studi wajib diisi.');
      return;
    }

    const payload = {
      npm,
      nama,
      prodi,
      alamat,
      email,
      no_hp: noHp,
    };

    try {
      if (isEditing) {
        await api.put(`/api/mahasiswa/${npm}`, payload);
        showToast('success', 'Data mahasiswa berhasil diperbarui!');
      } else {
        await api.post('/api/mahasiswa', payload);
        showToast('success', 'Mahasiswa baru berhasil ditambahkan!');
      }
      handleResetForm();
      fetchMahasiswa();
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        showToast('error', err.response.data.message);
      } else {
        showToast('error', isEditing ? 'Gagal mengupdate data.' : 'Gagal menambahkan data mahasiswa.');
      }
    }
  };

  const handleEdit = (m) => {
    setNpm(m.npm);
    setNama(m.nama);
    setProdi(m.prodi);
    setAlamat(m.alamat || '');
    setEmail(m.email || '');
    setNoHp(m.no_hp || '');
    setIsEditing(true);
  };

  const handleDelete = async (npmToDelete) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus mahasiswa dengan NPM ${npmToDelete}?`)) {
      return;
    }

    try {
      await api.delete(`/api/mahasiswa/${npmToDelete}`);
      showToast('success', 'Mahasiswa berhasil dihapus!');
      if (isEditing && npm === npmToDelete) {
        handleResetForm();
      }
      fetchMahasiswa();
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        showToast('error', err.response.data.message);
      } else {
        showToast('error', 'Gagal menghapus mahasiswa.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/login');
  };

  return (
    <div className="app-container">
      <div className="dashboard-container">
        
        {/* Header Bar */}
        <header className="header-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <GraduationCap size={36} style={{ color: 'var(--primary)' }} />
            <div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Portal Akademik</h1>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sistem Manajemen Data Mahasiswa</p>
            </div>
          </div>
          
          <div className="user-info">
            <div className="avatar">
              {currentUser?.username?.substring(0, 2).toUpperCase() || 'AD'}
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="user-name">{currentUser?.username || 'Administrator'}</span>
                <span className="user-role">{currentUser?.role || 'admin'}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sesi Aktif</p>
            </div>
            <button 
              onClick={handleLogout} 
              className="btn btn-secondary btn-icon"
              title="Logout"
              style={{ marginLeft: '12px' }}
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Success/Error Toasts */}
        {success && (
          <div className="toast toast-success">
            <CheckCircle size={18} />
            <span>{success}</span>
          </div>
        )}
        {error && (
          <div className="toast toast-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Dashboard Grid split: Form (Left) and Table (Right) */}
        <div className="dashboard-grid">
          
          {/* Form Card */}
          <aside className="card">
            <h2 className="card-title">
              {isEditing ? <Edit2 size={20} style={{ color: 'var(--primary)' }} /> : <Plus size={20} style={{ color: 'var(--primary)' }} />}
              <span>{isEditing ? 'Edit Mahasiswa' : 'Tambah Mahasiswa'}</span>
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="npm">NPM</label>
                <div className="input-wrapper">
                  <input
                    id="npm"
                    type="text"
                    className="form-input"
                    placeholder="Contoh: 714240061"
                    value={npm}
                    onChange={(e) => setNpm(e.target.value)}
                    disabled={isEditing} // NPM is Primary Key and cannot be edited
                    required
                    style={{ paddingLeft: '40px' }}
                  />
                  <Key size={16} style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="nama">Nama Lengkap</label>
                <div className="input-wrapper">
                  <input
                    id="nama"
                    type="text"
                    className="form-input"
                    placeholder="Masukkan nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                    style={{ paddingLeft: '40px' }}
                  />
                  <User size={16} style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="prodi">Program Studi</label>
                <div className="input-wrapper">
                  <input
                    id="prodi"
                    type="text"
                    className="form-input"
                    placeholder="Contoh: Teknik Informatika"
                    value={prodi}
                    onChange={(e) => setProdi(e.target.value)}
                    required
                    style={{ paddingLeft: '40px' }}
                  />
                  <BookOpen size={16} style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="Contoh: nama@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ paddingLeft: '40px' }}
                  />
                  <Mail size={16} style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="noHp">No. HP</label>
                <div className="input-wrapper">
                  <input
                    id="noHp"
                    type="text"
                    className="form-input"
                    placeholder="Contoh: 08123456789"
                    value={noHp}
                    onChange={(e) => setNoHp(e.target.value)}
                    style={{ paddingLeft: '40px' }}
                  />
                  <Phone size={16} style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '28px' }}>
                <label className="form-label" htmlFor="alamat">Alamat</label>
                <div className="input-wrapper">
                  <textarea
                    id="alamat"
                    className="form-input"
                    placeholder="Masukkan alamat lengkap..."
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    style={{ paddingLeft: '40px', minHeight: '80px', resize: 'vertical' }}
                  />
                  <MapPin size={16} style={{
                    position: 'absolute',
                    left: '14px',
                    top: '18px',
                    color: 'var(--text-muted)'
                  }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="btn btn-primary">
                  <Save size={18} />
                  <span>Simpan</span>
                </button>
                
                {isEditing && (
                  <button type="button" onClick={handleResetForm} className="btn btn-secondary">
                    <X size={18} />
                    <span>Batal</span>
                  </button>
                )}
              </div>
            </form>
          </aside>

          {/* Table Card */}
          <main className="card table-card" style={{ flexGrow: 1 }}>
            <div className="table-header-action">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Database size={20} style={{ color: 'var(--primary)' }} />
                Data Mahasiswa ({mahasiswaList.length})
              </h2>
            </div>

            {loading ? (
              <div className="loading-container">
                <div className="spinner" />
              </div>
            ) : mahasiswaList.length === 0 ? (
              <div className="empty-state">
                <GraduationCap size={48} className="empty-icon" />
                <p>Tidak ada data mahasiswa tersedia.</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>Gunakan panel di sebelah kiri untuk menambah data.</p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>NPM</th>
                      <th>Nama</th>
                      <th>Program Studi</th>
                      <th>Email</th>
                      <th>No. HP</th>
                      <th>Alamat</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mahasiswaList.map((m) => (
                      <tr key={m.npm}>
                        <td><span className="npm-badge">{m.npm}</span></td>
                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{m.nama}</td>
                        <td>{m.prodi}</td>
                        <td>{m.email || '-'}</td>
                        <td>{m.no_hp || '-'}</td>
                        <td>{m.alamat || '-'}</td>
                        <td>
                          <div className="actions-cell">
                            <button 
                              className="action-btn action-btn-edit" 
                              onClick={() => handleEdit(m)}
                              title="Edit"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button 
                              className="action-btn action-btn-delete" 
                              onClick={() => handleDelete(m.npm)}
                              title="Hapus"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
