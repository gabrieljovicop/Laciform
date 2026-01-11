import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore"; 
import { useAuth } from "../contexts/AuthContext";

import ConfirmModal from "../components/modals/ConfirmModal";

import "./Create.css";

function EditForm () {
  const { formId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState([]);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);

  useEffect(() => {
    
    const fetchForm = async () => {
      if (!currentUser || !formId) {
        setInitialLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "forms", formId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          
          if (data.authorId !== currentUser.uid) {
            setError("Anda tidak memiliki izin untuk mengedit form ini.");
            navigate("/create");
            return;
          }
          
          setTitle(data.title || "");
          setDesc(data.description || "");
          setLink(data.formLink || "");
          setTags(data.tags || []);
          setThumbnailUrl(data.thumbnailUrl || "");
          setIsPublic(data.isPublic || false);

        } else {
          setError("Form tidak ditemukan.");
          navigate("/create");
        }
      } catch (err) {
        console.error("Error loading form:", err);
        setError("Gagal memuat data form.");
      } finally {
        setInitialLoading(false);
      }
    };
    fetchForm();
  }, [formId, currentUser, navigate]);
  
  function toggleTag(tag) {
    setIsDirty(true);
    setTags(prev =>
      prev.includes(tag)
      ? prev.filter(t => t !== tag)
      : [...prev, tag]
    );
  }

  function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setThumbnailUrl(reader.result);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (initialLoading || !currentUser) return;

    if (!title || !link || tags.length === 0) {
      alert("Judul, Link, dan setidaknya satu Tag wajib diisi.");
      return;
    }

    setLoading(true);
    
    const updatedData = {
      title: title,
      description: desc,
      formLink: link,
      tags: tags,
      isPublic: isPublic, 
      updatedAt: Timestamp.now(),
      thumbnailUrl: thumbnailUrl,
    };

    try {
      const formDocRef = doc(db, "forms", formId);
      await updateDoc(formDocRef, updatedData);

      alert("Form berhasil diperbarui!");
      navigate("/create"); 

    } catch (err) {
      console.error("Gagal memperbarui form: ", err);
      alert("Gagal memperbarui form: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    if (!window.confirm(`Anda yakin ingin menghapus form "${title}"?`)) {
        return;
    }

    setLoading(true);
    try {
        const formDocRef = doc(db, "forms", formId);
        await deleteDoc(formDocRef);

        alert("Form berhasil dihapus!");
        navigate("/create");

    } catch (err) {
        console.error("Gagal menghapus form:", err);
        alert("Gagal menghapus form: " + err.message);
    } finally {
        setLoading(false);
    }
  };

  if (initialLoading) return <div className="loading-page"><p>Memuat form...</p></div>;
  if (error) return <div className="error-page"><p>{error}</p></div>;

  return (
    <div className="edit-form-page page-content">
      <div className="form-page-header">
        <button
          type="button"
          className="back-button"
          onClick={() => {
            if (isDirty) setShowLeaveConfirm(true);
            else navigate(-1);
          }}
        >
          ← Kembali
        </button>

        <h2 className="form-page-title">Edit Form: {title}</h2>
      </div>

      <form className="edit-form-container form-container" onSubmit={handleSubmit}>
        <label>Judul Form</label>
        <input type="text" placeholder="Masukkan judul form" value={title} 
        onChange={e => {
          setTitle(e.target.value);
          setIsDirty(true);
        }} 
        className="form-input-custom" />
        
        <label>Deskripsi Form</label>
        <textarea placeholder="Masukkan deskripsi form" value={desc} 
        onChange={e => {
          setDesc(e.target.value);
          setIsDirty(true);
        }} 
          className="form-input-custom"/>

        <label>Link Form</label>
        <input placeholder="https://..." value={link} 
        onChange={e => {
          setLink(e.target.value);
          setIsDirty(true);
        }} 
          className="form-input-custom"/>

        <label>Pilih Tags Kategori</label>
        <div className="tag-options">
          {["Survei", "Evaluasi", "Permainan Kuis", "Pendaftaran", "Pemesanan"].map(tag => (
            <button type="button" key={tag} className={`btn-outline-primary ${tags.includes(tag) ? "active" : ""}`} onClick={() => toggleTag(tag)}>
              {tag}
            </button>
          ))}
        </div>

        <label>Gambar Thumbnail</label>
        <input type="file" accept="image/*" 
        onChange={e => {
          handleUpload(e);
          setIsDirty(true);
        }} />

        {thumbnailUrl && (
          <div className="image-preview">
            <img src={thumbnailUrl} alt="thumbnail preview" />
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "15px" }}>
          <input type="checkbox" id="isPublic" checked={isPublic} 
          onChange={e => {
            setIsPublic(e.target.checked);
            setIsDirty(true);
          }} />
          <label htmlFor="isPublic" style={{ margin: 0 }}>Tampilkan di Halaman Explore (Publik)</label>
        </div>
        
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Menyimpan Perubahan..." : "Simpan Perubahan"}
        </button>
        <button className="btn-outline-primary" type="button" onClick={handleDelete} disabled={loading}>
          {loading ? "Menghapus..." : "Hapus Form"}
        </button>
      </form>

      <ConfirmModal
        show={showLeaveConfirm}
        onClose={() => setShowLeaveConfirm(false)}
        onConfirm={() => navigate(-1)}
        title="Perubahan belum disimpan"
        message="Perubahan yang Anda buat belum disimpan. Yakin ingin keluar?"
        confirmText="Ya, Keluar"
        cancelText="Batal"
      />

    </div>
  );
}

export default EditForm;