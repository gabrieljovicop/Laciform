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
        <h2>Apa itu Laciform?</h2>
        <p>
          Laciform adalah platform berbagi formulir secara publik tanpa perlu link khusus.
          Setiap orang dapat menemukan dan mengisi formulir sesuai kebutuhan.
        </p>

        <h3>Apa yang bisa dilakukan?</h3>
        <ul>
          <li>Mencari formulir publik</li>
          <li>Membuat dan membagikan formulir sendiri</li>
          <li>Mengelola respons dengan mudah</li>
        </ul>
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