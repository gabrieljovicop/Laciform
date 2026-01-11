import { useState } from "react";
import { Nav, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import ProfileSection from "../components/profile/ProfileSection";
import AccessibilitySection from "../components/profile/AccessibilitySection";
import SecuritySection from "../components/profile/SecuritySection";
import AboutSection from "../components/profile/AboutSection";
import CustomSelect from "../components/profile/CustomSelect";

import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const reduceMotion = localStorage.getItem("reduceMotion") === "true";

  const TABS = {
    profile: "Profile",
    accessibility: "Aksesibilitas",
    security: "Keamanan",
    about: "Tentang",
  };

  const tabOptions = Object.entries(TABS).map(([value, label]) => ({
    value,
    label,
  }));

  return (
    <div className="profile-page page-content">
      <h2 className="profile-title">Pengaturan Akun</h2>
      <div className="profile-layout">
      {/* ===== MOBILE TOP BAR ===== */}
      <div className="profile-mobile-bar">
        <button className="mobile-back-btn" onClick={() => navigate(-1)}>
          ←
        </button>

        <CustomSelect value={activeTab} options={tabOptions} onChange={setActiveTab} />
      </div>

      {/* ===== DESKTOP SIDEBAR ===== */}
      <div className="profile-sidebar">
        <button className="back-home-link" onClick={() => navigate(-1)}>
          ← Kembali
        </button>

        <div className="sidebar-divider"></div>

        <Nav activeKey={activeTab} onSelect={setActiveTab}>
          <Nav.Item><Nav.Link eventKey="profile">Profile</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="accessibility">Aksesibilitas</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="security">Keamanan</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="about">Tentang</Nav.Link></Nav.Item>
        </Nav>
      </div>

        {/* Content */}
        <div className="profile-content">
          <div key={activeTab} className={`profile-panel ${reduceMotion ? "" : "fade-slide"}`}>
            {activeTab === "profile" && <ProfileSection />}
            {activeTab === "accessibility" && <AccessibilitySection />}
            {activeTab === "security" && <SecuritySection />}
            {activeTab === "about" && <AboutSection />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;