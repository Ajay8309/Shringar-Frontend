import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import ProductService from '../../services/product.service';
import ReviewService from '../../services/review.service';
import Layout from '../../layout/layout';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import './ProductDetails.css';
import { useReview } from '../../context/ReviewContext';
import { TrendingUp, RefreshCw, Truck } from 'react-feather';
import ReactStars from 'react-rating-stars-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useProduct } from "../../context/ProductContext";
import Product from "../../components/Product/Product";

const ProductDetails = () => {
  const { id } = useParams();
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist } = useWishlist();
  const { reviews, addReview, setProductId, reviewExistsError } = useReview();
  const { products, setPage } = useProduct();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newReviewContent, setNewReviewContent] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(1);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data: product } = await ProductService.getProduct(id);
        setProduct(product);
        setProductId(id);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = async () => {
    await addToCart(product, 1);
  };

  const handleAddToWishlist = async (selectedProduct) => {
    await addToWishlist(selectedProduct);
  };

  const handleAddReview = async () => {
    try {
      if (reviews.reviews.some((e) => e.id === id)) {
        alert('Review already exists');
      }
      await addReview(id, newReviewRating, newReviewContent);
      setNewReviewRating(1);
      setNewReviewContent('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const formattedPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
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
              <div className="titleName">
                <div className="nameStarComponent">
                  <h2>{product.name}</h2>
                  <div className="wishlistStarContainer">
                    <ReactStars
                      count={5}
                      size={21}
                      edit={false}
                      value={+product?.avg_rating}
                      activeColor="#ffd700"
                    />
                    <span>{product.review_count} Review</span>
                  </div>
                </div>

                <button onClick={() => handleAddToWishlist(product)}>
                  <FaHeart className="wishlistIcon" />
                </button>
              </div>
              <span className="underlineName"></span>
              <p>{product.description}</p>
              <p className="product-price">
                Price: <span className="priceSpan"> {formattedPrice(product.price)}</span> <br />
                <span className="taxContent">Price is inclusive of all taxes</span>
              </p>
              <p className="weight">
                Gross weight <span className="weightSpan">{product.weight}gms</span>
              </p>
              <p className="purity">Gold purity : 22 karat</p>

              <div className="product-buttons">
                <button onClick={handleAddToCart}>Add to Cart</button>
              </div>
              <span className="hr"></span>

              <p className="txt1">
                <TrendingUp size={19} /> <span className="txtSpan">Purity Guaranteed</span>
              </p>
              <p className="txt1">
                <RefreshCw size={19} /> <span className="txtSpan">Exchange across all stores</span>
              </p>
              <p className="txt1">
                {' '}
                <Truck size={19} /> <span className="txtSpan">Free Shipping all across India</span>
              </p>
              <span className="hr"></span>
            </div>
          </div>

          <span className='hr2'></span>

          <div className="AddreviewContainer">
            <h1>{+product?.avg_rating}.0</h1>
            <ReactStars
              count={5}
              size={28}
              edit={false}
              value={+product?.avg_rating}
              activeColor="#ffd700"
            />
            <h1>{product.review_count} Reviews</h1>
          </div>
          <button
            className="add-review-button"
            onClick={() => setIsReviewFormVisible(!isReviewFormVisible)}
          >
            Add Review
          </button>

          <span className='hr2'></span>

          {isReviewFormVisible && (
            <div className={`review-form ${isReviewFormVisible ? 'show' : ''}`}>
              <h4>Add Your Review</h4>
              <label>
                Rating:
                <ReactStars
                  count={5}
                  size={24}
                  value={newReviewRating}
                  onChange={(rating) => setNewReviewRating(rating)}
                  activeColor="#ffd700"
                />
              </label>
              <label>
                Content:
                <textarea
                  value={newReviewContent}
                  onChange={(e) => setNewReviewContent(e.target.value)}
                />
              </label>
              <button onClick={handleAddReview}>Submit Review</button>
            </div>
          )}
        </div>
      )}

      <div className="product-reviews">
        <h3>Reviews</h3>
        {reviews.reviews ? (
          reviews.reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="user-info">
                <div className="user-icon-container">
                  <FontAwesomeIcon icon={faUser} className="user-icon" />
                </div>
                <span className="username">{review.name}</span>
              </div>
              <div className="rating">
                <ReactStars
                  count={5}
                  size={21}
                  edit={false}
                  value={+review?.rating}
                  activeColor="#ffd700"
                />
              </div>
              <p className="review-content">{review.content}</p>
              <span className="review-time">{review.date}</span>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>

      
      <h1>You May also Like</h1>

      {product && products && (
  <div className="similarProductsByCategory">
    <div className="product-list-similar">
      {products
        .filter((prod) => prod.category_name === product.category_name)
        .slice(0, 5)
        .map((filteredProd, index) => (
          <div key={filteredProd.product_id} className="product-card">
            <Product
              product={filteredProd}
              addToWishlist={() => handleAddToWishlist(filteredProd)}
            />
          </div>
        ))}
    </div>
  </div>
)}

    </Layout>
  );
};

export default ProductDetails;
