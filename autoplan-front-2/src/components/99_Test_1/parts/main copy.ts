import { defineComponent, ref, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import _Brick from "../../99_Brick/index.vue";
import _Wall from "../../99_Wall/index.vue";
import { Brick, Wall, useWall, useBrick } from "../../../helpers/wallbrick";
import { useData } from "../data";

export default defineComponent({
  components: { Brick: _Brick, Wall: _Wall },
  setup(props, context) {
    const data = useData();
    data.pulse = ref(0);
    data.wall = useWall("name1");

    const { create, design, build, onDesigned } = useBuilder<Wall>();

    create(() => data.wall);
    onDesigned((wall: Wall) => wall.mount());

    design((wall) => {
      {
        let { style } = wall;
        style.set("display", "grid");
        style.set("grid-template-columns", "repeat(10, 50px)");
        style.set("grid-gap", "3px");
        style.set("margin", "3px");
      }

      const { create, onDesigned, design, build } = useBuilder<Brick>();

      create(useBrick);
      onDesigned((brick: Brick) => brick.mount(wall));

      design(({ code, caption, classes, style, clicked }: Brick) => {
        // let { code, caption, classes, style, clicked } = brick;
        code = "button1";
        caption = "1";
        classes.set("btn", true);
        style.set("grid-area", "1 / 1 / span 1 / span 2");
        clicked(() => {
          alert("clicked1");
        });
      });

      design(({ code, caption, classes, style, setup, clicked }: Brick) => {
        // let { code, caption, classes, style, setup, clicked } = brick;
        code = "button2";
        caption = "2";
        classes.set("btn", true);
        style.set("grid-area", "1 / 3");
        setup((brick: Brick) => {
          watch(
            data.pulse,
            () => {
              brick.caption = data.pulse.value.toString();
            },
            { immediate: true },
          );
        });
        clicked(() => {
          alert("clicked2");
        });
      });

      build();
    });

    build();
  },
});

type Builder<T> = {
  create: (funct: () => T) => void;
  design: (callback: (item: T) => void) => void;
  build: () => void;
  onDesigned: (funct: (item: T) => void) => void;
};

function useBuilder<T>(): Builder<T> {
  let create: () => T;
  let onDesigned: (item: T) => void;
  const designs: ((item: T) => void)[] = [];
  return {
    create: (funct: () => T) => {
      create = funct;
    },
    onDesigned: (funct: (item: T) => void) => {
      onDesigned = funct;
    },
    design: function (funct: (item: T) => void) {
      designs.push(funct);
    },
    build: function () {
      designs.forEach((funct: (item: T) => void) => {
        let item: T = {} as T;
        if (create) item = create();
        funct(item);
        if (onDesigned) onDesigned(item);
      });
    },
  };
}
