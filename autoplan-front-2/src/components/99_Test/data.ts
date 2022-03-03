import { getCurrentInstance, ComputedRef, Ref } from "vue";
import { Wall, Brick } from "../../helpers/wallbrick";

export function useData(): {
  pulse: Ref<number>;
  test1: Wall;
  test2: Wall;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
