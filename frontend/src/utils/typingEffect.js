export function setupTypingGreeting() {
  const target = document.getElementById("typingGreeting");
  if (!target) return;

  // Greeting berdasarkan jam
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Selamat Pagi!";
    if (hour >= 12 && hour < 17) return "Selamat Siang!";
    if (hour >= 17 && hour < 21) return "Selamat Sore!";
    return "Selamat Malam!";
  }

  const lines = [
    getGreeting(),
    "Ada form yang ingin Anda cari atau bagikan hari ini?"
  ];

  let lineIndex = 0;
  let charIndex = 0;

  function typeEffect() {
    const currentText = lines[lineIndex];

    // ketik normal
    target.textContent = currentText.slice(0, charIndex + 1);
    charIndex++;

    // jika satu baris selesai → stop sebentar → lanjut baris berikutnya
    if (charIndex === currentText.length) {
      lineIndex++;

      // kalau masih ada baris berikutnya
      if (lineIndex < lines.length) {
        charIndex = 0;
        return setTimeout(typeEffect, 1000); // jeda sebelum lanjut baris 2
      } else {
        // baris terakhir selesai → berhenti total
        return;
      }
    }

    setTimeout(typeEffect, 50);
  }

  // Warna teks mengikuti tema dari JS
  function applyTextColor() {
    const isDark = document.body.classList.contains("dark-mode");
    target.style.color = isDark ? "#ffffff" : "#000000";
  }

  applyTextColor();

  // observe perubahan tema
  const observer = new MutationObserver(applyTextColor);
  observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

  // mulai typing
  typeEffect();
}


export function setupTypingGreetingLooping() {
  const target = document.getElementById("typingGreeting");
  if (!target) return;

  // Greeting berdasarkan jam
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning!";
    if (hour >= 12 && hour < 17) return "Good Afternoon!";
    if (hour >= 17 && hour < 21) return "Good Evening!";
    return "Good Night!";
  }

  const lines = [
    getGreeting(),
    "Any form you want to search or share today?"
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = lines[lineIndex];

    // Ketik
    if (!isDeleting) {
      target.textContent = currentText.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        setTimeout(() => (isDeleting = true), 1500);
      }
    }

    // Hapus
    else {
      target.textContent = currentText.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
      }
    }

    const speed = isDeleting ? 40 : 70;
    setTimeout(typeEffect, speed);
  }

  // Terapkan warna sesuai tema lewat CSS variable
  function applyTextColor() {
    const isDark = document.body.classList.contains("dark-mode");
    // Pakai warna hex langsung
    target.style.color = isDark ? "#ffffff" : "#000000";
  }

  applyTextColor();

  // amati perubahan class pada body (saat tema berubah)
  const observer = new MutationObserver(applyTextColor);
  observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

  typeEffect();  // Mulai efek ketik
}