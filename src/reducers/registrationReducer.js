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
    case "UPDATE_CHATBOT_DATA":
      return {
        ...state,
        chatbotData: { ...state.chatbotData, ...action.payload },
      };
    default:
      return state;
  }
}
