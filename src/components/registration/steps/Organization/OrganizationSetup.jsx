import { useState, useMemo } from "react";
import { useRegistration } from "../../../../contexts/RegistrationProvider";
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
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { origanizationDetailsSchema } from "../../../../schemas/organizationDetails";
import pagesData from "../../../../data/pagesData";
import useDialog from "../../../../hooks/useDialog";
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
  const { state, dispatch } = useRegistration();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  const [scanningState, setScanningState] = useState("not_started");
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedPage, setSelectedPage] = useState(null);
  const [scannedPages, setScannedPages] = useState([]);

  const contentDialog = useDialog();
  const resetDialog = useDialog();

  const completedPages = scannedPages.filter(
    (p) => p.status === "completed"
  ).length;
  const isComplete = completedPages === scannedPages.length;

  const resetTraining = () => {
    setScanningState("not_started");
    setScanProgress(0);
    setScannedPages([]);
    resetDialog.closeDialog();
  };

  const form = useForm({
    resolver: zodResolver(origanizationDetailsSchema),
    defaultValues: {
      companyName: state.organizationData.companyName,
      websiteUrl: state.organizationData.websiteUrl,
      description: state.organizationData.description,
    },
  });

  const formHasChanged = useMemo(() => {
    return (
      form.getValues("companyName") !== state.organizationData.companyName ||
      form.getValues("websiteUrl") !== state.organizationData.websiteUrl ||
      form.getValues("description") !== state.organizationData.description
    );
  }, [form.watch(), state.organizationData]);

  const simulatePageScan = () => {
    const pages = [...pagesData];

    setScannedPages(pages);
    setScanningState("scanning");
    setScanProgress(0);

    const totalSteps = 100;
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= totalSteps) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 50);

    pages.forEach((_, index) => {
      setTimeout(() => {
        setScannedPages((prev) =>
          prev.map((p, i) => (i === index ? { ...p, status: "completed" } : p))
        );
      }, (index + 1) * 2000);
    });

    setTimeout(() => {
      setScanningState("completed");
      clearInterval(interval);
      setScanProgress(100);
    }, 8000);
  };

  const fetchMetaDescription = async () => {
    setIsFetchingMeta(true);
    setTimeout(() => {
      const description =
        "Automatically fetched meta description: Bruhbot - AI-powered chatbot solution for modern businesses.";
      form.setValue("description", description, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setIsFetchingMeta(false);
    }, 1500);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    dispatch({
      type: "UPDATE_ORGANIZATION_DATA",
      payload: data,
    });

    simulatePageScan();
    setIsLoading(false);
  };

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
                <CompanyNameField
                  control={form.control}
                  isLoading={isLoading}
                  scanningState={scanningState}
                />

                <CompanyURLField
                  control={form.control}
                  isLoading={isLoading}
                  fetchMetaDescription={fetchMetaDescription}
                  scanningState={scanningState}
                  isFetchingMeta={isFetchingMeta}
                />

                <CompanyDescriptionField
                  control={form.control}
                  isLoading={isLoading}
                  scanningState={scanningState}
                />
              </div>

              {scanningState !== "not_started" && (
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
                    <TabsContent value="progress" className="space-y-4">
                      <TrainingProgressAlert
                        scanProgress={scanProgress}
                        scanningState={scanningState}
                        isComplete={isComplete}
                        completedPages={completedPages}
                        scannedPages={scannedPages}
                      />
                    </TabsContent>

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
                    disabled={isLoading || scanningState === "scanning"}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </Button>

                  {scanningState !== "not_started" && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={resetDialog.openDialog}
                      disabled={scanningState === "scanning"}
                      className="flex items-center gap-2"
                    >
                      <RotateCcw className="h-4 w-4" /> Reset Training
                    </Button>
                  )}
                </div>

                {scanningState === "not_started" ? (
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
                    disabled={scanningState === "scanning" || formHasChanged}
                    className="flex items-center gap-2"
                  >
                    Continue Setup <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {formHasChanged && scanningState === "completed" && (
                <div className="flex items-center gap-2 p-3 text-sm bg-warning/10 border-warning/20 border rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="text-warning-foreground">
                    Form data has changed. Please reset and retrain to continue.
                  </span>
                </div>
              )}
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
