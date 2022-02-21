import { getCurrentInstance, Ref } from "vue";
import { Format, Field, RecordBase } from "../../helpers/data-interfaces";
import { Wall } from "../../helpers/wall-brick";

export function useData(): {
  fields: Field[];
  record: { [key: string]: { value: any | null; units?: string | null } };
  control: Wall;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
