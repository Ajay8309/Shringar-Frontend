
class LocalWishlist {
    isExist = (id) => !!this.getItem(id);

    getItems = () => JSON.parse(localStorage.getItem("__wishlist")) || [];

    getItem = (id) => this.getItems().find((product) => product.product_id == id);

    saveItems = (data) => localStorage.setItem("__wishlist", JSON.stringify(data));

    removeItem = (id) => {
        this.saveItems(this.getItems().filter((product) => product.product_id != id));
    }
    
  clearWishlist = () => localStorage.removeItem("__wishlist");

  addItem = (product) => {
    if (this.isExist(product.product_id)) { 
      return ;
    } else {
        this.saveItems([...this.getItems(), { product_id: product.product_id }]);
    }

   
};

}

export default new LocalWishlist();
