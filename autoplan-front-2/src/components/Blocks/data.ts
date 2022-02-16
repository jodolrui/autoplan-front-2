import { getCurrentInstance, ComputedRef } from "vue";
import { Block } from "../../helpers/blocks";

export function useData(): {
  items: Block[];
  rows: ComputedRef<number>;
  cols: ComputedRef<number>;
  pressed: (code: string) => void;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
