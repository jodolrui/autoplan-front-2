import { getCurrentInstance, Ref } from "vue";
import { Format, Field, RecordBase } from "../../helpers/data-interfaces";
import { Wall } from "../../wallbrick/wallbrick";
import {
  UseCurrentState,
  UseCurrentGetters,
  UseCurrentActions,
} from "../../stores/useCurrent";
import { Store } from "pinia";

export function useData(): {
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
  pulse: Ref<number>;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
