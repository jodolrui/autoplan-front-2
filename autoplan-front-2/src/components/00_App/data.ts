import { getCurrentInstance, Ref } from "vue";
import { Wall } from "../../helpers/wall-brick";

export function useData(): {} {
  return getCurrentInstance()?.glueInstance.exposed();
}
