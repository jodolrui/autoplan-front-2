import { defineComponent, ref, computed, watch, reactive } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";
import { Brick, Wall, useWall, useBrick } from "../../../wallbrick/wallbrick";
import { createBuilder } from "../../../helpers/builder";
import { symbolsConfig } from "../helpers/symbolsConfig";
import { KeyConfig } from "../helpers/KeyConfig";

export default defineComponent({
  setup() {
    const data = useData();
    data.symbolsPulse = ref(0);

    for (let i = 0; i < symbolsConfig.length; i++) {
      data.symbols[i] = useWall("symbols");
      let cols: number = 0;
      symbolsConfig[i].forEach((element: KeyConfig, j: number) => {
        cols += element.colSpan ? element.colSpan : 1;
      });

      const { create, before, design, after, build } = createBuilder<Wall>();

      create(() => data.symbols[i]);
      after((wall: Wall) => {
        wall.mount();
      });

      design((wall) => {
        let { style } = wall;
        style.set("display", "grid");
        style.set("grid-template-columns", `repeat(${cols}, 1fr)`);
        style.set("grid-auto-rows", "40px");
        style.set("grid-gap", "3px");

        let col: number = 1;
        symbolsConfig[i].forEach((element: KeyConfig, j: number) => {
          const { create, before, design, after, build } =
            createBuilder<Brick>();

          create(useBrick);
          before((brick: Brick) => {
            brick.code = element.code;
            brick.caption = element.caption as string;
            if (element.icon) brick.icon = element.icon;
            const { classes, style, updated, clicked } = brick;
            classes.set("btn", true);
            classes.set("btn-key", true);
            style.set(
              "grid-area",
              `1 / ${col} / span 1 / span ${
                element.colSpan ? element.colSpan : 1
              }`,
            );
            style.set(
              "background-color",
              element.backgroundColor
                ? element.backgroundColor
                : "var(--lm-bg-color)",
            );
            updated(() => {
              brick.caption = data.shift.value
                ? brick.caption?.toUpperCase()
                : brick.caption?.toLowerCase();
            });
            clicked(() => {
              if (brick.caption?.length === 1) {
                if (data.current.edit.value)
                  if (data.current.edit.cursor === 0) {
                    data.current.edit.value =
                      brick.caption + data.current.edit.value;
                    data.current.edit.cursor++;
                  } else if (data.current.edit.cursor) {
                    const pre = data.current.edit.value.substring(
                      0,
                      data.current.edit.cursor,
                    );
                    const post = data.current.edit.value.substring(
                      data.current.edit.cursor,
                    );
                    console.log({ pre, post });

                    data.current.edit.value = `${pre}${brick.caption}${post}`;
                    data.current.edit.cursor++;
                  } else {
                    data.current.edit.value += brick.caption;
                    data.current.edit.cursor = data.current.edit.value.length;
                  }
                else data.current.edit.value = brick.caption;
              }
              data.pulse.value++;
            });
          });
          after((brick: Brick) => {
            brick.mount(wall);
          });

          design((brick: Brick) => {
            const { clicked } = brick;
            if (brick.code === "letters")
              clicked(() => {
                data.panel.value = "letters";
              });
            if (brick.code === "numbers")
              clicked(() => {
                data.panel.value = "numbers";
              });
          });

          build();

          col += element.colSpan ? element.colSpan : 1;
        });
      });

      build();
    }
  },
});
