import { defineComponent, ref, computed, watch, reactive } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";
import { Brick, Wall, useWall, useBrick } from "../../../wallbrick/wallbrick";
import { createBuilder } from "../../../helpers/builder";

export default defineComponent({
  setup() {
    const data = useData();
    data.editPulse = ref(0);
    data.edit = useWall("edit");

    const { create, before, design, after, build } = createBuilder<Wall>();

    create(() => data.edit);
    after((wall: Wall) => {
      wall.mount();
    });

    design((wall) => {
      let { style } = wall;
      style.set("display", "grid");
      style.set("grid-template-columns", "repeat(10, 1fr)");
      style.set("grid-auto-rows", "40px");
      style.set("grid-gap", "3px");

      const { create, before, design, after, build } = createBuilder<Brick>();

      create(useBrick);
      before((brick: Brick) => {
        brick.classes.set("btn", true);
        brick.classes.set("btn-key", true);
      });
      after((brick: Brick) => {
        brick.mount(wall);
      });

      design((brick) => {
        brick.code = "undo";
        brick.icon = "fa fa-ellipsis-v";
        const { style, clicked } = brick;
        style.set("grid-area", "1 / 1 / span 1 / span 1");
      });

      design((brick) => {
        brick.code = "edit-box";
        brick.slot = "edit";
        const { style, clicked } = brick;
        style.set("grid-area", "1 / 2 / span 1 / span 7");
        style.set("overflow", "hidden");
        style.set("overflow-x", "auto");
        style.set("font-size", "1rem");
        style.set("box-shadow", "none");
        style.set("border-radius", "0px");
      });

      design((brick) => {
        brick.code = "cancel";
        brick.icon = "fa fa-ban";
        const { style, clicked } = brick;
        style.set("grid-area", "1 / 9 / span 1 / span 1");
      });

      design((brick) => {
        brick.code = "confirm";
        brick.icon = "fa fa-check";
        const { style, clicked } = brick;
        style.set("grid-area", "1 / 10 / span 1 / span 1");
      });

      build();
    });

    build();
  },
});
