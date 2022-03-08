import { getCurrentInstance, Ref, ComputedRef } from "vue";

export function useState(): {
  chars: ComputedRef<string[]>;
  value: Ref<string>;
  cursor: Ref<number>;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
