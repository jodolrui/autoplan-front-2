import { getCurrentInstance, Ref } from "vue";
import { Wall } from "../../helpers/wall-brick";

export function useData(): {
  routeId: Ref<string | string[]>;
  navbar: Wall;
  breadcrumbs: Wall;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
