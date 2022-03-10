import { getCurrentInstance, ComputedRef, Ref } from "vue";
import { Wall, Brick } from "../wallbrick";

export type State = {
  pulse: Ref<number>;
  test1: Wall;
  test2: Wall;
};
