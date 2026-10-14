// ItemCard.jsx - shows ONE food item as a Bootstrap card.
// PROPS used here:
//   item  -> the food object (data passed DOWN from the parent)
//   onAdd -> a function (callback) from the parent, called when the button is clicked
import { Link } from "react-router-dom";

function ItemCard({ item, onAdd }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column text-center">
        <div className="food-emoji mb-2">{item.emoji}</div>

        <h5 className="card-title mb-1">{item.name}</h5>

        <p className="mb-2">
          {/* Veg / Non-veg label */}
          <span className={"badge " + (item.veg ? "bg-success" : "bg-danger")}>
            {item.veg ? "Veg" : "Non-veg"}
          </span>{" "}
          <span className="badge bg-light text-dark border">{item.category}</span>
        </p>

        <p className="text-muted small mb-2">⭐ {item.rating} · {item.prepTime} min</p>

        <h5 className="text-brand mt-auto">₹{item.price}</h5>

        <div className="d-grid gap-2 mt-2">
          {/* Link goes to the dynamic route /item/:id */}
          <Link to={"/item/" + item.id} className="btn btn-outline-brand btn-sm">
            View details
          </Link>
          {/* Calls the parent's function and sends this item back UP */}
          <button className="btn btn-brand btn-sm" onClick={() => onAdd(item)}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
