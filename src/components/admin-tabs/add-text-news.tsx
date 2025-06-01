"use client";
import { NewsProvider } from "@prisma/client";
import { Card } from "../ui/card";
import { Loader2, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { postRequest } from "@/lib/requestUtils";
import { useState } from "react";

const AddTextNews = ({ providers }: { providers: NewsProvider[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { refresh } = useRouter();
  const onAdd = async () => {
    setIsLoading(true);
    const randomProvider =
      providers[Math.floor(Math.random() * providers.length)];
    const body = {
      type: "text",
      data: {
        content: "",
        explaination: "",
        isFake: false,
        source: "",
        providerId: randomProvider?.id,
        date: new Date().toISOString(),
        title: "",
        category: "",
        image: "",
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
    <Card className="p-4 flex justify-center items-center mt-6" onClick={onAdd}>
      {isLoading ? <Loader2 className="animate-spin" /> : <PlusIcon />}
    </Card>
  );
};

export default AddTextNews;
