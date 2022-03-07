import { defineComponent, ref, computed, watch, reactive } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";
import { Brick, Wall, useWall, useBrick } from "../../../wallbrick/wallbrick";
import { createBuilder } from "../../../helpers/builder";
import { useCurrent } from "../../../stores/useCurrent";

export default defineComponent({
  setup() {
    const current = useCurrent();
    const data = useData();
    data.symbolsPulse = ref(0);

    const keys = [
      ["$", "€", "¥", "¢", "©", "®", "#", "£", "~", "¿"],
      ["tab", "[", "]", "{", "}", "<", ">", "^", "¡"],
      ["numbers", "`", ";", "\\", "|", "¦", "¬", "backspace"],
      ["letters", "spacebar", "§", "¶", "°", "enter"],
    ];

    for (let row = 0; row < keys.length; row++) {
      data.symbols[row] = useWall(`symbols${row + 1}`);

      const { create, before, design, after, build } = createBuilder<Wall>();

      create(() => data.symbols[row]);
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
          wall.style.set("grid-template-columns", `2fr 3fr 1fr 1fr 1fr 2fr`);

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
            if (element === "tab") brick.icon = "fa fa-arrow-right";
            if (element === "shift") brick.icon = "fa fa-arrow-up";
            if (element === "backspace") brick.icon = "fa fa-backspace";
            if (element === "numbers") brick.caption = "123";
            if (element === "letters") brick.caption = "abc";
            if (element === "enter") brick.icon = "fa fa-check";
            const { classes, style, clicked } = brick;
            classes.set("btn", true);
            classes.set("btn-key", true);
            style.set("grid-area", `1 / ${index + 1}`);
            clicked(() => current.sendKey(brick.code));
            if (element === "symbols")
              clicked(() => (data.panel.value = "symbols"));
            if (element === "letters")
              clicked(() => (data.panel.value = "letters"));
          });
        });

        build();
      });

      build();
    }

    //* funciones
    function symbols() {
      data.panel.value = "symbols";
    }

    function letters() {
      data.panel.value = "letters";
    }
  },
});
