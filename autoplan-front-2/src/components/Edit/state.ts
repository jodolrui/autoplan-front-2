import { defineState } from "../shared/helpers/defineState";
import { Ref, ComputedRef, ref } from "vue";

export function useState() {
  return defineState<{
    chars: ComputedRef<string[]>;
    value: Ref<string>;
    cursor: Ref<number>;
    position: Ref<number>;
    isMovingMouse: Ref<boolean>;
  }>({
    isMovingMouse: ref(false),
  });
}
