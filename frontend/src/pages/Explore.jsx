import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs, orderBy, doc, updateDoc, increment } from "firebase/firestore"; 
import { Modal, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

import SearchBar from "../components/SearchBar";

import "./Explore.css";

function Explore () {
  const { currentUser } = useAuth();
  const [publicForms, setPublicForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [search, setSearch] = useState("");
  const [allForms, setAllForms] = useState([]);
  const [filters, setFilters] = useState({ keyword: "", tags: [] });
  const [resetKey, setResetKey] = useState(0);
  const isFiltering = filters.keyword.trim() !== "" || filters.tags.length > 0; 


  // const location = useLocation();
  
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    const fetchPublicForms = async () => {
      try {
        setLoading(true);

        const q = query(
          collection(db, "forms"), 
          where("isPublic", "==", true),
          orderBy("createdAt", "desc") 
        );
        
        const snapshot = await getDocs(q);
        const formsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setAllForms(formsData);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat daftar forms publik.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicForms();
  }, []);      

  useEffect(() => {
    const filtered = allForms.filter(form => {
      const matchKeyword =
        !filters.keyword ||
        form.title?.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        form.description?.toLowerCase().includes(filters.keyword.toLowerCase());

      const matchTags =
        filters.tags.length === 0 ||
        filters.tags.some(tag => form.tags?.includes(tag));

      return matchKeyword && matchTags;
    });

    setPublicForms(filtered);
  }, [filters, allForms]);

  const handleLike = async (e, formId) => {
    e.stopPropagation();
    
    if (!currentUser) {
      alert("Silakan login terlebih dahulu untuk memberikan like!");
      return;
    }

    try {
      const formRef = doc(db, "forms", formId);
      
      // Update di Firestore secara Real-time
      await updateDoc(formRef, {
        likes: increment(1)
      });

      // Update state lokal agar angka langsung berubah di layar tanpa refresh
      setPublicForms(prevForms => 
        prevForms.map(f => 
          f.id === formId ? { ...f, likes: (f.likes || 0) + 1 } : f
        )
      );

      // Jika modal sedang terbuka, update juga data di dalam modal
      if (selectedForm && selectedForm.id === formId) {
        setSelectedForm(prev => ({ ...prev, likes: (prev.likes || 0) + 1 }));
      }

    } catch (err) {
      console.error("Gagal memberikan like:", err);
    }
  };

  // Fungsi untuk membuka modal
  const handleOpenModal = (form) => {
    setSelectedForm(form);
    setShowModal(true);
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedForm(null);
  };

  return (
    <div className="explore-page">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Jelajahi form yang tersedia secara publik di sini</h2>

      {/* <input type="text" placeholder="Cari form publik..." value={search} onChange={(e) => setSearch(e.target.value)} /> */}
      <SearchBar onSearch={setFilters} resetSignal={resetKey} />

      {loading && <p className="text-center">Memuat forms...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && publicForms.length === 0 && (
        <p className="text-center">
          {isFiltering
            ? "Tidak ada form yang sesuai dengan pencarian atau filter."
            : "Belum ada form publik yang tersedia."}
        </p>)}
        {isFiltering && publicForms.length === 0 && (
          <div className="flex-center">
            <button
              className="btn-primary"
              onClick={() => {
                setFilters({ keyword: "", tags: [] });
                setResetKey(prev => prev + 1);
              }}
            >
              Reset Filter
            </button>
          </div>
        )}
      
      <div className="form-grid"> 
        {publicForms.map(form => (
          <div key={form.id} className="form-card" onClick={() => handleOpenModal(form)}>
            {/* Thumbnail */}
            <div className="thumb">
              {form.thumbnailUrl ? (
                <img src={form.thumbnailUrl} alt={form.title} />
              ) : (
                <div className="no-image"></div>
              )}
            </div>
            
            <div className="card-body">
              <h3 className="card-title">{form.title}</h3>
              <p className="author-name" style={{ fontSize: "14px", color: "var(--text-muted)" }}>
                Oleh: {form.authorName || "Anonymous"}
              </p>

              {/* Section Like */}
              <div className="like-section" style={{ marginBottom: "10px" }}>
                <button 
                  onClick={(e) => handleLike(e, form.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}
                >
                  👍 <span style={{ color: "var(--text-color)" }}>{form.likes || 0}</span>
                </button>
              </div>
              
              <div className="tags">
                {form.tags && form.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL POP-UP DETAIL --- */}
      <Modal show={showModal} onHide={handleCloseModal} centered contentClassName="custom-modal">
        {selectedForm && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedForm.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ textAlign: "center", marginBottom: "15px" }}>
                <div className="modal-thumb-container" style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", borderRadius: "8px" }}>
                   <img 
                    src={selectedForm.thumbnailUrl || "https://placehold.co/600x338/2d3436/white?text=No+Thumbnail"} 
                    alt="Preview" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
              </div>
              <h5>Deskripsi:</h5>
              <p>{selectedForm.description || "Tidak ada deskripsi."}</p>
              <hr />
              
              {/* Like Section di dalam Modal */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                <button className="btn-outline-primary" onClick={(e) => handleLike(e, selectedForm.id)}>
                  👍 Like ({selectedForm.likes || 0})
                </button>
              </div>

              <p><strong>Dibuat oleh:</strong> {selectedForm.authorName || "Anonymous"}</p>
              <div className="tags" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {selectedForm.tags && selectedForm.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Tutup</Button>
              <Button variant="primary" href={selectedForm.formLink} target="_blank">
                Isi Form Sekarang
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Explore;