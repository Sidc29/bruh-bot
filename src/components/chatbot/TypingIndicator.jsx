export const TypingIndicator = () => (
  <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-accent">
    <div className="flex items-center gap-2">
      <span
        className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
        style={{ animationDelay: "0ms" }}
      />
      <span
        className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <span
        className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  </div>
);
