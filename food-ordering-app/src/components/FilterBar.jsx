// FilterBar.jsx - search box, category dropdown and sort dropdown.
// This is a "controlled" component: it holds NO state itself.
// The parent (Home) owns the state and passes values + setter functions as props.
import { categories } from "../data/foodItems.js";

function FilterBar({
  searchText,
  onSearchChange,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="row g-2 mb-4">
      {/* Search */}
      <div className="col-12 col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Search food (e.g. pizza, biryani)..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Category filter */}
      <div className="col-6 col-md-3">
        <select
          className="form-select"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "All" ? "All categories" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div className="col-6 col-md-4">
        <select
          className="form-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="none">Sort by</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
          <option value="rating">Rating: high to low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
