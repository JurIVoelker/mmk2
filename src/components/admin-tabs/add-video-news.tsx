"use client";
import { Card } from "../ui/card";
import { Loader2, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { postRequest } from "@/lib/requestUtils";
import { useState } from "react";
import { NewsProvider } from "@prisma/client";

const AddVideoNews = ({ providers }: { providers: NewsProvider[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { refresh } = useRouter();
  const onAdd = async () => {
    setIsLoading(true);
    const body = {
      type: "video",
      data: {
        explaination: "",
        isFake: false,
        source: "",
        video: "https://s3.voelkerlabs.de/mmk2/videoNews/.png",
        providerId: providers[Math.floor(Math.random() * providers.length)]?.id, // Randomly select a provider
      },
    };

    const { error, data } = await postRequest("/api/news", body);

    console.log(data);

    if (error) {
      console.error("Failed to create video news:", error);
      return;
    }

    refresh();
    setIsLoading(false);
  };

  return (
    <Card
      className="p-4 flex justify-center items-center mt-6 cursor-pointer"
      onClick={onAdd}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : <PlusIcon />}
    </Card>
  );
};

export default AddVideoNews;
