import { useState, useMemo } from "react";
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
      form.setValue("description", "Automatically fetched description...", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setIsFetchingMeta(false);
    }, 1500);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    dispatch({ type: "UPDATE_ORGANIZATION_DATA", payload: data });
    setIsLoading(false);
    simulatePageScan();
  };

  return {
    state,
    dispatch,
    form,
    isLoading,
    isFetchingMeta,
    scanningState,
    scanProgress,
    scannedPages,
    selectedPage,
    contentDialog,
    resetDialog,
    isComplete,
    completedPages,
    formHasChanged,
    fetchMetaDescription,
    onSubmit,
    resetTraining,
    setSelectedPage,
  };
};
