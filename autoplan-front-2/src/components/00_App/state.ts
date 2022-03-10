import { getCurrentInstance, Ref, ref } from "vue";
import { Wall } from "../../wallbrick/wallbrick";
import {
  UseCurrentState,
  UseCurrentGetters,
  UseCurrentActions,
} from "../__shared/stores/useCurrent";
import { Store } from "pinia";

export type State = {
  navbar: Wall;
  navbarPulse: Ref<number>;
  current: Store<
    "current",
    UseCurrentState,
    UseCurrentGetters,
    UseCurrentActions
  >;
  keyboardPulse: Ref<number>;
};
