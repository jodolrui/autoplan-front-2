import { defineState } from "../__shared/helpers/defineState";
import { Ref, ComputedRef } from "vue";

export function useState() {
  return defineState<{
    chars: ComputedRef<string[]>;
    value: Ref<string>;
    cursor: Ref<number>;
    position: Ref<number>;
    isMovingMouse: Ref<boolean>;
  }>({});
}
