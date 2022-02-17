import { getCurrentInstance, ComputedRef } from "vue";
import { WallConfig, Brick } from "../../helpers/wall";

export function useData(): {
  config: WallConfig;
  rows: ComputedRef<number>;
  cols: ComputedRef<number>;
  classes: ComputedRef<{ [key: string]: any }>;
  style: ComputedRef<{ [key: string]: any }>;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
