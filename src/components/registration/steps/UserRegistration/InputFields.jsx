import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User, Mail, Lock, Eye, EyeOff, KeyRound } from "lucide-react";
import { PasswordRequirements } from "../../../auth/PasswordRequirements";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Timer, Send } from "lucide-react";

export const NameField = ({ control, isSubmitting }) => (
  <FormField
    control={control}
    name="name"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Name
        </FormLabel>
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
);

export const EmailField = ({ control, isSubmitting }) => (
  <FormField
    control={control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Email
        </FormLabel>
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
);

export const PasswordField = ({
  control,
  isSubmitting,
  showPassword,
  setShowPassword,
}) => (
  <FormField
    control={control}
    name="password"
    render={({ field }) => (
      <FormItem className="space-y-3">
        <FormLabel className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Password
        </FormLabel>
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
);

export const VerificationCodeField = ({
  control,
  isSubmitting,
  isResendingCode,
  handleResendCode,
}) => (
  <FormField
    control={control}
    name="verificationCode"
    render={({ field }) => (
      <FormItem className="space-y-4">
        <FormLabel className="flex items-center gap-2">
          <KeyRound className="h-4 w-4" />
          Verification Code
        </FormLabel>
        <FormControl>
          <div className="flex flex-col items-center space-y-4">
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
              disabled={isSubmitting}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Timer className="h-4 w-4 flex-shrink-0" />
              <span>Didn't receive the code?</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleResendCode}
                disabled={isResendingCode || isSubmitting}
                className="px-2 text-primary hover:text-primary/90 flex items-center gap-1 h-8"
              >
                {isResendingCode ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Resend code
              </Button>
            </div>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
