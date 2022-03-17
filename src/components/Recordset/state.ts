import { defineState } from "../shared/helpers/defineState";
import { Ref, ComputedRef, ref, computed } from "vue";
import { Wall } from "../shared/modules/wallbrick/wallbrick";
import { RecordBase } from "../shared/interfaces/dataInterfaces";

export function useState() {
  return defineState<{
    records: Ref<RecordBase[] | null>;
    recordPulse: Ref<number>;
  }>({
    recordPulse: ref(0),
  });
}
