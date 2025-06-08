import { NewsProvider } from "@prisma/client";

export default function messageProviderHeader({
  provider,
}: {
  provider?: NewsProvider;
}) {
  return (
    <div className={"flex justify-between items-center py-2"}>
      <div className={"flex items-center pl-6 gap-4"}>
        <img
          src={provider?.image}
          alt="Nachrichtenkanal"
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2 className="text-xl font-bold">{provider?.name}</h2>
      </div>
      <img src="/assets/icons/dots.svg" alt="Mehr" className={"pr-6 h-6"} />
    </div>
  );
}
