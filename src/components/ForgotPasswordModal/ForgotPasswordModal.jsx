
import React from 'react';
import {
  Backdrop,
  Button,
  HelperText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@windmill/react-ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import authService from "../../services/auth.service";
import "./ForgotPasswordModal.css";

const ForgotPasswordModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [isSending, setIsSending] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const toggleModal = () => {
    setMsg("");
    setIsOpen(!isOpen);
  };

  const onSubmitReset = (data) => {
    setMsg("");
    setIsSending(true);
    authService
      .forgotPassword(data.email)
      .then((data) => {
        if (data.data.status === "OK") {
          setIsSending(false);
          toast.success("Email has been sent successfully");
          setIsOpen(false);
        }
      })
      .catch((error) => {
        setIsSending(false);
        setMsg(error.response.data.message);
      });
  };

  return (
    <div>
      <>
        {isOpen && <Backdrop />}
        <span
          onClick={toggleModal}
          className="actionButton"
        >
          Forgot Password
        </span>

        <Modal isOpen={isOpen} onClose={toggleModal} className='modal'>
          <form action="" onSubmit={handleSubmit(onSubmitReset)}>
            <ModalHeader>Forgot Password</ModalHeader>
            <ModalBody>
              <Label className="label">
                <span>Email</span>
                <Input
                  name="email"
                  className="input"
                  valid
                  type="email"
                  inputMode="email"
                  {...register("email", {
                    required: "Email required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Email not valid",
                    },
                  })}
                />
              </Label>
              {errors?.email && errors?.email.type === "required" && (
                <HelperText style={styles.errorText}>
                  {errors.email.message}
                </HelperText>
              )}

              {errors?.email && errors?.email.type === "pattern" && (
                <HelperText style={styles.errorText}>
                  {errors.email.message}
                </HelperText>
              )}

              {msg && (
                <HelperText className="errorText">{msg}</HelperText>
              )}
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={handleSubmit(onSubmitReset)}
                disabled={isSending}
                className="actionButton"
              >
                {isSending ? (
                  <PulseLoader size={10} color="#fff" />
                ) : (
                  "Send Email"
                )}
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </>
    </div>
  );
}

export default ForgotPasswordModal;
