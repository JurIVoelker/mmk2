"use client"

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Onboarding = () => {
    return <>
        <Link
            href="/game"
              className={cn(buttonVariants({ variant: "default" }))}
              >
            Starten
        </Link>
    </>
}

export default Onboarding;