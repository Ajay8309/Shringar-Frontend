import React from 'react'
import Layout from '../../layout/layout'
import { useWishlist } from '../../context/WishlistContext'
import { Link } from 'react-router-dom';
import { Trash2 } from 'react-feather';
import "./wishlist.css"

// import wishlistItem
// dustbin icon 


const Wishlist = () => {
    const { wishlistData, deleteItem, moveItemToCart } = useWishlist();
  
     const formattedPrice = (amount) => {
        return new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(amount);
      };

      console.log(wishlistData);
      // deleteItem(15);
      // moveItemToCart(15);

      const handleDeleteItem = (product_id) => {
        deleteItem(product_id);
    };

    const handleMoveItemToCart = (product_id) => {
        moveItemToCart(product_id);
    };
  
    return (
        <Layout>

      <div className="product-list">
        {wishlistData?.items?.map((prod) => (
          <div key={prod.product_id} className="product-card-wishlist">
            <div className="group">
              <div className="underline">
              {/* <Link to={`products/${wishlistData?.product_id}`} className="underline"> */}
                <img
                  className="productImg"
                  src={prod.image_url}
                  alt={prod.name}
                  loading="lazy"
                  decoding="async"
                  title={prod.name}
                />
                <div className="cardBody">
                    <div className="priceName">
                  <h2>{prod.name}</h2>
                  <p className="price">{formattedPrice(prod.price)}</p>
                    </div>
                    <div className="removeWishlistItemDelete">

                        <button className="addItemToCart" onClick={() => handleMoveItemToCart(prod.product_id)}>
                            Add to cart
                        </button>

                    <button className="removeWishlistItem" onClick={() => handleDeleteItem(prod.product_id)}>
                        <Trash2/>
                    </button>

                    </div>
                </div>
                {/* </Link> */}
              </div>
            </div>
          </div>
        ))}
        {/* Wishlist */}
      </div>
        </Layout>
    );
  };
  
  export default Wishlist;