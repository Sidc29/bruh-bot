export function registrationReducer(state, action) {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "UPDATE_USER_DATA":
      return { ...state, userData: { ...state.userData, ...action.payload } };
    case "UPDATE_ORGANIZATION_DATA":
      return {
        ...state,
        organizationData: { ...state.organizationData, ...action.payload },
      };
    case "UPDATE_TRAINING_STATE":
      return {
        ...state,
        organizationData: {
          ...state.organizationData,
          trainingState: {
            ...state.organizationData.trainingState,
            ...(typeof action.payload === "function"
              ? action.payload(state.organizationData.trainingState)
              : action.payload),
          },
        },
      };
    case "UPDATE_CHATBOT_DATA":
      return {
        ...state,
        chatbotData: { ...state.chatbotData, ...action.payload },
      };
    case "RESET_TRAINING":
      return {
        ...state,
        organizationData: {
          ...state.organizationData,
          trainingState: {
            currentPhase: "not_started",
            scanProgress: 0,
            scannedPages: [],
            completedPages: [],
            detectedPages: 0,
            isComplete: false,
          },
        },
      };
    default:
      return state;
  }
}
