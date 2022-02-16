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

export type Blocks = {
  pulse: Ref<number>;
  pressed?: (code: string) => void;
  items: Block[];
};

export function defineBlocks(obj: Block[]): Blocks {
  // "any" para evitar error de typescript
  return reactive(<any>{
    pulse: ref(0),
    // "function" para que funcione "this"
    pressed: function (code: string) {
      const items = this.items;
      const found: Block | undefined = items.find(
        (element: Block) => element.code === code
      );
      if (found) if (found.click) found.click(found);
      this.pulse.value++;
    },
    items: obj,
  });
}
