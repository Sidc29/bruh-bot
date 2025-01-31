import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  FileText,
  Loader2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  TrendingUp,
} from "lucide-react";
import { useOrganizationSetup } from "../../../../hooks/useOrganizationSetup";
import CommonDialog from "../../../shared/CommonDialog";
import {
  CompanyNameField,
  CompanyURLField,
  CompanyDescriptionField,
} from "./InputFields";
import { ContentPreview } from "./ContentPreview";
import TrainingProgressAlert from "./TrainingProgressAlert";
import { ScannedPagesList } from "./ScannedPagesList";

export const OrganizationSetup = () => {
  const {
    form,
    isLoading,
    isFetchingMeta,
    scanProgress,
    scannedPages,
    selectedPage,
    contentDialog,
    resetDialog,
    isComplete,
    completedPages,
    currentPhase,
    detectedPages,
    fetchMetaDescription,
    onSubmit,
    resetTraining,
    setSelectedPage,
    dispatch,
  } = useOrganizationSetup();
  return (
    <>
      <Card className="shadow-lg">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Setup Your Organization
          </CardTitle>
          <CardDescription className="text-base">
            Tell us about your business to customize your chatbot
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                {/* Company Name Field */}
                <CompanyNameField
                  control={form.control}
                  isLoading={isLoading}
                  currentPhase={currentPhase !== "not_started"}
                />

                {/* Company URL Field */}
                <CompanyURLField
                  control={form.control}
                  isLoading={isLoading}
                  fetchMetaDescription={fetchMetaDescription}
                  currentPhase={currentPhase !== "not_started"}
                  isFetchingMeta={isFetchingMeta}
                />

                {/* Company Description Field */}
                <CompanyDescriptionField
                  control={form.control}
                  isLoading={isLoading}
                  currentPhase={currentPhase !== "not_started"}
                />
              </div>

              {currentPhase !== "not_started" && (
                <div className="space-y-4 md:space-y-6">
                  <Tabs defaultValue="progress" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="progress">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Training Progress
                      </TabsTrigger>
                      <TabsTrigger value="pages">
                        <FileText className="w-4 h-4 mr-2" />
                        Scanned Pages
                      </TabsTrigger>
                    </TabsList>

                    {/* Training Progress */}
                    <TabsContent value="progress" className="space-y-4">
                      <TrainingProgressAlert
                        scanProgress={scanProgress}
                        isComplete={isComplete}
                        completedPages={completedPages}
                        scannedPages={scannedPages}
                        currentPhase={currentPhase}
                        detectedPages={detectedPages}
                      />
                    </TabsContent>

                    {/* Scanned Pages */}
                    <TabsContent value="pages">
                      <ScannedPagesList
                        scannedPages={scannedPages}
                        setSelectedPage={setSelectedPage}
                        contentDialog={contentDialog}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-2">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => dispatch({ type: "SET_STEP", payload: 1 })}
                    disabled={isLoading || currentPhase === "scanning"}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </Button>

                  {currentPhase !== "not_started" && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={resetDialog.openDialog}
                      disabled={["scanning", "processing", "training"].includes(
                        currentPhase
                      )}
                      className="flex items-center gap-2"
                    >
                      <RotateCcw className="h-4 w-4" /> Reset Training
                    </Button>
                  )}
                </div>

                {currentPhase === "not_started" ? (
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Starting...
                      </>
                    ) : (
                      <>
                        Start Training <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => dispatch({ type: "SET_STEP", payload: 3 })}
                    disabled={currentPhase !== "completed"}
                    className="flex items-center gap-2"
                  >
                    Continue Setup <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Content Dialog */}
      <CommonDialog
        open={contentDialog.isOpen}
        onOpenChange={contentDialog.setIsOpen}
        title={
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <span className="font-medium">
              Scanned data from{" "}
              <Badge variant="secondary" className="text-sm">
                {selectedPage?.url}
              </Badge>
            </span>
          </div>
        }
        content={<ContentPreview chunks={selectedPage?.chunks || []} />}
        scrollableContent
      />

      {/* Reset Dialog */}
      <CommonDialog
        open={resetDialog.isOpen}
        onOpenChange={resetDialog.setIsOpen}
        title="Reset Training?"
        content={
          <p className="text-muted-foreground">
            This will reset all training progress. You'll need to start the
            training process again.
          </p>
        }
        footer={
          <>
            <Button variant="outline" onClick={resetDialog.closeDialog}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={resetTraining}>
              Reset Training
            </Button>
          </>
        }
      />
    </>
  );
};

export default OrganizationSetup;
