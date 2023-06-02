import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleClick = () => {
    let isCartSet = localStorage.getItem("cart") !== null;
    if (isCartSet) {
      navigate("/cart");
    }
  };

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
        <FontAwesomeIcon
          icon={faCartShopping}
          onClick={handleClick}
          style={{ color: "#ffa07a", padding: 30 }}
        />
      </div>
    </div>
  );
}

export default Navbar;
