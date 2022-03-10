import { defineComponent, onMounted, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import {
  Brick,
  Wall,
  useWall,
  useBrick,
} from "../../shared/modules/wallbrick/wallbrick";
import { useState } from "../state";
import { createBuilder } from "../../shared/helpers/builder";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const state = useState();
    state.control = useWall("control");

    const { create, design, after, build } = createBuilder<Wall>();

    create(() => state.control);
    after((wall: Wall) => {
      wall.mount();
    });

    design((wall) => {
      let { style } = wall;
      style.set("display", "flex");
      style.set("flex-direction", "row");
      style.set("flex-wrap", "nowrap");
      style.set("justify-content", "flex-end");
      style.set("align-content", "stretch");
      style.set("align-items", "flex-start");
      style.set("padding", "3px");
      style.set("gap", "3px");
      // style.set("border-bottom", "1px solid var(--border-color)");

      const { create, before, design, after, build } = createBuilder<Brick>();

      create(useBrick);
      before((brick: Brick) => {
        const { classes } = brick;
        classes.set("btn", true);
        classes.set("btn-square", true);
        classes.set("rounded-circle", true);
      });
      after((brick: Brick) => {
        brick.mount(wall);
      });

      design((brick) => {
        brick.code = "move-up";
        brick.icon = "fa fa-angle-up";
        const { clicked } = brick;
      });

      design((brick) => {
        brick.code = "move-down";
        brick.icon = "fa fa-angle-down";
        const { clicked } = brick;
      });

      design((brick) => {
        brick.code = "delete";
        brick.icon = "fa fa-trash";
        const { clicked } = brick;
      });

      design((brick) => {
        brick.code = "add";
        brick.icon = "fa fa-plus";
        const { clicked } = brick;
      });

      design((brick) => {
        brick.code = "enter";
        brick.icon = "fa fa-angle-double-right";
        const { clicked } = brick;
        clicked(() => {
          router.push({
            path: `/${state.record?.__id as string}`,
          });
        });
      });

      build();
    });

    build();
  },
});
