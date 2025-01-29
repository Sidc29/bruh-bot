import { RegistrationProvider } from "../../contexts/RegistrationContext";
import { RegistrationFlow } from "../../components/registration/RegistrationFlow";
import { RegistrationLayout } from "../../layouts/RegistrationLayout";

export default function RegisterPage() {
  return (
    <RegistrationProvider>
      <RegistrationLayout>
        <RegistrationFlow />
      </RegistrationLayout>
    </RegistrationProvider>
  );
}
