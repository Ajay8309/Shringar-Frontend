import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PulseLoader from "react-spinners/PulseLoader";
import "../pages/Profile/Profile.css"

const AccountForm = ({ setShowSettings, userData }) => {
  const { register, handleSubmit } = useForm({
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
  const [validationError, setValidationError] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const { updateUserData } = useUser();

  const onSubmit = async (data) => {
    setValidationError();
    setIsSaving(true);
    try {
      await updateUserData(data);
      setShowSettings(false);
      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
      setValidationError(error.response.data.message);
    }
  };

  return (
    <section className="account-form-container">
      <div className="account-form-card">
        <div className="account-form-header">
          <h3 className="account-form-title">Account settings</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="account-form-content">
          <Label className="account-form-label">
            <span className="text-sm font-medium text-gray-500 w-1/4">Full name</span>
            <Input
              name="fullname"
              {...register("fullname")}
              className="account-form-input"
            />
          </Label>
          <Label className="account-form-label">
            <span className="text-sm font-medium text-gray-500">Username</span>
            <Input
              name="username"
              {...register("username")}
              className="account-form-input"
            />
            {validationError && <HelperText className="account-form-helper-text">{validationError.username}</HelperText>}
          </Label>
          <div className="account-form-label">
            <span className="text-sm font-medium text-gray-500">Email address</span>
            <Input
              name="email"
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Email not valid",
                },
              })}
              className="account-form-input"
            />
            {validationError && <HelperText className="account-form-helper-text">{validationError.email}</HelperText>}
          </div>
          <Label className="account-form-label">
            <span className="text-sm font-medium text-gray-500">Address</span>
            <Input
              name="address"
              {...register("address")}
              className="account-form-input"
            />
          </Label>
          <Label className="account-form-label">
            <span className="text-sm font-medium text-gray-500">City</span>
            <Input
              name="city"
              {...register("city")}
              className="account-form-input"
            />
          </Label>
          <Label className="account-form-label">
            <span className="text-sm font-medium text-gray-500">State</span>
            <Input
              name="state"
              {...register("state")}
              className="account-form-input"
            />
          </Label>
          <Label className="account-form-label">
            <span className="text-sm font-medium text-gray-500">Country</span>
            <Input
              name="country"
              {...register("country")}
              className="account-form-input"
            />
          </Label>
          <div className="account-form-actions">
            <Button disabled={isSaving} type="submit" className="account-form-button">
              {isSaving ? <PulseLoader color={"#0a138b"} size={10} loading={isSaving} /> : "Save"}
            </Button>
            <Button
              disabled={isSaving}
              onClick={() => setShowSettings(false)}
              layout="outline"
              className="account-form-button-outline"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AccountForm;