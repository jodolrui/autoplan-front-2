import { defineComponent, onMounted, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { Slot, Rack, useRack, useSlot } from "@jodolrui/racket";
import { useState } from "../state";
import { createBuilder } from "@jodolrui/builder";
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
      let { classes } = rack;
      classes.set("m-toolbar", true);
      classes.set("s-flex-right", true);

      const { create, before, design, after, build } = createBuilder<Slot>();

      create(useSlot);
      after((slot: Slot) => {
        slot.mount(rack);
      });

      design((slot) => {
        slot.id = "add";
        slot.icon = "fa fa-plus";
        slot.component = "RoundButton";
        slot.updated = () => {
          slot.classes.set("s-active", state.addOn.value);
        };
        slot.clicked = () => {
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
