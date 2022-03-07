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
  current: Store<
    "current",
    UseCurrentState,
    UseCurrentGetters,
    UseCurrentActions
  >;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
