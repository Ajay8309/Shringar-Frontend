import API from "../api/axios.config"

class wishlistService {
    getWishlist() {
        return API.get("/wishlist");
    }
    async addToWishlist(product_id) {
         return await API.post("/wishlist/add", {product_id});
    }

    async removeFromWishist(product_id) {
        return await API.delete("/wishlist/delete", {
            data: {product_id: Number(product_id)},
        });
    }

}

export default new wishlistService();
