import Link from "next/link";

export default function InfoButton() {
    return (
        <Link href="/info">
            <button
                className="flex items-center w-auto h-auto cursor-pointer"
                aria-label="Info"
            >
                <img src="/assets/icons/info.svg" alt="Info" className="w-9 h-9"/>
            </button>
        </Link>
    );
}
