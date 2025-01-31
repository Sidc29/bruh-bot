import { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRegistration } from "../contexts/RegistrationProvider";
import confetti from "canvas-confetti";

export const useChatbotIntegration = () => {
  const [showIntegrationSteps, setShowIntegrationSteps] = useState(false);
  const [showTestingScreen, setShowTestingScreen] = useState(false);
  const [integrationSuccess, setIntegrationSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { state, dispatch } = useRegistration();

  const widgetId = useMemo(
    () => state.chatbotData.widgetId || uuidv4(),
    [state.chatbotData.widgetId]
  );

  useEffect(() => {
    if (!state.chatbotData.widgetId) {
      dispatch({
        type: "UPDATE_CHATBOT_DATA",
        payload: {
          widgetId,
          integrationMethod: null,
        },
      });
    }
  }, [widgetId, dispatch, state.chatbotData.widgetId]);

  const handleTestChatbot = () => {
    const testUrl = `${state.organizationData.websiteUrl}?chatbot=preview`;
    window.open(testUrl, "_blank");

    dispatch({
      type: "UPDATE_CHATBOT_DATA",
      payload: {
        isTestingComplete: false,
        testingMethod: "preview",
        chatbotTested: true,
      },
    });
  };

  const handleCopyCode = () => {
    const integrationCode = `<!-- BruhBot Widget -->
<script src="https://widget.bruhbot.com/loader.js" 
  data-widget-id="${widgetId}"
  data-email="${state.userData.email}"
  async>
</script>`;

    navigator.clipboard.writeText(integrationCode);

    dispatch({
      type: "UPDATE_CHATBOT_DATA",
      payload: {
        integrationMethod: "direct",
        integrationCode,
      },
    });

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleEmailInstructions = () => {
    const subject = encodeURIComponent("Chatbot Integration Instructions");
    const body = encodeURIComponent(`
Hi Developer,

Here are the instructions to integrate the BruhBot widget:

1. Copy the following script tag into the <head> of your website:

<script src="https://widget.bruhbot.com/loader.js" 
  data-widget-id="${widgetId}"
  data-email="${state.userData.email}"
  async>
</script>

2. Replace "YOUR_WIDGET_ID" with the provided unique identifier.

Best regards,
BruhBot Team`);

    dispatch({
      type: "UPDATE_CHATBOT_DATA",
      payload: {
        integrationMethod: "email",
        emailSent: true,
      },
    });

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleTestIntegration = () => {
    setShowTestingScreen(true);
    setTimeout(() => {
      setIntegrationSuccess(true);

      if (!state.chatbotData.confettiShown) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }

      dispatch({
        type: "UPDATE_CHATBOT_DATA",
        payload: {
          isIntegrated: true,
          isTestingComplete: true,
          confettiShown: true,
        },
      });
    }, 2000);
  };

  const handleGoBackToMain = () => {
    setShowIntegrationSteps(false);
    setShowTestingScreen(false);
    dispatch({ type: "SET_STEP", payload: 3 });
  };

  return {
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
  };
};
