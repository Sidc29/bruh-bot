import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Mail, Copy, Check } from "lucide-react";

export const IntegrationOptions = ({
  widgetId,
  email,
  handleCopyCode,
  isCopied,
  handleEmailInstructions,
  handleTestIntegration,
  handleGoBackToMain,
}) => (
  <div className="space-y-6">
    <Button variant="ghost" onClick={handleGoBackToMain}>
      <ChevronLeft className="w-4 h-4 mr-2" />
      Back to Main Screen
    </Button>
    <div className="space-y-4">
      <h3 className="font-medium">Integration Options</h3>
      <div className="space-y-4">
        <Card className="p-4">
          <h4 className="font-medium mb-2">Option 1: Direct Integration</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Copy and paste this code into your website's &lt;head&gt; tag
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            {`<script src="https://widget.bruhbot.com/loader.js" 
data-widget-id="${widgetId}"
data-email="${email}"
async></script>`}
          </div>
          <Button
            variant="secondary"
            className="w-full"
            onClick={handleCopyCode}
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 mr-2 text-green-500" />
                Code Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </>
            )}
          </Button>
        </Card>

        <Card className="p-4">
          <h4 className="font-medium mb-2">Option 2: Email Instructions</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Send integration instructions to your developer
          </p>
          <Button
            variant="secondary"
            className="w-full"
            onClick={handleEmailInstructions}
          >
            <Mail className="w-4 h-4 mr-2" />
            Email Instructions
          </Button>
        </Card>
      </div>
    </div>

    <div className="flex justify-end pt-4">
      <Button onClick={handleTestIntegration}>Test Integration</Button>
    </div>
  </div>
);

export default IntegrationOptions;
