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
    data.lettersPulse = ref(0);

    const keys = [
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "ç"],
      ["shift", "z", "x", "c", "v", "b", "n", "m", "backspace"],
      ["numbers", ",", "spacebar", ".", "enter"],
    ];

    for (let row = 0; row < keys.length; row++) {
      data.letters[row] = useWall(`letters${row + 1}`);

      const { create, before, design, after, build } = createBuilder<Wall>();

      create(() => data.letters[row]);
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
              brick.caption = data.shift.value
                ? brick.caption?.toUpperCase()
                : brick.caption?.toLowerCase();
            });
            if (element.length === 1) clicked(typeKey);
            if (element === "shift") clicked(shift);
            if (element === "backspace") clicked(backspace);
            if (element === "numbers") clicked(numbers);
          });
        });

        build();
      });

      build();
    }

    //* funciones
    function typeKey(brick: Brick) {
      if (brick.caption?.length === 1) {
        if (current.edit.value)
          if (current.edit.cursor === 0) {
            current.edit.value = brick.caption + current.edit.value;
            current.edit.cursor++;
          } else if (current.edit.cursor) {
            const pre = current.edit.value.substring(0, current.edit.cursor);
            const post = current.edit.value.substring(current.edit.cursor);
            current.edit.value = `${pre}${brick.caption}${post}`;
            current.edit.cursor++;
          } else {
            current.edit.value += brick.caption;
            current.edit.cursor = current.edit.value.length;
          }
        else current.edit.value = brick.caption;
      }
    }

    function shift() {
      data.shift.value = !data.shift.value;
      data.letters.forEach((row: Wall) => {
        row.refresh();
        row.bricks.forEach((brick: Brick) => {
          brick.refresh();
        });
      });
    }

    function backspace() {
      const value = current.edit.value;
      let cursor = current.edit.cursor;
      if (value) {
        if (cursor) {
          const pre = value.substring(0, (cursor as number) - 1);
          const post = value.substring(cursor as number);
          current.edit.value = `${pre}${post}`;
          if (cursor > 0) (current.edit.cursor as number)--;
        } else {
          current.edit.value = value.substring(0, value.length - 1);
          current.edit.cursor = current.edit.value.length;
        }
      }
    }

    function numbers() {
      data.panel.value = "numbers";
    }
  },
});
