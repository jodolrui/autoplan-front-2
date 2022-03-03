import { getCurrentInstance, ComputedRef, Ref } from "vue";
import { Wall, Brick } from "../../helpers/wallbrick";

export function useData(): {
  config: Wall;
  classes: ComputedRef<{ [key: string]: any }>;
  style: ComputedRef<{ [key: string]: any }>;
  bricks: ComputedRef<{ [key: string]: Brick }>;
  pulse: Ref<number>;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
