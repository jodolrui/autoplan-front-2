import { defineState } from "../__shared/helpers/defineState";
import { Ref, ref } from "vue";
import {
  UseCurrentState,
  UseCurrentGetters,
  UseCurrentActions,
} from "../__shared/stores/useCurrent";
import {
  Format,
  Field,
  RecordBase,
} from "../__shared/interfaces/dataInterfaces";
import { Store } from "pinia";
import { Wall } from "../__shared/modules/wallbrick/wallbrick";

export function useState() {
  return defineState<{
    designKey: Ref<string>;
    format: Format;
    fields: Field[];
    newRecord: RecordBase;
    records: Ref<RecordBase[] | null>;
    control: Wall;
    recordPulse: Ref<number>;
  }>({
    recordPulse: ref(0),
  });
}
