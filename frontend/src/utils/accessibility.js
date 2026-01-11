export function applyAccessibilitySettings() {
  applyFontScale();
  applyReduceMotion();
  applyDyslexicMode();
}

export function applyFontScale() {
  const fontScale = localStorage.getItem("fontScale") || "1";
  document.documentElement.style.setProperty("--base-font-scale", fontScale);
}

export function applyReduceMotion() {
  const reduceMotion = localStorage.getItem("reduceMotion") === "true";

  if (reduceMotion) {
    document.body.classList.add("reduce-motion");
  } else {
    document.body.classList.remove("reduce-motion");
  }
}

export function applyDyslexicMode() {
  const dyslexicMode = localStorage.getItem("dyslexicMode") === "true";

  if (dyslexicMode) {
    document.body.classList.add("dyslexic-mode");
  } else {
    document.body.classList.remove("dyslexic-mode");
  }
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}