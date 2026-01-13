import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import { setupTypingGreeting } from "../utils/typingEffect";

import TypingGreeting from "../components/TypingGreeting";
import Footer from "../components/Footer";
import LoginPromptModal from "../components/LoginPromptModal";
import { useAuth } from "../contexts/AuthContext";

// import image1 from "../assets/pixelshelfroom.png";

import "./Home.css";

function Home () {
  // useEffect(() => {
  //   setupTypingGreeting();
  // }, []);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleCreateClick = () => {
    if (!currentUser) {
      setShowLoginPrompt(true);
    } else {
      navigate("/create");
    }
  };

  return (
    <div className="home-page">
      <section className="hero-section">
          <div className="hero-content">
            <TypingGreeting />
            
            <p className="hero-subtitle">
              Platform untuk membuat, mencari, dan membagikan formulir publik secara terbuka.
            </p>

            <div className="hero-actions">
              <button className="btn-primary" onClick={() => navigate("/explore")}>
                Cari Form Publik
              </button>

              <button className="btn-outline-primary" onClick={handleCreateClick}>
                Buat Form
              </button>
            </div>
          </div>
      </section>
      
      <section className="info-section">
        <div className="info-container">
          
          <div className="info-about-card">
            <h2>Apa itu Laciform?</h2>
            <p>
              Laciform adalah platform berbagi formulir secara publik tanpa perlu link khusus.
              Setiap orang dapat menemukan dan mengisi formulir sesuai kebutuhan.
            </p>
          </div>

          <h3 className="info-feature-title">Apa yang bisa dilakukan?</h3>

          <div className="info-feature-grid">
            <div className="info-feature-card">
              <div className="info-icon">
                <i class="fi fi-sr-magnifying-glass-wave"></i>
              </div>
              <h4>Mencari Form Publik</h4>
              <p>Temukan berbagai formulir publik dengan cepat dan mudah, bisa dicari berdasarkan kategori.</p>
            </div>

            <div className="info-feature-card">
              <div className="info-icon">
                <i class="fi fi-sr-file-edit"></i>
              </div>
              <h4>Membuat & Membagikan</h4>
              <p>Buat kostumisasi formulir dari tag kategori hingga gambar thumbnail, dan opsi bagikan secara publik.</p>
            </div>

            {/* <div className="info-feature-card">
              <div className="info-icon">
                 <i class="fi fi-sr-chart-pie-alt"></i>
              </div>
              <h4>Kelola Respon</h4>
              <p>Lihat dan kelola semua jawaban secara terpusat.</p>
            </div> */}
          </div>

        </div>
      </section>

      <Footer />

      <LoginPromptModal
        show={showLoginPrompt}
        handleClose={() => setShowLoginPrompt(false)}
      />
    </div>
  );
}

export default Home;