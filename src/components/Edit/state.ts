import { defineState } from "@jodolrui/glue";
import { Ref, ComputedRef, ref } from "vue";
import { Slot } from "@jodolrui/racket";

export function useState() {
  return defineState<{
    config: Slot;
    index: number;
    count: number;
    chars: ComputedRef<string[]>;
    position: Ref<number>;
    classes: { [key: string]: string | boolean };
  }>({
    position: ref(0),
  });
}
