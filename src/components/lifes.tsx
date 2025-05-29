import { Heart } from "lucide-react";

export default function Lifes({
  lifes,
  className,
}: {
  lifes: number;
  className?: string;
}) {
  return (
    <div className={`flex space-x-2 ${className}`}>
      {[...Array(3)].map((_, index) => (
        <div key={index}>
          <Heart
            className={`stroke-brown-dark w-9 h-9 ${
              index < lifes ? "fill-brown" : "fill-transparent"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
