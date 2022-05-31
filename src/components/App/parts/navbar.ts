import { defineComponent, onMounted, ref, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { Slot, Rack, useSlot, useRack } from "@jodolrui/racket";
import { useState } from "../state";
import { createBuilder } from "@jodolrui/builder";
import { useCurrent } from "../../shared/stores/useCurrent";

export default defineComponent({
  setup() {
    const state = useState();
    state.navbar = useRack("navbar");
    const current = useCurrent();
    expose({ current });

    const { create, design, after, build } = createBuilder<Rack>();

    create(() => state.navbar);
    after((rack) => {
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
        slot.id = "toggle-keyboard";
        slot.icon = "fa fa-keyboard";
        slot.component = "RoundButton";
        slot.setup = () => {
          watch(
            () => current.keyboardOn,
            (value: boolean) => {
              slot.classes.set("s-active", value);
            },
          );
        };
        slot.clicked = () => {
          current.keyboardOn = !current.keyboardOn;
        };
      });

      design((slot) => {
        slot.id = "toggle-dark";
        slot.icon = "fa fa-adjust";
        slot.component = "RoundButton";
        slot.updated = () => {
          var body = document.body;
          slot.classes.set("s-active", body.classList.contains("dark-theme"));
        };
        slot.clicked = () => {
          var body = document.body;
          if (body.classList.contains("dark-theme"))
            body.classList.remove("dark-theme");
          else body.classList.add("dark-theme");
          slot.refresh();
        };
      });

      design((slot) => {
        slot.id = "toggle-fullscreen";
        slot.icon = "fas fa-expand";
        slot.component = "RoundButton";
        slot.updated = () => {
          slot.classes.set("s-active", document.fullscreen);
        };
        slot.clicked = () => {
          if (document.fullscreen)
            document
              .exitFullscreen()
              .then(() => {
                if (slot.refresh) slot.refresh();
              })
              .catch((error) => {});
          else {
            const element: Element | null = document.querySelector("#app");
            if (element)
              element
                .requestFullscreen()
                .then(() => {
                  if (slot.refresh) slot.refresh();
                })
                .catch((error) => {});
          }
        };
      });

      build();
    });

    build();
  },
});
