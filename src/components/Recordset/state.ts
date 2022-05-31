import { defineState } from "@jodolrui/glue";
import { Ref, ComputedRef, ref, computed } from "vue";
import { Rack } from "@jodolrui/racket";
import { RecordBase } from "../shared/interfaces/dataInterfaces";

export function useState() {
  return defineState<{
    records: ComputedRef<RecordBase[] | null>;
    recordPulse: Ref<number>;
    controls: Rack;
    controlsPulse: Ref<number>;
    options: Rack;
    addOn: Ref<boolean>;
  }>({
    recordPulse: ref(0),
    controlsPulse: ref(0),
  });
}
