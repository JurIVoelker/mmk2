"use client";
import { postRequest } from "@/lib/requestUtils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "../ui/card";
import { Loader2, PlusIcon } from "lucide-react";

const AddProvider = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { refresh } = useRouter();

  const onAdd = async () => {
    setIsLoading(true);

    const body = {
      image: "https://s3.voelkerlabs.de/mmk2/providers/.png",
      name: "<New Provider>",
    };

    const { error } = await postRequest("/api/news-provider", body);

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

export default AddProvider;
