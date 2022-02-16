import { Ref, ref, reactive } from "vue";

export type Brick = {
  code: string;
  caption: string;
  row: number;
  col: number;
  rowSpan?: number;
  colSpan?: number;
  color?: string;
  backgroundColor?: string;
  frequency?: number;
  icon?: string;
  fontSize?: string;
  marginTop?: string;
  isHidden?: boolean;
  isCursor?: boolean;
  isReminder?: boolean;
  classes?: Object;
  style?: Object;
  click?: (tile: Brick) => void;
  slot?: string;
};

export type Wall = {
  pulse: Ref<number>;
  pressed?: (code: string) => void;
  items: Brick[];
  flex?: boolean;
};

export function defineWall(obj: Brick[], flex: boolean = false): Wall {
  // "any" para evitar error de typescript
  return reactive(<any>{
    pulse: ref(0),
    // "function" para que funcione "this"
    pressed: function (code: string) {
      const items = this.items;
      const found: Brick | undefined = items.find(
        (element: Brick) => element.code === code,
      );
      if (found) if (found.click) found.click(found);
      this.pulse.value++;
    },
    items: obj,
    flex,
  });
}
