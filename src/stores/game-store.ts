import { ImageNews, NewsProvider, TextNews, VideoNews } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateRandomLikesAndComments } from "@/lib/generateRandomLikesAndComments";

export const TIME_LIMIT = 20.0;

export type News =
  | {
      type: "text";
      data: TextNews & { provider: NewsProvider };
    }
  | {
      type: "image";
      data: ImageNews & { provider: NewsProvider };
      stats?: { likes: string; comments: string };
    }
  | {
      type: "video";
      data: VideoNews & { provider: NewsProvider };
      stats?: { likes: string; comments: string };
    };

type GameStore = {
  unclassifiedNews: News[];
  classifiedAsFakeNews: News[];
  classifiedAsRealNews: News[];

  score: number;
  lifes: number;
  isControlled: boolean;
  setIsControlled: (isControlled: boolean) => void;

  timeLeft: number;
  isPaused: boolean;
  pause: (isPaused: boolean) => void;

  currentIndex: number;

  newGame: () => Promise<void>;
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

      isControlled: false,
      currentIndex: 0,
      score: 0,
      timeLeft: TIME_LIMIT,
      isPaused: false,

      lifes: 3,

      pause: (isPaused: boolean) => {
        set({ isPaused });
      },

      setIsControlled: (isControlled: boolean) => {
        set({ isControlled });
      },

      newGame: async () => {
        const news = await fetch("/api/news");
        const data = await news.json();
        const firstNewsItem = data[0];

        const enrichedData = data.map((item: News) => ({
          ...item,
          stats: generateRandomLikesAndComments(),
        }));

        // Clear any existing interval before starting a new one
        if (intervalId) {
          clearInterval(intervalId);
        }

        intervalId = setInterval(() => {
          set((state) => {
            if (state.timeLeft > 0 && !state.isPaused) {
              return { timeLeft: state.timeLeft - 0.1 };
            }
            return state;
          });
        }, 100);

        set((state) => ({
          unclassifiedNews: enrichedData,
          currentIndex: 0,
          classifiedAsFakeNews: [],
          classifiedAsRealNews: [],
          timeLeft: TIME_LIMIT,
          score: 0,
          lifes: 3,
          isPaused: false,
          isControlled: state.isControlled,
        }));

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
            timeLeft: TIME_LIMIT,
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
            timeLeft: TIME_LIMIT,
          };
        });
      },

      failNews: () => {
        set((state) => {
          return {
            currentIndex: state.currentIndex + 1,
            timeLeft: TIME_LIMIT,
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
