import LocalWishlist from "../helpers/localStorageWishlist";
import {createContext, useContext, useEffect, useState} from "react";
import wishlistService from "../services/wishlist.service";
import {useUser} from "./UserContext";
import cartService from "../services/cart.service";
import { useCart } from "./CartContext";
import localCart from "../helpers/localStorageCart";

const WishlistContext = createContext();

const WishlistProvider = ({children}) => {
    const [wishlistData, setWishlistData] = useState();
    const {isLoggedIn} = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [wishlistTotal, setWishlistTotal] = useState(0);
    const {userData} = useUser();

    const {setCartData} = useCart();

    useEffect(() => {
        setIsLoading(true);
        if(isLoggedIn) {
            const saveLocalWishlist = async () => {
                const wishlistObj = LocalWishlist
                .getItems()
                .map(({product_id}) => wishlistService.addToWishlist(product_id));
              await Promise.all(wishlistObj);
              LocalWishlist.clearWishlist();
              wishlistService.getWishlist().then((res) => {
                setWishlistData(res?.data);
                setIsLoading(false);
              })  
            }
            saveLocalWishlist();
        } else {
            const items = LocalWishlist.getItems();
            if(items === null) {
                return ;
            }

            setWishlistData({items:[...items]});
            setIsLoading(false);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        setIsLoading(false);
            const quantity = wishlistData?.items?.reduce((acc, cur) => acc + Number(cur.quant), 0) || 0;
            setWishlistTotal(quantity);
            setIsLoading(true);
    }, [wishlistData]); 
    


    const addItem = async (product) => {
        if(isLoggedIn) {
            try {
                const {data} = await wishlistService.addToWishlist(product.product_id);
                setWishlistData({items: [...data.data]});
            } catch (error) {
                return error;
            }
        } else {
            LocalWishlist.addItem(product);
            setWishlistData({...wishlistData, items: LocalWishlist.getItems()});
        }
    }

    const deleteItem = async (product_id) => {
        if (isLoggedIn) {
            try {
                // console.log("DeleteItem"+product_id);
                const { items } = wishlistData;
                await wishlistService.removeFromWishlist(product_id);
                const data = items.filter((item) => item.product_id !== product_id);
                setWishlistData({ ...wishlistData, items: data });
            } catch (error) {
                console.error("Error deleting item from wishlist:", error);
            }
        } else {
            LocalWishlist.removeItem(product_id);
            setWishlistData({ ...wishlistData, items: LocalWishlist.getItems() });
        }
    };

    

    const isInWishlist = async ( product_id) => {
        if (isLoggedIn) {
          return await wishlistService.isInWishlist( product_id);
        } else {
          return LocalWishlist.getItems().some((item) => item.product_id === product_id);
        }
      };

      const moveItemToCart = async (product_id, quantity = 1) => {
        try {
            
            if (isLoggedIn) {
                // console.log("moveItemToCart"+product_id);
                await wishlistService.removeFromWishlist(product_id);
                const updatedWishlist = wishlistData?.items.filter(item => item.product_id !== product_id);
                setWishlistData({ items: updatedWishlist });
            } else {
                LocalWishlist.removeItem(product_id);
                setWishlistData({ ...wishlistData, items: LocalWishlist.getItems() });
            }

            
            if (isLoggedIn) {
                const { data } = await cartService.addToCart(product_id, quantity);
                setCartData({ items: [...data.data] });
            } else {
                localCart.addItem(product, quantity);
                setCartData({ ...cartData, items: localCart.getItems() });
            }
        } catch (error) {
            console.error("Error moving item to cart:", error);
        }
    };
    

    return (
        <WishlistContext.Provider
          value={{
            isLoading,
            wishlistData, 
            setWishlistData,
            addItem,
            deleteItem,
            wishlistTotal,
            isInWishlist,
            moveItemToCart 
          }}
        >

            {children}

        </WishlistContext.Provider>
    );
}

const useWishlist = () => {
    const context = useContext(WishlistContext);

    if(context === undefined) {
        throw new Error("useWishlist must be used within WishlistProvider");
    }
    return context;
};

export {WishlistProvider, useWishlist};