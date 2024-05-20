import AddressForm from "../../components/AddressForm/AddressForm";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import { useCart } from "../../context/CartContext";
import Layout from "../../layout/layout";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [addressData, setAddressData] = useState();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cartData } = useCart();

  useEffect(() => {
    if (!state?.fromCartPage) {
      return navigate("/cart");
    }

    if (!cartData || !cartData.items || cartData.items.length === 0) {
      return navigate("/cart");
    }
  }, [cartData, navigate, state]);

  const nextStep = () => setActiveStep((prevStep) => prevStep + 1);
  const previousStep = () => setActiveStep((prevStep) => prevStep - 1);

  const next = (data) => {
    setAddressData(data);
    nextStep();
  };

  return (
    <Layout>
      <div className="">
        {activeStep === 0 ? (
          <AddressForm next={next} />
        ) : (
          <PaymentForm nextStep={nextStep} previousStep={previousStep} addressData={addressData} />
        )}
      </div>
    </Layout>
  );
};

export default Checkout;
