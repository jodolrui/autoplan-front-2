import { defineStore } from "pinia";
import valencianPlayable from "../data/valencian-playable";
import valencianEnigmable from "../data/valencian-enigmable";
const playable: string[] = valencianPlayable;
const enigmable: string[] = valencianEnigmable;

import playable4 from "../data/spanish-playable-4";
import playable5 from "../data/spanish-playable-5";
import playable6 from "../data/spanish-playable-6";
import playable7 from "../data/spanish-playable-7";
import playable8 from "../data/spanish-playable-8";
import playable9 from "../data/spanish-playable-9";
import playable10 from "../data/spanish-playable-10";
import playable11 from "../data/spanish-playable-11";
import playable12 from "../data/spanish-playable-12";

export const useGameStore = defineStore("game", {
  state: (): {
    length: number;
    level: number;
    isDirectional: boolean;
    // provisionalLength: number;
    previousLength: number;
    playable: string[];
    enigmable: string[];
    enigma: string;
    plays: string[];
    current: string;
    remaining: string[];
    enigmaLog: string[];
    keyLog: string[];
    isWrong: boolean;
    colors: 3 | 4;
    playableNorms: string[];
    enigmableNorms: string[];
    isSolved: boolean;
    isFailed: boolean;
    rows: number;
    cols: number;
    tetrisRow: number;
    isConfiguring: boolean;
  } => {
    return {
      length: 6,
      level: 1,
      isDirectional: false,
      // provisionalLength: 6,
      previousLength: 6,
      playable: playable,
      enigmable: [],
      enigma: "",
      plays: [],
      current: "",
      remaining: ["", "", "", "", "", ""],
      enigmaLog: [],
      keyLog: [],
      isWrong: false,
      colors: 3,
      playableNorms: ["valencian-racv", "spanish"],
      enigmableNorms: ["valencian-racv", "spanish"],
      isSolved: false,
      isFailed: false,
      rows: 6,
      cols: 10,
      tetrisRow: 0,
      isConfiguring: false,
    };
  },
  getters: {
    //! creo que no se utiliza
    prompt: (state) => {
      let result = state.current;
      for (let i = state.current.length; i < state.length; i++) {
        result += i === state.current.length ? "_" : "¬";
      }
      return result;
    },
  },
  actions: {
    loadSelection() {
      // this.playable = playable.filter((element: string) => {
      //   return element.length === this.length;
      // });
      // this.enigmable = playable.filter((element: string) => {
      //   return element.length === this.length;
      // });

      if (this.length === 4) this.playable = playable4;
      if (this.length === 5) this.playable = playable5;
      if (this.length === 6) this.playable = playable6;
      if (this.length === 7) this.playable = playable7;
      if (this.length === 8) this.playable = playable8;
      if (this.length === 9) this.playable = playable9;
      if (this.length === 10) this.playable = playable10;
      if (this.length === 11) this.playable = playable11;
      if (this.length === 12) this.playable = playable12;

      this.enigmable = this.playable;
    },
    newEnigma(length?: number) {
      //* --> length
      if (length) this.length = length;
      if (this.enigmable.length === 0 || this.previousLength !== this.length)
        this.loadSelection();
      this.previousLength = this.length;
      //* --< length
      // this.colors = this.length <= 7 ? 3 : 4;
      this.enigma =
        this.enigmable[Math.floor(Math.random() * this.enigmable.length)];
      this.plays = [];
      this.current = "";
      this.enigmaLog.push(this.enigma);
      this.isWrong = false;
      this.isSolved = false;
      this.isFailed = false;
      this.tetrisRow = 0;
      this.calculateRemaining();
      console.log({ enigma: this.enigma });
    },
    calculateRemaining() {
      this.remaining = [];
      let total = this.rows - this.plays.length - 1;
      total += this.isSolved || this.isFailed ? 1 : 0;
      for (let i = 0; i < total; i++) {
        let empty = "";
        for (let j = 0; j < this.length; j++) {
          empty += "#";
        }
        this.remaining.push(empty);
      }
    },
    type(letter: string) {
      this.keyLog.push(letter);
      if (letter.length === 1) {
        this.current += letter;
      }
      this.isWrong = false;
    },
    backspace() {
      this.keyLog.push("backspace");
      this.current = this.current.substring(0, this.current.length - 1);
      this.isWrong = false;
    },
    addPlay(play: string) {
      console.log({ play });
      if (this.plays.length < this.rows) this.plays.push(play);
      if (this.plays[this.plays.length - 1] === this.enigma)
        this.isSolved = true;
      if (
        this.plays.length === this.rows &&
        this.plays[this.plays.length - 1] !== this.enigma
      )
        this.isFailed = true;
    },
    randomPlay() {
      this.keyLog.push("random");
      const word =
        this.playable[Math.floor(Math.random() * this.playable.length)];
      console.log({ word });

      //* por seguridad
      // if (word.length === this.length) {
      this.addPlay(word);
      this.current = "";
      this.isWrong = false;
      this.calculateRemaining();
      // }
    },
    confirm(): undefined | boolean {
      this.keyLog.push("confirm");
      if (this.current.length !== this.length) {
        return false;
      }
      if (this.current === this.enigma) {
        this.addPlay(this.current);
        this.isWrong = false;
        this.isSolved = true;
        this.calculateRemaining();
        return true;
      } else {
        const found = this.playable.find((element: string) => {
          return element === this.current;
        });
        if (found) {
          this.addPlay(this.current);
          this.current = "";
          this.isWrong = false;
          this.calculateRemaining();
          return true;
        } else {
          this.isWrong = true;
          return false;
        }
      }
    },
    surrender() {
      this.keyLog.push("surrender");
      this.addPlay(this.enigma);
      this.isWrong = false;
      this.isFailed = true;
      this.calculateRemaining();
    },
    inPlays(letter: string) {
      if (letter.length === 1) {
        let result: boolean = false;
        this.plays.forEach((element: string) => {
          if (element.includes(letter)) result = true;
        });
        return result;
      } else return false;
    },
    inEnigma(letter: string) {
      return letter.length === 1 && this.enigma.includes(letter);
    },
    inCurrent(letter: string) {
      return letter.length === 1 && this.current.includes(letter);
    },
    inPlaceKey(letter: string) {
      if (this.inEnigma(letter)) {
        let result: boolean = false;
        this.plays.forEach((element: string) => {
          for (let i = 0; i < element.length; i++) {
            if (
              element.charAt(i) === letter &&
              this.enigma.charAt(i) === letter
            )
              result = true;
          }
        });
        return result;
      } else return false;
    },
    inPlaceBrick(letter: string, position: number) {
      if (this.enigma.charAt(position) === letter) return true;
      return false;
    },
    isSolvedBrick(position: number) {
      const letter = this.enigma.charAt(position);
      let result = false;
      this.plays.forEach((element: string) => {
        if (element.charAt(position) === letter) result = true;
      });
      return result;
    },
    isBefore(letter: string, position: number) {
      if (this.enigma.substring(0, position).includes(letter)) return true;
      return false;
    },
    isAfter(letter: string, position: number) {
      if (this.enigma.substring(position + 1).includes(letter)) return true;
      return false;
    },
    clearBoard() {
      this.plays = [];
      this.current = "";
      this.isSolved = false;
      this.isFailed = false;
    },
  },
});
