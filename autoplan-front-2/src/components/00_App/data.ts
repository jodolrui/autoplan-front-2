import { getCurrentInstance, Ref, ref } from "vue";
import { Wall } from "../../wallbrick/wallbrick";
import {
  UseCurrentState,
  UseCurrentGetters,
  UseCurrentActions,
} from "../../stores/useCurrent";
import { Store } from "pinia";

export function useData(): {
  navbar: Wall;
  navbarPulse: Ref<number>;
  current: Store<
    "current",
    UseCurrentState,
    UseCurrentGetters,
    UseCurrentActions
  >;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
