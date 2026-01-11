import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedPage({ children }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div style={{ padding: 40, textAlign: "center" }}>Memuat...</div>;
  }

  if (!currentUser) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}

export default ProtectedPage;