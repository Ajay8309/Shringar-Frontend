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
}

export default new ProductService();