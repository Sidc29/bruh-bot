import { ClassValue, clsx } from "clsx";
import { CheckCircle, Clock, Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusConfig = (status: any) => {
  switch (status) {
    case "completed":
      return {
        icon: <CheckCircle className="h-4 w-4 text-green-500" />,
        bgColor: "bg-green-100",
        containerBg: "bg-green-500/5",
        borderColor: "border-green-200",
        hoverBg: "hover:bg-green-500/10",
      };
    case "pending":
      return {
        icon: <Clock className="h-4 w-4 text-yellow-500" />,
        bgColor: "bg-yellow-100",
        containerBg: "bg-yellow-500/5",
        borderColor: "border-yellow-200",
        hoverBg: "hover:bg-yellow-500/10",
      };
    default:
      return {
        icon: <Loader2 className="h-4 w-4 animate-spin text-blue-500" />,
        bgColor: "bg-blue-100",
        containerBg: "bg-blue-500/5",
        borderColor: "border-blue-200",
        hoverBg: "hover:bg-blue-500/10",
      };
  }
};
