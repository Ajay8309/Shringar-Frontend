import { Card, Pagination } from "@windmill/react-ui";
import Product from "../../components/Product/Product";
import Spinner from "../../components/Spinner/Spinner";
import { useProduct } from "../../context/ProductContext";
import { useWishlist } from "../../context/WishlistContext";
import Layout from "../../layout/layout";
// import Nav from "../../components/Nav/Nav"
import "../ProductList/ProductList.css"
import { Link } from "react-router-dom";

const ProductList = () => {
  const { products, setPage } = useProduct();
  const { isInWishlist, addItem } = useWishlist();

  const checkIsInWishlist = async (productId) => {
      const isInWishlistResult = await isInWishlist(productId);
      return isInWishlistResult;
  };

  const handleAddToWishlist = async (product) => {
      await addItem(product);
  };

  const handleChange = (page) => {
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
          <Pagination
              totalResults={20}
              resultsPerPage={12}
              onChange={handleChange}
              label="Page navigation"
          />
      </Layout>
  );
};

export default ProductList;