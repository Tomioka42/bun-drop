import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductList() {
  const [,setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState(getCartFromLocalStorage());

  useEffect(() => {
    debugger;
    fetch("http://localhost:7000/menu")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  function getCartFromLocalStorage() {
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart) {
      cart = [];
    }
    return cart;
  }

  function addToCart(id, name, price) {
    const currentCart = cart;

    const existingCartItem = currentCart.some((i) => i.id === id);

    if (existingCartItem) {

      // Hitta item:et med rätt id i currentCart (find)
      let cartItemToChange = currentCart.find((i) => i.id === id);
      // Öka quantity för det objektet med 1 (i currentCart)
      cartItemToChange.quantity++;

      localStorage.setItem("cart", JSON.stringify(currentCart));
      setCart(currentCart);
    } else {
      currentCart.push({ id: id, name: name, price: price, quantity: 1 });

      localStorage.setItem("cart", JSON.stringify(currentCart));
      setCart(currentCart);
    }
  }

  return (
    <div className="products-container">
      {filteredProducts?.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          image={p.image}
          name={p.name}
          price={p.price}
          description={p.description}
          ingredients={p.ingredients}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;
