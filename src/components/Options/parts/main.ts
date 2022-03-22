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

export default defineComponent({
  props: {
    items: { type: Array, required: true },
  },
  emits: ["selected"],
  setup(props) {
    const current = useCurrent();
    const state = useState();
    state.items = props.items as Object[];

    state.options = useWall("options");

    const { create, design, after, build } = createBuilder<Wall>();

    create(() => state.options);
    after((wall: Wall) => {
      wall.mount();
    });

    design((wall) => {
      let { style } = wall;
      style.set("display", "flex");
      style.set("flex-direction", "row");
      style.set("flex-wrap", "nowrap");
      style.set("justify-content", "flex-start");
      style.set("align-content", "stretch");
      style.set("align-items", "flex-start");
      style.set("padding", "3px");
      style.set("gap", "3px");
      style.set("border-bottom", "1px solid var(--border-color)");

      const { create, before, design, after, build } = createBuilder<Brick>();

      create(useBrick);
      before((brick: Brick) => {
        // brick.classes.set("btn", true);
        // brick.classes.set("btn-square", true);
        // brick.classes.set("rounded-circle", true);
      });
      after((brick: Brick) => {
        brick.mount(wall);
      });

      design((brick) => {
        brick.id = "close";
        brick.caption = "Cerrar";
        brick.clicked = () => {
          current.selectOn = false;
        };
      });

      state.items.forEach((element: Object) => {
        design((brick) => {
          brick.id = element as string;
          brick.caption = element as string;
          // brick.component = "RoundButton";
        });

        build();
      });
    });

    build();
  },
});
