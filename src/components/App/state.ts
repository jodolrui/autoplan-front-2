import { defineState } from "../shared/helpers/defineState";
import { Ref, ref } from "vue";
import { Rack } from "@jodolrui/racket";

export function useState() {
  return defineState<{
    navbar: Rack;
  }>({});
}
