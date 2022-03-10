import { getCurrentInstance, Ref, ComputedRef } from "vue";
import { Wall } from "../../wallbrick/wallbrick";
import { RecordBase } from "../../helpers/data-interfaces";
import {
  UseCurrentState,
  UseCurrentGetters,
  UseCurrentActions,
} from "../../stores/useCurrent";
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
