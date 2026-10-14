// Home.jsx - the menu page: search + filter + sort + list of cards.
import { useState } from "react";
import { foodItems } from "../data/foodItems.js";
import { useCart } from "../context/CartContext.jsx";
import FilterBar from "../components/FilterBar.jsx";
import ItemCard from "../components/ItemCard.jsx";

function Home() {
  // ---- useState: simple values that change when the user interacts ----
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("none");
  const [message, setMessage] = useState(""); // small "added to cart" alert

  // dispatch comes from the cart's useReducer (see CartContext.jsx)
  const { dispatch } = useCart();

  // Called by ItemCard when "Add to cart" is clicked
  function handleAdd(item) {
    dispatch({ type: "ADD_ITEM", payload: item });
    setMessage(item.name + " added to cart!");
    // Hide the message after 2 seconds
    setTimeout(() => setMessage(""), 2000);
  }

  // ---- Step 1: search and category filter ----
  let visibleItems = foodItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  // ---- Step 2: sorting (copy the array first so the original is not changed) ----
  visibleItems = [...visibleItems];
  if (sortBy === "price-low") {
    visibleItems.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    visibleItems.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    visibleItems.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "name") {
    visibleItems.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="text-brand">Hungry? Order now.</h1>
        <p className="text-muted">Fresh food from our kitchen to your door.</p>
      </div>

      {/* Props: values go down, setter functions go down as callbacks */}
      <FilterBar
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Conditional rendering: show the alert only when there is a message */}
      {message && <div className="alert alert-success py-2">{message}</div>}

      <p className="text-muted">Showing {visibleItems.length} item(s)</p>

      {visibleItems.length === 0 ? (
        <div className="alert alert-warning">No food found. Try a different search or category.</div>
      ) : (
        <div className="row g-3">
          {/* map() turns the array into a list of ItemCard components */}
          {visibleItems.map((item) => (
            <div className="col-6 col-md-4 col-lg-3" key={item.id}>
              <ItemCard item={item} onAdd={handleAdd} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
