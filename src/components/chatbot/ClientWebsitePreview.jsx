import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AlertCircle, X } from "lucide-react";
import ChatbotWidget from "./ChatbotWidget";

export const ClientWebsitePreview = () => {
  const [showFeedback, setShowFeedback] = useState(true);

  return (
    <div className="min-h-screen bg-background relative">
      {showFeedback && (
        <Card className="rounded-none border-x-0 border-t-0 bg-muted/50">
          <CardContent className="p-0">
            <div className="max-w-7xl mx-auto py-3 px-4">
              <div className="flex items-center justify-center gap-4">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                <span className="font-medium">
                  Chatbot not working as intended?
                </span>
                <Button
                  size="sm"
                  onClick={() => window.open("/feedback", "_blank")}
                >
                  Share Feedback
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFeedback(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Welcome to Our Company
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8" />
        </div>

        <Card className="bg-card">
          <CardHeader>
            <h2 className="text-3xl font-semibold text-card-foreground">
              About Us
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-card-foreground/80">
              We're dedicated to providing innovative solutions for businesses
              worldwide. Our team of experts works tirelessly to ensure the
              highest quality service for all our clients. With years of
              experience and a commitment to excellence, we've helped countless
              organizations achieve their goals and reach new heights in their
              industries.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
};

export default ClientWebsitePreview;
