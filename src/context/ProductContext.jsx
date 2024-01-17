import { createContext, useContext, useEffect, useState } from "react";
import productService from "../services/product.service";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({}); 
    
    let response;
    
    // with this paginatiion is working fine
    useEffect(() => {
      setIsLoading(true);
      productService.getProducts(page).then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
    }, [page]);
    
   
    useEffect(() => {
      setIsLoading(true);
      productService.filterProducts(filters).then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
    }, [filters]);
    
    
    const updateFilters = (newFilters) => {
      setFilters(newFilters);
    };
  
    return (
      <ProductContext.Provider
        value={{
          products,
          setProducts, 
          isLoading,
          setIsLoading,
          page,
          setPage,
          filters,
          updateFilters,
        }}
      >
        {children}
      </ProductContext.Provider>
    );
  };
const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

export { ProductContext, ProductProvider, useProduct };
