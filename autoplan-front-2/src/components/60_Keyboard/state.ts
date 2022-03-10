import { defineState } from "../__shared/helpers/defineState";
import { Ref, ref } from "vue";
import { Wall } from "../__shared/modules/wallbrick/wallbrick";
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
  }>({
    letters: [],
    lettersPulse: ref(0),
    acuteAccent: ref(false),
    graveAccent: ref(false),
    dieresis: ref(false),
    numbers: [],
    numbersPulse: ref(0),
    symbols: [],
    symbolsPulse: ref(0),
    shift: ref(false),
    panel: ref("letters"),
  });
}
