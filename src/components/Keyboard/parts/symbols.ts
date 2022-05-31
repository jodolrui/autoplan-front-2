import { defineComponent, ref, computed, watch, reactive } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { Slot, Rack, useRack, useSlot } from "@jodolrui/racket";
import { createBuilder } from "@jodolrui/builder";
import { useCurrent } from "../../shared/stores/useCurrent";

export default defineComponent({
  setup() {
    const current = useCurrent();
    const state = useState();

    const keys = [
      ["$", "€", "¥", "¢", "©", "®", "#", "£", "~", "¿"],
      ["tab", "[", "]", "{", "}", "<", ">", "^", "¡"],
      ["numbers", "`", ";", "\\", "|", "¦", "¬", "backspace"],
      ["letters", "spacebar", "§", "¶", "°", "enter"],
    ];

    for (let row = 0; row < keys.length; row++) {
      state.symbols[row] = useRack(`symbols${row + 1}`);

      const { create, before, design, after, build } = createBuilder<Rack>();

      create(() => state.symbols[row]);
      after((rack) => {
        rack.mount();
      });

      design((rack) => {
        let { classes } = rack;
        classes.set("m-keyboard__panel", true);
        if (row <= 1)
          rack.style.set(
            "grid-template-columns",
            `repeat(${keys[row].length}, 1fr)`,
          );
        if (row === 2)
          rack.style.set(
            "grid-template-columns",
            `2fr repeat(${keys[row].length - 2}, 1fr) 2fr`,
          );
        if (row === 3)
          rack.style.set("grid-template-columns", `2fr 3fr 1fr 1fr 1fr 2fr`);

        const { create, before, design, after, build } = createBuilder<Slot>();

        create(useSlot);
        after((slot) => {
          slot.mount(rack);
        });

        const keysRow = keys[row];
        keysRow.forEach((element: string, index: number) => {
          design((slot) => {
            slot.id = element;
            slot.caption = element.length === 1 ? element : "";
            if (element === "tab") slot.icon = "fa fa-arrow-right";
            if (element === "shift") slot.icon = "fa fa-arrow-up";
            if (element === "backspace") slot.icon = "fa fa-backspace";
            if (element === "numbers") slot.caption = "123";
            if (element === "letters") slot.caption = "abc";
            if (element === "enter") slot.icon = "fa fa-check";
            let { classes, style } = slot;
            classes.set("m-keyboard__key", true);
            style.set("grid-area", `1 / ${index + 1}`);
            slot.clicked = () => current.sendKey(slot.id, slot.caption);
            if (element === "symbols")
              slot.clicked = () => (state.panel.value = "symbols");
            if (element === "letters")
              slot.clicked = () => (state.panel.value = "letters");
          });
        });

        build();
      });

      build();
    }

    //* funciones
    function symbols() {
      state.panel.value = "symbols";
    }

    function letters() {
      state.panel.value = "letters";
    }
  },
});
