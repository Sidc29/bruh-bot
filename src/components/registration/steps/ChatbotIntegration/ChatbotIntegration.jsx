import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Code, CheckCircle2, ChevronLeft } from "lucide-react";
import IntegrationOptions from "./IntegrationOptions";
import TestingScreen from "./TestingScreen";
import { useChatbotIntegration } from "../../../../hooks/useChatbotIntegration";
import { cn } from "../../../../lib/utils";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  onClick,
  variant = "chat",
}) => {
  const variants = {
    chat: "bg-indigo-600 text-white hover:bg-indigo-700",
    test: "bg-emerald-600 text-white hover:bg-emerald-700",
    steps: "bg-amber-600 text-white hover:bg-amber-700",
  };

  return (
    <Card
      onClick={onClick}
      className={cn(
        "w-full p-6 transition-all duration-200 hover:scale-[1.02] cursor-pointer",
        variants[variant],
        "flex flex-col items-center justify-center space-y-4"
      )}
    >
      <Icon className="w-10 h-10" />
      <div className="text-center space-y-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </Card>
  );
};
export const ChatbotIntegration = () => {
  const {
    state,
    dispatch,
    showIntegrationSteps,
    setShowIntegrationSteps,
    showTestingScreen,
    integrationSuccess,
    isCopied,
    widgetId,
    handleTestChatbot,
    handleCopyCode,
    handleEmailInstructions,
    handleTestIntegration,
    handleGoBackToMain,
    handleSocialShare,
    handleAdminPanelView,
  } = useChatbotIntegration();

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center space-y-3 pb-8">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Chatbot Integration & Testing
        </CardTitle>
        <CardDescription className="text-lg">
          Configure and test your chatbot integration
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showTestingScreen ? (
          <TestingScreen
            integrationSuccess={integrationSuccess}
            handleSocialShare={handleSocialShare}
            handleAdminPanelView={handleAdminPanelView}
            handleGoBackToMain={handleGoBackToMain}
          />
        ) : showIntegrationSteps ? (
          <IntegrationOptions
            widgetId={widgetId}
            email={state.userData.email}
            handleCopyCode={handleCopyCode}
            handleEmailInstructions={handleEmailInstructions}
            handleTestIntegration={handleTestIntegration}
            isCopied={isCopied}
            handleGoBackToMain={handleGoBackToMain}
          />
        ) : (
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={MessageSquare}
                title="Test Chatbot"
                description="Try out your chatbot in a simulated environment"
                onClick={handleTestChatbot}
                variant="chat"
              />

              <FeatureCard
                icon={Code}
                title="Website Integration"
                description="Get the code to add the chatbot to your website"
                onClick={() => setShowIntegrationSteps(true)}
                variant="steps"
              />

              <FeatureCard
                icon={CheckCircle2}
                title="Verify Integration"
                description="Confirm your chatbot is working correctly"
                onClick={handleTestIntegration}
                variant="test"
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => dispatch({ type: "SET_STEP", payload: 2 })}
                className="flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatbotIntegration;
