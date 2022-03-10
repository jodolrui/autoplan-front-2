import { getCurrentInstance, Ref, ComputedRef } from "vue";
import { Wall } from "../../wallbrick/wallbrick";
import { RecordBase } from "../__shared/interfaces/dataInterfaces";
import {
  UseCurrentState,
  UseCurrentGetters,
  UseCurrentActions,
} from "../__shared/stores/useCurrent";
import { Store } from "pinia";

export type State = {
  navbar: Wall;
  breadcrumbsPulse: Ref<number>;
  breadcrumbs: Wall;
  current: Store<
    "current",
    UseCurrentState,
    UseCurrentGetters,
    UseCurrentActions
  >;
  designKey: ComputedRef<string | undefined>;
  goTo: (id: string) => void;
};
