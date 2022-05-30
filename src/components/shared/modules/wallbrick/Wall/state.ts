import { defineState } from "@jodolrui/glue";
import { ComputedRef, Ref } from "vue";
import { Wall, Brick } from "../wallbrick";

export function useState() {
  return defineState<{
    config: Wall;
    bricks: ComputedRef<{ [key: string]: Brick }>;
  }>({});
}
