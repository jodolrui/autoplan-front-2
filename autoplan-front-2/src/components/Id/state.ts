import { defineState } from "../shared/helpers/defineState";
import { Ref, ComputedRef, ref, computed } from "vue";
import { Wall } from "../shared/modules/wallbrick/wallbrick";

export function useState() {
  return defineState<{
    breadcrumbsPulse: Ref<number>;
    breadcrumbs: Wall;
    designKey: ComputedRef<string | undefined>;
    goTo: (id: string) => void;
  }>({
    breadcrumbsPulse: ref(0),
  });
}
