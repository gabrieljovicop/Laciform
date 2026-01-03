import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

// 1. Buat Konteks
const AuthContext = createContext();

// 2. Custom Hook untuk Menggunakan Konteks
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Provider yang Menyediakan Status dan Fungsi
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efek untuk melacak perubahan status autentikasi
  useEffect(() => {
    // onAuthStateChanged adalah fungsi Firebase yang memantau status login
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Clean up function: berhenti mendengarkan ketika komponen di-unmount
    return unsubscribe;
  }, []);

  // Fungsi Logout
  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser, // null jika belum login, atau objek user jika sudah login
    loading,     // true saat memuat status awal
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        // Render Loading Screen (misalnya spinner Bootstrap) saat status Auth sedang diverifikasi
        <div style={{ padding: "50px", textAlign: "center" }}>
          Memuat status pengguna...
        </div>
      ) : (
        // Setelah loading selesai, render children (AppContent)
        children 
      )}
    </AuthContext.Provider>
  );
};