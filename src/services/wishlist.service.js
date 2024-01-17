import API from "../api/axios.config";

class WishlistService {
  getWishlist() {
    return API.get("/wishlist");
  }

  async addToWishlist(product_id) {
    return await API.post("/wishlist/add", { product_id });
  }

  async removeFromWishlist(product_id) {
    return await API.delete("/wishlist/delete", {
      data: { product_id: Number(product_id) },
    });
  }

  async isInWishlist(product_id) {
    // console.log(product_id);
    return await API.get("/wishlist/check", {
      data: { product_id: Number(product_id) },
    });
}
}

export default new WishlistService();
