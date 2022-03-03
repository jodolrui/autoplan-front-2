import { defineComponent, ref, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";
import { defineWall, WallConfig } from "../../../helpers/wall-brick";
import { Field, RecordBase } from "../../../helpers/data-interfaces";
import _Wall from "../../30_Wall/index.vue";
import { useCurrent } from "../../../stores/useCurrent";

export default defineComponent({
  components: { Wall: _Wall },
  setup() {
    const data = useData();
    const current = useCurrent();

    data.table = defineWall({
      classes: {},
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        // marginLeft: "10px",
        // marginRight: "10px",
      },
      refresh: function () {},
      items: {},
    } as WallConfig);

    data.fields.forEach((field: Field, i: number) => {
      data.table.addItem(`${field.key}_label`, {
        code: `${data.record.__id}_${field.key}_label`,
        // elementType: "div",
        caption: field.label?.caption,
        classes: {
          field: true,
          fieldLabel: true,
          fieldFirst: i === 0,
        },
        style: {
          gridArea: `${i + 1} / 1 / span 1 / span 1`,
        },
        refresh: function () {},
        click: function () {},
      });
      data.table.addItem(`${field.key}_value`, {
        code: `${data.record.__id}_${field.key}_value`,
        // elementType: "div",
        elementType: "text",
        caption: !data.record[field.key].units
          ? data.record[field.key].value
          : `${data.record[field.key].value} ${data.record[field.key].units}`,
        classes: {
          field: true,
          fieldValue: true,
          fieldFirst: i === 0,
        },
        style: {
          gridArea: `${i + 1} / 2 / span 1 / span 1`,
          border: "1px solid var(--border-color)",
        },
        vars: {
          record: data.record,
          field: field,
        },
        refresh: function () {},
        click: function () {
          let el: HTMLElement | null = null;
          if (current.selectedField)
            el = document.getElementById(current.selectedField);
          if (el) el.style.backgroundColor = "inherit";
          if (this.code) el = document.getElementById(this.code);

          if (el) el.style.backgroundColor = "var(--active-color)";
          current.selectedField = this.code ? this.code : null;
          if (this.vars && this.vars.record)
            current.selected.record = this.vars.record;
          if (this.vars && this.vars.field)
            current.selected.field = this.vars.field;

          current.edit.cursor = null;
          // current.fieldPulse++;
        },
      });
    });
  },
});
