import { getCurrentInstance, Ref } from "vue";
import { Wall } from "../../helpers/wall-brick";
import { RecordBase } from "../../helpers/data-interfaces";

export function useData(): {
  routeId: Ref<string | string[]>;
  navbar: Wall;
  breadcrumbs: Wall;
  record: Ref<RecordBase | null>;
  children: Ref<RecordBase[] | null>;
  path: Ref<RecordBase[] | null>;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
