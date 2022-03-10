import { getCurrentInstance, ComputedRef } from "vue";
import { Brick } from "../wallbrick";

export type State = {
  config: Brick;
  classes: ComputedRef<{ [key: string]: any }>;
  style: ComputedRef<{ [key: string]: any }>;
  clicked: () => void;
  mouseDown: () => void;
  mouseUp: () => void;
};
