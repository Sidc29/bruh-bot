import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { origanizationDetailsSchema } from "../schemas/organizationDetails";
import { useRegistration } from "../contexts/RegistrationProvider";
import pagesData from "../data/pagesData";
import useDialog from "./useDialog";

export const useOrganizationSetup = () => {
  const { state, dispatch } = useRegistration();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedPage, setSelectedPage] = useState(null);
  const [scannedPages, setScannedPages] = useState([]);
  const [currentPhase, setCurrentPhase] = useState("not_started"); // not_started, scanning, processing, training, completed
  const [detectedPages, setDetectedPages] = useState([]);

  const contentDialog = useDialog();
  const resetDialog = useDialog();

  const completedPages = scannedPages.filter(
    (p) => p.status === "completed"
  ).length;
  const isComplete = currentPhase === "completed";

  const resetTraining = () => {
    setScanProgress(0);
    setScannedPages([]);
    setDetectedPages([]);
    setCurrentPhase("not_started");
    resetDialog.closeDialog();
  };

  // Phase 1: Website Scanning
  const simulateWebsiteScan = () => {
    setCurrentPhase("scanning");
    setScanProgress(0);

    const pages = [...pagesData];
    let progress = 0;

    const interval = setInterval(() => {
      progress += 5;
      setScanProgress(Math.min(progress, 33));
      const pagesDetected = Math.floor((progress / 100) * pages.length);
      setDetectedPages(pages.slice(0, pagesDetected));

      if (progress >= 100) {
        clearInterval(interval);
        setDetectedPages(pages);
        setTimeout(() => simulateContentProcessing(pages), 500);
      }
    }, 200);
  };

  // Phase 2: Content Processing
  const simulateContentProcessing = (pages) => {
    setCurrentPhase("processing");
    setScannedPages(pages.map((page) => ({ ...page, status: "pending" })));
    setScanProgress(33);

    let processed = 0;
    const processInterval = setInterval(() => {
      if (processed < pages.length) {
        setScannedPages((prev) =>
          prev.map((p, i) =>
            i === processed ? { ...p, status: "completed" } : p
          )
        );
        processed++;
        setScanProgress(33 + Math.floor((processed / pages.length) * 33));
      } else {
        clearInterval(processInterval);
        setTimeout(() => simulateAITraining(), 500);
      }
    }, 2000);
  };

  // Phase 3: AI Model Training
  const simulateAITraining = () => {
    setCurrentPhase("training");
    setScanProgress(66);

    const trainingSteps = [
      "Initializing model parameters",
      "Training on processed content",
      "Fine-tuning responses",
      "Optimizing performance",
      "Validating model accuracy",
    ];

    let step = 0;
    const trainingInterval = setInterval(() => {
      if (step < trainingSteps.length) {
        step++;
        setScanProgress(66 + Math.floor((step / trainingSteps.length) * 34));
      } else {
        clearInterval(trainingInterval);
        setCurrentPhase("completed");
        setScanProgress(100);
      }
    }, 1500);
  };

  const fetchMetaDescription = async () => {
    setIsFetchingMeta(true);
    setTimeout(() => {
      form.setValue("description", "Automatically fetched description...", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setIsFetchingMeta(false);
    }, 1500);
  };

  const form = useForm({
    resolver: zodResolver(origanizationDetailsSchema),
    defaultValues: {
      companyName: state.organizationData.companyName,
      websiteUrl: state.organizationData.websiteUrl,
      description: state.organizationData.description,
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    dispatch({ type: "UPDATE_ORGANIZATION_DATA", payload: data });
    setIsLoading(false);
    simulateWebsiteScan();
  };

  return {
    state,
    dispatch,
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
  };
};
