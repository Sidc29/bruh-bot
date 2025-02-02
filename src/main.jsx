import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { RegistrationProvider } from "./contexts/RegistrationProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RegistrationProvider>
        <Router>
          <App />
        </Router>
      </RegistrationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
