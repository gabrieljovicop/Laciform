// import { useEffect, useState } from "react";
// import { Container, Row, Col, Card, Button, Navbar, Nav } from "react-bootstrap";
import { NavLink, Routes, Route, useNavigate, useLocation } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// import Logo from "./components/Logo";

// import { setupNavbarScroll } from "./utils/navigation";
// import { getInitialTheme, setupThemeMode } from "./utils/accesibility";
import { AuthProvider } from "./contexts/AuthContext";

import MainLayout from "./layouts/MainLayout";
// import PrivateRoute from "./components/PrivateRoute";
import ProtectedPage from "./components/ProtectedPage";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import AddForm from "./pages/AddForm";
import EditForm from "./pages/EditForm";
import NotFound from "./pages/NotFound";

import "./App.css";

function AppContent() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />

        <Route
          path="/create"
          element={
            <ProtectedPage>
              <Create />
            </ProtectedPage>
          }
        />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/profile"
        element={
          <ProtectedPage>
            <Profile />
          </ProtectedPage>
        }
      />

      <Route
        path="/create/add"
        element={
          <ProtectedPage>
            <AddForm />
          </ProtectedPage>
        }
      />

      <Route
        path="/edit/:formId"
        element={
          <ProtectedPage>
            <EditForm />
          </ProtectedPage>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </div>
  );
}

export default App;