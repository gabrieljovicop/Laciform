// export function setupNavbarScroll() {
//   let lastScrollY = window.scrollY;
//   const navbar = document.querySelector(".navbar");

//   window.addEventListener("scroll", () => {
//     if (!navbar) return;

//     if (window.scrollY > lastScrollY) {
//       navbar.classList.add("hide");
//     } else {
//       navbar.classList.remove("hide");
//     }

//     lastScrollY = window.scrollY;
//   });
// }

export function setupNavbarScroll(navbar) {
  if (!navbar) return;

  let lastScrollY = window.scrollY;
  const THRESHOLD = 8; // 🔥 kunci responsif

  const onScroll = () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;

    // scroll ke bawah cukup jauh → sembunyikan
    if (delta > THRESHOLD) {
      navbar.classList.add("hide");
      lastScrollY = currentScrollY;
    }

    // scroll ke atas cukup jauh → tampilkan
    if (delta < -THRESHOLD) {
      navbar.classList.remove("hide");
      lastScrollY = currentScrollY;
    }

    if (currentScrollY < 40) {
      navbar.classList.remove("hide");
    }
  };

  window.addEventListener("scroll", onScroll);

  return () => {
    window.removeEventListener("scroll", onScroll);
  };
}