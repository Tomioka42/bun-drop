import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderCard() {
  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [showInput, setShowInput] = useState(false);

  const [customer, setCustomer] = useState({});
  const [cvvOk, setCvvOk] = useState(false);
  const [cardNumOk, setCardNumOk] = useState(false);
  const [phoneNumOk, setPhoneNumOk] = useState(false);

  const navigate = useNavigate();
  const handleClick = () => {
    debugger;
    if (paymentMethod === "Card") {
      if (cvvOk && cardNumOk) {
        if (
          customer.name !== undefined &&
          customer.adress !== undefined &&
          customer.city !== undefined
        ) {
          // localStorage.removeItem("cart");
          navigate("/confirm");
        }
      }
    } else if (paymentMethod === "Swish") {
      if (phoneNumOk) {
        if (
          customer.name !== undefined &&
          customer.adress !== undefined &&
          customer.city !== undefined
        ) {
          // localStorage.removeItem("cart");
          navigate("/confirm");
        }
      }
    }
  };

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem("cart"));

    setOrder(order);
  }, []);

  useEffect(() => {
    const totalPrice = order.reduce((t, i) => t + i.price * i.quantity, 0);
    setTotalPrice(totalPrice);
  }, [order]);

  function updateName(e) {
    setCustomer({ ...customer, name: e.target.value });
  }

  function updateAdress(e) {
    setCustomer({ ...customer, adress: e.target.value });
  }

  function updateCity(e) {
    setCustomer({ ...customer, city: e.target.value });
  }

  function updateCardNumber(e) {
    if (e.target.value.length === 16) {
      return setCardNumOk(true);
    } else {
      return setCardNumOk(false);
    }
  }

  function updateCvc(e) {
    if (e.target.value.length === 3) {
      return setCvvOk(true);
    } else {
      return setCvvOk(false);
    }
  }

  function updatePhoneNumber(e) {
    if (e.target.value.length === 10) {
      return setPhoneNumOk(true);
    } else {
      return setPhoneNumOk(false);
    }
  }

  return (
    <div className="gridFlex-container">
      <div style={{ marginTop: 30 }} className="card-container">
        <h1>Order summary</h1>
        {order?.map((i) => (
          <div key={i.id} className="items-container">
            <p>{i.name}</p>
            <p style={{ marginLeft: 10 }}>price: {i.price}:-</p>
            <p id="margin-left">({i.quantity}st)</p>
          </div>
        ))}
        <div style={{ marginTop: 20 }}>Total Price: {totalPrice}:-</div>
      </div>
      <div style={{ marginTop: 30 }} className="card-container">
        <h1>Billing & Payment</h1>
        <div className="billing-container">
          <div className="flex-container">
            <label style={{ marginRight: 22 }}>Name:</label>
            <input className="input-style" type="text" onChange={updateName} />
          </div>
          <div className="flex-container">
            <label style={{ marginRight: 15, marginTop: 20 }}>Adress:</label>
            <input
              className="input-style"
              type="text"
              onChange={updateAdress}
            />
            <label style={{ marginRight: 15, marginLeft: 15 }}>City:</label>
            <input
              style={{ width: 100 }}
              className="input-style"
              type="text"
              onChange={updateCity}
            />
          </div>
        </div>
        <div
          style={{ marginTop: 20, justifyContent: "space-evenly" }}
          className="flex-container"
        >
          <button
            id="btn"
            onClick={() => {
              setPaymentMethod("Swish");
              setShowInput(true);
            }}
          >
            Swish
          </button>

          <button
            id="btn"
            onClick={() => {
              setPaymentMethod("Card");
              setShowInput(true);
            }}
          >
            Card
          </button>
        </div>
        <div>
          {showInput && (
            <div className="billing-container">
              {paymentMethod === "Swish" && (
                <div className="flex-container">
                  <label style={{ marginRight: 22 }}>Phone number:</label>
                  <input
                    className="input-style"
                    type="text"
                    placeholder="xxxxxxxxxx"
                    maxLength={10}
                    onChange={updatePhoneNumber}
                  />
                </div>
              )}
              {paymentMethod === "Card" && (
                <div className="billing-container">
                  <div className="flex-container">
                    <label style={{ marginRight: 15 }}>Card number:</label>
                    <input
                      className="input-style"
                      type="text"
                      placeholder="xxxxxxxxxxxxxxxx"
                      maxLength={16}
                      onChange={updateCardNumber}
                    />
                    <label style={{ marginRight: 15, marginLeft: 20 }}>
                      CVC:
                    </label>
                    <input
                      style={{ width: 35 }}
                      className="input-style"
                      type="text"
                      placeholder="xxx"
                      maxLength={3}
                      onChange={updateCvc}
                    />
                  </div>
                  <div style={{ marginTop: 20 }} className="flex-container">
                    <label style={{ marginRight: 15 }}>Expiration date:</label>
                    <input
                      style={{ width: 100 }}
                      className="input-style"
                      type="date"
                    />
                  </div>
                </div>
              )}
              {/*TODO: fixa onClick på pay knapppen*/}
              <button
                style={{ width: 150, alignSelf: "center", margin: 20 }}
                id="btn"
                type="button"
                onClick={handleClick}
              >
                Pay
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
