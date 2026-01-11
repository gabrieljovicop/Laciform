import { useState } from "react";
import { updatePassword } from "firebase/auth";

import { auth } from "../../firebase";

import SuccessModal from "../modals/SuccessModal";

function SecuritySection() {
  const user = auth.currentUser;

  const [editing, setEditing] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {

    if (!user) return;
    
    if (newPass.length < 6) {
      alert("Password minimal 6 karakter");
      return;
    }

    if (newPass !== confirmPass) {
      alert("Password tidak sama");
      return;
    }

    try {
      setLoading(true);

      await updatePassword(user, newPass);

      setShowSuccess(true);
      setEditing(false);
      setNewPass("");
      setConfirmPass("");

    } catch (err) {
      console.error(err);

      if (err.code === "auth/requires-recent-login") {
        alert("Silakan login ulang sebelum mengganti password.");
      } else {
        alert("Gagal mengganti password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-card">
      <h3>Keamanan</h3>

      {!editing && (
        <>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value="********" disabled />
          </div>

          <button className="btn-primary" onClick={() => setEditing(true)}>
            Ganti Password
          </button>
        </>
      )}

      {editing && (
        <>
          <input type="password" placeholder="Password baru" value={newPass} onChange={e => setNewPass(e.target.value)} />

          <input type="password" placeholder="Konfirmasi password baru" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} />

          <div className="profile-actions">
            <button className="btn-primary" onClick={handleSave} disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
            <button className="btn-secondary" onClick={() => setEditing(false)}>
              Batal
            </button>
          </div>
        </>
      )}

      <SuccessModal
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Berhasil"
        message="Password berhasil diganti."
      />
    </div>
  );
}

export default SecuritySection;