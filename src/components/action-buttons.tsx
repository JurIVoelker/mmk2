import {ArrowLeft, ArrowRight} from "lucide-react";

export default function ActionButtons() {
    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-4 cursor-pointer">
                <button
                    className="cursor-pointer w-12 h-12 border-4 border-red-700 rounded-full flex items-center justify-center"
                    aria-label="Fake"
                >
                    <ArrowLeft className="text-red-700" size={32}/>
                </button>
                <span className="text-red-700 text-2xl">Fake</span>
            </div>
            <div className="flex items-center gap-4 cursor-pointer">
                <span className="text-green-700 text-2xl">Real</span>
                <button
                    className="cursor-pointer w-12 h-12 border-4 border-green-700 rounded-full flex items-center justify-center"
                    aria-label="Real"
                >
                    <ArrowRight className="text-green-700" size={32}/>
                </button>
            </div>
        </div>
    );
}
