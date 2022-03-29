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
      state.letters[row] = useWall(`letters${row + 1}`);

      const { create, before, design, after, build } = createBuilder<Wall>();

      create(() => state.letters[row]);
      after((wall) => {
        wall.mount();
      });

      design((wall) => {
        let { classes } = wall;
        classes.set("m-keyboard__panel", true);
        if (row <= 2)
          wall.style.set(
            "grid-template-columns",
            `repeat(${keys[row].length}, 1fr)`,
          );
        if (row === 3)
          wall.style.set(
            "grid-template-columns",
            `2fr repeat(${keys[row].length - 2}, 1fr) 2fr`,
          );
        if (row === 4)
          wall.style.set("grid-template-columns", `2fr 1fr 5fr 1fr 2fr`);

        const { create, before, design, after, build } = createBuilder<Brick>();

        create(useBrick);
        after((brick) => {
          brick.mount(wall);
        });

        const keysRow = keys[row];
        keysRow.forEach((element: string, index: number) => {
          design((brick) => {
            brick.id = element;
            brick.caption = element.length === 1 ? element : "";
            if (element === "shift") brick.icon = "fa fa-arrow-up";
            if (element === "backspace") brick.icon = "fa fa-backspace";
            if (element === "numbers") brick.caption = "123";
            if (element === "enter") brick.icon = "fa fa-check";
            if (element === "left") brick.icon = "fa fa-caret-left";
            if (element === "up") brick.icon = "fa fa-caret-up";
            if (element === "down") brick.icon = "fa fa-caret-down";
            if (element === "right") brick.icon = "fa fa-caret-right";
            let { classes, style, vars } = brick;
            classes.set("m-keyboard__key", true);
            if ("abcdefghijklmnopqrstuvwxyzñç".includes(element))
              classes.set("m-keyboard__key--letter", true);
            style.set("grid-area", `1 / ${index + 1}`);
            vars.set("type", element.toLowerCase());
            brick.updated = () => {
              if (brick.id.length === 1) {
                // if ("aeiou".includes(brick.id)) {
                //   brick.caption = "aeiou".charAt("aeiou".indexOf(brick.id));
                //   if (state.acuteAccent.value)
                //     brick.caption = "áéíóú".charAt("aeiou".indexOf(brick.id));
                //   if (state.graveAccent.value)
                //     brick.caption = "àèìòù".charAt("aeiou".indexOf(brick.id));
                //   if (state.dieresis.value)
                //     brick.caption = "äëïöü".charAt("aeiou".indexOf(brick.id));
                // }
                if ("aeiou".includes(brick.id)) {
                  brick.vars.set(
                    "type",
                    "aeiou".charAt("aeiou".indexOf(brick.id)),
                  );
                  if (state.acuteAccent.value)
                    brick.vars.set(
                      "type",
                      "áéíóú".charAt("aeiou".indexOf(brick.id)),
                    );
                  if (state.graveAccent.value)
                    brick.vars.set(
                      "type",
                      "àèìòù".charAt("aeiou".indexOf(brick.id)),
                    );
                  if (state.dieresis.value)
                    brick.vars.set(
                      "type",
                      "äëïöü".charAt("aeiou".indexOf(brick.id)),
                    );
                }
                if (state.shift.value) {
                  brick.vars.set("type", brick.vars.get("type").toUpperCase());
                } else {
                  brick.vars.set("type", brick.vars.get("type").toLowerCase());
                }
                if (brick.id === "´")
                  brick.style.set(
                    "background-color",
                    state.acuteAccent.value ? "var(--active-color)" : "inherit",
                  );
                if (brick.id === "`")
                  brick.style.set(
                    "background-color",
                    state.graveAccent.value ? "var(--active-color)" : "inherit",
                  );
                if (brick.id === "¨")
                  brick.style.set(
                    "background-color",
                    state.dieresis.value ? "var(--active-color)" : "inherit",
                  );
                if (brick.id === "shift")
                  brick.style.set(
                    "background-color",
                    state.shift.value ? "var(--active-color)" : "inherit",
                  );
              }
            };
            brick.clicked = () => {
              typeKey(brick);
            };
            if (element === "shift") brick.clicked = shift;
            if (element === "`") brick.clicked = graveAccent;
            if (element === "´") brick.clicked = acuteAccent;
            if (element === "¨") brick.clicked = dieresis;
            if (element === "numbers") brick.clicked = numbers;
            if (element === "enter")
              brick.clicked = () => {
                typeKey(brick);
              };
            if (element === "left")
              brick.clicked = () => {
                if (current.edit.cursor > 0) current.edit.cursor--;
              };
            if (element === "right")
              brick.clicked = () => {
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
    function animatePressed(brick: Brick) {
      brick.classes.set("s-pressed", true);
      setTimeout(() => {
        brick.classes.set("s-pressed", false);
      }, 200);
    }

    function typeKey(brick: Brick) {
      animatePressed(brick);
      current.sendKey(brick.id, brick.vars.get("type"));
      state.acuteAccent.value = false;
      state.graveAccent.value = false;
      state.dieresis.value = false;
      setTimeout(() => {
        state.shift.value = false;
      }, 200); // 200 ms para que la animación de la tecla se complete
      state.letters.forEach((row: Wall) => {
        row.refreshAll();
      });
    }

    function shift(brick: Brick) {
      animatePressed(brick);
      state.shift.value = !state.shift.value;
      state.letters.forEach((row: Wall) => {
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

    function acuteAccent(brick: Brick) {
      animatePressed(brick);
      state.acuteAccent.value = !state.acuteAccent.value;
      state.graveAccent.value = false;
      state.dieresis.value = false;
      state.letters.forEach((row: Wall) => {
        row.refreshAll();
      });
    }

    function graveAccent(brick: Brick) {
      animatePressed(brick);
      state.graveAccent.value = !state.graveAccent.value;
      state.acuteAccent.value = false;
      state.dieresis.value = false;
      state.letters.forEach((row: Wall) => {
        row.refreshAll();
      });
    }

    function dieresis(brick: Brick) {
      animatePressed(brick);
      state.dieresis.value = !state.dieresis.value;
      state.acuteAccent.value = false;
      state.graveAccent.value = false;
      state.letters.forEach((row: Wall) => {
        row.refreshAll();
      });
    }
  },
});
