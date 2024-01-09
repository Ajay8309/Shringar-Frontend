import { Card, Pagination } from "@windmill/react-ui";
import Product from "../../components/Product/Product";
import Spinner from "../../components/Spinner/Spinner";
import { useProduct } from "../../context/ProductContext";
import Layout from "../../layout/layout";
// import Nav from "../../components/Nav/Nav"
import "../ProductList/ProductList.css"

const ProductList = () => {
  const { products, setPage } = useProduct();

  const handleChange = (page) => {
    setPage(page);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  console.log("Running working ");
  console.log(products);

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
  
      <div className="">
      <div className="product-list">
        {products?.map((prod) => (
          <div key={prod.product_id} className="product-card">
            <Product product={prod} />
          </div>
        ))}
      </div>
        <Pagination
          totalResults={20}
          resultsPerPage={12}
          onChange={handleChange}
          label="Page navigation"
        />
      </div>
      </Layout>
  );
};

export default ProductList
