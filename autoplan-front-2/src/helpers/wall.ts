import { Ref, ref, reactive } from "vue";

export type Block = {
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
  click?: (tile: Block) => void;
  slot?: string;
};

export type Wall = {
  pulse: Ref<number>;
  pressed?: (code: string) => void;
  items: Block[];
  flex?: boolean;
};

export function defineWall(obj: Block[], flex: boolean = false): Wall {
  // "any" para evitar error de typescript
  return reactive(<any>{
    pulse: ref(0),
    // "function" para que funcione "this"
    pressed: function (code: string) {
      const items = this.items;
      const found: Block | undefined = items.find(
        (element: Block) => element.code === code,
      );
      if (found) if (found.click) found.click(found);
      this.pulse.value++;
    },
    items: obj,
    flex,
  });
}
