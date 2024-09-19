import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import ProductService from '../../services/product.service';
import ReviewService from '../../services/review.service';
import Layout from '../../layout/layout';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import s from "../ProductDetails/ProductDetails.module.css"
import { useReview } from '../../context/ReviewContext';
import { TrendingUp, RefreshCw, Truck } from 'react-feather';
import ReactStars from 'react-rating-stars-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useProduct } from "../../context/ProductContext";
import SimilarItems from '../../components/SimilarItems';
import VirtualTryOn from '../../components/VirtualTryOn';
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import FixedProductDetails from '../../components/FixedProductDetails';


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
  const [isVirtualTryOnVisible, setIsVirtualTryOnVisible] = useState(false); 
  const [showFixedProductDetails, setShowFixedProductDetails] = useState(false);



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

  const formattedDate = (originalDate) => {
    return originalDate.toISOString().split('T')[0];
  }

  const CustomPrevArrow = (props) => {
    const { className, onClick } = props;
    return <div className="prevArrow" onClick={onClick}><FontAwesomeIcon icon={faArrowLeft} /></div>;
  };
  
  const CustomNextArrow = (props) => {
    const { className, onClick } = props;
    return <div className=" nextArrow" onClick={onClick}><FontAwesomeIcon icon={faArrowRight} /></div>;
  };
  

  const numSimilarProducts = products ? products.filter(prod => prod.category_name === (product && product.category_name)).length : 0;
  console.log(numSimilarProducts);
  const maxSlidesToShow = Math.min(numSimilarProducts, 5);
  const minSlidesToShow = Math.max(numSimilarProducts, 1);
  
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: maxSlidesToShow,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow className="prevArrow" />,
    nextArrow: <CustomNextArrow className="nextArrow" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: minSlidesToShow >= 2 ? 2 : minSlidesToShow,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: minSlidesToShow,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    const handleScroll = () => {
      const productDetailsContainer = document.querySelector(`.${s.productDetailsContainer}`);
      const isVisible = productDetailsContainer ? isElementInViewport(productDetailsContainer) : false;
      setShowFixedProductDetails(!isVisible);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const handleScroll = () => {
    const isTop = window.scrollY === 0;
    setShowFixedProductDetails(!isTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <Layout loading={isLoading}>
      {product && (
        <div className={s.productDetailsContainer}>
          <div className={s.productInfoContainer}>
            <div className={s.productDetailsImage}>
              <img src={product.image_url} alt={product.name} />
            </div>

            <div className={s.productDetailsInfo}>
              <div className={s.titleName}>
                <div className={s.nameStarComponent}>
                  <h2>{product.name}</h2>
                  <div className={s.wishlistStarContainer}>
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
                  <FaHeart className={s.wishlistIcon} />
                </button>
              </div>
              <span className={s.underlineName}></span>
              <p>{product.description}</p>
              <p className={s.productPrice}>
                Price: <span className={s.priceSpan}> {formattedPrice(product.price)}</span> <br />
                <span className={s.taxContent}>Price is inclusive of all taxes</span>
              </p>
              <p className={s.weight}>
                Gross weight <span className={s.weightSpan}>{product.weight}gms</span>
              </p>
              <p className={s.purity}>Gold purity : 22 karat</p>

              <div className={s.productButtons}>
                <button onClick={handleAddToCart}>Add to Cart</button>
                <button onClick={() => setIsVirtualTryOnVisible(!isVirtualTryOnVisible)}>
                  Virtual Try-On
                </button>
              </div>

               {isVirtualTryOnVisible && (
            <VirtualTryOn
              image={product.image_url}
              category = {product.category_name}
              onClose={() => setIsVirtualTryOnVisible(false)}
            />
          )}

              <span className={s.hr}></span>

              <p className={s.txt1}>
                <TrendingUp size={19} /> <span className={s.txtSpan}>Purity Guaranteed</span>
              </p>
              <p className={s.txt1}>
                <RefreshCw size={19} /> <span className={s.txtSpan}>Exchange across all stores</span>
              </p>
              <p className={s.txt1}>
                {' '}
                <Truck size={19} /> <span className={s.txtSpan}>Free Shipping all across India</span>
              </p>
              <span className={s.hr}></span>
            </div>
          </div>

          <span className={s.hr2}></span>

          <div className={s.AddreviewContainer}>
            <div>{+product?.avg_rating}.0</div>
            <ReactStars
              classNames={s.stars}
              count={5}
              size={28}
              edit={false}
              value={+product?.avg_rating}
              activeColor="#ffd700"
            />
            <div>{product.review_count} Reviews</div>
          </div>
          <button
            className={s.addReviewButton}
            onClick={() => setIsReviewFormVisible(!isReviewFormVisible)}
          >
            Add Review
          </button>

          <span className={s.hr2}></span>

          {/* {isReviewFormVisible && ( */}
             <div className={`${s.reviewForm} ${isReviewFormVisible ? s.show : ''}`}>
              <h4>Add Your Review</h4>

              <div className={s.ratingBox}>
                <div>Rating:</div>
              <label className={s.ratingStars}>
                <ReactStars
                  count={5}
                  size={24}
                  value={newReviewRating}
                  onChange={(rating) => setNewReviewRating(rating)}
                  activeColor="#ffd700"
                />
              </label>
              </div>

              <div className={s.reviewBox}>
                <div>Content:</div>
              <label className={s.reviewContent}>
                <textarea
                  className={s.reviewContent2}
                  value={newReviewContent}
                  onChange={(e) => setNewReviewContent(e.target.value)}
                />
              </label>
              </div>
              <button onClick={handleAddReview}>Submit Review</button>
            </div>
          {/* )} */}
        </div>
      )}

        <h3>Reviews</h3>
      <div className={s.productReviews}>
        {reviews.reviews ? (
          reviews.reviews.map((review) => (
            <div key={review.id} className={s.reviewItem}>
            <div className={s.leftReviewContainer}>
              <div className={s.userInfo}>
                <div className={s.userIconContainer}>
                  <FontAwesomeIcon icon={faUser} className={s.userIcon} />
                </div>
                <span className={s.username}>{review.name}</span>
              </div>
              <div className={s.rating}>
                <ReactStars
                  count={5}
                  size={21}
                  edit={false}
                  value={+review?.rating}
                  activeColor="#ffd700"
                />
              </div>
              <p className={s.reviewContent}>{review.content}</p>
              </div>
              <span className={s.reviewTime}>{review.date}</span>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>

      
      <div className={s.similarProductsByCategory}>
  <h1>You May Also Like</h1>
  {product && (
    <Slider {...settings}> 
      {products &&
        products
          .filter((prod) => prod.category_name === product.category_name)
          .slice(0, 5)
          .map((filteredProd, index) => (
            <div key={filteredProd.product_id} className="product-card">
              <SimilarItems
                product={filteredProd}
                addToWishlist={() => handleAddToWishlist(filteredProd)}
              />
            </div>
          ))}
    </Slider>
  )}
</div>

      {showFixedProductDetails && <FixedProductDetails product={product}/>}

    </Layout>
  );
};

export default ProductDetails;
