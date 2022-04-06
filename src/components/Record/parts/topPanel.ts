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
import { useCurrent } from "../../shared/stores/useCurrent";
import { getDesign } from "../../designs/getDesign";
import Options from "../../Options/index.vue";

export default defineComponent({
  components: { Options },
  setup() {
    const current = useCurrent();
    const router = useRouter();
    const state = useState();
    state.topPanel = useWall("topPanel");

    const { create, design, after, build } = createBuilder<Wall>();

    create(() => state.topPanel);
    after((wall: Wall) => {
      wall.mount();
    });

    design((wall) => {
      let { classes, style } = wall;
      classes.set("m-toolbar", true);
      classes.set("s-flex-right", true);
      // classes.set("s-no-padding", true);
      style.set("margin-left", "auto");

      const { create, before, design, after, build } = createBuilder<Brick>();

      create(useBrick);
      before((brick: Brick) => {
        brick.vars.set("record", state.record);
      });
      after((brick: Brick) => {
        brick.mount(wall);
      });

      design((brick) => {
        brick.id = "record-caption";
        brick.caption = state.design.caption;
        brick.icon = state.design.icon ? state.design.icon : "";
        // brick.component = "Button";
        brick.style.set("margin-top", "3px");
      });

      design((brick) => {
        brick.id = "controls";
        brick.isSlot = true;
      });

      build();
    });

    build();
  },
});
