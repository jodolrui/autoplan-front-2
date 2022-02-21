import { getCurrentInstance, Ref } from "vue";
import { Wall } from "../../helpers/wall-brick";
import { RecordBase } from "../../helpers/data-interfaces";
import {
  UseCurrentState,
  UseCurrentGetters,
  UseCurrentActions,
} from "../../stores/useCurrent";
import { Store } from "pinia";

export function useData(): {
  routeId: Ref<string | string[]>;
  navbar: Wall;
  breadcrumbs: Wall;
  current: Store<
    "current",
    UseCurrentState,
    UseCurrentGetters,
    UseCurrentActions
  >;
  goTo: (id: string) => void;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
