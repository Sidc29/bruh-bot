import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export const TestChatbot = ({ handleTestChatbot }) => (
  <Button className="h-24 text-lg" onClick={handleTestChatbot}>
    <MessageSquare className="w-6 h-6 mr-3" />
    Test Chatbot
  </Button>
);

export default TestChatbot;
