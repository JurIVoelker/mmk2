import {Heart} from "lucide-react";

export default function Lifes({lifes}: { lifes: number }) {
    return (
        <div className="flex space-x-2">
            {[...Array(3)].map((_, index) => (
                <div key={index}>
                    <Heart
                        className={`stroke-brown-dark w-9 h-9 ${index < lifes ? "fill-brown" : "fill-transparent"}`}
                    />
                </div>
            ))}
        </div>
    );
}
