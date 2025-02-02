import { cn } from "@/lib/utils.tsx";

export const ChatMessage = ({ message }) => (
  <div
    className={cn(
      "flex gap-2 items-start",
      message.role === "user" && "flex-row-reverse"
    )}
  >
    <div
      className={cn(
        "flex max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
        message.role === "user"
          ? "bg-primary text-primary-foreground ml-auto"
          : "bg-muted/60 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      {message.content}
    </div>
  </div>
);
