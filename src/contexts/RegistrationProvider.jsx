import React, { createContext, useContext, useReducer } from "react";
import { registrationReducer } from "../reducers/registrationReducer";

const initialState = {
  currentStep: 2,
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
  },
  chatbotData: {
    isIntegrated: false,
    isTestingComplete: false,
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
