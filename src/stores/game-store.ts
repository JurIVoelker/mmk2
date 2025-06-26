import {ImageNews, NewsProvider, TextNews, VideoNews} from "@prisma/client";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import {generateRandomLikesAndComments} from "@/lib/generateRandomLikesAndComments";

export const TIME_LIMIT = 20.0;

export type News =
    | {
    type: "text";
    data: TextNews & { provider: NewsProvider };
    timeLimit?: number;
}
    | { type: "image";
    data: ImageNews & { provider: NewsProvider };
    stats?: { likes: string; comments: string };
    timeLimit?: number;  }
    | { type: "video";
    data: VideoNews & { provider: NewsProvider };
    stats?: { likes: string; comments: string };
    timeLimit?: number;
};

type GameStore = {
    unclassifiedNews: News[];
    classifiedAsFakeNews: News[];
    classifiedAsRealNews: News[];

    score: number;
    lifes: number;

    timeLeft: number;
    isPaused: boolean;
    pause: (isPaused: boolean) => void;

    currentIndex: number;
    setCurrentIndex: (index: number) => void;

    newGame: (newsType: string) => Promise<void>;
    classifyAsFakeNews: () => void;
    classifyAsRealNews: () => void;
    failNews: () => void;
};

let intervalId: NodeJS.Timeout | null = null;

const getScore = (timeLeft: number) => {
    if (timeLeft <= 0) {
        return 0;
    }
    return Math.floor(100 * (timeLeft / TIME_LIMIT));
};

export const useGameStore = create<GameStore>()(
    persist(
        (set) => ({
            unclassifiedNews: [] as News[],
            classifiedAsFakeNews: [] as News[],
            classifiedAsRealNews: [] as News[],

            currentIndex: 0,
            score: 0,
            timeLeft: TIME_LIMIT,
            isPaused: false,

            lifes: 3,

            pause: (isPaused: boolean) => {
                set({isPaused});
            },

            setCurrentIndex: (index: number) => {
                set({currentIndex: index});
            },

            newGame: async (newsType: string) => {
                const news = await fetch(`/api/news?newsType=${newsType}`);
                const data = await news.json();
                const firstNewsItem = data[0];

                const enrichedData = data.map((item: News) => {
                    const stats = generateRandomLikesAndComments();

                    let timeLimit = TIME_LIMIT;
                    if (item.type === "text") timeLimit = 25;
                    if (item.type === "image") timeLimit = 10;
                    if (item.type === "video") timeLimit = 30;

                    return {
                        ...item,
                        stats,
                        timeLimit,
                    };
                });

                // Clear any existing interval before starting a new one
                if (intervalId) {
                    clearInterval(intervalId);
                }

                intervalId = setInterval(() => {
                    set((state) => {
                        if (state.timeLeft > 0 && !state.isPaused) {
                            return { timeLeft: Math.max(state.timeLeft - 0.1, 0) };
                        }
                        return state;
                    });
                }, 100);

                set({
                    unclassifiedNews: enrichedData,
                    currentIndex: 0,
                    classifiedAsFakeNews: [],
                    classifiedAsRealNews: [],
                    timeLeft: enrichedData[0]?.timeLimit ?? TIME_LIMIT,
                    score: 0,
                    lifes: 3,
                    isPaused: false,
                });

                console.log("Initial timeLeft:", useGameStore.getState().timeLeft);

                if (firstNewsItem?.type === "image" || firstNewsItem?.type === "text") {
                    // Preload first news item image
                    await new Promise<void>((resolve) => {
                        const img = new Image();
                        img.src = firstNewsItem.data.image;
                        img.onload = () => resolve();
                        img.onerror = () => resolve();
                    });
                }
            },

            classifyAsFakeNews: () => {
                set((state) => {
                    const newsItem = state.unclassifiedNews[state.currentIndex];
                    const isFake = newsItem?.data?.isFake;
                    const lifes = isFake ? state.lifes : state.lifes - 1;
                    return {
                        lifes,
                        score: isFake
                            ? state.score + getScore(state.timeLeft)
                            : state.score,
                        classifiedAsFakeNews: [...state.classifiedAsFakeNews, newsItem],
                        currentIndex: state.currentIndex + 1,
                        timeLeft: state.unclassifiedNews[state.currentIndex + 1]?.timeLimit ?? TIME_LIMIT,
                    };
                });
            },

            classifyAsRealNews: () => {
                set((state) => {
                    const newsItem = state.unclassifiedNews[state.currentIndex];
                    const isFake = newsItem?.data?.isFake;
                    const lifes = isFake ? state.lifes - 1 : state.lifes;
                    return {
                        lifes,
                        score: isFake
                            ? state.score
                            : state.score + getScore(state.timeLeft),
                        classifiedAsRealNews: [...state.classifiedAsRealNews, newsItem],
                        currentIndex: state.currentIndex + 1,
                        timeLeft: state.unclassifiedNews[state.currentIndex + 1]?.timeLimit ?? TIME_LIMIT
                    };
                });
            },

            failNews: () => {
                set((state) => {
                    return {
                        currentIndex: state.currentIndex + 1,
                        timeLeft: state.unclassifiedNews[state.currentIndex + 1]?.timeLimit ?? TIME_LIMIT,
                        lifes: state.lifes - 1,
                    };
                });
            },
        }),
        {
            name: "game-store",
        }
    )
);
