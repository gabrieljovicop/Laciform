import { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { applyAccessibilitySettings } from "../../utils/accessibility";

import CustomSelect from "./CustomSelect";

function AccessibilitySection() {
  const { theme, toggleTheme } = useTheme();

  const [fontScale, setFontScale] = useState(
    localStorage.getItem("fontScale") || "1"
  );

  const fontOptions = [
    { value: "0.9", label: "Kecil" },
    { value: "1", label: "Normal" },
    { value: "1.1", label: "Besar" },
    { value: "1.25", label: "Sangat Besar" },
  ];

  const [reduceMotion, setReduceMotion] = useState(
    localStorage.getItem("reduceMotion") === "true"
  );

  const [dyslexicMode, setDyslexicMode] = useState(
    localStorage.getItem("dyslexicMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("fontScale", fontScale);
    localStorage.setItem("reduceMotion", reduceMotion);
    localStorage.setItem("dyslexicMode", dyslexicMode);
    applyAccessibilitySettings();
  }, [fontScale, reduceMotion, dyslexicMode]);

  return (
    <div className="profile-card">
      <h3>Aksesibilitas</h3>

      {/* ===== THEME ===== */}
      <div className="accessibility-item">
        <div>
          <strong>Tema</strong>
          <p className="accessibility-item-description">Atur mode terang / gelap</p>
        </div>
        <div className="theme-switch">
          <span className={theme === "light" ? "active" : ""}>Light</span>

          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>

          <span className={theme === "dark" ? "active" : ""}>Dark</span>
        </div>
      </div>

      {/* ===== FONT SIZE ===== */}
      <div className="accessibility-item">
        <div>
          <strong>Ukuran Teks</strong>
          <p className="accessibility-item-description">Perbesar atau perkecil tampilan teks</p>
        </div>

        <CustomSelect value={fontScale} options={fontOptions} onChange={setFontScale} />
      </div>

      {/* ===== REDUCE MOTION ===== */}
      <div className="accessibility-item">
        <div>
          <strong>Reduce Motion</strong>
          <p className="accessibility-item-description">Matikan animasi dan transisi</p>
        </div>

        <input type="checkbox" checked={reduceMotion} onChange={(e) => setReduceMotion(e.target.checked)} />
      </div>

      {/* ===== DYSLEXIC MODE ===== */}
      <div className="accessibility-item">
        <div>
          <strong>Dyslexic Mode</strong>
          <p className="accessibility-item-description">Perlebar jarak huruf agar mudah dibaca</p>
        </div>

        <input
          type="checkbox"
          checked={dyslexicMode}
          onChange={(e) => setDyslexicMode(e.target.checked)}
        />
      </div>
    </div>
  );
}

export default AccessibilitySection;