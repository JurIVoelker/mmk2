export function VideoContent({ src }: { src?: string }) {
  return (
    <div className="flex flex-col rounded-xl border shadow-sm h-[50vh]">
      <div className="flex flex-col h-full w-full justify-between">
        <div className="flex-1 pl-0 pr-0 px-6">
          <div className="w-full h-full bg-gray-200 rounded-[10px] overflow-hidden">
            <video
              src={src}
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
