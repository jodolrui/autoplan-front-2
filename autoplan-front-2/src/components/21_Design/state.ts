import { defineState } from "../__shared/helpers/defineState";
import { Ref } from "vue";
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
import { Wall } from "../../wallbrick/wallbrick";

export function useState() {
  return defineState<{
    designKey: Ref<string>;
    current: Store<
      "current",
      UseCurrentState,
      UseCurrentGetters,
      UseCurrentActions
    >;
    format: Format;
    fields: Field[];
    newRecord: RecordBase;
    records: Ref<RecordBase[] | null>;
    control: Wall;
    recordPulse: Ref<number>;
  }>({});
}
