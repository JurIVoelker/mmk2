"use client";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
      <>
        <Button asChild className="w-full mx-auto">
          <Link href={"/home"}>Swiper</Link>
        </Button>
      </>

  );
}
