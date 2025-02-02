import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, FileSearch } from "lucide-react";
import { cn, getStatusConfig } from "../../../../lib/utils";

export const ScannedPagesList = ({
  scannedPages,
  setSelectedPage,
  contentDialog,
}) => {
  if (!scannedPages?.length) {
    return (
      <Card className="h-[300px] flex items-center justify-center bg-secondary/30">
        <div className="text-center p-6">
          <div className="relative mx-auto w-fit mb-4">
            <div className="absolute inset-0 bg-secondary rounded-full animate-ping"></div>
            <FileSearch className="h-12 w-12 text-muted-foreground relative" />
          </div>
          <h3 className="font-semibold text-lg mb-2">No pages scanned yet</h3>
          <p className="text-sm text-muted-foreground max-w-[250px]">
            Scanned pages will appear here as they're processed
          </p>
        </div>
      </Card>
    );
  }

  return (
    <ScrollArea className="h-[300px] rounded-xl border bg-card shadow-sm">
      <div className="p-4 grid gap-3">
        {scannedPages.map((page) => {
          const statusConfig = getStatusConfig(page.status);

          return (
            <div
              key={page.url}
              className="group relative"
              onClick={() => {
                setSelectedPage(page);
                contentDialog.openDialog();
              }}
            >
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-transparent group-hover:bg-primary rounded-full" />
              <Card
                className={cn(
                  "border hover:border-primary",
                  "hover:shadow-sm cursor-pointer",
                  "bg-background hover:bg-secondary/40"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={cn("p-2 rounded-xl", statusConfig.bgColor)}>
                      {statusConfig.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium truncate">{page.url}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{page.chunks.length} content blocks</span>
                        <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5" />
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default ScannedPagesList;
