import LocalWishlist from "../helpers/localStorageWishlist";
import {createContext, useContext, useEffect, useState} from "react";
import wishlistService from "../services/wishlist.service";
import {useUser} from "./UserContext";
import cartService from "../services/cart.service";

const WishlistContext = createContext();

const WishlistProvider = ({children}) => {
    const [wishlistData, setWishlistData] = useState();
    const {isLoggedIn} = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [wishlistTotal, setWishlistTotal] = useState(0);
    

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
        const quantity = wishlistData?.items?.reduce((acc, cur) => acc + Number(cur.quant), 0) || 0;
        setWishlistTotal(quantity);
    }, [wishlistData, setWishlistData]);
    


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

    const deleteItem =  (product_id) => {
        if(isLoggedIn) {
           const {items} = wishlistData;
           wishlistService.removeFromWishist(product_id).then(() => {
            const data = items.filter((item) => item.product_id !== product_id);
            setWishlistData({...wishlistData, items:data});
           })
        } else {
            LocalWishlist.removeItem(product_id);
            setWishlistData({...wishlistData, items:LocalWishlist.getItems()});
        }
    }

    return (
        <WishlistContext.Provider
          value={{
            isLoading,
            wishlistData, 
            setWishlistData,
            addItem,
            deleteItem,
            wishlistTotal 
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