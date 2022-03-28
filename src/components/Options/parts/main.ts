import { defineComponent, Ref, ref, onMounted } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import {
  Wall,
  Brick,
  useWall,
  useBrick,
} from "../../shared/modules/wallbrick/wallbrick";
import { createBuilder } from "../../shared/helpers/builder";
import { useCurrent } from "../../shared/stores/useCurrent";
import { Option } from "../../shared/interfaces/general";

export default defineComponent({
  emits: ["selected"],
  setup(props) {
    const current = useCurrent();
    const state = useState();

    state.options = useWall("options");

    const { create, design, after, build } = createBuilder<Wall>();

    create(() => state.options);
    after((wall: Wall) => {
      wall.mount();
    });

    design((wall) => {
      let { classes } = wall;
      classes.set("m-toolbar", true);

      const { create, before, design, after, build } = createBuilder<Brick>();

      create(useBrick);
      after((brick: Brick) => {
        brick.mount(wall);
      });

      design((brick) => {
        brick.id = "close";
        // brick.caption = "Cerrar";
        brick.icon = "fa fa-close";
        brick.component = "RoundButton";
        brick.clicked = () => {
          current.optionsOn = false;
        };
      });

      current.options.forEach((element: Option) => {
        design((brick) => {
          brick.id = element.key as string;
          brick.caption = element.caption as string;
          brick.component = "Button";
        });
      });

      build();
    });

    build();
  },
});
