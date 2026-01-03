import { Outlet } from "react-router-dom";
import AppNavBar from "../components/AppNavBar";

function MainLayout() {
  return (
    <div className="MainLayout">
      <AppNavBar />
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;