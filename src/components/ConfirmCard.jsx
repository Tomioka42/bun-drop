import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ConfirmCard() {
  const [randomNumber, setRandomNumber] = useState(null);

  const generateRandomNum = () => {
    const max = 60;
    const min = 30;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(randomNum);
  };
  useEffect(() => {
    generateRandomNum();
  }, []);

  function endSession() {
    localStorage.removeItem("cart");
  }

  return (
    <div id="flex-center">
      <div style={{ margin: 20 }} id="card-design">
        <img
          style={{ marginTop: 20 }}
          src="/images/hamburger-drone.png"
          alt=""
        />
        <h1>Order confirmed</h1>
        <p>your order is being prepared</p>
        <p>Estimated time for delivery is {randomNumber} minutes</p>
        <em>
          Thanks for ordering from Bun drop. <br /> Welcome back any time!
        </em>
        <div style={{ marginTop: 10 }}>
          <Link to="/">
            <button id="btn" onClick={endSession}>
              Exit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmCard;
