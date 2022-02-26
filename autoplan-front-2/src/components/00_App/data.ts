import { getCurrentInstance, Ref, ref } from "vue";
import { Wall } from "../../helpers/wall-brick";

export function useData(): {
  navbar: Wall;
  keyboardOn: Ref<boolean>;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
