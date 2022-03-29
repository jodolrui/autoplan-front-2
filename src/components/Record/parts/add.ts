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
import Options from "../../Options/index.vue";

export default defineComponent({
  components: { Options },
  setup() {
    const current = useCurrent();
    const router = useRouter();
    const state = useState();
    state.add = useWall("add");

    const { create, design, after, build } = createBuilder<Wall>();

    create(() => state.add);
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
        brick.id = "add";
        brick.icon = "fa fa-plus";
        brick.component = "RoundButton";
        brick.updated = () => {
          brick.classes.set("s-active", state.addOn.value);
        };
        brick.clicked = () => {
          if (current.record) {
            state.addOn.value = !state.addOn.value;
          }
        };
      });

      build();
    });

    build();
  },
});
