import { AlertCircle, Loader2 } from "lucide-react";

import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FcGoogle } from "react-icons/fc";
import { useRegistrationForm } from "../../../../hooks/useRegistrationForm";
import { NameField, EmailField, PasswordField } from "./InputFields";

export function UserRegistration() {
  const {
    form,
    onSubmit,
    handleResendCode,
    handleGoogleLogin,
    verificationSent,
    showPassword,
    setShowPassword,
    isResendingCode,
    isGoogleLoading,
    isSubmitting,
  } = useRegistrationForm();

  return (
    <Card className="shadow-lg">
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
              {/* Name field*/}
              <NameField control={form.control} isSubmitting={isSubmitting} />

              {/* Email Field */}
              <EmailField control={form.control} isSubmitting={isSubmitting} />

              {/* Password Field */}
              <PasswordField
                control={form.control}
                isSubmitting={isSubmitting}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />

              {verificationSent && (
                <div className="space-y-6">
                  <Alert
                    variant="default"
                    className="border-primary/50 bg-primary/5"
                  >
                    <AlertCircle className="h-5 w-5 text-primary" />
                    <div className="ml-3">
                      <AlertTitle className="text-primary font-medium">
                        Verification Required
                      </AlertTitle>
                      <AlertDescription className="mt-1">
                        We've sent a verification code to{" "}
                        <span className="font-medium">
                          {form.getValues("email")}
                        </span>
                      </AlertDescription>
                    </div>
                  </Alert>

                  {/* Email Verification Code Field */}
                  <VerificationCodeField
                    control={form.control}
                    isSubmitting={isSubmitting}
                    isResendingCode={isResendingCode}
                    handleResendCode={handleResendCode}
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
