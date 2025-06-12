"use client";

import { Button } from "@/components/ui/button";
import { postRequest } from "@/lib/requestUtils";
import { ControlEvent } from "@/lib/utils";

const TestPage = () => {
  const handleButtonClick = async (event: ControlEvent) => {
    await postRequest("/api/control", { event });
  };

  return (
    <>
      <Button
        onClick={() => {
          handleButtonClick("left");
        }}
      >
        Left
      </Button>
      <Button
        onClick={() => {
          handleButtonClick("right");
        }}
      >
        Right
      </Button>
    </>
  );
};

export default TestPage;
