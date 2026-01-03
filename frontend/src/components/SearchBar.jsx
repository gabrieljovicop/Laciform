import { useEffect, useState } from "react";

const TAGS = [
  "Survei",
  "Evaluasi",
  "Permainan Kuis",
  "Pendaftaran",
  "Pemesanan"
];

export default function SearchBar({ onSearch, resetSignal }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeTags, setActiveTags] = useState([]);

  // Debounce keyword
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Kirim ke parent saat search / tag berubah
  useEffect(() => {
    onSearch({
      keyword: debouncedSearch,
      tags: activeTags
    });
  }, [debouncedSearch, activeTags, onSearch]);

  useEffect(() => {
    setSearch("");
    setDebouncedSearch("");
    setActiveTags([]);
  }, [resetSignal]);

  const toggleTag = (tag) => {
    setActiveTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Cari form..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="tag-filters">
        {TAGS.map(tag => (
          <button
            key={tag}
            className={`tag-btn ${activeTags.includes(tag) ? "active" : ""}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}