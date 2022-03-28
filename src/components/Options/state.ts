import { defineState } from "../shared/helpers/defineState";
import { Ref, ComputedRef, ref } from "vue";
import { Wall } from "../shared/modules/wallbrick/wallbrick";
import { Option } from "../shared/interfaces/general";

export function useState() {
  return defineState<{
    options: Wall;
  }>({});
}
