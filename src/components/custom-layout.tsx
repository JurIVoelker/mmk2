import { cn } from "@/lib/utils";
import React from "react";

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}
const CustomLayout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("h-full overflow-x-hidden")}>
      <div className={cn("max-w-md mx-auto p-4 h-full", className)}>
        {children}
      </div>
    </div>
  );
};

export default CustomLayout;
