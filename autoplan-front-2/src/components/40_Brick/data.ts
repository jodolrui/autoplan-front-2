import { getCurrentInstance } from "vue";
import { Brick } from "../../helpers/wall-brick";

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
  item: Brick;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
