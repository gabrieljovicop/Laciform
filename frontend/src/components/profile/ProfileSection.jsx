import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { collection, query, where, getDocs, writeBatch } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

import { db, auth } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useUserFormStats } from "../../hooks/useUserFormStats";

import ConfirmModal from "../modals/ConfirmModal";
import SuccessModal from "../modals/SuccessModal";

function ProfileSection() {
  const { currentUser } = useAuth();
  const { formCount, loading } = useUserFormStats();

  const createdAt = new Date(currentUser.metadata.creationTime).toLocaleDateString("id-ID");

  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(
    currentUser.displayName || currentUser.email.split("@")[0]
  );
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleSave = async () => {
    const newName = username.trim();

    if (!newName) {
      alert("Username tidak boleh kosong");
      return;
    }

    try {
      setSaving(true);

      await updateProfile(auth.currentUser, {
        displayName: newName,
      });

      const q = query(
        collection(db, "forms"),
        where("authorId", "==", currentUser.uid)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const batch = writeBatch(db);

        snapshot.docs.forEach(docSnap => {
          batch.update(docSnap.ref, {
            authorName: newName,
          });
        });

        await batch.commit();
      }

      setShowSuccess(true);
      setEditing(false);

    } catch (err) {
      console.error(err);
      alert("Gagal update username");
    } finally {
      setSaving(false);
    }
  };

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.error("Gagal logout", e);
      alert("Gagal logout.");
    }
  };

  return (
    <div className="profile-card">
      <h3>Profile Pengguna</h3>

      <div className="form-group">
        <label>Username</label>
        <input value={username} disabled={!editing} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div className="profile-meta">
        <p>Email: <strong>{currentUser.email}</strong></p>
        <p>Akun dibuat: <strong>{createdAt}</strong></p>
        <p>
          Total form telah dibuat: <strong>{loading ? "..." : formCount}</strong>
        </p>
      </div>

      <div className="profile-actions">
        {!editing && (
          <button className="btn-primary" onClick={() => setEditing(true)}>
            Edit Username
          </button>
        )}

        {editing && (
          <>
            <button className="btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
            <button className="btn-secondary" onClick={() => setEditing(false)}>
              Batal
            </button>
          </>
        )}

        <button className="btn-outline-primary" onClick={() => setShowLogoutConfirm(true)}>Logout</button>
      </div>

      <SuccessModal
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Berhasil"
        message="Username berhasil diperbarui."
      />

      <ConfirmModal
        show={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Konfirmasi Logout"
        message="Apakah Anda yakin ingin keluar dari akun ini?"
        confirmText="Logout"
      />
    </div>
  );
}

export default ProfileSection;