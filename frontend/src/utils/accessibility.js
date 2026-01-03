export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}


// export function getInitialTheme(prefersDark) {
//     // Fungsi baru untuk mendapatkan tema awal tanpa manipulasi DOM
//     return localStorage.getItem("theme") || (prefersDark ? "dark" : "light");
// }

// export function setupThemeMode(logoLight, logoDark) {
//   const body = document.body;
//   const toggleBtn = document.getElementById("themeToggle");
//   // const logo = document.getElementById("laciformLogo");
//   // const span = document.getElementById("laciformSpan");
//   const icon = toggleBtn?.querySelector("i");

//   // Cek localStorage, kalau belum ada, deteksi preferensi sistem
//   const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//   const savedTheme = localStorage.getItem("theme") || (prefersDark ? "dark" : "light");

//   applyTheme(savedTheme);

//   // Event listener untuk tombol manual
//   if (toggleBtn) {
//     toggleBtn.addEventListener("click", () => {
//       const newTheme = body.classList.contains("dark-mode") ? "light" : "dark";
//       applyTheme(newTheme);
//       localStorage.setItem("theme", newTheme);
//     });
//   }

//   // Fungsi utama untuk menerapkan tema
//   function applyTheme(mode) {
//     if (mode === "dark") {
//       body.classList.add("dark-mode");
//       if (icon) {
//         icon.className = "fi fi-ss-brightness";
//       }
//       // if (logo) {
//       //   logo.src = logoDark;
//       // }
//       // if (span) {
//       //   span.style.color = "white";
//       // }
//     } else {
//       body.classList.remove("dark-mode");
//       if (icon) {
//         icon.className = "fi fi-ss-moon";
//       }
//       // if (logo) {
//       //   logo.src = logoLight;
//       // }
//       // if (span) {
//       //   span.style.color = "black";
//       // }
//     }
//   }

//   // (Opsional) Update otomatis jika user ubah tema sistem
//   if (!localStorage.getItem("theme")) {
//     window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
//       const newMode = e.matches ? "dark" : "light";
//       applyTheme(newMode);
//     });
//   }
// }