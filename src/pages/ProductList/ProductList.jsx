import React, { useState } from 'react';
import { Card } from "@windmill/react-ui";
import Product from "../../components/Product/Product";
import Spinner from "../../components/Spinner/Spinner";
import { useProduct } from "../../context/ProductContext";
import { useWishlist } from "../../context/WishlistContext";
import Layout from "../../layout/layout";
import CustomPagination from "../../components/CustomPagination";
import "../ProductList/ProductList.css";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { products, setPage } = useProduct();
  const { isInWishlist, addItem } = useWishlist();
  const [currentPage, setCurrentPage] = useState(1);

  const checkIsInWishlist = async (productId) => {
    const isInWishlistResult = await isInWishlist(productId);
    return isInWishlistResult;
  };

  const handleAddToWishlist = async (product) => {
    await addItem(product);
  };

  const handleChange = (page) => {
    setCurrentPage(page);
    setPage(page);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  if (!products) {
    return (
      <>
        <Layout>
          <Spinner size={100} loading />
        </Layout>
      </>
    );
  }

  return (
    <Layout>
      <div className="product-list">
        {products?.map((prod) => (
          <div key={prod.product_id} className="product-card">
            <Product
              product={prod}
              isInWishlistStatus={checkIsInWishlist(prod.product_id)}
              addToWishlist={() => handleAddToWishlist(prod)}
            />
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <CustomPagination
          totalResults={20}
          resultsPerPage={12}
          currentPage={currentPage}
          onChange={handleChange}
        />
      </div>
    </Layout>
  );
};

export default ProductList;
