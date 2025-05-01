import {Heart} from "lucide-react";

export default function Lifes({lifes}: { lifes: number }) {
    return (
        <div className="flex space-x-2">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="w-6 h-6">
                    <Heart
                        className={`stroke-black ${index < lifes ? "fill-red-500" : "fill-transparent"}`}
                    />
                </div>
            ))}
        </div>
    );
}
