import { defineState } from "../__shared/helpers/defineState";
import { Ref } from "vue";
import { Wall } from "../../wallbrick/wallbrick";
import { Store } from "pinia";
import {
  UseCurrentState,
  UseCurrentGetters,
  UseCurrentActions,
} from "../__shared/stores/useCurrent";

export function useState() {
  return defineState<{
    edit: Wall;
    editPulse: Ref<number>;
    letters: Wall[];
    lettersPulse: Ref<number>;
    numbers: Wall[];
    numbersPulse: Ref<number>;
    symbols: Wall[];
    symbolsPulse: Ref<number>;
    shift: Ref<boolean>;
    acuteAccent: Ref<boolean>;
    graveAccent: Ref<boolean>;
    dieresis: Ref<boolean>;
    panel: Ref<"letters" | "numbers" | "symbols">;
    current: Store<
      "current",
      UseCurrentState,
      UseCurrentGetters,
      UseCurrentActions
    >;
    pulse: Ref<number>;
    editCharClick: (position: number) => void;
  }>({});
}
