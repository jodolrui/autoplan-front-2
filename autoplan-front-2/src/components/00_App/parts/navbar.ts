import { defineComponent, onMounted, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import halfmoon from "halfmoon"; // npm install --save @types/halfmoon
import { Brick, Wall, useWall, useBrick } from "../../../wallbrick/wallbrick";
import { useData } from "../data";
import { createBuilder } from "../../../helpers/builder";

export default defineComponent({
  setup() {
    onMounted(() => {
      halfmoon.onDOMContentLoaded();
    });
    const data = useData();
    data.navbarPulse = ref(0);
    data.navbar = useWall("navbar");

    const { create, design, after, build } = createBuilder<Wall>();

    create(() => data.navbar);
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
          data.keyboardOn.value = !data.keyboardOn.value;
        });
      });

      design((brick) => {
        brick.code = "toggle-dark";
        brick.icon = "fa fa-adjust";
        const { style, setup, clicked, updated } = brick;
        updated(() => {
          brick.classes.set("btn-primary", halfmoon.darkModeOn);
        });
        clicked(() => {
          var body = document.body;
          if (body.classList.contains("dark-mode"))
            body.classList.remove("dark-mode");
          else body.classList.add("dark-mode");
        });
      });

      design((brick) => {
        brick.code = "toggle-fullscreen";
        brick.icon = "fas fa-expand";
        const { style, setup, clicked, updated } = brick;
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
