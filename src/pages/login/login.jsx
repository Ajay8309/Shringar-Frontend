import {useState} from 'react'
import {useGoogleLogin} from "@react-oauth/google";
import {Button, HelpText, Input, Label} from "@windmill/react-ui"
// forgot pasword modal
import { useUser } from '../../context/userContext';
import {useForm} from "react-hook-form";
import { toast } from 'react-hot-toast';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import authService from '../../services/auth.service';
import React from 'react';


const login = () => {

  const {isLoggedIn, setUserState} = useUser();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const {state} = useLocation();


  const login = useGoogleLogin({
    onSuccess : (codeResonse) => handleGoogleLogin(codeResonse),
    onError : (error) => console.log("Login Failed: ", error),
    flow: "auth-code",
  });

  async function handleGoogleLogin(googleData) {
    try {
      const data = await authService.googleLogin(googleData.code);
      toast.success("Login successful:");
      setUserState(data);
      setRedirectToReferrer(true);
      setIsLoading(false);
    } catch (error) {
      setIsGoogleLoading(false);
      toast.error("could not Login with Google:");
    }
  }

  const onSubmit = async (data) => {
    const {email, password} = data;

    try {
      setError("");
      setIsLoading(true);
      const data = await authService.login(email, password);
      toast.success("Login successful:");

      setTimeout(() => {
        setUserState(data);
        setRedirectToReferrer(true);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data.message);
    }
  };

  if(redirectToReferrer) {
    return <Navigate to={state?.from || "/"}/>
  }

  if(isLoggedIn) {
    return <Navigate to={state?.from || "/"}/> 
  }
  return (
    <div>login</div>
  )
}

export default login