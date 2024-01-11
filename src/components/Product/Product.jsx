// import {useCart} from "../../context/CartContext"
import {useWishlist} from "../../context/WishlistContext"
import { Link } from "react-router-dom"
import "./Product.css"
// import {formatCurrency} from "../helpers/formatCurrency"
import { Heart } from 'react-feather';
import { useState, useEffect } from "react";

const Product = ({ product, isInWishlistStatus, addToWishlist }) => {
    const formattedPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(product.price);
   
    return (
        <div className="group">
            <button className="wishlist" onClick={addToWishlist}>
                <Heart size={25} className={`heart-icon ${isInWishlistStatus ? 'active' : 'inActive'}`} />
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
                <div className="cardBody">
                    <h2>{product.name}</h2>
                    <p className="price">{formattedPrice}</p>
                </div>
            </Link>
        </div>
    );
};

export default Product;
