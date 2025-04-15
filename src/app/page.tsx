"use client";
import { DraggableCard } from "@/components/draggable-card";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export default function Home() {
  const onDragEnd = () => {
    console.log("dropped");
  };

  const touchSensor = useSensor(TouchSensor);

  const mouseSensor = useSensor(MouseSensor);

  const sensors = useSensors(touchSensor, mouseSensor);

  return (
    <DndContext onDragEnd={onDragEnd} autoScroll={false} sensors={sensors}>
      <div className="w-full h-screen flex items-center justify-center overflow-hidden">
        <DraggableCard />
      </div>
    </DndContext>
  );
}
