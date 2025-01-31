import { Loader2, CheckCircle2, Bot, Globe, Split, Brain } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "../../../../lib/utils";

const PhaseIndicator = ({ phase, icon: Icon, isActive, isComplete }) => (
  <div
    className={cn(
      "flex items-center gap-2 p-2 rounded-lg transition-all",
      isActive && "bg-primary/10",
      isComplete && "text-primary"
    )}
  >
    <div
      className={cn(
        "p-1.5 rounded-full",
        isActive && "bg-primary/20",
        isComplete && "bg-primary/20"
      )}
    >
      <Icon className="h-4 w-4" />
    </div>
    <span className="text-sm font-medium">{phase}</span>
    {isComplete && <CheckCircle2 className="h-4 w-4 text-green-500 ml-auto" />}
  </div>
);

export const TrainingProgressAlert = ({
  scanProgress,
  completedPages,
  scannedPages,
  detectedPages,
  currentPhase,
  isComplete,
}) => {
  const getPhaseContent = () => {
    switch (currentPhase) {
      case "scanning":
        return {
          title: "Website Scanning",
          description: "Detecting pages and analyzing website structure...",
          progress: (
            <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground/80">
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Pages Detected</span>
              </span>
              <span className="font-medium">{detectedPages.length} pages</span>
            </div>
          ),
        };
      case "processing":
        return {
          title: "Content Processing",
          description: "Analyzing and processing page content...",
          progress: (
            <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground/80">
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Pages Processed</span>
              </span>
              <span className="font-medium">
                {completedPages}/{scannedPages.length}
              </span>
            </div>
          ),
        };
      case "training":
        return {
          title: "AI Model Training",
          description: "Training your custom AI assistant on your content...",
          progress: null,
        };
      case "completed":
        return {
          title: "Training Complete",
          description: "Your AI assistant is ready to help your users",
          progress: (
            <div className="flex items-center justify-between gap-2 text-sm text-text-muted-foreground/80">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>All Pages Processed</span>
              </span>
              <span className="font-medium">{scannedPages.length} pages</span>
            </div>
          ),
        };
      default:
        return {
          title: "Initializing",
          description: "Preparing to start...",
          progress: null,
        };
    }
  };

  const phaseContent = getPhaseContent();

  return (
    <Alert className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <div className="relative space-y-6">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "relative p-3 bg-primary/10 rounded-full transition-transform duration-500",
              currentPhase !== "completed" && "animate-[pulse_2s_infinite]"
            )}
          >
            <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <AlertTitle className="text-lg font-semibold mb-1">
              {currentPhase !== "completed" ? (
                <span className="inline-flex items-center gap-2">
                  {phaseContent.title}
                  <Badge variant="secondary" className="animate-pulse">
                    Phase{" "}
                    {currentPhase === "scanning"
                      ? "1/3"
                      : currentPhase === "processing"
                      ? "2/3"
                      : currentPhase === "training"
                      ? "3/3"
                      : ""}
                  </Badge>
                </span>
              ) : (
                phaseContent.title
              )}
            </AlertTitle>
            <AlertDescription className="text-sm sm:text-base text-muted-foreground/90">
              {phaseContent.description}
            </AlertDescription>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <PhaseIndicator
              phase="Website Scanning"
              icon={Globe}
              isActive={currentPhase === "scanning"}
              isComplete={["processing", "training", "completed"].includes(
                currentPhase
              )}
            />
            <PhaseIndicator
              phase="Content Processing"
              icon={Split}
              isActive={currentPhase === "processing"}
              isComplete={["training", "completed"].includes(currentPhase)}
            />
            <PhaseIndicator
              phase="AI Model Training"
              icon={Brain}
              isActive={currentPhase === "training"}
              isComplete={currentPhase === "completed"}
            />
          </div>

          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm sm:text-base font-medium text-muted-foreground">
                Overall Progress
              </span>
              <Badge
                variant={isComplete ? "default" : "secondary"}
                className="px-3 py-1 text-sm font-medium"
              >
                {scanProgress}%
              </Badge>
            </div>

            <Progress
              value={scanProgress}
              className="h-2.5 sm:h-3 rounded-full bg-primary/20"
            />

            {phaseContent.progress}
          </div>
        </div>
      </div>
    </Alert>
  );
};

export default TrainingProgressAlert;
