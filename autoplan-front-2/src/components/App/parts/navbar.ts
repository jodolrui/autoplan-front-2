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
import { useCurrent } from "../../shared/stores/useCurrent";

export default defineComponent({
  setup() {
    const state = useState();
    state.navbar = useWall("navbar");
    const current = useCurrent();
    expose({ current });

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
        brick.id = "toggle-keyboard";
        brick.icon = "fa fa-keyboard";
        brick.component = "RoundButton";
        brick.clicked = () => {
          current.keyboardOn = !current.keyboardOn;
        };
      });

      design((brick) => {
        brick.id = "toggle-dark";
        brick.icon = "fa fa-adjust";
        brick.component = "RoundButton";
        brick.updated = () => {
          var body = document.body;
          brick.classes.set(
            "btn-primary",
            body.classList.contains("dark-mode"),
          );
        };
        brick.clicked = () => {
          var body = document.body;
          if (body.classList.contains("dark-mode"))
            body.classList.remove("dark-mode");
          else body.classList.add("dark-mode");
          brick.refresh();
        };
      });

      design((brick) => {
        brick.id = "toggle-fullscreen";
        brick.icon = "fas fa-expand";
        brick.component = "RoundButton";
        brick.clicked = () => {
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
        };
      });

      build();
    });

    build();
  },
});
