import { defineComponent, ref, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { Brick, Wall, useWall, useBrick } from "../../wallbrick";
import { State } from "../state";
import { createBuilder } from "../../../components/__shared/helpers/builder";

export default defineComponent({
  setup() {
    const state = exposed<State>();
    state.pulse = ref(0);
    state.test2 = useWall("test2");

    const { create, design, after, build } = createBuilder<Wall>();

    create(() => state.test2);
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
        define({ code: "button11", caption: "11" });
        style.set("grid-area", "1 / 1 / span 1 / span 1");
        clicked(() => {
          alert("clicked11");
        });
      });

      design((brick) => {
        const { define, style, setup, clicked } = brick;
        define({ code: "button22", caption: "22" });
        style.set("grid-area", "1 / 2");
        clicked(() => {
          alert("clicked22");
        });
      });

      build();
    });

    build();
  },
});
