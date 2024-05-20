import React, { useState } from "react";
import { Button, HelperText } from "@windmill/react-ui";
import API from "../../api/axios.config";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import OrderService from "../../services/order.service";
import OrderSummary from "../OrderSummary";
import PaystackBtn from "../PaystackBtn";

const PaymentForm = ({ previousStep, addressData, nextStep }) => {
  const { cartSubTotal, cartTotal, cartData, setCartData } = useCart();
  const [error, setError] = useState();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const formattedPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const handlePayment = async () => {
    setError();
    const { fullname, email, address, city, state } = addressData;
  
    try {
      setIsProcessing(true);
      const paymentPayload = {
        amount: cartSubTotal * 100, 
        email: email,
      };
  
      // console.log("Sending payment request with payload:", paymentPayload);
  
      const { data } = await API.post("/payment", paymentPayload);
  
      console.log("Received response from server:", data);
  
      const res = await loadRazorpayScript();
      if (!res) {
        setError({ message: "Razorpay SDK failed to load. Are you online?" });
        setIsProcessing(false);
        return;
      }
      console.log(import.meta.env.REACT_APP_RAZORPAY_KEY_ID);
  
      const options = {
        key: import.meta.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Shringar",
        description: "Test Transaction",
        order_id: data.id,
        handler: async function (response) {
          try {
            await OrderService.createOrder(cartSubTotal, cartTotal, data.id, "RAZORPAY");
            setCartData({ ...cartData, items: [] });
            setIsProcessing(false);
            navigate("/cart/success", {
              state: {
                fromPaymentPage: true,
              },
            });
          } catch (error) {
            setError(error);
            setIsProcessing(false);
          }
        },
        prefill: {
          name: fullname,
          email,
          contact: "9752727213",
        },
        notes: {
          address: `${address}, ${city}, ${state}`,
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      setError(error);
      setIsProcessing(false);
    }
  };
  
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Checkout</h1>
      <OrderSummary />
      <h1 style={styles.title}>Pay with Razorpay</h1>
      <div style={styles.form}>
        {error && (
          <HelperText valid={false} style={styles.helperText}>
            {error.message}
          </HelperText>
        )}
        <div style={styles.buttons}>
          <Button onClick={previousStep} layout="outline" size="small">
            Back
          </Button>
          <Button disabled={isProcessing} onClick={handlePayment} size="small">
            {isProcessing ? (
              <PulseLoader size={10} color={"#0a138b"} />
            ) : (
              `Pay ${formattedPrice(cartSubTotal)}`
            )}
          </Button>
        </div>
      </div>
      <PaystackBtn isProcessing={isProcessing} setIsProcessing={setIsProcessing} />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
  },
  helperText: {
    marginTop: "5px",
  },
  buttons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
};

export default PaymentForm;
