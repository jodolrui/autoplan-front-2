import { defineState } from "@jodolrui/glue";
import { Ref, ref } from "vue";
import { Wall } from "../shared/modules/wallbrick/wallbrick";
import { Store } from "pinia";
import {
  UseCurrentState,
  UseCurrentGetters,
  UseCurrentActions,
} from "../shared/stores/useCurrent";

export function useState() {
  return defineState<{
    letters: Wall[];
    numbers: Wall[];
    symbols: Wall[];
    shift: Ref<boolean>;
    acuteAccent: Ref<boolean>;
    graveAccent: Ref<boolean>;
    dieresis: Ref<boolean>;
    panel: Ref<"letters" | "numbers" | "symbols">;
  }>({
    letters: [],
    acuteAccent: ref(false),
    graveAccent: ref(false),
    dieresis: ref(false),
    numbers: [],
    symbols: [],
    shift: ref(false),
    panel: ref("letters"),
  });
}
