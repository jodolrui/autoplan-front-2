import { defineState } from "@jodolrui/glue";
import { Ref, ComputedRef, ref, computed } from "vue";
import { Wall } from "../shared/modules/wallbrick/wallbrick";
import { RecordBase } from "../shared/interfaces/dataInterfaces";

export function useState() {
  return defineState<{
    records: ComputedRef<RecordBase[] | null>;
    recordPulse: Ref<number>;
    controls: Wall;
    controlsPulse: Ref<number>;
    options: Wall;
    addOn: Ref<boolean>;
  }>({
    recordPulse: ref(0),
    controlsPulse: ref(0),
  });
}
