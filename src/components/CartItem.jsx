
import React from 'react';
import { Button, TableCell } from "@windmill/react-ui";
import { useCart } from "../context/CartContext";
import "../pages/Cart/Cart.css"

const CartItem = ({ item }) => {
  const { decrement, increment, deleteItem, moveCartItemToWishlist } = useCart();

  const formattedPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const increase = () => {
    increment(item.product_id);
  };

  const decrease = () => {
    decrement(item.product_id);
    console.log("Decreased " + item.product_id);
  };

  return (
    <div className="itemCard">

      <div className="imagetxtContainer">
      <img src={item.image_url} alt={item.name} className="product-image" />
      <div className="product-details">
        <h3 className="product-name">{item.name}</h3>

        
        <p className="product-price">{formattedPrice(item.price)}</p>

       
        <div className="quantity-buttons">
          <Button onClick={decrease} className="decrement-button">
            -
          </Button>
          <span className="quantity">{item.quantity}</span>
          <Button onClick={increase} className="increment-button">
            +
          </Button>
        </div>
      </div>
      </div>



      <div className="CardItemButtons">
      <Button onClick={() => deleteItem(item.product_id)} className="remove-button">
        Remove
      </Button>

      <Button onClick={() => moveCartItemToWishlist(item.product_id) }>
        Move to wishlist
      </Button>
      </div>

      
    </div>
  );
};

export default CartItem;
