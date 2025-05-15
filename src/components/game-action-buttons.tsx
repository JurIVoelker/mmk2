import { ArrowLeft, ArrowRight } from "lucide-react";

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
                    className="cursor-pointer w-12 h-12 border-4 border-red-700 rounded-full flex items-center justify-center"
                    aria-label="Fake"
                >
                    <ArrowLeft className="text-red-700" size={32} />
                </button>
                <span className="text-red-700 text-2xl">Fake</span>
            </div>

            <div className="flex flex-row items-center justify-between gap-4">
                <span className="text-green-700 text-2xl">Real</span>
                <button
                    onClick={onClickReal}
                    className="cursor-pointer w-12 h-12 border-4 border-green-700 rounded-full flex items-center justify-center"
                    aria-label="Real"
                >
                    <ArrowRight className="text-green-700" size={32} />
                </button>
            </div>
        </div>
    );
}
