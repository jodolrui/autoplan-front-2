import { getCurrentInstance, ComputedRef } from "vue";
import { Brick } from "../wallbrick";

export function useData(): {
  config: Brick;
  classes: ComputedRef<{ [key: string]: any }>;
  style: ComputedRef<{ [key: string]: any }>;
  clicked: () => void;
  pulse: number;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
