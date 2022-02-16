import { defineStore } from "pinia";

export const useComposeStore = defineStore("compose", {
  state: (): {
    foo: number;
  } => {
    return {
      foo: 0,
    };
  },
  getters: {
    foo: (state) => {
      return "foo";
    },
  },
  actions: {
    composeClass(obj: any) {
      let result: any = {};
      for (const prop in obj) {
        let propName: string = kebabize(prop);
        Object.defineProperty(result, propName, {
          enumerable: true,
          writable: true,
        });
        result[propName] = obj[prop];
      }
      return result;
    },
    composeStyle(obj: any) {
      let result = "";
      for (const prop in obj) {
        let propName: string = kebabize(prop);
        result += `${propName}: ${obj[prop]};`;
      }
      return result;
    },
    spread(container: Object, content: Object) {
      container = Object.assign(Object.assign({}, container), content);
      return container;
    },
  },
});

function kebabize(str: string) {
  return str
    .split("")
    .map((letter: string, index: number) => {
      return letter.toUpperCase() === letter
        ? `${index !== 0 ? "-" : ""}${letter.toLowerCase()}`
        : letter;
    })
    .join("");
}
