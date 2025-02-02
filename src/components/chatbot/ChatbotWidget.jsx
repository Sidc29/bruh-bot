import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageSquare,
  Send,
  X,
  MinimizeIcon,
  MaximizeIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useChatbot } from "@/hooks/useChatbot";
import { TypingIndicator } from "./TypingIndicator";
import { ChatMessage } from "./ChatMessage";

const ChatbotWidget = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const {
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
  } = useChatbot();

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center z-50">
        {showNotification && (
          <div className="animate-bounce mr-4 bg-primary text-primary-foreground rounded-lg p-2 shadow-lg hidden sm:block">
            Click to chat with us! 👋
          </div>
        )}
        <Button
          className="rounded-full p-4 h-12 w-12 sm:h-14 sm:w-14 shadow-lg hover:shadow-xl relative"
          onClick={handleChatOpen}
        >
          <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
          {showNotification && (
            <Badge
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
              variant="destructive"
            >
              1
            </Badge>
          )}
        </Button>
      </div>

      {isChatOpen && (
        <div
          className={cn(
            "fixed right-4 shadow-2xl animate-in slide-in-from-bottom-2 z-50",
            isExpanded ? "bottom-20 sm:bottom-24" : "bottom-20",
            isExpanded
              ? "w-[95vw] sm:w-[400px] max-w-[400px]"
              : "w-[95vw] sm:w-[400px] max-w-[400px] h-[60px]"
          )}
        >
          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between p-3">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">
                    Support Assistant
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Always here to help
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <MinimizeIcon className="h-4 w-4" />
                  ) : (
                    <MaximizeIcon className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsChatOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            {isExpanded && (
              <>
                <CardContent className="p-0">
                  <ScrollArea className="h-[40vh] sm:h-[400px] px-4 py-2">
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                      ))}

                      {isTyping && <TypingIndicator />}

                      {messages.length === 1 && !isTyping && (
                        <div className="mt-4">
                          <p className="text-sm text-muted-foreground mb-2">
                            Suggested questions:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {SUGGESTED_MESSAGES.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs"
                                onClick={() => handleSendMessage(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="p-3">
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleSendMessage(input);
                    }}
                    className="flex w-full items-center space-x-2"
                  >
                    <Input
                      id="message"
                      placeholder="Type your message..."
                      className="flex-1"
                      autoComplete="off"
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="h-8 w-8"
                      disabled={!input.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
