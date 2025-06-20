"use client";

import CustomLayout from "@/components/custom-layout";
import { Button } from "@/components/ui/button";
import { postRequest } from "@/lib/requestUtils";
import { ControlEvent } from "@/lib/utils";

const TestPage = () => {
  const handleButtonClick = async (event: ControlEvent) => {
    await postRequest("/api/control", { event });
  };

  return (
    <CustomLayout className="flex items-center justify-center h-screen gap-4">
      <Button
        onClick={() => {
          handleButtonClick("left");
        }}
        className="size-32"
      >
        Left
      </Button>
      <Button
        onClick={() => {
          handleButtonClick("right");
        }}
        className="size-32"
      >
        Right
      </Button>
    </CustomLayout>
  );
};

export default TestPage;
