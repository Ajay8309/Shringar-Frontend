import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button, HelperText } from "@windmill/react-ui";
import { Link, Navigate, useLocation } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useUser } from "../../context/UserContext";
import API from "../../api/axios.config";
import ForgotPasswordModal from "../../components/ForgotPasswordModal/ForgotPasswordModal";
import "../login/login.css";  // Use same styles as Login
import Logoo from "../../assets/logoo.png";
import MailIcon from "../../assets/mailIcon.png";
import PasswordIcon from "../../assets/passwordIcon.png";
import leftImage from "../../assets/leftImage.png";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const Register = () => {
  const { isLoggedIn, setUserState } = useUser();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const [showLeftContainer, setShowLeftContainer] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false);
  const [passwordClicked, setPasswordClicked] = useState(false);
  const [confirmPasswordClicked, setConfirmPasswordClicked] = useState(false);
  const [UsernameClicked, setUsernameClicked] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      password2: "",
    },
  });

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    const { username, email, password, password2, name } = data;

    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      const response = await API.post("/auth/signup", {
        username,
        email,
        password,
        fullname: name,
      });
      toast.success("Account created successfully.");
      setTimeout(() => {
        setUserState(response.data);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data.message);
    }
  };

  if (isLoggedIn) {
    return <Navigate to={state?.from || "/"} />;
  }

  const handleLeftSlider = () => {
    setShowLeftContainer(true);
  };

  const handleRightSlider = () => {
    setShowLeftContainer(false);
  };

  return (
    <div className="MainContainer">
      <div className="containerNav">
        <div className={`leftContainer ${showLeftContainer ? "" : "active"}`}>
          <img src={leftImage} className="leftImage" alt="" />
          <div className="rightSlider" onClick={handleRightSlider}>
            <FaAngleRight />
          </div>
        </div>

        <div className={`rightContainer ${showLeftContainer ? "active" : ""}`}>
          <form onSubmit={handleSubmit(onSubmit)} className="loginContainer">
            <div className="upperSection">
              <div className="logoo">
                <img src={Logoo} alt="Logo" />
              </div>
              <h2>SHRINGAR</h2>
              <p className="tagline">Adorn your moments with brilliance</p>
            </div>
            <div className="leftSlider" onClick={handleLeftSlider}>
              <FaAngleLeft />
            </div>

            <div className="in">
              <div className={`placeholder ${emailClicked ? "clicked" : ""}`}>
                Email
              </div>
              <div className="mailIcon">
                <img src={MailIcon} alt="Mail Icon" />
              </div>
              <input
                className="intag"
                onClick={() => setEmailClicked(true)}
                type="email"
                name="email"
                onBlur={() => setEmailClicked(false)}
                {...register("email", {
                  required: "Email required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid email",
                  },
                })}
                placeholder=""
              />
              {errors.email && (
                <HelperText valid={false}>{errors.email.message}</HelperText>
              )}
            </div>

            <div className="in">
              <div
                className={`placeholder ${passwordClicked ? "clicked" : ""}`}
              >
                Password
              </div>
              <div className="mailIcon">
                <img src={PasswordIcon} alt="Password Icon" />
              </div>
              <input
                className="intag"
                onClick={() => setPasswordClicked(true)}
                type="password"
                name="password"
                onBlur={() => setPasswordClicked(false)}
                {...register("password", {
                  required: "Password required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder=""
              />
              {errors.password && (
                <HelperText valid={false}>{errors.password.message}</HelperText>
              )}
            </div>
            

            <div className="in">
              <div
                className={`placeholder ${
                  confirmPasswordClicked ? "clicked" : ""
                }`}
              >
                Confirm Password
              </div>
              <div className="mailIcon">
                <img src={PasswordIcon} alt="Confirm Password Icon" />
              </div>
              <input
                className="intag"
                onClick={() => setConfirmPasswordClicked(true)}
                type="password"
                name="password2"
                onBlur={() => setConfirmPasswordClicked(false)}
                {...register("password2", {
                  validate: (value) =>
                    value === password.current || "Passwords do not match",
                })}
                placeholder=""
              />
              {errors.password2 && (
                <HelperText valid={false}>{errors.password2.message}</HelperText>
              )}
            </div>

            <div className="in">
            <div
                className={`placeholder ${
                  UsernameClicked ? "clicked" : ""
                }`}
              >
                Username
              </div>
              <input
                className="intag"
                onClick={() => setUsernameClicked(true)}
                onBlur={() => setUsernameClicked(false)}
                type="text"
                name="username"
                {...register("username", {
                  required: "Username required",
                  minLength: {
                    value: 4,
                    message: "Username must be at least 4 characters",
                  },
                })}
                placeholder=""
              />
              {errors.username && (
                <HelperText valid={false}>{errors.username.message}</HelperText>
              )}
            </div>

            <div className="inn">
              <div className="placeholder clicked">Fullname</div>
              <input
                className="intag"
                type="text"
                name="name"
                {...register("name", {
                  required: "Fullname required",
                  minLength: {
                    value: 6,
                    message: "Fullname must be at least 6 characters",
                  },
                })}
                placeholder=""
              />
              {errors.name && (
                <HelperText valid={false}>{errors.name.message}</HelperText>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="btn1"
            >
              {isLoading ? (
                <PulseLoader color={"#0a138b"} size={10} loading />
              ) : (
                "Create Account"
              )}
            </Button>

            {error && (
              <HelperText valid={false}>{error}</HelperText>
            )}

            <p className="signupEnd">
              Have an account?{" "}
              <Link to="/login" className="signLink">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
