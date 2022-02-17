import { getCurrentInstance, Ref } from "vue";
import { Wall } from "../../helpers/wall-brick";

export function useData(): {
  navbar: Wall;
  breadcrumbs: Wall;
  bar: Wall;
  topbar: { container: Wall; left: Wall; center: Wall; right: Wall };
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
