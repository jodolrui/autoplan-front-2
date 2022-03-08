import { defineComponent, ref, computed, watch, reactive } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { Brick, Wall, useWall, useBrick } from "../../../wallbrick/wallbrick";
import { createBuilder } from "../../../helpers/builder";
import { useCurrent } from "../../../stores/useCurrent";

export default defineComponent({
  setup() {
    const current = useCurrent();
    const state = useState();
    state.lettersPulse = ref(0);

    const keys = [
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "ç"],
      ["shift", "z", "x", "c", "v", "b", "n", "m", "backspace"],
      ["numbers", ",", "spacebar", ".", "enter"],
    ];

    for (let row = 0; row < keys.length; row++) {
      state.letters[row] = useWall(`letters${row + 1}`);

      const { create, before, design, after, build } = createBuilder<Wall>();

      create(() => state.letters[row]);
      after((wall) => {
        wall.mount();
      });

      design((wall) => {
        let { style } = wall;
        style.set("display", "grid");
        style.set("grid-auto-rows", "40px");
        style.set("grid-gap", "3px");
        if (row <= 1)
          wall.style.set(
            "grid-template-columns",
            `repeat(${keys[row].length}, 1fr)`,
          );
        if (row === 2)
          wall.style.set(
            "grid-template-columns",
            `2fr repeat(${keys[row].length - 2}, 1fr) 2fr`,
          );
        if (row === 3)
          wall.style.set("grid-template-columns", `2fr 1fr 3fr 1fr 2fr`);

        const { create, before, design, after, build } = createBuilder<Brick>();

        create(useBrick);
        after((brick) => {
          brick.mount(wall);
        });

        const keysRow = keys[row];
        keysRow.forEach((element: string, index: number) => {
          design((brick) => {
            brick.code = element;
            brick.caption = element.length === 1 ? element : "";
            if (element === "shift") brick.icon = "fa fa-arrow-up";
            if (element === "backspace") brick.icon = "fa fa-backspace";
            if (element === "numbers") brick.caption = "123";
            if (element === "enter") brick.icon = "fa fa-check";
            const { classes, style, updated, clicked } = brick;
            classes.set("btn", true);
            classes.set("btn-key", true);
            style.set("grid-area", `1 / ${index + 1}`);
            updated(() => {
              if (brick.caption.length === 1) {
                brick.code = state.shift.value
                  ? brick.code?.toUpperCase()
                  : brick.code?.toLowerCase();
                brick.caption = state.shift.value
                  ? brick.caption?.toUpperCase()
                  : brick.caption?.toLowerCase();
              }
            });
            clicked(() => current.sendKey(brick.code));
            if (element === "shift") clicked(shift);
            if (element === "numbers") clicked(numbers);
            if (element === "enter")
              clicked(() => {
                state.current.sendKey(brick.code);
                state.current.selected.record = null;
                state.current.selected.field = null;
              });
          });
        });

        build();
      });

      build();
    }

    //* funciones
    function shift() {
      state.shift.value = !state.shift.value;
      state.letters.forEach((row: Wall) => {
        row.refreshAll();
      });
    }

    function numbers() {
      state.panel.value = "numbers";
    }
  },
});
