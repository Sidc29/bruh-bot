import { useRegistration } from "../../contexts/RegistrationProvider";
import { StepIndicator } from "./StepIndicator";
import { UserRegistration } from "./steps/UserRegistration/UserRegistration";
import { OrganizationSetup } from "./steps/Organization/OrganizationSetup";
import { ChatbotIntegration } from "./steps/ChatbotIntegration/ChatbotIntegration";

const STEPS = [
  { number: 1, title: "Account Setup" },
  { number: 2, title: "Organization" },
  { number: 3, title: "Integration" },
];

export function RegistrationFlow() {
  const { state } = useRegistration();

  return (
    <div className="mx-auto max-w-2xl">
      <StepIndicator currentStep={state.currentStep} steps={STEPS} />
      <div className="space-y-8">
        {state.currentStep === 1 && <UserRegistration />}
        {state.currentStep === 2 && <OrganizationSetup />}
        {state.currentStep === 3 && <ChatbotIntegration />}
      </div>
    </div>
  );
}
