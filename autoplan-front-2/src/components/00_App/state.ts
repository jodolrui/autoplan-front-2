import { defineState } from "../__shared/helpers/defineState";
import { Ref, ref } from "vue";
import { Wall } from "../../wallbrick/wallbrick";
import {
  useCurrent,
  UseCurrentState,
  UseCurrentGetters,
  UseCurrentActions,
} from "../__shared/stores/useCurrent";
import { Store } from "pinia";

export function useState() {
  return defineState<{
    navbar: Wall;
    navbarPulse: Ref<number>;
    current: Store<
      "current",
      UseCurrentState,
      UseCurrentGetters,
      UseCurrentActions
    >;
    keyboardPulse: Ref<number>;
  }>({
    navbar: {} as Wall,
    navbarPulse: ref(0),
    current: {} as any,
    keyboardPulse: ref(0),
  });
}
