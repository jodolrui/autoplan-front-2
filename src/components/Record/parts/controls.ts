import { defineComponent, onMounted, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { Slot, Rack, useRack, useSlot } from "@jodolrui/racket";
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
    state.controls = useRack("controls");

    const { create, design, after, build } = createBuilder<Rack>();

    create(() => state.controls);
    after((rack: Rack) => {
      rack.mount();
    });

    design((rack) => {
      let { classes, style } = rack;
      classes.set("m-toolbar", true);
      classes.set("s-flex-right", true);
      // classes.set("s-no-padding", true);
      style.set("margin-left", "auto");

      const { create, before, design, after, build } = createBuilder<Slot>();

      create(useSlot);
      before((slot: Slot) => {
        slot.vars.set("record", state.record);
      });
      after((slot: Slot) => {
        slot.mount(rack);
      });

      design((slot) => {
        slot.id = "move-up";
        slot.icon = "fa fa-angle-up";
        slot.component = "RoundButton";
        slot.clicked = () => {
          if (slot.vars.get("record")) current.moveUp(slot.vars.get("record"));
        };
      });

      design((slot) => {
        slot.id = "move-down";
        slot.icon = "fa fa-angle-down";
        slot.component = "RoundButton";
        slot.clicked = () => {
          if (slot.vars.get("record"))
            current.moveDown(slot.vars.get("record"));
        };
      });

      design((slot) => {
        slot.id = "delete";
        slot.icon = "fa fa-trash";
        slot.component = "RoundButton";
        slot.clicked = () => {
          if (confirm(`Se borrará el registro. ¿Desea continuar?`)) {
            if (slot.vars.get("record"))
              current.delete(slot.vars.get("record"));
          }
        };
      });

      design((slot) => {
        slot.id = "add";
        slot.icon = "fa fa-plus";
        slot.component = "RoundButton";
        slot.updated = () => {
          slot.classes.set("s-active", state.insertOn.value);
        };
        slot.clicked = () => {
          if (current.record) {
            state.insertOn.value = !state.insertOn.value;
          }
        };
      });

      design((slot) => {
        slot.id = "enter";
        slot.icon = "fa fa-angle-double-right";
        slot.component = "RoundButton";
        slot.clicked = () => {
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
