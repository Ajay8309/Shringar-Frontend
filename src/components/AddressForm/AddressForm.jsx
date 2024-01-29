import React from "react";
import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import { useUser } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import "./PaymentForm.css"; 

const PaymentForm = ({ next }) => {
  const { userData } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: userData?.fullname,
      email: userData?.email,
      username: userData?.username,
      address: userData?.address,
      country: userData?.country,
      city: userData?.city,
      state: userData?.state,
    },
  });

  return (
    <div className="payment-form-container">
      <h1 className="form-title">Address Details</h1>
      <form
        className="form-container"
        onSubmit={handleSubmit((data) => next(data))}
      >
        <Label className="form-label">
          <span>Fullname</span>
          <Input
            disabled
            type="text"
            className="form-input"
            name="fullname"
            {...register("fullname", { required: "Required" })}
          />
          {errors.fullname && <HelperText valid={false}>{errors.fullname.message}</HelperText>}
        </Label>
        
        <Label className="form-label">
          <span>Email</span>
          <Input
            disabled
            className="form-input"
            type="text"
            name="email"
            {...register("email", { required: "Required" })}
          />
          {errors.email && <HelperText valid={false}>{errors.email.message}</HelperText>}
        </Label>
        
        <Label className="form-label">
          <span>Address</span>
          <Input
            className="form-input"
            type="text"
            name="address"
            {...register("address", { required: "Required" })}
          />
          {errors.address && <HelperText valid={false}>{errors.address.message}</HelperText>}
        </Label>
        
        <Label className="form-label">
          <span>Country</span>
          <Input
            className="form-input"
            type="text"
            name="country"
            {...register("country", { required: "Required" })}
          />
          {errors.country && <HelperText valid={false}>{errors.country.message}</HelperText>}
        </Label>
        
        <Label className="form-label">
          <span>State/Region</span>
          <Input
            className="form-input"
            type="text"
            name="state"
            {...register("state", { required: "Required" })}
          />
          {errors.state && <HelperText valid={false}>{errors.state.message}</HelperText>}
        </Label>
        
        <Label className="form-label">
          <span>City</span>
          <Input
            className="form-input"
            type="text"
            name="city"
            {...register("city", { required: "Required" })}
          />
          {errors.city && <HelperText valid={false}>{errors.city.message}</HelperText>}
        </Label>
        
        <div className="form-buttons">
          <Button tag={Link} to="/cart" className="back-button" size="small">
            Back to cart
          </Button>
          <Button type="submit" className="proceed-button" size="small">
            Proceed
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
