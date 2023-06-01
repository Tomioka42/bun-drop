import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CartCard() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);
  const [previousQuantity, setPreviousQuantity] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    // get previous quantity for all items
    setPreviousQuantity(cart);
    //
    setFilteredItems(cart);
  }, []);

  useEffect(() => {
    const totalPrice = filteredItems.reduce(
      (t, i) => t + i.price * i.quantity,
      0
    );
    setTotalPrice(totalPrice);
  }, [filteredItems]);

  function handleQuantityChange(e) {
    const itemId = parseInt(e.currentTarget.id);

    const updatedCart = previousQuantity
      .forEach((i) => {
        if (itemId === i.id) {
          if (e.target.value > i.quantity) {
            return { ...i, quantity: i.quantity + 1 };
          } else if (e.target.value < i.quantity) {
            if (e.target.value === 0) {
              removeFromCart(itemId);
            } else {
              return { ...i, quantity: i.quantity - 1 };
            }
          }
        } else {
          return i;
        }
      })
      .filter(Boolean);

    // Uppdaterar state variablerna
    setFilteredItems(updatedCart);
    setPreviousQuantity(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  function removeFromCart(itemId) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = cart.filter((i) => i.id !== itemId);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  return (
    <div className="flex-container justify-center">
      <div
        style={{ marginBottom: 20, marginTop: 20 }}
        className="cart-container"
      >
        <h1>Cart</h1>
        <div>
          {filteredItems?.map((i) => (
            <div key={i.id} className="items-container">
              <p id="margin-left">{i.name}</p>
              <p id="margin-left">price: {i.price}:-</p>
              <div id="margin-left">
                <input
                  id={i.id}
                  className="selector-style"
                  type="number"
                  value={i.quantity}
                  onChange={handleQuantityChange}
                ></input>
              </div>
            </div>
          ))}
          <div className="">
            <h4>Total Price: {totalPrice}:-</h4>
          </div>
        </div>
        <Link to="/order">
          <button id="btn">Order Now</button>
        </Link>
      </div>
    </div>
  );
}

export default CartCard;
