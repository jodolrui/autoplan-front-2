import { defineState } from "@jodolrui/glue";
import { Ref, ComputedRef, ref, computed } from "vue";
import { Rack } from "@jodolrui/racket";

export function useState() {
  return defineState<{
    breadcrumbs: Rack;
    designKey: ComputedRef<string | undefined>;
    goTo: (id: string) => void;
  }>({});
}
