import { Bot, Globe, Split, Brain, CheckCircle2, Loader2 } from "lucide-react";
import { AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "../../../../lib/utils";

const PhaseIndicator = ({
  phase,
  icon: Icon,
  isActive,
  isComplete,
  description,
}) => (
  <div
    className={cn(
      "relative",
      "hover:bg-secondary/40 rounded-xl p-4",
      isActive && "bg-secondary shadow-sm",
      isComplete && "text-primary"
    )}
  >
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "p-2 rounded-xl bg-background",
          isActive && "bg-primary text-white shadow-sm",
          isComplete && "bg-green-500/5 text-green-500"
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{phase}</span>
          {isComplete && (
            <CheckCircle2 className="h-6 w-6 text-green-500 ml-auto animate-in fade-in duration-300" />
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
    {isActive && (
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-full animate-pulse" />
    )}
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
  const phases = {
    scanning: {
      title: "Website Scanning",
      description: "Analyzing website structure and content hierarchy",
      icon: Globe,
      progressLabel: "Pages Detected",
      progressValue: detectedPages?.length || 0,
    },
    processing: {
      title: "Content Processing",
      description: "Extracting and organizing relevant information",
      icon: Split,
      progressLabel: "Pages Processed",
      progressValue: `${completedPages}/${scannedPages?.length || 0}`,
    },
    training: {
      title: "AI Model Training",
      description: "Fine-tuning the model with your content",
      icon: Brain,
      progressLabel: "Training Progress",
      progressValue: "In Progress",
    },
    completed: {
      title: "Your Chatbot is Ready!",
      description:
        "Training completed successfully. Your AI assistant is now ready to help.",
      icon: Brain,
      progressLabel: "Training Status",
      progressValue: "Complete",
    },
  };

  const currentPhaseData = isComplete
    ? phases.completed
    : phases[currentPhase] || phases.scanning;

  return (
    <div className="relative rounded-2xl overflow-hidden bg-card border shadow-sm p-6">
      <div className="absolute top-0 left-0 w-full h-1 bg-secondary">
        <div
          className="h-full bg-primary"
          style={{ width: `${isComplete ? 100 : scanProgress}%` }}
        />
      </div>

      <div className="space-y-8">
        <div className="flex items-start gap-6">
          <div
            className={cn(
              "relative p-4 bg-secondary rounded-2xl",
              !isComplete && "animate-pulse"
            )}
          >
            <Bot className="h-8 w-8 text-primary" />
            {!isComplete && (
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-primary border-2 border-background animate-pulse" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <AlertTitle className="text-2xl font-bold mb-2 flex items-center gap-3">
              {currentPhaseData.title}
              {!isComplete && (
                <span className="text-sm font-normal px-3 py-1 rounded-full bg-secondary text-foreground">
                  Phase{" "}
                  {currentPhase === "scanning"
                    ? "1/3"
                    : currentPhase === "processing"
                    ? "2/3"
                    : "3/3"}
                </span>
              )}
            </AlertTitle>
            <AlertDescription className="text-base text-muted-foreground">
              {currentPhaseData.description}
            </AlertDescription>
          </div>
        </div>

        <div className="space-y-2">
          {Object.entries(phases)
            .filter(([key]) => key !== "completed")
            .map(([key, phase]) => (
              <PhaseIndicator
                key={key}
                phase={phase.title}
                icon={phase.icon}
                description={phase.description}
                isActive={currentPhase === key}
                isComplete={
                  isComplete ||
                  (key === "scanning"
                    ? ["processing", "training"].includes(currentPhase)
                    : key === "processing"
                    ? ["training"].includes(currentPhase)
                    : false)
                }
              />
            ))}
        </div>

        <div className="space-y-4 bg-secondary/50 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-sm font-medium text-muted-foreground">
                {currentPhaseData.progressLabel}
              </span>
              <div className="text-2xl font-bold">
                {currentPhaseData.progressValue}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Overall Progress
              </div>
              <div className="text-2xl font-bold text-primary">
                {isComplete ? "100" : scanProgress}%
              </div>
            </div>
          </div>

          {!isComplete && currentPhase !== "completed" && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Processing...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingProgressAlert;
