import { defineComponent, onMounted, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { Brick, Wall, useWall, useBrick } from "../../../wallbrick/wallbrick";
import { State } from "../state";
import { RecordBase } from "../../__shared/interfaces/dataInterfaces";
import { createBuilder } from "../../__shared/helpers/builder";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const state = exposed<State>();
    state.breadcrumbsPulse = ref(0);
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
        brick.code = "root";
        brick.icon = "fas fa-home";
        const { classes, clicked } = brick;
        classes.set("btn-square", true);
        classes.set("rounded-circle", true);
        clicked(() => {
          router.push({ path: `/${brick.code}` });
        });
      });

      if (state.current.path && state.current.path)
        state.current.path.forEach((element: RecordBase) => {
          if (element.__id !== "root")
            design((brick) => {
              brick.code = element.__id;
              brick.caption = element.__breadcrumb;
              const { clicked } = brick;
              clicked(() => {
                router.push({ path: `/${brick.code}` });
              });
            });
        });

      build();
    });

    build();
  },
});
