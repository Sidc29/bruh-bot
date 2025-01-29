import { CheckCircle2, XCircle } from "lucide-react";

const PasswordRequirement = ({ isValid, text }) => (
  <div className="flex items-center gap-2 text-sm">
    {isValid ? (
      <CheckCircle2 className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-destructive" />
    )}
    <span className={isValid ? "text-muted-foreground" : "text-foreground"}>
      {text}
    </span>
  </div>
);

export const PasswordRequirements = ({ password }) => {
  const requirements = [
    {
      isValid: password.length >= 8,
      text: "At least 8 characters long",
    },
    {
      isValid: /[A-Z]/.test(password),
      text: "Contains an uppercase letter",
    },
    {
      isValid: /[a-z]/.test(password),
      text: "Contains a lowercase letter",
    },
    {
      isValid: /\d/.test(password),
      text: "Contains a number",
    },
  ];

  const allValid = requirements.every((req) => req.isValid);

  return (
    <div className="space-y-2">
      {requirements.map((requirement, index) => (
        <PasswordRequirement key={index} {...requirement} />
      ))}
    </div>
  );
};
