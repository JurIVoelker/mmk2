"use client";

import InfoButton from "@/components/info-button";
import Lifes from "@/components/lifes";
import TimeBar from "@/components/time-bar";
import {DraggableCard} from "@/components/draggable-card";
import {
    DndContext,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import ActionButtons from "@/components/action-buttons";
import {TextContent} from "@/components/card-layouts/text-content";
import {ImageContent} from "@/components/card-layouts/image-content";
import {VideoContent} from "@/components/card-layouts/video-content";

const layout = "text";
const contentMap = {
    text: <TextContent/>,
    image: <ImageContent/>,
    video: <VideoContent/>,
}

const Gamepage = () => {
    const onDragEnd = () => {
        console.log("dropped");
    };

    const touchSensor = useSensor(TouchSensor);
    const mouseSensor = useSensor(MouseSensor);
    const sensors = useSensors(touchSensor, mouseSensor);

    const elapsed = 10;
    const total = 60;
    const cardId = 1234;

    return (
        <div className="w-full h-full max-h-[100vh] flex items-center justify-center overflow-hidden">
            <div className="absolute">
                <div className="flex pb-2">
                    <div className="flex-1 flex items-center justify-center z-20">
                        <span className="text-2xl">#{cardId}</span>
                    </div>
                    <div className="flex items-center justify-end z-20">
                        <InfoButton/>
                    </div>
                </div>
                <div className="flex z-20 relative justify-between items-center w-full">
                    <Lifes lifes={2}/>
                    <TimeBar elapsed={elapsed} total={total}/>
                </div>
                <div className="w-[350px] pt-0 h-[75vh]"></div>
                <div className="relative z-20">
                    <ActionButtons/>
                </div>
            </div>
            <div className="relative w-full h-full overflow-hidden">
                <DndContext onDragEnd={onDragEnd} sensors={sensors}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <DraggableCard id={cardId}>
                            {contentMap[layout]}
                        </DraggableCard>
                    </div>
                </DndContext>
            </div>
        </div>
    );
};

export default Gamepage;