import { defineComponent, ref, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import _Brick from "../../99_Brick/index.vue";
import _Wall from "../../99_Wall/index.vue";
import { Brick, Wall, useWall, useBrick } from "../../../helpers/wallbrick";
import { useData } from "../data";

export default defineComponent({
  components: { Brick: _Brick, Wall: _Wall },
  setup() {
    const data = useData();
    data.pulse = ref(0);
    data.wall = useWall("name1");

    const { create, design, after, build } = builder<Wall>();

    create(() => data.wall);
    after((wall: Wall) => wall.mount());

    design((wall) => {
      {
        let { style } = wall;
        style.set("display", "grid");
        style.set("grid-template-columns", "repeat(10, 50px)");
        style.set("grid-gap", "3px");
        style.set("margin", "3px");
      }

      const { create, before, design, after, build } = builder<Brick>();

      create(useBrick);
      before((brick: Brick) => {
        brick.classes.set("btn", true);
      });
      after((brick: Brick) => brick.mount(wall));

      if (true)
        design((brick) => {
          const { define, style, clicked } = brick;
          define({ code: "button1", caption: "1" });
          style.set("grid-area", "1 / 1 / span 1 / span 2");
          clicked(() => {
            alert("clicked1");
          });
        });

      if (true)
        design((brick) => {
          const { define, style, setup, clicked } = brick;
          define({ code: "button2", caption: "2" });
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
  before: (funct: (item: T) => void) => void;
  design: (funct: (item: T) => void) => void;
  after: (funct: (item: T) => void) => void;
  predesign: (funct: (create: () => T) => T | void) => void;
  build: () => void;
};

// const builders: Builder<any>[] = [];

function builder<T>(): Builder<T> {
  type Create = (create: () => T) => T | void;
  type Item = (item: T) => void;
  type Stored = {
    isPredesign: boolean;
    funct: Create | Item;
  };

  let create: () => T;
  let before: (item: T) => void;
  let after: (item: T) => void;
  const stored: Stored[] = [];
  const item = {
    create: (funct: () => T) => {
      create = funct;
    },
    predesign: (funct: (create: () => T) => T | void) => {
      stored.push({ isPredesign: true, funct });
    },
    before: (funct: (item: T) => void) => {
      before = funct;
    },
    design: (funct: (item: T) => void) => {
      stored.push({ isPredesign: false, funct });
    },
    after: (funct: (item: T) => void) => {
      after = funct;
    },
    build: () => {
      let item: T | void | null = null;
      stored.forEach((element: Stored) => {
        if (element.isPredesign) {
          item = (element.funct as Create)(create);
        } else {
          if (!item) if (create) item = create();
          if (item) {
            if (before) before(item);
            (element.funct as Item)(item);
            if (after) after(item);
            item = null;
          }
        }
      });
    },
  };
  // builders.push(item);
  // console.log({ builders });

  // return builders.at(builders.length - 1) as Builder<T>;
  return item;
}
