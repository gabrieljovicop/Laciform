import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { Modal, Button } from "react-bootstrap";

import SearchBar from "../components/SearchBar";

import "./Create.css";

function Create () {
  const { currentUser } = useAuth();
  const [filteredForms, setFilteredForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [allForms, setAllForms] = useState([]);
  const [filters, setFilters] = useState({ keyword: "", tags: [] });
  const [resetKey, setResetKey] = useState(0);
  const isFiltering = filters.keyword.trim() !== "" || filters.tags.length > 0; 

  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    if (!currentUser) {
        setLoading(false);
        return;
    }

    const fetchUserForms = async () => {
      try {
        setLoading(true);
        
        const q = query(
          collection(db, "forms"), 
          where("authorId", "==", currentUser.uid),
          orderBy("createdAt", "desc")
        );
        
        const snapshot = await getDocs(q);
        const formsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setAllForms(formsData);
        setFilteredForms(formsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching forms:", err);
        setError("Gagal memuat forms Anda.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserForms();
  }, [currentUser]);

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

    setFilteredForms(filtered);
  }, [filters, allForms]);

  const handleOpenModal = (form) => {
    setSelectedForm(form);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedForm(null);
  };

  return (
    <div className="create-page">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Jelajahi semua form kiriman Anda di sini</h2>

      <SearchBar onSearch={setFilters} resetSignal={resetKey} />

      {loading && <p>Memuat form-form Anda...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && filteredForms.length === 0 && (
        <p className="text-center">
          {isFiltering
            ? "Tidak ada form Anda yang cocok dengan pencarian atau filter."
            : "Anda belum membuat form apa pun."}
        </p>
      )}

      {isFiltering && filteredForms.length === 0 && (
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
        {/* Card Add Form - Tetap di posisi pertama */}
        <Link to="/create/add" className="add-form-card">
          <div className="add-form-inner">
            <div className="plus-icon">+</div>
            <p>Tambah Form Baru</p>
          </div>
        </Link>

        {filteredForms.map(form => (
          <div key={form.id} className="form-card" onClick={() => handleOpenModal(form)}>
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
                Status: {form.isPublic ? "🌐 Publik" : "🔒 Privat"}
              </p>
              
              <div className="like-section" style={{ marginBottom: "10px", fontSize: "14px" }}>
                👍 {form.likes || 0} Likes
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

      {/* --- MODAL POP-UP DETAIL (Versi Create) --- */}
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
              <div className="tags" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
                {selectedForm.tags && selectedForm.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <p><strong>Status:</strong> {selectedForm.isPublic ? "Tersedia di Explore (Publik)" : "Hanya Anda yang bisa melihat"}</p>
              <p><strong>Link Asli:</strong> <a href={selectedForm.formLink} target="_blank" rel="noreferrer" style={{wordBreak: "break-all", color: "var(--text-color)"}}>{selectedForm.formLink}</a></p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Tutup</Button>
              {/* Tombol Edit Form khusus di Create.jsx */}
              <Button variant="primary" as={Link} to={`/edit/${selectedForm.id}`}>
                Edit Form
              </Button>
              {/* <Button variant="primary" href={selectedForm.formLink} target="_blank">
                Lihat Form
              </Button> */}
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Create;