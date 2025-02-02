import { Button } from "@/components/ui/button";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import {
  ChevronLeft,
  AlertCircle,
  RefreshCcw,
  ExternalLink,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TestingScreen = ({
  integrationStatus,
  handleAdminPanelView,
  handleSocialShare,
  handleGoBackToMain,
  handleTestChatbot,
  handleRetryIntegration,
}) => (
  <div className="max-w-2xl mx-auto space-y-6">
    <Button variant="ghost" onClick={handleGoBackToMain}>
      <ChevronLeft className="w-4 h-4 mr-2" />
      Back to Main Screen
    </Button>

    {integrationStatus === "checking" && (
      <Card className="text-center border-none">
        <CardContent className="space-y-6 pt-6">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto" />
          <h3 className="text-xl font-bold">Checking Integration...</h3>
          <p className="text-muted-foreground">This may take a few moments</p>
        </CardContent>
      </Card>
    )}

    {integrationStatus === "success" && (
      <Card className="text-center border-none">
        <CardContent className="space-y-6 pt-6">
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
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleTestChatbot}
            >
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
        </CardContent>
      </Card>
    )}

    {integrationStatus === "failed" && (
      <Card className="border-none">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-destructive/10 p-3 rounded-full mb-4">
            <AlertCircle className="w-12 h-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-destructive">
            Integration Failed
          </CardTitle>
          <CardDescription className="text-base">
            We encountered some issues while setting up your chatbot
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg space-y-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <h4 className="font-semibold">Common Issues:</h4>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-destructive mt-1">•</span>
                <span>
                  Script installation: Ensure the integration code is placed
                  just before the closing {"</body>"} tag
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-destructive mt-1">•</span>
                <span>
                  Firewall settings: Check if your website's security settings
                  are blocking the connection
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-destructive mt-1">•</span>
                <span>
                  Network issues: Verify your website has stable internet
                  connectivity
                </span>
              </li>
            </ul>
          </div>

          <Separator />

          <div className="space-y-3">
            <Button
              onClick={handleRetryIntegration}
              className="w-full bg-destructive hover:bg-destructive/90"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Retry Integration
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoBackToMain}
            >
              Review Integration Steps
            </Button>
          </div>
        </CardContent>

        <CardFooter className="text-sm text-muted-foreground text-center">
          Need help? Contact our support team for assistance
        </CardFooter>
      </Card>
    )}
  </div>
);

export default TestingScreen;
