import { defineComponent, ref, computed, watch, reactive } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { Slot, Rack, useRack, useSlot } from "@jodolrui/racket";
import { createBuilder } from "../../shared/helpers/builder";
import { useCurrent } from "../../shared/stores/useCurrent";

export default defineComponent({
  setup() {
    const current = useCurrent();
    const state = useState();

    // const keys = [
    //   ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "ç", "`"],
    //   ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "¨", "´"],
    //   ["shift", "z", "x", "c", "v", "b", "n", "m", "'", "backspace"],
    //   ["numbers", "·", "spacebar", "-", "enter"],
    // ];

    const keys = [
      ["@", "#", "/", "-", "·", "'", "`", "´", "¨", "ç"],
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
      ["shift", "z", "x", "c", "v", "b", "n", "m", "backspace"],
      ["numbers", ",", "spacebar", ".", "enter"],
    ];

    for (let row = 0; row < keys.length; row++) {
      state.letters[row] = useRack(`letters${row + 1}`);

      const { create, before, design, after, build } = createBuilder<Rack>();

      create(() => state.letters[row]);
      after((rack) => {
        rack.mount();
      });

      design((rack) => {
        let { classes } = rack;
        classes.set("m-keyboard__panel", true);
        if (row <= 2)
          rack.style.set(
            "grid-template-columns",
            `repeat(${keys[row].length}, 1fr)`,
          );
        if (row === 3)
          rack.style.set(
            "grid-template-columns",
            `2fr repeat(${keys[row].length - 2}, 1fr) 2fr`,
          );
        if (row === 4)
          rack.style.set("grid-template-columns", `2fr 1fr 5fr 1fr 2fr`);

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
            if (element === "shift") slot.icon = "fa fa-arrow-up";
            if (element === "backspace") slot.icon = "fa fa-backspace";
            if (element === "numbers") slot.caption = "123";
            if (element === "enter") slot.icon = "fa fa-check";
            if (element === "left") slot.icon = "fa fa-caret-left";
            if (element === "up") slot.icon = "fa fa-caret-up";
            if (element === "down") slot.icon = "fa fa-caret-down";
            if (element === "right") slot.icon = "fa fa-caret-right";
            let { classes, style, vars } = slot;
            classes.set("m-keyboard__key", true);
            if ("abcdefghijklmnopqrstuvwxyzñç".includes(element))
              classes.set("m-keyboard__key--letter", true);
            style.set("grid-area", `1 / ${index + 1}`);
            vars.set("type", element.toLowerCase());
            slot.updated = () => {
              if (slot.id.length === 1) {
                // if ("aeiou".includes(slot.id)) {
                //   slot.caption = "aeiou".charAt("aeiou".indexOf(slot.id));
                //   if (state.acuteAccent.value)
                //     slot.caption = "áéíóú".charAt("aeiou".indexOf(slot.id));
                //   if (state.graveAccent.value)
                //     slot.caption = "àèìòù".charAt("aeiou".indexOf(slot.id));
                //   if (state.dieresis.value)
                //     slot.caption = "äëïöü".charAt("aeiou".indexOf(slot.id));
                // }
                if ("aeiou".includes(slot.id)) {
                  slot.vars.set(
                    "type",
                    "aeiou".charAt("aeiou".indexOf(slot.id)),
                  );
                  if (state.acuteAccent.value)
                    slot.vars.set(
                      "type",
                      "áéíóú".charAt("aeiou".indexOf(slot.id)),
                    );
                  if (state.graveAccent.value)
                    slot.vars.set(
                      "type",
                      "àèìòù".charAt("aeiou".indexOf(slot.id)),
                    );
                  if (state.dieresis.value)
                    slot.vars.set(
                      "type",
                      "äëïöü".charAt("aeiou".indexOf(slot.id)),
                    );
                }
                if (state.shift.value) {
                  slot.vars.set("type", slot.vars.get("type").toUpperCase());
                } else {
                  slot.vars.set("type", slot.vars.get("type").toLowerCase());
                }
                if (slot.id === "´")
                  slot.style.set(
                    "background-color",
                    state.acuteAccent.value ? "var(--active-color)" : "inherit",
                  );
                if (slot.id === "`")
                  slot.style.set(
                    "background-color",
                    state.graveAccent.value ? "var(--active-color)" : "inherit",
                  );
                if (slot.id === "¨")
                  slot.style.set(
                    "background-color",
                    state.dieresis.value ? "var(--active-color)" : "inherit",
                  );
                if (slot.id === "shift")
                  slot.style.set(
                    "background-color",
                    state.shift.value ? "var(--active-color)" : "inherit",
                  );
              }
            };
            slot.clicked = () => {
              typeKey(slot);
            };
            if (element === "shift") slot.clicked = shift;
            if (element === "`") slot.clicked = graveAccent;
            if (element === "´") slot.clicked = acuteAccent;
            if (element === "¨") slot.clicked = dieresis;
            if (element === "numbers") slot.clicked = numbers;
            if (element === "enter")
              slot.clicked = () => {
                typeKey(slot);
              };
            if (element === "left")
              slot.clicked = () => {
                if (current.edit.cursor > 0) current.edit.cursor--;
              };
            if (element === "right")
              slot.clicked = () => {
                if (current.edit.cursor < current.edit.value.length)
                  current.edit.cursor++;
              };
          });
        });

        build();
      });

      build();
    }

    //* funciones
    function animatePressed(slot: Slot) {
      slot.classes.set("s-pressed", true);
      setTimeout(() => {
        slot.classes.set("s-pressed", false);
      }, 200);
    }

    function typeKey(slot: Slot) {
      animatePressed(slot);
      current.sendKey(slot.id, slot.vars.get("type"));
      state.acuteAccent.value = false;
      state.graveAccent.value = false;
      state.dieresis.value = false;
      setTimeout(() => {
        state.shift.value = false;
      }, 200); // 200 ms para que la animación de la tecla se complete
      state.letters.forEach((row: Rack) => {
        row.refreshAll();
      });
    }

    function shift(slot: Slot) {
      animatePressed(slot);
      state.shift.value = !state.shift.value;
      state.letters.forEach((row: Rack) => {
        row.refreshAll();
      });
    }

    watch(state.shift, () => {
      const letters: HTMLCollectionOf<Element> =
        document.getElementsByClassName("m-keyboard__key--letter");
      for (let i = 0; i < letters.length; i++) {
        if (state.shift.value) letters[i].classList.add("s-uppercase");
        else letters[i].classList.remove("s-uppercase");
      }
    });

    function numbers() {
      state.panel.value = "numbers";
    }

    function acuteAccent(slot: Slot) {
      animatePressed(slot);
      state.acuteAccent.value = !state.acuteAccent.value;
      state.graveAccent.value = false;
      state.dieresis.value = false;
      state.letters.forEach((row: Rack) => {
        row.refreshAll();
      });
    }

    function graveAccent(slot: Slot) {
      animatePressed(slot);
      state.graveAccent.value = !state.graveAccent.value;
      state.acuteAccent.value = false;
      state.dieresis.value = false;
      state.letters.forEach((row: Rack) => {
        row.refreshAll();
      });
    }

    function dieresis(slot: Slot) {
      animatePressed(slot);
      state.dieresis.value = !state.dieresis.value;
      state.acuteAccent.value = false;
      state.graveAccent.value = false;
      state.letters.forEach((row: Rack) => {
        row.refreshAll();
      });
    }
  },
});
