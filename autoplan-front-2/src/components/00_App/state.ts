import { defineState } from "../__shared/helpers/defineState";
import { Ref, ref } from "vue";
import { Wall } from "../__shared/modules/wallbrick/wallbrick";

export function useState() {
  return defineState<{
    navbar: Wall;
    navbarPulse: Ref<number>;
    keyboardPulse: Ref<number>;
  }>({
    navbarPulse: ref(0),
    keyboardPulse: ref(0),
  });
}
