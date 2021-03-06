import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router";
function Navbar(props) {
  let location = useLocation();
  let history = useHistory();
  const host = "http://localhost:5000";
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
    props.showAlert("success", "Logged out successfully. ");
  };
  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link to="/login" className="btn-sm btn-primary mx-1">
                Login
              </Link>
              <Link to="/signup" className="btn-sm btn-primary mx-1">
                SignUp
              </Link>
            </form>
          ) : (
            <div>
              <Link
                style={{ color: "white", paddingRight: "0px" }}
                to="/profile"
              >
                {localStorage.getItem('name')}
              </Link>
              <button
                onClick={handleLogout}
                className="btn-sm btn-primary mx-3"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
