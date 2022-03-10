import { getCurrentInstance, Ref, ComputedRef } from "vue";
import { Wall } from "../../helpers/wall-brick";
import { RecordBase } from "../__shared/interfaces/dataInterfaces";
import {
  UseCurrentState,
  UseCurrentGetters,
  UseCurrentActions,
} from "../__shared/stores/useCurrent";
import { Store } from "pinia";

export type State = {
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
  designPulse: Ref<number>;
};
