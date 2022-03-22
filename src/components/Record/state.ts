import { defineState } from "../shared/helpers/defineState";
import { Ref, ComputedRef, ref } from "vue";
import { Format, Field, RecordBase } from "../shared/interfaces/dataInterfaces";
import { Wall } from "../shared/modules/wallbrick/wallbrick";
import {
  UseCurrentState,
  UseCurrentGetters,
  UseCurrentActions,
} from "../shared/stores/useCurrent";
import { Store } from "pinia";

export function useState() {
  return defineState<{
    fields: Field[];
    record: RecordBase & {
      [key: string]: { value: any | null; units?: string | null };
    };
    table: Wall;
    tablePulse: Ref<number>;
    control: Wall;
    controlPulse: Ref<number>;
    isEditing: ComputedRef<boolean>;
    editPulse: Ref<number>;
    onEditUpdated: (cursor: number) => void;
    designKey: ComputedRef<string | undefined>;
    format: Format;
    newRecord: RecordBase;
    selectOn: Ref<boolean>;
  }>({
    tablePulse: ref(0),
    controlPulse: ref(0),
    editPulse: ref(0),
    selectOn: ref(false),
  });
}
