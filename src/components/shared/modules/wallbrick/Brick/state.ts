import { defineState } from "../../../helpers/defineState";
import { ComputedRef, Ref } from "vue";
import { Brick } from "../wallbrick";

export function useState() {
  return defineState<{
    config: Brick;
    index: number;
    count: number;
    clicked: () => void;
  }>({});
}
