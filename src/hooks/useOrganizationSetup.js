import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { origanizationDetailsSchema } from "../schemas/organizationDetails";
import { useRegistration } from "../contexts/RegistrationProvider";
import pagesData from "../data/pagesData";
import useDialog from "./useDialog";
import { useToast } from "../hooks/use-toast";

const API_KEY = import.meta.env.VITE_LINK_PREVIEW_API_KEY;

export function useOrganizationSetup() {
  const { state, dispatch } = useRegistration();
  const { trainingState } = state.organizationData;

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);

  const contentDialog = useDialog();
  const resetDialog = useDialog();

  const completedPages = trainingState.scannedPages.filter(
    (p) => p.status === "completed"
  ).length;

  const resetTraining = () => {
    dispatch({
      type: "RESET_TRAINING",
    });
    resetDialog.closeDialog();
  };

  // Phase 1: Website Scanning
  const simulateWebsiteScan = () => {
    dispatch({
      type: "UPDATE_TRAINING_STATE",
      payload: {
        currentPhase: "scanning",
        scanProgress: 0,
      },
    });

    const pages = [...pagesData];
    let progress = 0;

    const interval = setInterval(() => {
      progress += 5;
      dispatch({
        type: "UPDATE_TRAINING_STATE",
        payload: {
          scanProgress: Math.min(progress, 33),
          detectedPages: pages.slice(
            0,
            Math.floor((progress / 100) * pages.length)
          ),
        },
      });

      if (progress >= 100) {
        clearInterval(interval);
        dispatch({
          type: "UPDATE_TRAINING_STATE",
          payload: { detectedPages: pages },
        });
        setTimeout(() => simulateContentProcessing(pages), 500);
      }
    }, 200);
  };

  // Phase 2: Content Processing
  const simulateContentProcessing = (pages) => {
    const initialPages = pages.map((page) => ({ ...page, status: "pending" }));

    dispatch({
      type: "UPDATE_TRAINING_STATE",
      payload: {
        currentPhase: "processing",
        scannedPages: initialPages,
        scanProgress: 33,
      },
    });

    let processed = 0;
    const processInterval = setInterval(() => {
      if (processed < pages.length) {
        const updatedPages = [...initialPages];
        updatedPages[processed].status = "completed";

        dispatch({
          type: "UPDATE_TRAINING_STATE",
          payload: {
            scannedPages: updatedPages,
            scanProgress: 33 + (processed / pages.length) * 33,
          },
        });
        processed++;
      } else {
        clearInterval(processInterval);
        setTimeout(() => simulateAITraining(), 500);
      }
    }, 2000);
  };

  // Phase 3: AI Model Training
  const simulateAITraining = () => {
    dispatch({
      type: "UPDATE_TRAINING_STATE",
      payload: {
        currentPhase: "training",
        scanProgress: 66,
      },
    });

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
        dispatch({
          type: "UPDATE_TRAINING_STATE",
          payload: {
            scanProgress: 66 + Math.floor((step / trainingSteps.length) * 34),
          },
        });
      } else {
        clearInterval(trainingInterval);
        dispatch({
          type: "UPDATE_TRAINING_STATE",
          payload: {
            currentPhase: "completed",
            scanProgress: 100,
          },
        });
      }
    }, 1500);
  };

  const fetchMetaDescription = async () => {
    const websiteUrl = form.getValues("websiteUrl");
    if (!websiteUrl) return;

    setIsFetchingMeta(true);

    try {
      const response = await fetch(
        `https://api.linkpreview.net/?key=${API_KEY}&q=${encodeURIComponent(
          websiteUrl
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch metadata");
      }

      const data = await response.json();

      if (data.description) {
        form.setValue("description", data.description, {
          shouldValidate: true,
          shouldDirty: true,
        });
      } else {
        toast({
          title: "No description found",
          description: "The website doesn't have a meta description available.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      // TODO: Show error toast or message
      toast({
        title: "Error fetching description",
        description: "Unable to fetch website description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsFetchingMeta(false);
    }
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
    form,
    isLoading,
    isFetchingMeta,
    scanProgress: trainingState.scanProgress,
    scannedPages: trainingState.scannedPages,
    selectedPage,
    contentDialog,
    resetDialog,
    isComplete: trainingState.currentPhase === "completed",
    completedPages,
    currentPhase: trainingState.currentPhase,
    detectedPages: trainingState.detectedPages,
    fetchMetaDescription,
    onSubmit,
    resetTraining,
    setSelectedPage,
    dispatch,
  };
}
