import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import ProductService from '../../services/product.service';
import ReviewService from '../../services/review.service';
import Layout from '../../layout/layout';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { data: product } = await ProductService.getProduct(id);
        setProduct(product);

        const { data: reviews } = await ReviewService.getReviews(id);
        console.log(reviews);
        setReviews(reviews);

        // console.log(product);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleAddToCart = async () => {
    await addToCart(product, 1);
  };

  const handleAddToWishlist = async () => {
    await addToWishlist(product);
  };

  return (
    <Layout loading={isLoading}>
      {product && (
        
        <div className="product-details-container">

            <div className="productInfoContainer">
                
          <div className="product-details-image">
            <img src={product.image_url} alt={product.name} />
          </div>

          <div className="product-details-info">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
            <p className="weight">weight {product.weight}gms</p>
            <div className="product-buttons">
              <button onClick={handleAddToCart}>
                <FaShoppingCart /> Add to Cart
              </button>
              <button onClick={handleAddToWishlist}>
                <FaHeart /> Add to Wishlist
              </button>
            </div>
          </div>
            </div>
          <hr />
          <div className="product-reviews">
            <h3>Reviews</h3>
            {reviews.map((review) => (
              <div key={review.id} className="review-item">
                <p>Rating: {review.rating}</p>
                <p>{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductDetails;
