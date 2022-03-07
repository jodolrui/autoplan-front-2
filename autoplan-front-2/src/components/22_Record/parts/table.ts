import { defineComponent, ref, computed, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";
import { Brick, Wall, useWall, useBrick } from "../../../wallbrick/wallbrick";
import { Field, RecordBase } from "../../../helpers/data-interfaces";
import { createBuilder } from "../../../helpers/builder";
import { useCurrent } from "../../../stores/useCurrent";

export default defineComponent({
  emits: ["pulse"],
  setup(props, context) {
    const data = useData();
    const current = useCurrent();
    data.tablePulse = ref(0);
    //* transmitimos el pulse hacia atrás
    watch(data.tablePulse, () => {
      context.emit("pulse");
    });

    data.table = useWall("table");

    const { setup } = data.table;
    setup(() => {
      watch(
        () => data.current.selectedElement?.value,
        () => {
          //* para que se actualice el elemento seleccionado
          data.table.refreshAll();
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
        });

        //* value
        design((brick) => {
          const elementId: string = `${data.record.__id}_${field.key}_value`;
          brick.code = elementId;
          brick.caption = !data.record[field.key].units
            ? data.record[field.key].value
            : `${data.record[field.key].value} ${data.record[field.key].units}`;
          const { classes, style, clicked, vars, updated, setup } = brick;
          classes.set("field-value", true);
          if (i === 0) classes.set("field-first", true);
          style.set("grid-area", `${i + 1} / 2`);
          vars.set("record", data.record);
          vars.set("field", field);
          updated((brick: Brick) => {
            if (data.current.selectedElement)
              if (brick.code === data.current.selectedElement.value.id) {
                style.set("background-color", "var(--active-color)");
              } else {
                style.set("background-color", "inherit");
              }
          });
          clicked(() => {
            data.current.selected.record = vars.get("record");
            data.current.selected.field = vars.get("field");
          });
        });
      });

      build();
    });

    build();
  },
});
