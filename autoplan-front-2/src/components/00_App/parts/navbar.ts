import { defineComponent, onMounted, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { Brick, Wall, useWall, useBrick } from "../../../wallbrick/wallbrick";
import { State } from "../state";
import { createBuilder } from "../../../helpers/builder";

export default defineComponent({
  setup() {
    const state = exposed<State>();
    state.navbarPulse = ref(0);
    state.navbar = useWall("navbar");

    const { create, design, after, build } = createBuilder<Wall>();

    create(() => state.navbar);
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
      style.set("border-bottom", "1px solid var(--border-color)");

      const { create, before, design, after, build } = createBuilder<Brick>();

      create(useBrick);
      before((brick: Brick) => {
        brick.classes.set("btn", true);
        brick.classes.set("btn-square", true);
        brick.classes.set("rounded-circle", true);
        brick.classes.set("btn-primary", false);
      });
      after((brick: Brick) => {
        brick.mount(wall);
      });

      design((brick) => {
        brick.code = "toggle-keyboard";
        brick.icon = "fa fa-keyboard";
        const { style, setup, clicked, updated } = brick;
        clicked(() => {
          state.current.keyboardOn = !state.current.keyboardOn;
        });
      });

      design((brick) => {
        brick.code = "toggle-dark";
        brick.icon = "fa fa-adjust";
        const { clicked, updated } = brick;
        updated(() => {
          var body = document.body;
          brick.classes.set(
            "btn-primary",
            body.classList.contains("dark-mode"),
          );
        });
        clicked(() => {
          var body = document.body;
          if (body.classList.contains("dark-mode"))
            body.classList.remove("dark-mode");
          else body.classList.add("dark-mode");
          brick.refresh();
        });
      });

      design((brick) => {
        brick.code = "toggle-fullscreen";
        brick.icon = "fas fa-expand";
        const { clicked } = brick;
        clicked(() => {
          if (document.fullscreen)
            document
              .exitFullscreen()
              .then(() => {
                if (brick.refresh) brick.refresh();
              })
              .catch((error) => {});
          else {
            const element: Element | null = document.querySelector("#app");
            if (element)
              element
                .requestFullscreen()
                .then(() => {
                  if (brick.refresh) brick.refresh();
                })
                .catch((error) => {});
          }
        });
      });

      build();
    });

    build();
  },
});
