import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "../pages/main/Registration";
import { ClientWebsitePreview } from "../components/chatbot/ClientWebsitePreview";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/chatbot" element={<ClientWebsitePreview />} />
    </Routes>
  );
}
