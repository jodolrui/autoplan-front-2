import { defineState } from "../shared/helpers/defineState";
import { Ref, ref } from "vue";
import { Wall } from "../shared/modules/wallbrick/wallbrick";

export function useState() {
  return defineState<{
    navbar: Wall;
  }>({});
}
