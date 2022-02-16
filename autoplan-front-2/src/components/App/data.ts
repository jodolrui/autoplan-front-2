import { getCurrentInstance, Ref } from "vue";
import { Blocks } from "../../helpers/blocks";

export function useData(): {
  example: Blocks;
  foo: Blocks;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
