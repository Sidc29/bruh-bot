import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "../../hooks/useIsMobile";

const CommonDialog = ({
  open,
  onOpenChange,
  title,
  content,
  footer,
  scrollableContent,
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4">
            {scrollableContent ? (
              <ScrollArea className="max-h-[calc(100vh-8rem)]">
                {content}
              </ScrollArea>
            ) : (
              content
            )}
          </div>
          {footer && <DrawerFooter className="pt-2">{footer}</DrawerFooter>}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {scrollableContent ? (
          <ScrollArea className="max-h-[60vh]">{content}</ScrollArea>
        ) : (
          content
        )}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default CommonDialog;
