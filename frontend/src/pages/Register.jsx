import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Password dan Confirm Password tidak cocok.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      console.log("User registered:", userCredential.user);
      setSuccess("Pendaftaran berhasil! Silakan login.");
      
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error(err.message);
      
      if (err.code === "auth/weak-password") {
        setError("Password harus memiliki minimal 6 karakter.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("Email sudah terdaftar. Silakan login.");
      } else {
        setError("Pendaftaran gagal: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <Link to="/" className="btn-outline-primary" style={{textDecoration: "none", marginTop: "3rem"}}>
        &larr; Kembali ke Home
      </Link>
      <div className="form-container" style={{maxWidth: "400px"}}>
        <h2 style={{ textAlign: "center"}}>Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        
        <form onSubmit={handleRegister}>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="form-input-custom"/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="form-input-custom"/>
          </div>
          <div>
            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
              className="form-input-custom"/>
          </div>
          <button className="btn-primary" type="submit" style={{ marginTop: "15px", width: "100%" }} disabled={loading}>
            {loading ? "Mendaftarkan..." : "Daftar"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
          <p>
            Sudah memiliki akun? {" "}
            <Link to="/login" style={{ color: "var(--text-color)", textDecoration: "underline" }}>
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;