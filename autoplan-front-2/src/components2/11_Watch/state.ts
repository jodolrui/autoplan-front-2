import { getCurrentInstance, Ref } from "vue";
import { RecordBase } from "../../helpers/data-interfaces";

export type State = {
  // routeId: Ref<string | string[]>;
  record: Ref<RecordBase>;
  children: Ref<RecordBase[]>;
  path: Ref<RecordBase[]>;
};
