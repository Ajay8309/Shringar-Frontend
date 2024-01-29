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
import ReactStars from "react-rating-stars-component";

const ProductDetails = () => {
    const { id } = useParams();
    const { addItem: addToCart } = useCart();
    const { addItem: addToWishlist } = useWishlist();
    const { reviews, addReview, setProductId, reviewExistsError} = useReview();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [newReviewContent, setNewReviewContent] = useState('');
    const [newReviewRating, setNewReviewRating] = useState(1);

   
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

    // console.log(reviews);
    

  const handleAddToCart = async () => {
    await addToCart(product, 1);
  };

  const handleAddToWishlist = async () => {
    await addToWishlist(product);
  };

  const handleAddReview = async () => {
    try {
      console.log(reviews);
      if (reviews.reviews.some((e) => e.id === id)) {
        alert("Review already exists");
      }
      await addReview(id, newReviewRating, newReviewContent);
      setNewReviewRating(1);
      setNewReviewContent('');
    } catch (error) {
      console.error('Error adding review:', error);
     
    }
  };
// console.log("ajay", reviews);

const formattedPrice = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
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

                                <button onClick={handleAddToWishlist}>
                                    <FaHeart className="wishlistIcon" />
                                </button>
                            </div>
                            <span className="underlineName"></span>
                            <p>{product.description}</p>
                            <p className="product-price">Price: <span className='priceSpan'> {formattedPrice(product.price)}</span> <br />
                             <span className='taxContent'>Price is inclusive of all taxes</span> 
                            </p>
                            <p className="weight">Gross weight <span className='weightSpan'>{product.weight}gms</span></p>
                            <p className="purity">Gold purity : 22 karat</p>
                           
                            <div className="product-buttons">
                                <button onClick={handleAddToCart}>
                                     Add to Cart
                                </button>
                            </div>
                            <span className="hr"></span>
                            
                            <p className="txt1"><TrendingUp size={19}/> <span className='txtSpan'>Purity Guaranteed</span></p>
                            <p className="txt1"><RefreshCw size={19}/> <span className='txtSpan'>Exchange accross all stores</span></p>
                            <p className="txt1"> <Truck size={19}/> <span className='txtSpan'>Free Shipping all across India</span></p>
                            <span className="hr"></span>

                        </div>
                    </div>
                    <div className="product-reviews">
            <h3>Reviews</h3>
            {reviews.reviews ? (
              reviews.reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <p>User : {review.name}</p>
                  <p key={`rating-${review.id}`}>Rating: {review.rating}</p>
                  <p key={`content-${review.id}`}>Review: {review.content}</p>
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </div>

          <div className="review-form">
            <h4>Add Your Review</h4>
            <label>
              Rating:
              <input
                type="number"
                value={newReviewRating}
                onChange={(e) => setNewReviewRating(Number(e.target.value))}
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

                </div>
            )}
        </Layout>
    );
};

export default ProductDetails;
