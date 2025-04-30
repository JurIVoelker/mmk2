import { cn } from "@/lib/utils";
import { Ranking as RankingType } from "@prisma/client";

interface RankingProps extends React.HTMLAttributes<HTMLDivElement> {
  ranking: RankingType;
  position: number;
}

const Ranking: React.FC<RankingProps> = ({
  className,
  ranking,
  position,
  ...props
}) => {
  const medalColor =
    position === 1
      ? "bg-amber-200"
      : position === 2
      ? "bg-gray-300"
      : position === 3
      ? "bg-[#c19c76]"
      : "bg-slate-200";

  return (
    <div
      className={cn(
        "bg-slate-100 p-3 rounded-md flex items-center gap-4 justify-between",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div
          className={`size-7 ${medalColor} rounded-full shrink-0 flex justify-center items-center font-medium`}
        >
          {position}
        </div>
        {ranking.name}
      </div>
      <div className="space-x-2">
        <span className="text-lg font-medium">{ranking.score}</span>
        <span>Punkte</span>
      </div>
    </div>
  );
};

export default Ranking;
