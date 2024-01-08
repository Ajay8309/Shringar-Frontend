
class LocalWishlist {
    isExist = (id) => !!this.getItem(id);

    getItems = () => JSON.parse(localStorage.getItem("__wishlist")) || [];

    getItem = (id) => this.getItems().find((product) => product.product_id == id);

    saveItems = (data) => localStorage.setItem("__wishlist", JSON.stringify(data));

    removeItem = (id) => {
        this.saveItems(this.getItems().filter((product) => product.product_id != id));
    }
    
  clearWishlist = () => localStorage.removeItem("__wishlist");
}

export default new LocalWishlist();
