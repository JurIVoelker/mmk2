import { ImageNews, TextNews, VideoNews } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const TIME_LIMIT = 20.0;

export type News =
  | {
      type: "text";
      data: TextNews;
    }
  | { type: "image"; data: ImageNews }
  | { type: "video"; data: VideoNews };

type GameStore = {
  unclassifiedNews: News[];
  classifiedAsFakeNews: News[];
  classifiedAsRealNews: News[];

  score: number;

  timeLeft: number;
  isPaused: boolean;
  pause: (isPaused: boolean) => void;

  currentIndex: number;
  setCurrentIndex: (index: number) => void;

  newGame: () => Promise<void>;
  classifyAsFakeNews: () => void;
  classifyAsRealNews: () => void;
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

      pause: (isPaused: boolean) => {
        set({ isPaused });
      },

      setCurrentIndex: (index: number) => {
        set({ currentIndex: index });
      },

      newGame: async () => {
        const news = await fetch("/api/news");
        const data = await news.json();
        set({
          unclassifiedNews: data,
          currentIndex: 0,
          classifiedAsFakeNews: [],
          classifiedAsRealNews: [],
          timeLeft: TIME_LIMIT,
          score: 0,
        });

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
      },

      classifyAsFakeNews: () => {
        set((state) => {
          const newsItem = state.unclassifiedNews[state.currentIndex];
          const isFake = newsItem?.data?.isFake;
          return {
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
          return {
            score: isFake
              ? state.score
              : state.score + getScore(state.timeLeft),
            classifiedAsRealNews: [...state.classifiedAsRealNews, newsItem],
            currentIndex: state.currentIndex + 1,
            timeLeft: TIME_LIMIT,
          };
        });
      },
    }),
    {
      name: "game-store",
    }
  )
);
