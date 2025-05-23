export function ImageContent({ src, alt }: { src: string; alt?: string }) {
  return (
    <div className="flex flex-col rounded-xl border shadow-sm">
      <div className="flex flex-col h-full w-full justify-between">
        <div className="flex-1 pl-0 pr-0 px-6">
          <div className="w-full h-full bg-gray-200 rounded-[10px] overflow-hidden">
            {src ? (
              <img src={src} alt={alt} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 min-h-[300]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
