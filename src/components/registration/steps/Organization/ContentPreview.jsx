import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { FileText, Terminal, Code } from "lucide-react";

export const ContentPreview = ({ chunks }) => {
  const getChunkType = (chunk) => {
    if (chunk.trim().startsWith("<!--")) return "comment";
    if (chunk.trim().startsWith("<meta")) return "meta";
    return "content";
  };

  const getIcon = (type) => {
    switch (type) {
      case "comment":
        return <Terminal className="h-4 w-4" />;
      case "meta":
        return <Code className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getBadgeVariant = (type) => {
    switch (type) {
      case "comment":
        return "secondary";
      case "meta":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <ScrollArea className="h-[50vh] w-full">
      <div className="space-y-4 p-4">
        {chunks.map((chunk, index) => {
          const type = getChunkType(chunk);

          return (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="border-b bg-muted/50 p-2">
                  <div className="flex items-center gap-2">
                    {getIcon(type)}
                    <Badge variant={getBadgeVariant(type)} className="text-xs">
                      {type.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 overflow-hidden">
                  {type === "content" ? (
                    <div
                      className="prose prose-sm max-w-none dark:prose-invert break-words"
                      dangerouslySetInnerHTML={{ __html: chunk }}
                    />
                  ) : (
                    <pre className="text-xs bg-slate-800 p-2 rounded overflow-x-auto whitespace-pre-wrap break-words">
                      {chunk}
                    </pre>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </ScrollArea>
  );
};
