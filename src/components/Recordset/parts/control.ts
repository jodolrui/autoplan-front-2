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
import { useRouter } from "vue-router";
import { useCurrent } from "../../shared/stores/useCurrent";
import { getDesign } from "../../designs/getDesign";

export default defineComponent({
  setup() {
    const current = useCurrent();
    const router = useRouter();
    const state = useState();
    state.control = useWall("control");

    const { create, design, after, build } = createBuilder<Wall>();

    create(() => state.control);
    after((wall: Wall) => {
      wall.mount();
    });

    design((wall) => {
      let { classes } = wall;
      classes.set("m-toolbar", true);
      classes.set("s-flex-right", true);

      const { create, before, design, after, build } = createBuilder<Brick>();

      create(useBrick);
      before((brick: Brick) => {
        const { classes } = brick;
      });
      after((brick: Brick) => {
        brick.mount(wall);
      });

      design((brick) => {
        brick.id = "add";
        brick.icon = "fa fa-plus";
        brick.component = "RoundButton";
        brick.clicked = () => {
          if (current.record) {
            const { childDesigns } = getDesign(current.record?.__designKey);
            //! tengo que crear la manera de seleccionar el designKey
            const designKey: string = childDesigns[0].designKey;
            current.newRecord(designKey);
          }
        };
      });

      build();
    });

    build();
  },
});
