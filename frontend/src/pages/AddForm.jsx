import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { db } from "../firebase"; // HANYA import db (Hapus import storage)
import { collection, addDoc, Timestamp } from "firebase/firestore"; 
import { useAuth } from "../contexts/AuthContext";

import "./Create.css";

function AddForm () {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState([]);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  function toggleTag(tag) {
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
    if (!currentUser) {
      alert("Anda harus login untuk membuat form baru.");
      return;
    }
    
    if (!title || !link || tags.length === 0) {
        alert("Judul, Link, dan setidaknya satu Tag wajib diisi.");
        return;
    }

    setLoading(true);

    const newForm = {
      authorId: currentUser.uid,
      authorName: currentUser.displayName || currentUser.email.split("@")[0],
      title: title,
      description: desc,
      formLink: link,
      tags: tags,
      isPublic: isPublic, 
      likes: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      thumbnailUrl: thumbnailUrl,
    };

    try {
      // 2. Simpan Data ke Firestore
      const formsCollectionRef = collection(db, "forms");
      await addDoc(formsCollectionRef, newForm);

      alert("Form berhasil disimpan!");
      navigate("/create"); 

    } catch (error) {
      console.error("Gagal menyimpan form: ", error);
      alert("Gagal menyimpan form: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="add-form-page page-content">

      <h2 style={{ textAlign: "center"}}>Create New Form</h2>
      <form className="add-form-container form-container" onSubmit={handleSubmit}>
        <label>Judul Form</label>
        <input type="text" placeholder="Masukkan judul form" value={title} onChange={e => setTitle(e.target.value)} 
          className="form-input-custom"/>

        <label>Deskripsi Form</label>
        <textarea placeholder="Masukkan deskripsi form" value={desc} onChange={e => setDesc(e.target.value)} 
          className="form-input-custom"/>
          
        <label>Link Form</label>
        <input placeholder="https://..." value={link} onChange={e => setLink(e.target.value)} 
          className="form-input-custom"/>

        <label>Pilih Tags Kategori</label>
        <div className="tag-options">
          {["Survei", "Evaluasi", "Permainan Kuis", "Pendaftaran", "Pemesanan"].map(tag => (
            <button type="button" key={tag} style={{padding: "5px 12px"}} className={`btn-outline-primary ${tags.includes(tag) ? "active" : ""}`} onClick={() => toggleTag(tag)}>
              {tag}
            </button>
          ))}
        </div>

        <label>Gambar Thumbnail</label>
        <input type="file" accept="image/*" onChange={handleUpload} />

        {thumbnailUrl && (
          <div className="image-preview">
            <img src={thumbnailUrl} alt="thumbnail preview" />
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "15px" }}>
          <input type="checkbox" id="isPublic" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} />
          <label htmlFor="isPublic" style={{ margin: 0 }}>Tampilkan di Halaman Explore (Publik)</label>
        </div>

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Menyimpan form..." : "Simpan Form"}
        </button>
      </form>


    </div>
  );
}

export default AddForm;