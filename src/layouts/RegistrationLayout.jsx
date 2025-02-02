import React from "react";
import { BotMessageSquare } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import { Button } from "@/components/ui/button";

export function RegistrationLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-muted to-primary/5 dark:from-primary/10 dark:via-background dark:to-primary/10">
      <div className="container mx-auto flex min-h-screen flex-col px-4 py-6">
        <header className="flex items-center justify-between py-8 border-b border-border/40">
          <a href="/" className="flex items-center gap-3 group hover:scale-105">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg group-hover:shadow-primary/25">
              <BotMessageSquare className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight">BruhBot</span>
              <span className="text-sm text-muted-foreground">
                AI Assistant
              </span>
            </div>
          </a>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:flex">
              Help
            </Button>
            <Button variant="ghost" className="hidden sm:flex">
              Contact
            </Button>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 py-8">{children}</main>

        <footer className="py-8 border-t border-border/40">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div>© 2025 BruhBot. All rights reserved.</div>
            <div className="flex gap-4">
              <a href="/privacy" className="hover:text-primary">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-primary">
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default RegistrationLayout;
