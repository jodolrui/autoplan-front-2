import { defineComponent, ref, computed, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";
import { Brick, Wall, useWall, useBrick } from "../../../wallbrick/wallbrick";
import { Field, RecordBase } from "../../../helpers/data-interfaces";
import { createBuilder } from "../../../helpers/builder";
import { useCurrent } from "../../../stores/useCurrent";

export default defineComponent({
  emits: ["updated"],
  setup(props, context) {
    const data = useData();
    const current = useCurrent();
    data.tablePulse = ref(0);
    //* transmitimos el pulse hacia atrás
    watch(data.tablePulse, () => {
      context.emit("updated");
    });

    data.table = useWall("table");
    const { setup } = data.table;
    setup(() => {
      //* al seleccionarse un campo tenemos que refrescar
      watch(
        () => data.current.selected.field,
        () => {
          data.table.refreshAll();
          data.tablePulse.value++;
        },
      );
    });

    const { create, design, after, build } = createBuilder<Wall>();

    create(() => data.table);
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

      data.fields.forEach((field: Field, i: number) => {
        //* label
        design((brick) => {
          const elementId: string = `${data.record.__id}_${field.key}_label`;
          brick.code = elementId;
          brick.caption = field.label?.caption as string;
          const { classes, style, clicked, setup } = brick;
          classes.set("field-label", true);
          if (i === 0) classes.set("field-first", true);
          style.set("grid-area", `${i + 1} / 1`);
          clicked(() => {
            data.current.setSelected(null, null);
          });
        });

        //* value
        design((brick) => {
          const elementId: string = `${data.record.__id}_${field.key}_value`;
          brick.code = elementId;
          brick.caption = !data.record[field.key].units
            ? data.record[field.key].value
            : `${data.record[field.key].value} ${data.record[field.key].units}`;
          brick.slot =
            data.current.selected.record?.__id === data.record.__id &&
            data.current.selected.field?.key === field.key
              ? "edit"
              : "";
          const { classes, style, clicked, vars, updated, setup } = brick;
          classes.set("field-value", true);
          if (i === 0) classes.set("field-first", true);
          style.set("grid-area", `${i + 1} / 2`);
          vars.set("record", data.record);
          vars.set("field", field);
          updated((brick: Brick) => {
            //* si es el elemento seleccionado
            if (
              data.current.selectedElement &&
              brick.code === data.current.selectedElement.value.id
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
            data.current.setSelected(vars.get("record"), vars.get("field"));
            data.current.keyboardOn = true;
          });
        });
      });

      build();
    });

    build();
  },
});
