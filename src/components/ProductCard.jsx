import React, { useState } from "react";

function ProductCard({
  name,
  price,
  id,
  image,
  description,
  ingredients,
  addToCart,
}) {

  function onAddToCart() {
    addToCart(id, name, price);
  }

  return (
    <div className="flex-container justify-center">
      <div style={{ margin: 10 }} className="card-container">
        <img src={image} alt="" />
        <h3>{name}</h3>
        <p>{description}</p>
        <em>{price}:-</em>
        {ingredients?.map((i) => (
          <li key={i}>{i}</li>
        ))}
        <button id="btn" onClick={onAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
