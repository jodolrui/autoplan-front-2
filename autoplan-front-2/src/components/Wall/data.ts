import { getCurrentInstance, ComputedRef } from "vue";
import { Brick } from "../../helpers/wall";

export function useData(): {
  items: Brick[];
  rows: ComputedRef<number>;
  cols: ComputedRef<number>;
  flex: boolean;
  pressed: (code: string) => void;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
