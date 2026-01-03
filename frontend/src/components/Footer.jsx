import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">

        <div className="footer-brand">
          <strong>Laciform</strong>
          <p>Platform berbagi formulir publik.</p>
        </div>

        <div className="footer-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/explore">Explore</NavLink>
          <NavLink to="/create">Create</NavLink>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Laciform. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;