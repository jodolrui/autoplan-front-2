import { defineComponent, Ref, ref, onMounted } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { Rack, Slot, useRack, useSlot } from "@jodolrui/racket";
import { createBuilder } from "@jodolrui/builder";
import { useCurrent } from "../../shared/stores/useCurrent";
import { Option } from "../../shared/interfaces/general";

export default defineComponent({
  emits: ["selected"],
  setup(props) {
    const current = useCurrent();
    const state = useState();

    state.options = useRack("options");

    const { create, design, after, build } = createBuilder<Rack>();

    create(() => state.options);
    after((rack: Rack) => {
      rack.mount();
    });

    design((rack) => {
      let { classes } = rack;
      classes.set("m-toolbar", true);

      const { create, before, design, after, build } = createBuilder<Slot>();

      create(useSlot);
      after((slot: Slot) => {
        slot.mount(rack);
      });

      design((slot) => {
        slot.id = "close";
        // slot.caption = "Cerrar";
        slot.icon = "fa fa-close";
        slot.component = "RoundButton";
        slot.clicked = () => {
          current.optionsOn = false;
        };
      });

      current.options.forEach((element: Option) => {
        design((slot) => {
          slot.id = element.key as string;
          slot.caption = element.caption as string;
          slot.component = "Button";
        });
      });

      build();
    });

    build();
  },
});
