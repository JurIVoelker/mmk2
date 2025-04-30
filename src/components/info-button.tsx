import Link from "next/link";
import { Info } from "lucide-react";

export default function InfoButton() {
    return (
        <Link href="/info">
            <button
                className="flex items-center w-auto h-auto cursor-pointer"
                aria-label="Info"
            >
                <Info size={36} />
            </button>
        </Link>
    );
}
