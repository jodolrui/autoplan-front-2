import { defineStore } from "pinia";

export const useGameStore = defineStore("game", {
  state: (): {
    count: number;
  } => {
    return {
      count: 0,
    };
  },
  getters: {
    foo: (state) => {
      return "foo";
    },
  },
  actions: {},
});
