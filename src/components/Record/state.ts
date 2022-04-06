import { defineState } from "../shared/helpers/defineState";
import { Ref, ComputedRef, ref } from "vue";
import {
  Format,
  Field,
  RecordBase,
  Design,
} from "../shared/interfaces/dataInterfaces";
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
    controls: Wall;
    controlsPulse: Ref<number>;
    isEditing: ComputedRef<boolean>;
    editPulse: Ref<number>;
    onEditUpdated: (cursor: number) => void;
    design: Design;
    format: Format;
    newRecord: RecordBase;
    selectOn: Ref<boolean>;
    add: Wall;
    options: Wall;
    insertOn: Ref<boolean>;
    addOn: Ref<boolean>;
    topPanel: Wall;
  }>({
    tablePulse: ref(0),
    controlsPulse: ref(0),
    editPulse: ref(0),
    selectOn: ref(false),
  });
}
