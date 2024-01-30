import React from "react";
import { CardElement, Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button, HelperText } from "@windmill/react-ui";
import API from "../../api/axios.config";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import OrderService from "../../services/order.service"; 
import OrderSummary from "../OrderSummary";
import PaystackBtn from "../PaystackBtn";

const PaymentForm = ({ previousStep, addressData, nextStep }) => {
  const { cartSubtotal, cartTotal, cartData, setCartData } = useCart();
  const [error, setError] = useState();
  const [isProcessing, setIsProcessing] = useState(false);
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);
  const navigate = useNavigate();

  const formattedPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();
    setError();
    const { fullname, email, address, city, state } = addressData;
    if (!stripe || !elements) {
      return;
    }
    try {
      setIsProcessing(true);
      const { data } = await API.post("/payment", {
        amount: (cartSubtotal * 100).toFixed(),
        email,
      });

      const card = elements.getElement(CardElement);
      const result = await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          name: fullname,
          email,
          address: {
            city,
            line1: address,
            state,
            country: "IND",
          },
        },
      });
      if (result.error) {
        setError(result.error);
      }

      await stripe.confirmCardPayment(data.client_secret, {
        payment_method: result.paymentMethod.id,
      });

      OrderService.createOrder(cartSubtotal, cartTotal, data.id, "STRIPE").then(() => {
        setCartData({ ...cartData, items: [] });
        setIsProcessing(false);
        navigate("/cart/success", {
          state: {
            fromPaymentPage: true,
          },
        });
      });
    } catch (error) {
      setIsProcessing(false);
      // throw error
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Checkout</h1>
      <OrderSummary />
      <h1 style={styles.title}>Pay with Stripe</h1>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ stripe, elements }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)} style={styles.form}>
              <CardElement style={styles.cardElement} />
              {error && <HelperText valid={false} style={styles.helperText}>{error.message}</HelperText>}
              <div style={styles.buttons}>
                <Button onClick={previousStep} layout="outline" size="small">
                  Back
                </Button>
                <Button disabled={!stripe || isProcessing} type="submit" size="small">
                  {isProcessing || !stripe ? (
                    <PulseLoader size={10} color={"#0a138b"} />
                  ) : (
                    `Pay ${formattedPrice(cartSubtotal)}`
                  )}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
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
  cardElement: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
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
