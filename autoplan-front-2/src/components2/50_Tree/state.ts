import { getCurrentInstance } from "vue";

export function useState(): {} {
  return getCurrentInstance()?.glueInstance.exposed();
}
