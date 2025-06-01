"use client";
import { Card } from "../ui/card";
import { Loader2, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { postRequest } from "@/lib/requestUtils";
import { useState } from "react";

const AddVideoNews = () => {
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
        video: "",
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
    <Card className="p-4 flex justify-center items-center mt-6" onClick={onAdd}>
      {isLoading ? <Loader2 className="animate-spin" /> : <PlusIcon />}
    </Card>
  );
};

export default AddVideoNews;
