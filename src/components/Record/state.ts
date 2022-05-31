import { defineState } from "@jodolrui/glue";
import { Ref, ComputedRef, ref } from "vue";
import {
  Format,
  Field,
  RecordBase,
  Design,
} from "../shared/interfaces/dataInterfaces";
import { Rack } from "@jodolrui/racket";
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
    table: Rack;
    tablePulse: Ref<number>;
    controls: Rack;
    controlsPulse: Ref<number>;
    isEditing: ComputedRef<boolean>;
    editPulse: Ref<number>;
    onEditUpdated: (cursor: number) => void;
    design: Design;
    format: Format;
    newRecord: RecordBase;
    selectOn: Ref<boolean>;
    add: Rack;
    options: Rack;
    insertOn: Ref<boolean>;
    addOn: Ref<boolean>;
    topPanel: Rack;
  }>({
    tablePulse: ref(0),
    controlsPulse: ref(0),
    editPulse: ref(0),
    selectOn: ref(false),
  });
}
