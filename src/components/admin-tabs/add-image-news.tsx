"use client";
import { Card } from "../ui/card";
import { Loader2, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { postRequest } from "@/lib/requestUtils";
import { useState } from "react";
import { NewsProvider } from "@prisma/client";

const AddImageNews = ({ providers }: { providers: NewsProvider[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { refresh } = useRouter();
  const onAdd = async () => {
    setIsLoading(true);

    const randomProvider =
      providers[Math.floor(Math.random() * providers.length)];
    const body = {
      type: "image",
      data: {
        image: "https://s3.voelkerlabs.de/mmk2/imageNews/.png",
        isFake: false,
        explaination: "",
        source: "",
        providerId: randomProvider?.id,
      },
    };

    const { error } = await postRequest("/api/news", body);

    if (error) {
      console.error("Failed to create text news:", error);
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

export default AddImageNews;
