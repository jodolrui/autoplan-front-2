import { defineState } from "@jodolrui/glue";
import { Ref, ComputedRef, ref } from "vue";
import { Rack } from "@jodolrui/racket";
import { Option } from "../shared/interfaces/general";

export function useState() {
  return defineState<{
    options: Rack;
  }>({});
}
