import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <div className="nav-container">
      <div className="flex-container">
        <img id="logo" src="/images/logo color.png" alt="" />
        <Link to="/">
          <h3 id="navbar-links">Home</h3>
        </Link>
        <Link to="/menu">
          <h3 id="navbar-links">Menu</h3>
        </Link>
      </div>
      <div>
        <Link to="/cart">
          <FontAwesomeIcon
            icon={faCartShopping}
            style={{ color: "#ffa07a", padding: 30 }}
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
