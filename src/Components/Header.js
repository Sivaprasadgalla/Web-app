import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">
          Wep App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto w-100 justify-content-end">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/products'>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Other
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
