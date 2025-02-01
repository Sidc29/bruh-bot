import React, { createContext, useContext, useReducer } from "react";
import { registrationReducer } from "../reducers/registrationReducer";

const initialState = {
  currentStep: 1,
  allStepsCompleted: false,
  userData: {
    name: "",
    email: "",
    password: "",
    isEmailVerified: false,
  },
  organizationData: {
    companyName: "",
    websiteUrl: "",
    description: "",
    scrapedPages: [],
    trainingState: {
      currentPhase: "not_started", // not_started, scanning, processing, training, completed
      scanProgress: 0,
      scannedPages: [],
      completedPages: [],
      detectedPages: 0,
      isComplete: false,
    },
  },
  chatbotData: {
    widgetId: null,
    isIntegrated: false,
    isTestingComplete: false,
    integrationMethod: null,
    integrationCode: null,
    emailSent: false,
    testingMethod: null,
    confettiShown: false,
    adminPanelViewed: false,
    chatbotTested: false,
    socialShareClicked: false,
  },
};

const RegistrationContext = createContext(null);

export function RegistrationProvider({ children }) {
  const [state, dispatch] = useReducer(registrationReducer, initialState);

  return (
    <RegistrationContext.Provider value={{ state, dispatch }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      "useRegistration must be used within a RegistrationProvider"
    );
  }
  return context;
}
