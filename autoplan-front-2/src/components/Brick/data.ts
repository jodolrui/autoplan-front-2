import { getCurrentInstance } from "vue";

export function useData(): {
  name: string;
  code: string;
  caption: string;
  icon: string;
  classes: Object;
  style: Object;
  gridArea: string;
  pressed: (code: string) => void;
  slot: string;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
