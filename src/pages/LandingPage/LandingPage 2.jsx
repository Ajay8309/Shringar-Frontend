import React, { useState, useEffect } from 'react';
import Layout from '../../layout/layout';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import car1 from "../../assets/carousel1.webp";
import car2 from "../../assets/carousel2.jpeg";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "../LandingPage/LandingPage.css";
import { useProduct } from '../../context/ProductContext';
import SimilarItems from '../../components/SimilarItems';
import necklacesImage from '../../assets/categoryImages/Necklace.webp';
import earringsImage from '../../assets/categoryImages/earrings.webp';
import braceletsImage from "../../assets/categoryImages/bracelets.webp"
import mangalsutraImage from "../../assets/categoryImages/Mangalsutra.webp"
import chainImage from '../../assets/categoryImages/Chains.webp';
import { PrevArrow, NextArrow } from "../../components/Arrows";


// import braceletsImage from '../../assets/categoryImages/bracelets.webp';
// import coinsImage from '../../assets/categoryImages/Coins.jpg';
import ringsImage from '../../assets/categoryImages/Rings.webp';



const LandingPage = () => {
  const { products } = useProduct();
  const [categories, setCategories] = useState([]);

  console.log(products);

  const getCategoryImageSrc = (categoryName) => {
    if (!categoryName) return null; // Add null check here
  
    switch (categoryName.toLowerCase()) {
      case 'necklaces':
        return necklacesImage;
      case 'earrings':
        return earringsImage;
      case 'bracelets':
        return braceletsImage;
      case 'rings':
        return ringsImage;
      case 'mangalsutra':
        return mangalsutraImage;
      case 'chains':
        return chainImage;      
      default:
        return null;
    }
  };
  
  useEffect(() => {
    if (products && products.length > 0) {
      const getCategories = memoize(() => {
        return Array.from(new Set(products.map(product => product.category_name)));
      });
      setCategories(getCategories());
    }
  }, [products]);
  
  console.log(products);
  console.log(categories);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow/>,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
        },
      },
    ],
  };

  const settings2 = {
    dots: true,
    speed: 500,
    slidesToShow: 4, 
    autoplay: true,
    autoplaySpeed: 3000, 
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, 
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, 
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Layout>
      <div className="landingCarousel">
        <Slider {...settings}>
          <div>
            <img src={car1} alt="Image 1" style={{ width: '100%', height: '60vh', objectFit: 'cover' }} />
          </div>
          <div>
            <img src={car2} alt="Image 2" style={{ width: '100%', height: '60vh', objectFit: 'cover' }} />
          </div>
        </Slider>
      </div>

      <div className="giftedSection">
        <h1>Most Gifted</h1>
        <h3>Checkout the Most Gifted Products</h3>
      </div>

      <div>
        <Slider {...settings2} className='slide'>
          {products && products.slice(0, 5).map((product) => (
            <div key={product.product_id} className='giftCard'>
              <SimilarItems product={product} />
            </div>
          ))}
        </Slider>
      </div>

      <div className="giftedSection1">
        <h1>Shop By Category</h1>
        <h3>Browse through your Favorite Categories</h3>
      </div>

      <div className="CategoryContainer">
        {categories && categories.map(category => (
          <div key={category} className="categoryCard">
            <img src={getCategoryImageSrc(category)} alt={category} className="categoryImage" />
            <h2>{category}</h2>
          </div>
        ))}
      </div>



      <div className="giftedSection">
        <h1>Top Sellers</h1>
        <h3>Checkout the Most Selling Products</h3>
      </div>

      <div>
        <Slider {...settings2} className='slide'>
          {products && products.slice(0, 5).map((product) => (
            <div key={product.product_id} className='giftCard'>
              <SimilarItems product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </Layout>
  );
};

function memoize(fn) {
  const cache = {};
  return (...args) => {
    const stringifiedArgs = JSON.stringify(args);
    if (!(stringifiedArgs in cache)) {
      cache[stringifiedArgs] = fn(...args);
    }
    return cache[stringifiedArgs];
  };
}

export default LandingPage;
