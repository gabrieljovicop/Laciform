import { useState } from "react";
import { Link } from "react-router-dom";

import { useTheme } from "../contexts/ThemeContext";

import Logo from "../components/Logo";
// import { getInitialTheme } from "../utils/accesibility"; // sesuaikan path

function NotFound() {
  const { theme, toggleTheme } = useTheme();
  // const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  // const initialTheme = getInitialTheme(prefersDark);

  // const [currentTheme] = useState(initialTheme);

  return (
    <div className="not-found-page page-content">
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <Logo theme={theme} mood="die" alt="Laciform Logo" style={{ width: "150px", marginBottom: "1rem" }} />
        <h1>404</h1>
        <p>Halaman yang Anda cari tidak ditemukan.</p>
        <Link to="/" className="btn-outline-primary" style={{textDecoration: "none"}}>
          Menuju ke Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;