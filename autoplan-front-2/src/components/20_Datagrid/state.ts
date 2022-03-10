import { defineState } from "../__shared/helpers/defineState";
import { Ref, ComputedRef, ref } from "vue";
import { Wall } from "../__shared/modules/wallbrick/wallbrick";

export function useState() {
  return defineState<{
    navbar: Wall;
    breadcrumbs: Wall;
    designKey: ComputedRef<string | undefined>;
    designPulse: Ref<number>;
  }>({
    designPulse: ref(0),
  });
}
