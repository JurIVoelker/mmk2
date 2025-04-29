"use client";
import { useDraggable } from "@dnd-kit/core";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { CSS } from "@dnd-kit/utilities";

export function DraggableCard( {
    id,
    children,
  } : {
  id: string | number;
  children: React.ReactNode;
}) {
  const { listeners, setNodeRef, transform, active } = useDraggable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const dragThreshold =
    typeof window !== "undefined"
      ? Math.min(window.innerWidth * 0.1, 150)
      : 100;

  const isConfirmed = (transform?.x || 0) > dragThreshold;
  const isDeclined = (transform?.x || 0) < -dragThreshold;

  return (
    <Card
      ref={setNodeRef}
      className={`w-[350] pt-0 h-[70vh] duration-150
        ${!active ? "transition-all" : "transition-colors"}
        ${isConfirmed ? "bg-green-100" : ""} 
        ${isDeclined ? "bg-red-100" : ""}`}
      style={style}
      {...listeners}
    >
      {/*<Skeleton className="h-full" />*/}
        {children}
        {/*<CardHeader>*/}
        {/*{children}*/}
        {/*<CardTitle>Card</CardTitle>*/}
        {/*<CardDescription>Drag me: {transform?.x || 0}</CardDescription>*/}
      {/*</CardHeader>*/}
    </Card>
  );
}
