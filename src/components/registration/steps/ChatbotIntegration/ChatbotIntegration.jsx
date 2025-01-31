import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Code, CheckCircle2 } from "lucide-react";
import IntegrationOptions from "./IntegrationOptions";
import TestingScreen from "./TestingScreen";
import TestChatbot from "./TestChatbot";
import { useChatbotIntegration } from "../../../../hooks/useChatbotIntegration";

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
      <CardHeader className="text-center space-y-3">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Chatbot Integration & Testing
        </CardTitle>
        <CardDescription className="text-base">
          Test and integrate your chatbot on your website
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
          <div className="space-y-6">
            <div className="grid gap-4">
              <TestChatbot handleTestChatbot={handleTestChatbot} />
              <Button
                variant="secondary"
                className="h-24 text-lg"
                onClick={() => setShowIntegrationSteps(true)}
              >
                <Code className="w-6 h-6 mr-3" />
                Integrate on your website
              </Button>
              <Button
                variant="outline"
                className="h-24 text-lg"
                onClick={handleTestIntegration}
              >
                <CheckCircle2 className="w-6 h-6 mr-3" />
                Test Integration
              </Button>
            </div>
            <div className="flex justify-between pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => dispatch({ type: "SET_STEP", payload: 2 })}
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
