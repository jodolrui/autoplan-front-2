import { defineState } from "../../../helpers/defineState";
import { ComputedRef, Ref } from "vue";
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
