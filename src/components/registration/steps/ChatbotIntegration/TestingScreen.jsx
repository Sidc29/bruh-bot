import { Button } from "@/components/ui/button";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import {
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";

export const TestingScreen = ({
  integrationSuccess,
  handleAdminPanelView,
  handleSocialShare,
  handleGoBackToMain,
}) => (
  <div className="space-y-6">
    <Button variant="ghost" className="mb-4" onClick={handleGoBackToMain}>
      <ChevronLeft className="w-4 h-4 mr-2" />
      Back to Main Screen
    </Button>
    {integrationSuccess ? (
      <div className="text-center space-y-6">
        <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
        <h3 className="text-xl font-bold">Integration Successful!</h3>
        <p className="text-muted-foreground">
          Your chatbot is now live on your website
        </p>
        <div className="grid gap-4">
          <Button className="w-full" onClick={handleAdminPanelView}>
            <ExternalLink className="w-4 h-4 mr-2" />
            Explore Admin Panel
          </Button>
          <Button variant="secondary" className="w-full">
            <MessageSquare className="w-4 h-4 mr-2" />
            Start talking to your chatbot
          </Button>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="icon" onClick={handleSocialShare}>
              <FaFacebook className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <FaTwitter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <FaWhatsapp className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center space-y-6">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto" />
        <h3 className="text-xl font-bold">Checking Integration...</h3>
        <p className="text-muted-foreground">This may take a few moments</p>
      </div>
    )}
  </div>
);

export default TestingScreen;
