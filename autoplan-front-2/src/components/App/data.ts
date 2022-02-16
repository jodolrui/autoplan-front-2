import { getCurrentInstance, Ref } from "vue";
import { Blocks } from "../../helpers/blocks";

export function useData(): {
  foo: Blocks;
  bar: Blocks;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
