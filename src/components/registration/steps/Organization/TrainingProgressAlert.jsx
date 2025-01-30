import { Loader2, CheckCircle2, Bot } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "../../../../lib/utils";

export const TrainingProgressAlert = ({
  scanningState,
  scanProgress,
  completedPages,
  scannedPages,
  isComplete,
}) => (
  <Alert className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
    <div className="relative">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "relative p-3 bg-primary/10 rounded-full transition-transform duration-500",
              scanningState === "scanning" && "animate-[pulse_2s_infinite]"
            )}
          >
            <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <AlertTitle className="text-lg font-semibold mb-1">
              {scanningState === "scanning" ? (
                <span className="inline-flex items-center gap-2">
                  Training in Progress
                </span>
              ) : (
                "Training Complete!"
              )}
            </AlertTitle>
            <AlertDescription className="text-sm sm:text-base text-muted-foreground/90">
              {scanningState === "scanning"
                ? "Your custom chatbot is learning from your website content"
                : "Your chatbot is ready to assist your users"}
            </AlertDescription>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm sm:text-base font-medium text-muted-foreground">
              Overall Progress
            </span>
            <Badge
              variant={scanningState === "completed" ? "default" : "secondary"}
              className="px-3 py-1 text-sm font-medium"
            >
              {scanProgress}%
            </Badge>
          </div>

          <Progress
            value={scanProgress}
            className="h-2.5 sm:h-3 rounded-full bg-primary/20"
          />
          <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground/80">
            <span className="flex items-center gap-2">
              {isComplete ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <Loader2
                  className={cn(
                    "h-4 w-4",
                    scanningState === "scanning" && "animate-spin"
                  )}
                />
              )}
              <span>
                {scanningState === "scanning"
                  ? "Processing pages"
                  : "Pages Processed"}
              </span>
            </span>
            <span className="font-medium">
              {completedPages}/{scannedPages.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Alert>
);

export default TrainingProgressAlert;
