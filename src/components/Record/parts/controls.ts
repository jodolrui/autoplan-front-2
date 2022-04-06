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
    state.controls = useWall("controls");

    const { create, design, after, build } = createBuilder<Wall>();

    create(() => state.controls);
    after((wall: Wall) => {
      wall.mount();
    });

    design((wall) => {
      let { classes, style } = wall;
      classes.set("m-toolbar", true);
      classes.set("s-flex-right", true);
      // classes.set("s-no-padding", true);
      style.set("margin-left", "auto");

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
          if (confirm(`Se borrará el registro. ¿Desea continuar?`)) {
            if (brick.vars.get("record"))
              current.delete(brick.vars.get("record"));
          }
        };
      });

      design((brick) => {
        brick.id = "add";
        brick.icon = "fa fa-plus";
        brick.component = "RoundButton";
        brick.updated = () => {
          brick.classes.set("s-active", state.insertOn.value);
        };
        brick.clicked = () => {
          if (current.record) {
            state.insertOn.value = !state.insertOn.value;
          }
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