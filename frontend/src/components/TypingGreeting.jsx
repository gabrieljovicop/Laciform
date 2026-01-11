import { useEffect, useState } from "react";

import { useTheme } from "../contexts/ThemeContext";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Selamat Pagi!";
  if (hour >= 12 && hour < 17) return "Selamat Siang!";
  if (hour >= 17 && hour < 21) return "Selamat Sore!";
  return "Selamat Malam!";
}

const lines = [
  getGreeting(),
  "Ada formulir yang ingin Anda cari atau bagikan hari ini?"
];

export default function TypingGreeting() {
  const { theme } = useTheme();
  const [text, setText] = useState("");
  const [line, setLine] = useState(0);
  const [char, setChar] = useState(0);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (line >= lines.length) return;

    const current = lines[line];
    const timeout = setTimeout(() => {
      setText(current.slice(0, char + 1));
      setChar(char + 1);

      if (char + 1 === current.length) {
        if (line === 0) {
          setWaiting(true);

          setTimeout(() => {
            setText("");
            setChar(0);
            setLine(line + 1);
            setWaiting(false);
          }, 1000);
        }
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [char, line]);

  return (
    <h1
      className="hero-greeting"
      style={{ color: theme === "dark" ? "#fff" : "#000" }}
    >
      {text}
    </h1>
  );
}