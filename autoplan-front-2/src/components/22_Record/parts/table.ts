import { defineComponent, ref, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";
import { Brick, Wall, useWall, useBrick } from "../../../wallbrick/wallbrick";
import { Field, RecordBase } from "../../../helpers/data-interfaces";
import { createBuilder } from "../../../helpers/builder";
import { useCurrent } from "../../../stores/useCurrent";

export default defineComponent({
  setup() {
    const data = useData();
    const current = useCurrent();
    data.tablePulse = ref(0);
    data.table = useWall("table");

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
          brick.code = `${data.record.__id}_${field.key}_label`;
          brick.caption = field.label?.caption as string;
          const { classes, style, clicked } = brick;
          classes.set("field-label", true);
          if (i === 0) classes.set("field-first", true);
          style.set("grid-area", `${i + 1} / 1 / span 1 / span 1`);
        });

        //* value
        design((brick) => {
          brick.code = `${data.record.__id}_${field.key}_value`;
          brick.caption = !data.record[field.key].units
            ? data.record[field.key].value
            : `${data.record[field.key].value} ${data.record[field.key].units}`;
          const { classes, style, clicked } = brick;
          classes.set("field-value", true);
          if (i === 0) classes.set("field-first", true);
          style.set("grid-area", `${i + 1} / 2 / span 1 / span 1`);
          brick.vars = {
            record: data.record,
            field: field,
          };
          clicked(() => {
            let el: HTMLElement | null = null;
            if (current.selectedField)
              el = document.getElementById(current.selectedField);
            if (el) el.style.backgroundColor = "inherit";
            if (brick.code) el = document.getElementById(brick.code);

            if (el) el.style.backgroundColor = "var(--active-color)";
            current.selectedField = brick.code ? brick.code : null;
            if (brick.vars && brick.vars.record)
              current.selected.record = brick.vars.record;
            if (brick.vars && brick.vars.field)
              current.selected.field = brick.vars.field;

            current.edit.cursor = null;
          });
        });
      });

      build();
    });

    build();
  },
});
