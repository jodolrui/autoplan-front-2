import { defineState } from "../../components/__shared/helpers/defineState";
import { Ref } from "vue";
import { RecordBase } from "../../components/__shared/interfaces/dataInterfaces";

export function useState() {
  return defineState<{
    // routeId: Ref<string | string[]>;
    record: Ref<RecordBase>;
    children: Ref<RecordBase[]>;
    path: Ref<RecordBase[]>;
  }>({});
}
