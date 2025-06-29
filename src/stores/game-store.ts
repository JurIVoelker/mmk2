import {ImageNews, NewsProvider, TextNews, VideoNews} from "@prisma/client";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import {generateRandomLikesAndComments} from "@/lib/generateRandomLikesAndComments";

export const timeLimitDefault = 20.0;
export const timeLimitText = 25;
export const timeLimitImage = 10;
export const videoTimeConfig = {
    MIN: 10,
    MAX: 30,
    BUFFER: 5,
} as const;

export type News =
    | {
    type: "text";
    data: TextNews & { provider: NewsProvider };
    timeLimit?: number;
}
    | {
    type: "image";
    data: ImageNews & { provider: NewsProvider };
    stats?: { likes: string; comments: string };
    timeLimit?: number;
}
    | {
    type: "video";
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
    return Math.floor(100 * (timeLeft / timeLimitDefault));
};

async function getVideoDuration(url: string): Promise<number> {
    return new Promise((resolve) => {
        const video = document.createElement("video");
        video.src = url;
        video.addEventListener("loadedmetadata", () => {
            resolve(video.duration);
        });

        video.addEventListener("error", () => {
            console.error(`Failed to load video from URL: ${url}`);
            resolve(0);
        });
    });
};

export const useGameStore = create<GameStore>()(
    persist(
        (set) => ({
            unclassifiedNews: [] as News[],
            classifiedAsFakeNews: [] as News[],
            classifiedAsRealNews: [] as News[],

            currentIndex: 0,
            score: 0,
            timeLeft: timeLimitDefault,
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

                const enrichedData = await Promise.all(
                    data.map(async (item: News) => {
                        const stats = generateRandomLikesAndComments();
                        let timeLimit = timeLimitDefault;
                        if (item.type === "text") timeLimit = timeLimitText;
                        if (item.type === "image") timeLimit = timeLimitImage;
                        if (item.type === "video") {
                            const duration = await getVideoDuration(item.data.video);
                            timeLimit = Math.min(Math.max(duration, videoTimeConfig.MIN), videoTimeConfig.MAX) + videoTimeConfig.BUFFER;
                        }

                        return {...item, stats, timeLimit};
                    })
                );


                // Clear any existing interval before starting a new one
                if (intervalId) {
                    clearInterval(intervalId);
                }

                intervalId = setInterval(() => {
                    set((state) => {
                        if (state.timeLeft > 0 && !state.isPaused) {
                            return {timeLeft: Math.max(state.timeLeft - 0.1, 0)};
                        }
                        return state;
                    });
                }, 100);

                set({
                    unclassifiedNews: enrichedData,
                    currentIndex: 0,
                    classifiedAsFakeNews: [],
                    classifiedAsRealNews: [],
                    timeLeft: enrichedData[0]?.timeLimit ?? timeLimitDefault,
                    score: 0,
                    lifes: 3,
                    isPaused: false,
                });

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
                        timeLeft: state.unclassifiedNews[state.currentIndex + 1]?.timeLimit ?? timeLimitDefault,
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
                        timeLeft: state.unclassifiedNews[state.currentIndex + 1]?.timeLimit ?? timeLimitDefault
                    };
                });
            },

            failNews: () => {
                set((state) => {
                    return {
                        currentIndex: state.currentIndex + 1,
                        timeLeft: state.unclassifiedNews[state.currentIndex + 1]?.timeLimit ?? timeLimitDefault,
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
