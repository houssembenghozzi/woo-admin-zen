import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "info";
  className?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: MetricCardProps) {
  const variantStyles = {
    default: "bg-gradient-card hover:shadow-md",
    success: "bg-gradient-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    info: "bg-info text-info-foreground",
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-lg border-border",
      variantStyles[variant],
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className={cn(
          "text-sm font-medium",
          variant === "default" ? "text-muted-foreground" : "text-current"
        )}>
          {title}
        </CardTitle>
        <Icon className={cn(
          "h-5 w-5",
          variant === "default" ? "text-muted-foreground" : "text-current"
        )} />
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className={cn(
            "text-2xl font-bold",
            variant === "default" ? "text-foreground" : "text-current"
          )}>
            {value}
          </div>
          {subtitle && (
            <p className={cn(
              "text-xs",
              variant === "default" ? "text-muted-foreground" : "text-current opacity-90"
            )}>
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="flex items-center space-x-1">
              <span className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-success" : "text-destructive"
              )}>
                {trend.isPositive ? "+" : ""}{trend.value}
              </span>
              <span className={cn(
                "text-xs",
                variant === "default" ? "text-muted-foreground" : "text-current opacity-75"
              )}>
                vs last month
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}