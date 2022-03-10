import { defineComponent, ref, computed, watch, reactive } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import {
  Brick,
  Wall,
  useWall,
  useBrick,
} from "../../shared/modules/wallbrick/wallbrick";
import { createBuilder } from "../../shared/helpers/builder";
import { useCurrent } from "../../shared/stores/useCurrent";

export default defineComponent({
  setup() {
    const current = useCurrent();
    const state = useState();

    const keys = [
      ["#", "€", "&", "_", "-", "1", "2", "3", "?", "*"],
      ["@", "(", ")", "=", "+", "4", "5", "6", "!", '"'],
      ["symbols", ":", "%", "/", "7", "8", "9", "backspace"],
      ["letters", "'", "spacebar", ",", "0", ".", "enter"],
    ];

    for (let row = 0; row < keys.length; row++) {
      state.numbers[row] = useWall(`numbers${row + 1}`);

      const { create, before, design, after, build } = createBuilder<Wall>();

      create(() => state.numbers[row]);
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
          wall.style.set(
            "grid-template-columns",
            `2fr 1fr 2fr 1fr 1fr 1fr 2fr`,
          );

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
            if (element === "symbols") brick.caption = "{@=";
            if (element === "letters") brick.caption = "abc";
            if (element === "enter") brick.icon = "fa fa-check";
            const { classes, style, clicked } = brick;
            classes.set("btn", true);
            classes.set("btn-key", true);
            style.set("grid-area", `1 / ${index + 1}`);
            clicked(() => current.sendKey(brick.code, brick.caption));
            if (element === "symbols") clicked(symbols);
            if (element === "letters") clicked(letters);
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
