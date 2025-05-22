import { ImageNews, TextNews, VideoNews } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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

  currentIndex: number;
  setCurrentIndex: (index: number) => void;

  newGame: () => Promise<void>;
  classifyAsFakeNews: () => void;
  classifyAsRealNews: () => void;
};

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      unclassifiedNews: [] as News[],
      classifiedAsFakeNews: [] as News[],
      classifiedAsRealNews: [] as News[],

      currentIndex: 0,

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
        });
      },

      classifyAsFakeNews: () => {
        set((state) => ({
          classifiedAsFakeNews: [
            ...state.classifiedAsFakeNews,
            state.unclassifiedNews[state.currentIndex],
          ],
          currentIndex: state.currentIndex + 1,
        }));
      },

      classifyAsRealNews: () => {
        set((state) => ({
          classifiedAsRealNews: [
            ...state.classifiedAsRealNews,
            state.unclassifiedNews[state.currentIndex],
          ],
          currentIndex: state.currentIndex + 1,
        }));
      },
    }),
    {
      name: "game-store", // name of the item in the storage (must be unique)
    }
  )
);
