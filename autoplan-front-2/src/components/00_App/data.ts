import { getCurrentInstance, Ref, ref } from "vue";
import { Wall } from "../../wallbrick/wallbrick";

export function useData(): {
  navbar: Wall;
  navbarPulse: Ref<number>;
  keyboardOn: Ref<boolean>;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
