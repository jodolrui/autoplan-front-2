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
    state.topPanel = useRack("topPanel");

    const { create, design, after, build } = createBuilder<Rack>();

    create(() => state.topPanel);
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
        slot.id = "record-caption";
        slot.caption = state.design.caption;
        slot.icon = state.design.icon ? state.design.icon : "";
        // slot.component = "Button";
        slot.style.set("margin-top", "3px");
        slot.clicked = () => {
          current.logDelta();
        };
      });

      design((slot) => {
        slot.id = "controls";
        slot.name = "controls";
      });

      build();
    });

    build();
  },
});
