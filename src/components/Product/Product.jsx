// import {useCart} from "../../context/CartContext"
import {useWishlist} from "../../context/WishlistContext"
import { Link } from "react-router-dom"
import "./Product.css"
// import {formatCurrency} from "../helpers/formatCurrency"
// import { Heart } from 'react-feather';
import { useState, useEffect } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Product = ({ product, addToWishlist }) => {
    
    const formattedPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(product.price);

    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        addToWishlist();
      };
   
    return (
        <div className="group">
            <button className="wishlist" onClick={toggleFavorite}>
            <FontAwesomeIcon icon={faHeart} style={{ color: isFavorite ? "red" : "gray" }} />
            </button>
            <Link to={`products/${product.product_id}`} className="underline">
                <img
                    className="productImg"
                    src={product.image_url}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    title={product.name}
                />
                <div className="cardBodyy">
                    <h2>{product.name}</h2>
                    <p className="price">{formattedPrice}</p>
                </div>
            </Link>
        </div>
    );
};

export default Product;
