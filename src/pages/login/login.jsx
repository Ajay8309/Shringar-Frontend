import {useState} from 'react'
import {useGoogleLogin} from "@react-oauth/google";
import {Button, HelperText, Input, Label} from "@windmill/react-ui"
// forgot pasword modal
import ForgotPasswordModal from '../../components/ForgotPasswordModal/ForgotPasswordModal';
import { useUser } from "../../context/UserContext";
import {useForm} from "react-hook-form";
import { toast } from 'react-hot-toast';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import authService from '../../services/auth.service';
import React from 'react';
import { required } from 'react-admin';
import '../login/login.css'
import Bg from "../../assets/leftBg.jpg"
import PasswordIcon from "../../assets/passwordIcon.png"
import MailIcon from "../../assets/mailIcon.png"
import Logoo from "../../assets/logoo.png"

const Login = () => {
  const { isLoggedIn, setUserState } = useUser();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false);
  const [passwordClicked, setPasswordClicked] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const { state } = useLocation();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => handleGoogleLogin(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
    flow: "auth-code",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleGoogleLogin(googleData) {
    try {
      const data = await authService.googleLogin(googleData.code);
      toast.success("Login successful 🔓");

      setUserState(data);
      setRedirectToReferrer(true);
      setIsGoogleLoading(false);
    } catch (error) {
      setIsGoogleLoading(false);
      toast.error("Could not login with Google 😢");
    }
  }

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      setError("");
      setIsLoading(true);
      const data = await authService.login(email, password);
      toast.success("Login successful 🔓");

      setTimeout(() => {
        setUserState(data);
        setRedirectToReferrer(true);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data.message);
    }
  };

  if (redirectToReferrer) {
    return <Navigate to={state?.from || "/"} />;
  }
  if (isLoggedIn) {
    return <Navigate to={state?.from || "/"} />;
  }

  // console.log("Ajay");

  


  const handleEmailClick = () => {
    // console.log("Email clicked");
    setEmailClicked(!emailClicked);
  };

  const handlePasswordClick = () => {
    setPasswordClicked(!passwordClicked);
  };




  return (
    <div className="MainContainer">
      <div className="containerNav">

     <div className="leftContainer">
       
     </div>


        <div className="rightContainer">

       
          
        <form onSubmit={handleSubmit(onSubmit)} className="loginContainer">
        <div className="upperSection">
          <div className="logoo">
            <img src={Logoo} alt="" />
          </div>
          <h2>SHRINGAR</h2>
          <p className='tagline'>
          Adorn your moments with brilliance
          </p>
        </div>

        <div className="in">
         <div className={`placeholder ${emailClicked ? 'clicked' : ''}`}>Email</div>
         <div className="mailIcon"><img src={MailIcon} alt="" /></div>
          <input 
          className="intag"
          onClick={handleEmailClick}
          type="email"
          name="email"
          onBlur={() => handleBlur('email')}
          {
            ...register("email", {
              required:true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            })
          }
          placeholder=""
          />
        </div>
        {errors?.email && errors?.email.type === "required" && (
            <HelperText valid={false} className="">
              Email required
            </HelperText>
          )}
          {errors?.email && errors?.email.type === "pattern" && (
            <HelperText className="" valid={false}>
              Invalid email
            </HelperText>
          )}

          <div className="in">
          <div className={`placeholder ${passwordClicked ? 'clicked' : ''}`}>Password</div>
         <div className="mailIcon"><img src={PasswordIcon} alt="" /></div>
            <input
              className="intag"
              onClick={handlePasswordClick}
              type="password"
              name="password"
              onBlur={() => handleBlur('password')}
              {...register("password", { required: true })}
              placeholder=''
            />
          </div>

          {errors?.password && (
            <HelperText className="logerr" valid={false}>
              {errors?.password?.type === "required" && "Password required"}
            </HelperText>
          )}
          {error && (
            <HelperText className="" valid={false}>
              {error}
            </HelperText>
          )}

          <div className="showMeAndForgot">
            <div className="showMe">
              <label>Show</label>
              <input type="checkbox" name="" id="" />
            </div>
            <div className="forgot">
            <ForgotPasswordModal /> 
            </div>
          </div>
         
          <Button type="submit" disabled={isLoading || isGoogleLoading} className='btn1'>
            {isLoading ? <PulseLoader color={"#0a138b"} size={10} loading /> : "Login"}
          </Button>
          <Button
            type="button"
            layout="link"
            onClick={() => {
              setIsGoogleLoading(true);
              login();
            }}
            disabled={isLoading || isGoogleLoading}
            className="btn2"
          >
            <div className="gbtn">

            <svg
              className="googleImg"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            {isGoogleLoading ? (
              <PulseLoader color={"#0a138b"} size={10} loading />
            ) : (
              "Login in with Google"
            )}
            </div>
          </Button>
          <p className="signupEnd">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="signLink">
              Sign Up
            </Link>
          </p>
          </form>
        </div> 
        </div>
      </div>
  )
}


export default Login