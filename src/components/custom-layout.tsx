import { cn } from "@/lib/utils";
import React from "react";

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}
const CustomLayout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("h-[100svh]")}>
      <div className={cn("max-w-md mx-auto p-4 h-[100svh]", className)}>
        {children}
      </div>
    </div>
  );
};

export default CustomLayout;
