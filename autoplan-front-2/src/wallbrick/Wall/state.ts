import { getCurrentInstance, ComputedRef, Ref } from "vue";
import { Wall, Brick } from "../wallbrick";

export function useState(): {
  config: Wall;
  classes: ComputedRef<{ [key: string]: any }>;
  style: ComputedRef<{ [key: string]: any }>;
  bricks: ComputedRef<{ [key: string]: Brick }>;
} {
  return getCurrentInstance()?.glueInstance.exposed();
}
