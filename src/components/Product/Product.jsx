// import {useCart} from "../../context/CartContext"
import {useWishlist} from "../../context/WishlistContext"
import { Link } from "react-router-dom"
// import {formatCurrency} from "../helpers/formatCurrency"


const Product = ({product}) => {
    const {addItem} = useWishlist();

    const addToWishlist = async (e) => {
        console.log("wishlist clicked");
        e.preventDefault();
        await addItem(product);
    }


    return (
        <Link to={`products/${product.product_id}`}>
            <div className="group">
                <button className="wishlist" onClick={addToWishlist}>
                    <p>wishlist</p>
                </button>
                <img 
                  className=""
                  src={product.image_url} 
                  alt={product.name} 
                  loading="lazy"
                  decoding="async"
                  title={product.name} 
                />
                <div className="cardBody">
                    <h2>
                        {product.name}
                    </h2>
                    <p className="price">
                        {product.price} 
                        {/* format currency remaining  */}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default Product;