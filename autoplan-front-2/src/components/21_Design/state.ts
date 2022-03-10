import { getCurrentInstance, Ref } from "vue";
import {
  UseCurrentState,
  UseCurrentGetters,
  UseCurrentActions,
} from "../../stores/useCurrent";
import { Format, Field, RecordBase } from "../../helpers/data-interfaces";
import { Store } from "pinia";
import { Wall } from "../../helpers/wall-brick";

export type State = {
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
};
