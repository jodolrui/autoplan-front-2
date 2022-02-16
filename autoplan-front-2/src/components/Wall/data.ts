import { getCurrentInstance, ComputedRef } from "vue";
import { Block } from "../../helpers/wall";

export function useData(): {
  items: Block[];
  rows: ComputedRef<number>;
  cols: ComputedRef<number>;
  flex: boolean;
  pressed: (code: string) => void;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
