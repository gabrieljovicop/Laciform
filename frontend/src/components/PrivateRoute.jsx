// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext"; // Import useAuth

// // Komponen ini digunakan di dalam Routes, menggantikan element={<Component />}
// const PrivateRoute = ({ element: Component, ...rest }) => {
//   const { currentUser } = useAuth();
  
//   // Jika pengguna sudah login, tampilkan komponen yang diminta (misalnya Profile)
//   if (currentUser) {
//     return Component;
//   }
  
//   // Jika pengguna belum login, arahkan ke halaman Login
//   return <Navigate to="/login" replace />;
// };

// export default PrivateRoute; >>INI DIGANTI DENGAN ProtectedPage.jsx<<