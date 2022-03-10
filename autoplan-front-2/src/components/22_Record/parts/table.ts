import { defineComponent, ref, computed, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { State } from "../state";
import { Brick, Wall, useWall, useBrick } from "../../../wallbrick/wallbrick";
import { Field, RecordBase } from "../../../helpers/data-interfaces";
import { createBuilder } from "../../../helpers/builder";
import { useCurrent } from "../../../stores/useCurrent";

export default defineComponent({
  emits: ["updated"],
  setup(props, context) {
    const state = exposed<State>();
    const current = useCurrent();
    state.tablePulse = ref(0);
    //* transmitimos el pulse hacia atrás
    //! si no pasamos el pulse hacia atrás el edit-box no responde
    //! pero si lo dejo monta toda la tabla con cada nueva selección
    watch(state.tablePulse, () => {
      context.emit("updated");
    });

    state.table = useWall("table");
    const { setup } = state.table;
    setup(() => {
      //* al seleccionarse un campo tenemos que refrescar
      watch(
        () => state.current.selected.field,
        () => {
          state.table.refreshAll();
          state.tablePulse.value++;
        },
      );
    });

    const { create, design, after, build } = createBuilder<Wall>();

    create(() => state.table);
    after((wall: Wall) => {
      wall.mount();
    });

    design((wall) => {
      let { style } = wall;
      style.set("display", "grid");
      style.set("grid-template-columns", "1fr 1fr");

      const { create, before, design, after, build } = createBuilder<Brick>();

      create(useBrick);
      before((brick: Brick) => {
        const { classes } = brick;
        classes.set("field", true);
      });
      after((brick: Brick) => {
        brick.mount(wall);
      });

      state.fields.forEach((field: Field, i: number) => {
        //* label
        design((brick) => {
          const elementId: string = `${state.record.__id}_${field.key}_label`;
          brick.code = elementId;
          brick.caption = field.label?.caption as string;
          const { classes, style, clicked, setup } = brick;
          classes.set("field-label", true);
          if (i === 0) classes.set("field-first", true);
          style.set("grid-area", `${i + 1} / 1`);
          clicked(() => {
            state.current.setSelected(null, null);
          });
        });

        //* value
        design((brick) => {
          const elementId: string = `${state.record.__id}_${field.key}_value`;
          brick.code = elementId;
          brick.caption = !state.record[field.key].units
            ? state.record[field.key].value
            : `${state.record[field.key].value} ${
                state.record[field.key].units
              }`;
          brick.slot =
            state.current.selected.record?.__id === state.record.__id &&
            state.current.selected.field?.key === field.key
              ? "edit"
              : "";
          const { classes, style, clicked, vars, updated, setup } = brick;
          classes.set("field-value", true);
          if (i === 0) classes.set("field-first", true);
          style.set("grid-area", `${i + 1} / 2`);
          vars.set("record", state.record);
          vars.set("field", field);
          updated((brick: Brick) => {
            //* si es el elemento seleccionado
            if (
              state.current.selectedElement &&
              brick.code === state.current.selectedElement.value.id
            ) {
              if (style.get("background-color") !== "var(--active-color)")
                style.set("background-color", "var(--active-color)");
            } else {
              //* si NO es el elemento seleccionado
              if (style.get("background-color") !== "inherit")
                style.set("background-color", "inherit");
            }
          });
          clicked(() => {
            state.current.setSelected(vars.get("record"), vars.get("field"));
            state.current.keyboardOn = true;
          });
        });
      });

      build();
    });

    build();
  },
});
