import { defineState } from "../../components/__shared/helpers/defineState";
import { ComputedRef, Ref } from "vue";
import { Wall, Brick } from "../wallbrick";

export function useState() {
  return defineState<{
    config: Wall;
    classes: ComputedRef<{ [key: string]: any }>;
    style: ComputedRef<{ [key: string]: any }>;
    bricks: ComputedRef<{ [key: string]: Brick }>;
  }>({});
}
