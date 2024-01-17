import API from "../api/axios.config";
import ProductList from "../pages/ProductList/ProductList";

class ProductService {
    getProducts(page) {
        return API.get(`/products/?page=${page}`);
      }

    getProduct(id) {
        return API.get(`/products/${id}`);
    }

    getProductByName(name) {
        return API.get(`/products/${name}`);
    }

    getProductsBycategory(category) {
         return API.get(`/products/category/${category}`);
    }

    getProductsByMaterialType(materialType) {
         return API.get(`/products/Material/${materialType}`); 
    }

    filterProducts(filters) {
        const filteredFilters = Object.fromEntries(
            Object.entries(filters).filter(([key, value]) => value !== undefined && value !== '')
        );
    
        const queryString = Object.keys(filteredFilters)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filteredFilters[key])}`)
            .join('&');
    
        console.log("In filter Services", `/products/filter?${queryString}`);
    
        return API.get(`/products/filter?${queryString}`);
    }
    
}

export default new ProductService();