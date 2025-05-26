type GameActionButtonsProps = {
    onClickFake: () => void | Promise<void>;
    onClickReal: () => void | Promise<void>;
};

export default function GameActionButtons({ onClickFake, onClickReal }: GameActionButtonsProps) {
    return (
        <div className="w-full flex flex-row justify-between">
            <div className="flex flex-row items-center justify-between gap-4">
                <button
                    onClick={onClickFake}
                    className="cursor-pointer w-12 h-12 flex items-center justify-center"
                    aria-label="Fake"
                >
                    <img
                        src="/assets/icons/x-circle.svg"
                        alt="Fake"
                        className={"h-12"}
                    />
                </button>
                <span className="text-red-700 text-2xl">Fake</span>
            </div>

            <div className="flex flex-row items-center justify-between gap-4">
                <span className="text-green-700 text-2xl">Real</span>
                <button
                    onClick={onClickReal}
                    className="cursor-pointer w-12 h-12 flex items-center justify-center"
                    aria-label="Real"
                >
                    <img
                        src="/assets/icons/check-circle.svg"
                        alt="Real"
                        className={"h-12"}
                    />
                </button>
            </div>
        </div>
    );
}
