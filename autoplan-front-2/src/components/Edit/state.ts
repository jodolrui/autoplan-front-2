import { defineState } from "../shared/helpers/defineState";
import { Ref, ComputedRef, ref } from "vue";
import { Brick } from "../shared/modules/wallbrick/wallbrick";

export function useState() {
  return defineState<{
    config: Brick;
    index: number;
    count: number;
    chars: ComputedRef<string[]>;
    position: Ref<number>;
    classes: { [key: string]: string | boolean };
  }>({
    position: ref(0),
  });
}
