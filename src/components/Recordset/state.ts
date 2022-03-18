import { defineState } from "../shared/helpers/defineState";
import { Ref, ComputedRef, ref, computed } from "vue";
import { Wall } from "../shared/modules/wallbrick/wallbrick";
import { RecordBase } from "../shared/interfaces/dataInterfaces";

export function useState() {
  return defineState<{
    records: ComputedRef<RecordBase[] | null>;
    recordPulse: Ref<number>;
    control: Wall;
    controlPulse: Ref<number>;
  }>({
    recordPulse: ref(0),
    controlPulse: ref(0),
  });
}
