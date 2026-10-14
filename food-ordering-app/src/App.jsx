// App.jsx - the root component: layout + all routes of the SPA.
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ItemDetails from "./pages/ItemDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <>
      {/* Navbar and Footer are outside <Routes>, so they appear on every page */}
      <Navbar />

      <main>
        {/* Only ONE of these Routes is shown, depending on the URL.
            The page changes WITHOUT reloading the browser -> Single Page Application */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* "*" matches everything else -> 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
