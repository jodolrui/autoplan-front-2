import { defineState } from "@jodolrui/glue";
import { Ref, ComputedRef, ref, computed } from "vue";
import { Wall } from "../shared/modules/wallbrick/wallbrick";

export function useState() {
  return defineState<{
    breadcrumbs: Wall;
    designKey: ComputedRef<string | undefined>;
    goTo: (id: string) => void;
  }>({});
}
