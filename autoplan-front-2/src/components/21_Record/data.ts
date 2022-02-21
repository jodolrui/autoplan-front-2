import { getCurrentInstance, Ref } from "vue";
import { Format, Field, RecordBase } from "../../helpers/data-interfaces";
import { Wall } from "../../helpers/wall-brick";
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
  control: Wall;
  current: Store<
    "current",
    UseCurrentState,
    UseCurrentGetters,
    UseCurrentActions
  >;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
