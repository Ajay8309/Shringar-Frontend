import { createContext, useContext, useEffect, useState } from "react";
import productService from "../services/product.service";
import { toast } from 'react-hot-toast';

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
        toast.success("products Filterd");
        setProducts(response.data);
        setIsLoading(false);
      });
    }, [filters]);



    const getProductsByName = (name) => {
      setIsLoading(true);
      console.log("inside getProduct by name");
      productService.getProductByName(name).then((response) => {
        console.log(response.data);
        setProducts([response.data]);
        console.log(products);
        setIsLoading(false);
      });
    };

    const getProductByCategory = (category) => {
      setIsLoading(true);
      productService.getProductsByCategory(category).then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
    };
    
    

    const getProductByMaterial = (material) => {
      setIsLoading(true);
      console.log("it is present");
      productService.getProductsByMaterialType(material).then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
    }
    
    
    
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
          getProductsByName,
          getProductByCategory, 
          getProductByMaterial,
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
