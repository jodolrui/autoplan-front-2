import { defineComponent, ref, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { Brick, Wall, useWall, useBrick } from "../../../helpers/wallbrick";
import { useData } from "../data";
import { createBuilder } from "../helpers/builder";

export default defineComponent({
  setup() {
    const data = useData();
    data.pulse = ref(0);
    data.test1 = useWall("test1");

    const { create, design, after, build } = createBuilder<Wall>();

    create(() => data.test1);
    after((wall: Wall) => {
      wall.mount();
    });

    design((wall) => {
      wall.style.set("display", "grid");
      wall.style.set("grid-template-columns", "repeat(10, 50px)");
      wall.style.set("grid-gap", "3px");
      wall.style.set("margin", "3px");

      const { create, before, design, after, build } = createBuilder<Brick>();

      create(useBrick);
      before((brick: Brick) => {
        brick.classes.set("btn", true);
      });
      after((brick: Brick) => {
        brick.mount(wall);
      });

      design((brick) => {
        brick.code = "button1";
        brick.caption = "1";
        brick.style.set("grid-area", "1 / 1 / span 1 / span 2");
        brick.clicked(() => {
          alert("clicked1");
        });
      });

      design((brick) => {
        brick.code = "button2";
        brick.caption = "2";
        brick.style.set("grid-area", "1 / 3");
        brick.clicked(() => {
          alert("clicked2");
        });
      });

      build();
    });

    build();

    console.log({ test1: data.test1 });
  },
});
