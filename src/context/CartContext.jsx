import { createContext, useContext, useEffect, useState } from 'react';
import cartService from "../services/cart.service";
import wishlistService from "../services/wishlist.service";
import localCart from "../helpers/localStorageCart";
import LocalWishlist from "../helpers/localStorageWishlist";
import { useUser } from "./UserContext";
import { toast } from 'react-hot-toast';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState({ items: [] });
    const [cartSubTotal, setCartSubTotal] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const { isLoggedIn } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        if (isLoggedIn) {
            const saveLocalCart = async () => {
                const cartObj = localCart
                    .getItems()
                    .map(({ product_id, quantity }) => cartService.addToCart(product_id, quantity));
                await Promise.all(cartObj);
                localCart.clearCart();
                cartService.getCart().then((res) => {
                    setCartData(res?.data);
                    setIsLoading(false);
                });
            };
            saveLocalCart();
        } else {
            const items = localCart.getItems();
            if (items == null) {
                setIsLoading(false);
                return;
            }
            setCartData({ items });
            setIsLoading(false);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const updateCartTotals = () => {
            const subtotal = cartData.items.reduce((acc, cur) => acc + (cur.subtotal || 0), 0);
            const totalQuantity = cartData.items.reduce((acc, cur) => acc + (cur.quantity || 0), 0);
            setCartSubTotal(subtotal);
            setCartTotal(totalQuantity);
        };
        updateCartTotals();
        toast.success("Cart Updated");
    }, [cartData]);

    const addItem = async (product, quantity) => {
        if (isLoggedIn) {
            try {
                const { data } = await cartService.addToCart(product.product_id, quantity);
                setCartData({ items: data.data });
            } catch (error) {
                console.error(error);
                return error;
            }
        } else {
            localCart.addItem(product, quantity);
            setCartData({ items: localCart.getItems() });
        }
    };

    const deleteItem = (product_id) => {
        if (isLoggedIn) {
            cartService.removeFromCart(product_id).then(() => {
                const updatedItems = cartData.items.filter(item => item.product_id !== product_id);
                setCartData({ items: updatedItems });
            });
        } else {
            localCart.removeItem(product_id);
            setCartData({ items: localCart.getItems() });
        }
    };

    const increment = async (product_id) => {
        if (isLoggedIn) {
            const res = await cartService.increment(product_id);
            setCartData({ items: res.data });
        } else {
            localCart.incrementQuantity(product_id);
            setCartData({ items: localCart.getItems() });
        }
    };

    const decrement = async (product_id) => {
        if (isLoggedIn) {
            const res = await cartService.decrement(product_id);
            setCartData({ items: res.data });
        } else {
            localCart.decrementQuantity(product_id);
            setCartData({ items: localCart.getItems() });
        }
    };

    const moveCartItemToWishlist = async (product_id, quantity = 1) => {
        try {
            if (isLoggedIn) {
                await cartService.removeFromCart(product_id);
                const updatedCart = cartData.items.filter(item => item.product_id !== product_id);
                setCartData({ items: updatedCart });
            } else {
                localCart.removeItem(product_id);
                setCartData({ items: localCart.getItems() });
            }

            if (isLoggedIn) {
                const { data } = await wishlistService.addToWishlist(product_id);
                setWishlistData({ items: data.data });
            } else {
                LocalWishlist.addItem(product_id);
                setWishlistData({ items: LocalWishlist.getItems() });
            }
        } catch (error) {
            console.error("Error moving item to wishlist:", error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                isLoading,
                cartData,
                setCartData,
                addItem,
                deleteItem,
                increment,
                decrement,
                cartTotal,
                cartSubTotal,
                moveCartItemToWishlist,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
};

export { CartProvider, useCart };
