import { getCurrentInstance, Ref } from "vue";
import { RecordBase } from "../../helpers/data-interfaces";

export function useState(): {
  // routeId: Ref<string | string[]>;
  record: Ref<RecordBase>;
  children: Ref<RecordBase[]>;
  path: Ref<RecordBase[]>;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
