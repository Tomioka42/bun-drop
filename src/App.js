import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Menu from "./routes/Menu";
import Cart from "./routes/Cart";
import Order from "./routes/Order";
import NotFound from "./routes/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Confirm from "./routes/Confirm";

function App() {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
