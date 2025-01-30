import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";
import { cn, getStatusConfig } from "../../../../lib/utils";

export const ScannedPagesList = ({
  scannedPages,
  setSelectedPage,
  contentDialog,
}) => (
  <ScrollArea className="h-[300px] rounded-lg border p-4">
    <div className="grid gap-3">
      {scannedPages.map((page) => {
        const statusConfig = getStatusConfig(page.status);

        return (
          <Card
            key={page.url}
            className={cn(
              "transition-all",
              statusConfig.borderColor,
              statusConfig.containerBg,
              statusConfig.hoverBg,
              "cursor-pointer"
            )}
            onClick={() => {
              setSelectedPage(page);
              contentDialog.openDialog();
            }}
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={cn(
                      "p-1.5 sm:p-2 rounded-full flex-shrink-0",
                      statusConfig.bgColor
                    )}
                  >
                    {statusConfig.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate text-sm sm:text-base">
                      {page.url}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                      {page.chunks.length} content blocks analyzed
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  </ScrollArea>
);
