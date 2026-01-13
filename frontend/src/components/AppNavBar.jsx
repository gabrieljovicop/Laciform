import { useEffect, useState, useRef } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import { setupNavbarScroll } from "../utils/navigation";

// import { getInitialTheme, setupThemeMode } from "../utils/accesibility";

import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

import Logo from "../components/Logo";
// import profilePlaceholder from "../assets/pp-image-ph.png";
import ConfirmModal from "./modals/ConfirmModal";

function AppNavBar() {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [expanded, setExpanded] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navigate = useNavigate();

  const navbarRef = useRef(null);

  const closeNavbar = () => setExpanded(false);

  useEffect(() => {
    if (!navbarRef.current) return;

    const cleanup = setupNavbarScroll(navbarRef.current);
    return cleanup;
  }, []);

  // const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  // const initialTheme = getInitialTheme(prefersDark);
  
  // const [currentTheme, setCurrentTheme] = useState(initialTheme);

  // useEffect(() => {
  //   setupThemeMode();

  //   const toggleBtn = document.getElementById("themeToggle");
  //   const themeChangeListener = () => {
  //       // Logika sederhana untuk mendapatkan tema yang baru diatur di body
  //       const newTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  //       setCurrentTheme(newTheme);
  //   };

  //   if (toggleBtn) {
  //       toggleBtn.addEventListener("click", themeChangeListener);
  //   }

  //   return () => {
  //       if (toggleBtn) {
  //           toggleBtn.removeEventListener("click", themeChangeListener);
  //       }
  //   };
  // }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setExpanded(false);
    } catch (e) {
      console.error("Gagal Logout", e);
      alert("Gagal keluar. Silakan coba lagi.");
    }
  };

  return (
    <div className="app-nav-bar">
      <Navbar ref={navbarRef} expand="md" fixed="top" expanded={expanded}
        bg={theme === "dark" ? "dark" : "light"} variant={theme === "dark" ? "dark" : "light"}>
        <Navbar.Brand as={NavLink} to="/" onClick={closeNavbar}>
          <Logo theme={theme} mood="normal" className="navbar-brand-logo" alt="Laciform" />
          <span id="laciformSpan" style={{ color: theme === "dark" ? "white" : "black" }}>Laciform</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" onClick={() => setExpanded(!expanded)}>
          <span className="custom-toggler-icon">
            <i className="fi fi-sr-menu-burger"></i>
          </span>
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto" onSelect={() => setExpanded(false)}>
            <Nav.Link as={NavLink} to="/" end onClick={closeNavbar}>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/explore" onClick={closeNavbar}>Explore</Nav.Link>
            {/* Tautan untuk pengguna yang sudah login */}
            {currentUser && (
              <>
                <Nav.Link as={NavLink} to="/create" onClick={closeNavbar}>Create</Nav.Link>
                <Nav.Link as={NavLink} to="/profile" onClick={closeNavbar}>Profile
                {/* pada Nav.Link to profile, className="no-border-conditional" dihapus karena pp-container sementara dihilangkan */}
                  {/* <div className="pp-container">
                    <img src={profilePlaceholder} alt="profile-picture" id="profilePicture" />
                  </div>
                  <span className="profile-label">{currentUser.email.split("@")[0]}</span> */}
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    setExpanded(false);
                    setShowLogoutConfirm(true);
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            )}
            {/* Tautan untuk pengguna yang belum login */}
            {!currentUser && (
              <>
                <Nav.Link as={NavLink} to="/login" className="btn-primary no-border-condition" onClick={closeNavbar}>
                  {/* <Button className="btn-primary" style={{padding: "10px 20px"}}>Login</Button> */}
                  Login
                </Nav.Link>
              </>
            )}
            <button className="btn-outline-primary" 
            onClick={() => {
              toggleTheme();
              closeNavbar();
            }}>
              <i className={theme === "dark"
                ? "fi fi-ss-brightness"
                : "fi fi-ss-moon"} />
            </button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

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

export default AppNavBar;