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
import Options from "../../Options/index.vue";

export default defineComponent({
  components: { Options },
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
      classes.set("toolbar", true);
      classes.set("is-right-justified", true);

      const { create, before, design, after, build } = createBuilder<Brick>();

      create(useBrick);
      before((brick: Brick) => {
        brick.vars.set("record", state.record);
      });
      after((brick: Brick) => {
        brick.mount(wall);
      });

      design((brick) => {
        brick.id = "move-up";
        brick.icon = "fa fa-angle-up";
        brick.component = "RoundButton";
        brick.clicked = () => {
          if (brick.vars.get("record"))
            current.moveUp(brick.vars.get("record"));
        };
      });

      design((brick) => {
        brick.id = "move-down";
        brick.icon = "fa fa-angle-down";
        brick.component = "RoundButton";
        brick.clicked = () => {
          if (brick.vars.get("record"))
            current.moveDown(brick.vars.get("record"));
        };
      });

      design((brick) => {
        brick.id = "delete";
        brick.icon = "fa fa-trash";
        brick.component = "RoundButton";
        brick.clicked = () => {
          if (brick.vars.get("record"))
            current.delete(brick.vars.get("record"));
        };
      });

      design((brick) => {
        brick.id = "add";
        brick.icon = "fa fa-plus";
        brick.component = "RoundButton";
        brick.clicked = () => {
          current.selectOn = true;
          //! tengo que crear la manera de seleccionar el designKey
          // const designKey: string = brick.vars.get("record").__designKey;
          // if (brick.vars.get("record")) {
          //   current.newRecord(
          //     brick.vars.get("record").__designKey,
          //     brick.vars.get("record"),
          //   );
          // }
        };
      });

      design((brick) => {
        brick.id = "enter";
        brick.icon = "fa fa-angle-double-right";
        brick.component = "RoundButton";
        brick.clicked = () => {
          router.push({
            path: `/${state.record?.__id as string}`,
          });
        };
      });

      build();
    });

    build();
  },
});
