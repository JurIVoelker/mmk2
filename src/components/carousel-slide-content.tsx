import React from "react";

type Props = {
  title: string;
  content: React.ReactNode;
  text: string;
};

export function CarouselSlideContent({ title, content, text }: Props) {
  return (
    <div className="overflow-y-auto h-full">
      <div className="sticky top-0 bg-white z-10 pt-4 pb-4 gap-1 flex items-center justify-center">
        <img src="/assets/icons/info.svg" alt="Info" className="w-6 h-6" />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="flex flex-col gap-4">
        <div className="p-1">
          <div className="border border-black rounded-md h-[65vh]">
            {content}
          </div>
        </div>
        <div className="pt-4 pb-4 text-left select-none">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
