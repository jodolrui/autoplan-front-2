import { defineComponent, onMounted, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { RecordBase } from "../../shared/interfaces/dataInterfaces";
import { createBuilder } from "../../shared/helpers/builder";
import { useRouter } from "vue-router";
import { useCurrent } from "../../shared/stores/useCurrent";
import { Rack, useRack, Slot, useSlot } from "@jodolrui/racket";

export default defineComponent({
  setup() {
    const router = useRouter();
    const state = useState();
    const current = useCurrent();
    state.breadcrumbs = useRack("breadcrumbs");

    const { create, design, after, build } = createBuilder<Rack>();

    create(() => state.breadcrumbs);
    after((rack: Rack) => {
      rack.mount();
    });

    design((rack) => {
      let { classes } = rack;
      classes.set("m-toolbar", true);

      const { create, before, design, after, build } = createBuilder<Slot>();

      create(useSlot);
      before((slot: Slot) => {
        const { classes } = slot;
      });
      after((slot: Slot) => {
        slot.mount(rack);
      });

      //* root
      design((slot) => {
        slot.id = "root";
        slot.icon = "fas fa-home";
        slot.component = "RoundButton";
        slot.clicked = () => {
          router.push({ path: `/${slot.id}` });
        };
      });

      if (current.path && current.path)
        current.path.forEach((element: RecordBase) => {
          if (element.__id !== "root")
            design((slot) => {
              slot.id = element.__id;
              slot.caption = element.__breadcrumb;
              slot.component = "Button";
              slot.clicked = () => {
                router.push({ path: `/${slot.id}` });
              };
            });
        });

      build();
    });

    build();
  },
});
