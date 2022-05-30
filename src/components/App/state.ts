import { defineState } from "@jodolrui/glue";
import { Ref, ref } from "vue";
import { Rack } from "@jodolrui/racket";

export function useState() {
  return defineState<{
    navbar: Rack;
  }>({});
}
