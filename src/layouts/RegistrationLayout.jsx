import { BotMessageSquare } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";

export function RegistrationLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-muted to-primary/5 dark:bg-gradient-to-br dark:from-primary/10 dark:via-background dark:to-primary/10">
      <div className="container mx-auto flex min-h-screen flex-col px-4 py-6">
        <header className="flex items-center justify-between py-6">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BotMessageSquare className="h-5 w-5" />
            </div>
            <span className="text-xl font-semibold">BruhBot</span>
          </a>
          <ThemeToggle />
        </header>
        <main className="flex-1">{children}</main>
        <footer className="py-6 text-center text-sm text-muted-foreground">
          © 2025 BruhBot. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
