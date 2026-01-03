import laciformLogoBlack from "../assets/LaciformIconHitam.png";
import laciHitamDie from "../assets/LaciHitamDie.png";
import laciHitamSenyum from "../assets/LaciHitamSenyum.png";

import laciformLogoWhite from "../assets/LaciformIconPutih.png";
import laciPutihDie from "../assets/LaciPutihDie.png";
import laciPutihSenyum from "../assets/LaciPutihSenyum.png";



// kalau nanti ada ekspresi lain, tinggal tambah di sini
const logoMap = {
  light: {
    normal: laciformLogoBlack,
    die: laciHitamDie,
    smile: laciHitamSenyum,
  },
  dark: {
    normal: laciformLogoWhite,
    die: laciPutihDie,
    smile: laciPutihSenyum,
  },
};

export default function Logo({
  theme = "light",
  mood = "normal",
  alt = "Laciform Logo",
  ...props
}) {
  const src =
    logoMap[theme]?.[mood] || logoMap.light.normal; // fallback aman

  return <img src={src} alt={alt} {...props} />;
}