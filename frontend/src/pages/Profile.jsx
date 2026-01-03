// import "./Library.css";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Profile () {
  return (
    <div className="profile-page">
      <button className="btn btn-outline-primary" id="themeToggle">
        <i className="fi fi-ss-moon"></i>
      </button>
      {/* <Nav fill variant="pills" defaultActiveKey="/home" className="flex-column">
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="link-1">Settings</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="link-2">Profile</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav> */}
      <Nav variant="pills" className="flex-column vertical-nav">
        <Nav.Link as={NavLink} to="/" eventKey="5" end>Home</Nav.Link>
        <Nav.Link as={NavLink} to="/explore" eventKey="6">Explore</Nav.Link>
        <Nav.Link as={NavLink} to="/create" eventKey="7">Create</Nav.Link>
      </Nav>
    </div>
  );
}

export default Profile;