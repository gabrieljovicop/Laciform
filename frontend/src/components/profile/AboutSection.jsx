function AboutSection() {
  return (
    <div className="profile-card">
      <h3>Tentang</h3>

      <div style={{ marginTop: "12px" }}>
        <p>Laciform</p>
        <p>Platform berbagi form publik.</p>
        <p>Dibuat oleh Gabriel Jovico Prathama</p>
        <p>© {new Date().getFullYear()} Laciform. All rights reserved.</p>
      </div>
    </div>
  );
}

export default AboutSection;
