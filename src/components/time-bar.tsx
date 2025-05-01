export default function TimeBar({
        elapsed,
        total,
    }: {
    elapsed: number;
    total: number;
}) {
    const percent = Math.min(100, Math.max(0, (elapsed / total) * 100));

    return (
        <div className="w-32 h-4 flex rounded-full overflow-hidden">
            <div
                className="h-full bg-red-700"
                style={{width: `${100 - percent}%`}}
            />
            <div
                className="h-full bg-gray-200"
                style={{width: `${percent}%`}}
            />
        </div>
    );
}
