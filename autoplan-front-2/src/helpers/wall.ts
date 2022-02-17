import { Ref, ref, reactive, watch } from "vue";

export type Brick = {
  code: string;
  caption: string;
  row: number;
  col: number;
  rowSpan?: number;
  colSpan?: number;
  icon?: string;
  classes?: Object;
  style?: Object;
  click?: () => void;
  onClick?: () => void;
  key?: Ref<number>;
  slot?: string;
  div?: {
    classes?: Object;
    style?: Object;
    html: string;
  };
};

export type Wall = {
  key: number;
  pressed?: (code: string) => void;
  items: Brick[];
  classes?: Object;
  style?: Object;
};

export type WallConfig = {
  classes?: Object;
  style?: Object;
  items: Brick[];
};

const walls: Wall[] = [];

export function defineWall(config: WallConfig): Wall {
  const wall: Wall = {
    key: ref(0),
    // declaro con "function" para que funcione "this"
    //! ahora mismo esto no está funcionando pero actualiza bien
    // pressed: function (code: string) {
    //   const items = this.items;
    //   const found: Brick | undefined = items.find(
    //     (element: Brick) => element.code === code,
    //   );
    //   if (found) if (found.click) found.click();
    //   this.key.value++;
    // },
    items: config.items,
    classes: composeClass(config.classes),
    style: composeStyle(config.style),
  };

  config.items.forEach((element: Brick) => {
    element.key = ref(0);
    element.classes = composeClass(element.classes);
    element.style = composeStyle(element.style);
    element.onClick = () => {
      if (element.click) {
        element.click();
        if (element.key) element.key.value++;
      }
    };
    watch(
      () => element.key?.value,
      () => {
        wall.key.value++;
      },
    );
  });
  walls.push(wall);
  // "any" para evitar error de typescript
  return <Wall>walls.at(walls.length - 1);
}

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

export function composeClass(obj: any): Object {
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

export function composeStyle(obj: any): Object {
  let result: any = {};
  for (const prop in obj) {
    let propName: string = kebabize(prop);
    // result += `${propName}: ${obj[prop]};`;
    result[propName] = obj[prop];
  }
  console.log({ result });

  return result;
}
