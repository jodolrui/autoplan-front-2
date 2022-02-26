import { getCurrentInstance, Ref, ComputedRef } from "vue";
import { Wall } from "../../helpers/wall-brick";
import { RecordBase } from "../../helpers/data-interfaces";
import {
  UseCurrentState,
  UseCurrentGetters,
  UseCurrentActions,
} from "../../stores/useCurrent";
import { Store } from "pinia";

export function useData(): {
  navbar: Wall;
  breadcrumbs: Wall;
  current: Store<
    "current",
    UseCurrentState,
    UseCurrentGetters,
    UseCurrentActions
  >;
  designKey: ComputedRef<string | undefined>;
  goTo: (id: string) => void;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
