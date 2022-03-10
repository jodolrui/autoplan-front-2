import { defineState } from "../../components/__shared/helpers/defineState";
import { ComputedRef } from "vue";
import { Brick } from "../wallbrick";

export function useState() {
  return defineState<{
    config: Brick;
    classes: ComputedRef<{ [key: string]: any }>;
    style: ComputedRef<{ [key: string]: any }>;
    clicked: () => void;
    mouseDown: () => void;
    mouseUp: () => void;
  }>({});
}
