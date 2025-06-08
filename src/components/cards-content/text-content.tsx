import { cn } from "@/lib/utils";
import { format } from "date-fns";
import MessageProviderHeader from "@/components/message-provider-header";
import { NewsProvider } from "@prisma/client";

export function TextContent({
  src,
  provider,
  title,
  content,
  date,
  category,
  className,
}: {
  provider?: NewsProvider;
  src: string;
  title: string;
  content: string;
  category: string;
  date: Date;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col w-full bg-white rounded-xl h-full",
        className
      )}
    >
      <MessageProviderHeader provider={provider} />
      <div className="pl-0 pr-0 px-6 h-[30%]">
        <div className="w-full h-full overflow-hidden">
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
      <div className={"py-4 px-3 flex flex-col gap-2 items-start"}>
        {/*TODO: font bg*/}
        <div className={"py-1 px-2 bg-red-500 w-fit rounded-md text-white"}>
          {category}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        <div className={"text-gray-500"}>
          <p>{format(date, "dd.MM.yyyy")}</p>
        </div>
        <div className="overflow-y-auto">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}
