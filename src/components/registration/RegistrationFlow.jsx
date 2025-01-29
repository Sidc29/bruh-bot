import { useRegistration } from "../../contexts/RegistrationContext";
import { StepIndicator } from "../StepIndicator";
import { UserRegistrationStep } from "./steps/UserRegistrationStep";
// TODO: Implement the following steps
// import { OrganizationSetupStep } from "./steps/OrganizationSetupStep";
// import { ChatbotIntegrationStep } from "./steps/ChatbotIntegrationStep";

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
        {state.currentStep === 1 && <UserRegistrationStep />}
        {/* TODO: Implement the following steps */}
        {/* {state.currentStep === 2 && <OrganizationSetupStep />}
        {state.currentStep === 3 && <ChatbotIntegrationStep />} */}
      </div>
    </div>
  );
}
