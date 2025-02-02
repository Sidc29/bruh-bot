import { useState, useRef, useEffect } from "react";
import { SUGGESTED_MESSAGES, BOT_RESPONSES } from "../constants/chatbot";

export const useChatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showNotification, setShowNotification] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("password")) return BOT_RESPONSES.password;
    if (lowerMessage.includes("hours")) return BOT_RESPONSES.hours;
    if (lowerMessage.includes("pricing")) return BOT_RESPONSES.pricing;
    if (lowerMessage.includes("contact") || lowerMessage.includes("support"))
      return BOT_RESPONSES.contact;
    return BOT_RESPONSES.default;
  };

  const simulateBotResponse = async (userMessage) => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsTyping(false);

    const responses = getBotResponse(userMessage);
    const response = responses[Math.floor(Math.random() * responses.length)];

    setMessages((prev) => [...prev, { role: "agent", content: response }]);
  };

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content }]);
    setInput("");
    await simulateBotResponse(content);
  };

  const handleChatOpen = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      const greeting =
        BOT_RESPONSES.greeting[
          Math.floor(Math.random() * BOT_RESPONSES.greeting.length)
        ];
      setMessages([{ role: "agent", content: greeting }]);
    }
    setIsChatOpen(true);
    setShowNotification(false);
  };

  return {
    isChatOpen,
    setIsChatOpen,
    messages,
    input,
    setInput,
    showNotification,
    isTyping,
    messagesEndRef,
    handleSendMessage,
    handleChatOpen,
    SUGGESTED_MESSAGES,
  };
};
