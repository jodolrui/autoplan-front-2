import { getCurrentInstance, ComputedRef, Ref } from "vue";
import { Wall, Brick } from "../../../helpers/wallbrick";

export function useData(): {
  pulse: Ref<number>;
  wall: Wall;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
