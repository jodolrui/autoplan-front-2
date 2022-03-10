import { getCurrentInstance, Ref, ComputedRef } from "vue";

export type State = {
  chars: ComputedRef<string[]>;
  value: Ref<string>;
  cursor: Ref<number>;
  position: Ref<number>;
  isMovingMouse: Ref<boolean>;
};
