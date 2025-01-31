import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegistrationSchema } from "../schemas/userRegistration";
import { useRegistration } from "../contexts/RegistrationProvider";

export const useRegistrationForm = () => {
  const { state, dispatch } = useRegistration();
  const [verificationSent, setVerificationSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isResendingCode, setIsResendingCode] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      name: state.userData.name,
      email: state.userData.email,
      password: state.userData.password,
      verificationCode: "",
    },
    context: {
      verificationRequired: verificationSent,
    },
  });

  const onSubmit = async (data) => {
    try {
      if (verificationSent) {
        if (!data.verificationCode) {
          form.setError("verificationCode", {
            type: "manual",
            message: "Verification code is required",
          });
          return;
        }

        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          dispatch({
            type: "UPDATE_USER_DATA",
            payload: {
              name: data.name,
              email: data.email,
              password: data.password,
              isEmailVerified: true,
            },
          });
          dispatch({ type: "SET_STEP", payload: 2 });
        } catch (error) {
          form.setError("verificationCode", {
            type: "manual",
            message: "Invalid verification code",
          });
        }
      } else {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setVerificationSent(true);
        } catch (error) {
          form.setError("email", {
            type: "manual",
            message: "Failed to send verification code",
          });
        }
      }
    } catch (error) {
      console.error(error);
      // TODO: Show error toast or message
    }
  };

  const handleResendCode = async () => {
    setIsResendingCode(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // TODO: Show success message or toast
    } finally {
      setIsResendingCode(false);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setIsGoogleLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockGoogleData = {
        name: "Google User",
        email: "user@gmail.com",
        isEmailVerified: true,
      };

      dispatch({
        type: "UPDATE_USER_DATA",
        payload: {
          ...mockGoogleData,
          password: "",
        },
      });
      dispatch({ type: "SET_STEP", payload: 2 });
    } catch (error) {
      console.error(error);
      // TODO: Show error message or toast
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    handleResendCode,
    handleGoogleLogin,
    verificationSent,
    setVerificationSent,
    showPassword,
    setShowPassword,
    isResendingCode,
    isGoogleLoading,
    isSubmitting: form.formState.isSubmitting,
  };
};
