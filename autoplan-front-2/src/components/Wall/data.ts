import { getCurrentInstance, ComputedRef } from "vue";
import { WallConfig, Brick } from "../../helpers/wall";

export function useData(): {
  config: WallConfig;
  rows: ComputedRef<number>;
  cols: ComputedRef<number>;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
