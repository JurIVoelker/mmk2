import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function TextContent({
  src,
  title,
  content,
  date,
  category,
  className,
}: {
  src: string;
  title: string;
  content: string;
  category: string;
  date: Date;
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-col h-full w-full justify-between", className)}
    >
      <div className="pt-4 pb-4 px-6">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div>{format(date, "dd.MM.yyyy")}</div>
      <div>{category}</div>

      <div className="flex-1 pl-0 pr-0 px-6">
        <div className="w-full h-full bg-gray-200 rounded-[10px] overflow-hidden">
          {src ? (
            <img
              src={src}
              alt={"News item image"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>
      </div>
      <div className="pt-4 pb-4 px-6 max-h-[70%] overflow-y-auto">
        <p>{content}</p>
      </div>
    </div>
  );
}
