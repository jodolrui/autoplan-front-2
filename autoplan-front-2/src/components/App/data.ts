import { getCurrentInstance, Ref } from "vue";
import { Wall } from "../../helpers/wall";

export function useData(): {
  foo: Wall;
  bar: Wall;
  topbar: { container: Wall; left: Wall; center: Wall; right: Wall };
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
