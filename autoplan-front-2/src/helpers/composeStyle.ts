export function spread(container: Object, content: Object) {
  container = Object.assign(Object.assign({}, container), content);
  return container;
}

function kebabize(str: string) {
  return str
    .split("")
    .map((letter: string, index: number) => {
      return letter.toUpperCase() === letter && letter !== "-"
        ? `${index !== 0 ? "-" : ""}${letter.toLowerCase()}`
        : letter;
    })
    .join("");
}

export function composeClass(obj: { [key: string]: any }): {
  [key: string]: any;
} {
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
}

export function composeStyle(obj: { [key: string]: any }): {
  [key: string]: any;
} {
  let result: any = {};
  for (const prop in obj) {
    let propName: string = kebabize(prop);
    // result += `${propName}: ${obj[prop]};`;
    result[propName] = obj[prop];
  }
  return result;
}
