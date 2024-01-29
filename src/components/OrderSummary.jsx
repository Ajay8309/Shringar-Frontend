import React from 'react';
import { useCart } from '../context/CartContext';

const OrderSummary = () => {
  const { cartData, cartSubtotal } = useCart();

  const formattedPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Order Summary</h1>
      {cartData?.items.map((item) => (
        <div style={styles.itemContainer} key={item.product_id}>
          <img src={item.image_url} alt={item.name} style={styles.image} />
          <div style={styles.itemDetails}>
            <span style={styles.itemName}>{item.name}</span>
            <span style={styles.itemPrice}>{formattedPrice(item.price)}</span>
            <span style={styles.itemQuantity}>Quantity: {item.quantity}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  itemContainer: {
    display: 'flex',
    marginBottom: '15px',
  },
  image: {
    width: '80px',
    height: '80px',
    marginRight: '15px',
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  itemName: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  itemPrice: {
    fontSize: '16px',
    marginBottom: '5px',
  },
  itemQuantity: {
    fontSize: '14px',
  },
};

export default OrderSummary;
