import { getCurrentInstance, Ref, ComputedRef } from "vue";
import {
  Format,
  Field,
  RecordBase,
} from "../__shared/interfaces/dataInterfaces";
import { Wall } from "../../wallbrick/wallbrick";
import {
  UseCurrentState,
  UseCurrentGetters,
  UseCurrentActions,
} from "../__shared/stores/useCurrent";
import { Store } from "pinia";

export type State = {
  fields: Field[];
  record: RecordBase & {
    [key: string]: { value: any | null; units?: string | null };
  };
  table: Wall;
  tablePulse: Ref<number>;
  control: Wall;
  controlPulse: Ref<number>;
  current: Store<
    "current",
    UseCurrentState,
    UseCurrentGetters,
    UseCurrentActions
  >;
  isEditing: ComputedRef<boolean>;
  editPulse: Ref<number>;
  onEditUpdated: (cursor: number) => void;
};
