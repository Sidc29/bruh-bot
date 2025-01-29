import { useState } from "react";
import { useRegistration } from "@/contexts/RegistrationContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { userRegistrationSchema } from "@/schemas/registration";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FcGoogle } from "react-icons/fc";
import { PasswordRequirements } from "../../auth/PasswordRequirements";

export function UserRegistrationStep() {
  const { dispatch } = useRegistration();
  const [verificationSent, setVerificationSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isResendingCode, setIsResendingCode] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
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
          return;
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

  const { isSubmitting } = form.formState;

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

  return (
    <Card className="border-2 border-border/50 shadow-lg">
      <CardHeader className="text-center space-y-3">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Create your account
        </CardTitle>
        <CardDescription className="text-base">
          Get started with BruhBot in minutes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Button
            type="button"
            variant="secondary"
            className="w-full flex items-center justify-center gap-2 h-11 hover:bg-muted/50"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <FcGoogle className="h-5 w-5" />
            )}
            <span className="text-sm font-medium">
              {isGoogleLoading ? "Connecting..." : "Continue with Google"}
            </span>
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <div className="bg-card px-2 text-muted-foreground">
              Or continue with email
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                          disabled={isSubmitting}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <PasswordRequirements password={field.value} />
                  </FormItem>
                )}
              />

              {verificationSent && (
                <div className="space-y-4">
                  <Alert>
                    <AlertDescription>
                      We've sent a verification code to{" "}
                      {form.getValues("email")}
                    </AlertDescription>
                  </Alert>

                  <FormField
                    control={form.control}
                    name="verificationCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Verification Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter 6-digit code"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleResendCode}
                          disabled={isResendingCode || isSubmitting}
                          className="px-0 text-primary hover:text-primary/90"
                        >
                          {isResendingCode && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Resend code
                        </Button>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {verificationSent ? "Verify & Continue" : "Continue"}
              </Button>
            </div>
          </form>
        </Form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="" className="text-primary hover:underline">
            Sign in
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
