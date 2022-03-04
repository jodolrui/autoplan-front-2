import { getCurrentInstance } from "vue";

export function useData(): {} {
  return getCurrentInstance()?.glueInstance.exposed();
}
