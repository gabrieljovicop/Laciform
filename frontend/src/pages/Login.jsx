import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      // Panggil fungsi Firebase untuk login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Login berhasil
      console.log("User logged in:", userCredential.user);
      setMessage("Selamat datang, ${userCredential.user.email}! Anda berhasil login.");
      
      navigate("/");
      
    } catch (err) {
      // Tangani error dari Firebase (misalnya: "auth/user-not-found", "auth/wrong-password")
      console.error(err.message);
      
      if (err.code === "auth/invalid-credential") {
        setError("Email atau password salah. Silakan coba lagi.");
      } else {
        setError("Login gagal: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="login-page">
      <Link to="/" className="btn-outline-primary" style={{textDecoration: "none", marginTop: "3rem"}}>
        &larr; Kembali ke Home
      </Link>
      <div className="form-container" style={{maxWidth: "400px"}}>
        <h2 style={{ textAlign: "center"}}>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "blue" }}>{message}</p>}
        
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn-primary" style={{ marginTop: "15px", width: "100%" }} disabled={loading}>
            {loading ? "Sedang Login..." : "Login"}
          </button>
        </form>
        
        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
          <p>
            Belum memiliki akun? {" "}
            <Link to="/register" style={{ color: "var(--text-color)", textDecoration: "underline" }}>
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;