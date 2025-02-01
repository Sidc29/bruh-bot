import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function StepIndicator({ currentStep, allStepsCompleted, steps }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={cn(
              "flex items-center",
              index < steps.length - 1 && "w-full"
            )}
          >
            <div
              className={cn(
                "flex flex-col items-center relative",
                index < steps.length - 1 && "w-full",
                !allStepsCompleted && currentStep < step.number && "opacity-50"
              )}
            >
              {/* Step Circle */}
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border-2",
                  (currentStep > step.number || allStepsCompleted) &&
                    "border-primary bg-primary text-primary-foreground",
                  currentStep === step.number &&
                    !allStepsCompleted &&
                    "border-primary bg-primary/10 text-primary",
                  currentStep < step.number &&
                    !allStepsCompleted &&
                    "border-muted-foreground/30 bg-muted/10 text-muted-foreground",
                  "text-base font-semibold",
                  currentStep < step.number &&
                    !allStepsCompleted &&
                    "cursor-not-allowed"
                )}
                aria-current={currentStep === step.number ? "step" : undefined}
                aria-disabled={currentStep < step.number && !allStepsCompleted}
              >
                {currentStep > step.number || allStepsCompleted ? (
                  <Check className="h-6 w-6" strokeWidth={2.5} />
                ) : (
                  step.number
                )}
              </div>

              {/* Step Title */}
              <div className="mt-3 text-center min-w-[120px]">
                <span
                  className={cn(
                    "text-sm font-medium block leading-tight",
                    (currentStep > step.number || allStepsCompleted) &&
                      "text-primary",
                    currentStep === step.number &&
                      !allStepsCompleted &&
                      "text-primary",
                    currentStep < step.number &&
                      !allStepsCompleted &&
                      "text-muted-foreground/50"
                  )}
                >
                  {step.title}
                </span>
                {step.subtitle && (
                  <span
                    className={cn(
                      "text-xs mt-0.5 block",
                      currentStep < step.number && !allStepsCompleted
                        ? "text-muted-foreground/30"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.subtitle}
                  </span>
                )}
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="relative w-full">
                <div
                  className={cn(
                    "absolute h-0.5 w-full top-6 -translate-y-1/2",
                    (currentStep > step.number || allStepsCompleted) &&
                      "bg-primary",
                    currentStep === step.number &&
                      !allStepsCompleted &&
                      "bg-primary/30",
                    currentStep < step.number &&
                      !allStepsCompleted &&
                      "bg-muted-foreground/20"
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StepIndicator;
