

import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import CartItem from "../../components/CartItem";
import { useCart } from "../../context/CartContext";
import Layout from "../../layout/layout";
import { ShoppingCart } from "react-feather";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cartData, isLoading, cartSubtotal } = useCart();

  const formattedPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  if (cartData?.items?.length === 0) {
    return (
      <Layout title="Cart" loading={isLoading}>
        <div className="container empty-cart">
          <h1>Shopping Cart</h1>
          <div className="empty-cart">
            <ShoppingCart className="shopping-cart-icon" />
            <p>Cart is empty</p>
            <Button tag={Link} to="/" className="continue-shopping-btn">
              Continue shopping
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout loading={isLoading || cartData === undefined}>
        <h1 className='cartTitle'>Shopping Cart</h1>
      <div className="container">
        {cartData?.items?.map((item) => {
          return (
            <div key={item.product_id}>
              <CartItem item={item}/>
            </div>
          )
        })}
      </div>
    </Layout>
  );
};

export default Cart;
