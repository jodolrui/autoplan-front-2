import { defineComponent, ref, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { Brick, Wall, useWall, useBrick } from "../../wallbrick";
import { useState } from "../state";
import { createBuilder } from "../../../helpers/builder";

export default defineComponent({
  setup() {
    const state = useState();
    state.pulse = ref(0);
    state.test1 = useWall("test1");

    const { create, design, after, build } = createBuilder<Wall>();

    create(() => state.test1);
    after((wall: Wall) => {
      wall.mount();
    });

    design((wall) => {
      let { style } = wall;
      style.set("display", "grid");
      style.set("grid-template-columns", "repeat(10, 50px)");
      style.set("grid-gap", "3px");
      style.set("margin", "3px");

      const { create, before, design, after, build } = createBuilder<Brick>();

      create(useBrick);
      before((brick: Brick) => {
        brick.classes.set("btn", true);
      });
      after((brick: Brick) => {
        brick.mount(wall);
      });

      design((brick) => {
        const { define, style, clicked } = brick;
        define({ code: "button1", caption: "1" });
        style.set("grid-area", "1 / 1 / span 1 / span 2");
        clicked(() => {
          alert("clicked1");
        });
      });

      design((brick) => {
        const { define, style, setup, clicked } = brick;
        define({ code: "button2", caption: "2" });
        style.set("grid-area", "1 / 3");
        clicked(() => {
          alert("clicked2");
        });
      });

      build();
    });

    build();
  },
});
