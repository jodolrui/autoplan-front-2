import { getCurrentInstance, Ref } from "vue";
import { Wall } from "../../helpers/wall-brick";

export function useData(): {
  // keys: Ref<Wall[]>;
  keys: Wall[];
  numbers: Wall[];
  symbols: Wall[];
  shift: Ref<boolean>;
  panel: Ref<"letters" | "numbers" | "symbols">;
  pulse: Ref<number>;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
