import { getCurrentInstance, Ref, ComputedRef } from "vue";

export function useData(): {
  chars: ComputedRef<string[]>;
  value: Ref<string>;
  cursor: Ref<number | null>;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
