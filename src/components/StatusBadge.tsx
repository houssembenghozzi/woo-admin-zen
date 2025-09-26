import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "success" | "warning" | "destructive" | "info";
  className?: string;
}

export function StatusBadge({ status, variant = "default", className }: StatusBadgeProps) {
  const getVariantFromStatus = (status: string) => {
    const statusLower = status.toLowerCase();
    
    if (statusLower.includes("delivered") || statusLower.includes("completed") || statusLower.includes("livré")) {
      return "success";
    }
    if (statusLower.includes("pending") || statusLower.includes("processing") || statusLower.includes("attente")) {
      return "warning";
    }
    if (statusLower.includes("cancelled") || statusLower.includes("failed") || statusLower.includes("retourné")) {
      return "destructive";
    }
    if (statusLower.includes("shipped") || statusLower.includes("transit")) {
      return "info";
    }
    
    return variant;
  };

  const badgeVariant = getVariantFromStatus(status);

  const variantStyles = {
    default: "bg-secondary text-secondary-foreground",
    success: "bg-success-light text-success border-success/20",
    warning: "bg-warning-light text-warning border-warning/20", 
    destructive: "bg-destructive-light text-destructive border-destructive/20",
    info: "bg-info-light text-info border-info/20",
  };

  return (
    <Badge 
      className={cn(
        "px-2 py-1 text-xs font-medium border",
        variantStyles[badgeVariant],
        className
      )}
    >
      {status}
    </Badge>
  );
}