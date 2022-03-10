import { defineState } from "../__shared/helpers/defineState";
import { Ref, ComputedRef } from "vue";
import { Wall } from "../../wallbrick/wallbrick";
import {
  UseCurrentState,
  UseCurrentGetters,
  UseCurrentActions,
} from "../__shared/stores/useCurrent";
import { Store } from "pinia";

export function useState() {
  return defineState<{
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
  }>({});
}
