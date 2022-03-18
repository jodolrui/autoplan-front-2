import { defineComponent, onMounted, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import {
  Brick,
  Wall,
  useWall,
  useBrick,
} from "../../shared/modules/wallbrick/wallbrick";
import { useState } from "../state";
import { RecordBase } from "../../shared/interfaces/dataInterfaces";
import { createBuilder } from "../../shared/helpers/builder";
import { useRouter } from "vue-router";
import { useCurrent } from "../../shared/stores/useCurrent";

export default defineComponent({
  setup() {
    const router = useRouter();
    const state = useState();
    const current = useCurrent();
    state.breadcrumbs = useWall("breadcrumbs");

    const { create, design, after, build } = createBuilder<Wall>();

    create(() => state.breadcrumbs);
    after((wall: Wall) => {
      wall.mount();
    });

    design((wall) => {
      let { style } = wall;
      style.set("display", "flex");
      style.set("flex-direction", "row");
      style.set("flex-wrap", "wrap");
      style.set("justify-content", "flex-start");
      style.set("align-content", "stretch");
      style.set("align-items", "flex-start");
      style.set("padding", "3px");
      style.set("gap", "3px");
      style.set("border-bottom", "1px solid var(--border-color)");

      const { create, before, design, after, build } = createBuilder<Brick>();

      create(useBrick);
      before((brick: Brick) => {
        const { classes } = brick;
        classes.set("btn", true);
      });
      after((brick: Brick) => {
        brick.mount(wall);
      });

      //* root
      design((brick) => {
        brick.id = "root";
        brick.icon = "fas fa-home";
        brick.classes.set("btn-square", true);
        brick.classes.set("rounded-circle", true);
        brick.clicked = () => {
          router.push({ path: `/${brick.id}` });
        };
      });

      if (current.path && current.path)
        current.path.forEach((element: RecordBase) => {
          if (element.__id !== "root")
            design((brick) => {
              brick.id = element.__id;
              brick.caption = element.__breadcrumb;
              brick.clicked = () => {
                router.push({ path: `/${brick.id}` });
              };
            });
        });

      build();
    });

    build();
  },
});