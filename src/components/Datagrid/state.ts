import { defineState } from "../shared/helpers/defineState";
import { Ref, ComputedRef, ref } from "vue";
import { Wall } from "../shared/modules/wallbrick/wallbrick";

export function useState() {
  return defineState<{
    navbar: Wall;
    breadcrumbs: Wall;
    designKey: ComputedRef<string | undefined>;
  }>({});
}
