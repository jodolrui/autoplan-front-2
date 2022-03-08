import { getCurrentInstance, Ref, ComputedRef } from "vue";

export function useState(): {
  chars: ComputedRef<string[]>;
  value: Ref<string>;
  cursor: Ref<number>;
  position: Ref<number>;
  isMovingMouse: Ref<boolean>;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
