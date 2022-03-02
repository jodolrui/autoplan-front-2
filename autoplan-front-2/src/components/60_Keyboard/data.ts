import { getCurrentInstance, Ref } from "vue";
import { Wall } from "../../helpers/wall-brick";
import { Store } from "pinia";
import {
  UseCurrentState,
  UseCurrentGetters,
  UseCurrentActions,
} from "../../stores/useCurrent";

export function useData(): {
  // keys: Ref<Wall[]>;
  edit: Wall;
  keys: Wall[];
  numbers: Wall[];
  symbols: Wall[];
  shift: Ref<boolean>;
  panel: Ref<"letters" | "numbers" | "symbols">;
  current: Store<
    "current",
    UseCurrentState,
    UseCurrentGetters,
    UseCurrentActions
  >;
  pulse: Ref<number>;
  editCharClick: (position: number) => void;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
