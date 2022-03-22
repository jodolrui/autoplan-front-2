import { defineComponent, onMounted, ref, watch } from "vue";
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
      let { classes } = wall;
      classes.set("m-toolbar", true);
      classes.set("s-flex-right", true);

      const { create, before, design, after, build } = createBuilder<Brick>();

      create(useBrick);
      after((brick: Brick) => {
        brick.mount(wall);
      });

      design((brick) => {
        brick.id = "toggle-keyboard";
        brick.icon = "fa fa-keyboard";
        brick.component = "RoundButton";
        brick.setup = () => {
          watch(
            () => current.keyboardOn,
            (value: boolean) => {
              brick.classes.set("s-active", value);
            },
          );
        };
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
          brick.classes.set("s-active", body.classList.contains("dark-theme"));
        };
        brick.clicked = () => {
          var body = document.body;
          if (body.classList.contains("dark-theme"))
            body.classList.remove("dark-theme");
          else body.classList.add("dark-theme");
          brick.refresh();
        };
      });

      design((brick) => {
        brick.id = "toggle-fullscreen";
        brick.icon = "fas fa-expand";
        brick.component = "RoundButton";
        brick.updated = () => {
          brick.classes.set("s-active", document.fullscreen);
        };
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
