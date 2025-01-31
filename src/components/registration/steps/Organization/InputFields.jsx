import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Globe, Loader2, FileSearch, FileText } from "lucide-react";

export const CompanyNameField = ({ control, isLoading, currentPhase }) => (
  <FormField
    control={control}
    name="companyName"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Company Name
        </FormLabel>
        <FormControl>
          <Input
            placeholder="Enter your company name"
            {...field}
            disabled={isLoading || currentPhase === "scanning"}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const CompanyURLField = ({
  control,
  isLoading,
  currentPhase,
  fetchMetaDescription,
  isFetchingMeta,
}) => (
  <FormField
    control={control}
    name="websiteUrl"
    render={({ field }) => (
      <FormItem className="w-full">
        <FormLabel className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          Website URL
        </FormLabel>
        <FormControl>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Input
              placeholder="https://your-company.com"
              {...field}
              disabled={isLoading || currentPhase === "scanning"}
              className="w-full"
            />
            <Button
              type="button"
              onClick={fetchMetaDescription}
              disabled={
                isFetchingMeta || !field.value || currentPhase === "scanning"
              }
              className="whitespace-nowrap"
            >
              {isFetchingMeta ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Fetch Metadata
                </>
              ) : (
                <>
                  <FileSearch className="h-4 w-4 mr-1" />
                  Fetch Metadata
                </>
              )}
            </Button>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const CompanyDescriptionField = ({
  control,
  isLoading,
  currentPhase,
}) => (
  <FormField
    control={control}
    name="description"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Company Description
        </FormLabel>
        <FormControl>
          <Textarea
            placeholder="Enter company description or fetch from website"
            className="resize-none"
            {...field}
            disabled={isLoading || currentPhase === "scanning"}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
