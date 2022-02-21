import { defineComponent, ref, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";
import { defineWall, WallConfig } from "../../../helpers/wall-brick";
import { Field, RecordBase } from "../../../helpers/data-interfaces";
import _Wall from "../../30_Wall/index.vue";

export default defineComponent({
  components: { Wall: _Wall },
  setup() {
    const data = useData();

    data.table = defineWall({
      classes: {},
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        margin: "6px",
      },
      refresh: function () {},
      items: {},
    } as WallConfig);

    data.fields.forEach((field: Field, i: number) => {
      data.table.addItem(`${field.key}_label`, {
        code: `${field.key}_label`,
        caption: field.label?.caption,
        classes: {
          btn: true,
        },
        style: {
          gridArea: `${i + 1} / 1 / span 1 / span 1`,
          borderRadius: "0px",
          borderTop:
            i === 0 ? "1px solid var(--my-table-border-color)" : "none",
          borderBottom: "1px solid var(--my-table-border-color)",
          borderLeft: "1px solid var(--my-table-border-color)",
          borderRight: "none",
          boxShadow: "none",
        },
        refresh: function () {},
        click: function () {},
      });
      data.table.addItem(`${field.key}_value`, {
        code: `${field.key}_value`,
        caption: !data.record[field.key].units
          ? data.record[field.key].value
          : `${data.record[field.key].value} ${data.record[field.key].units}`,
        classes: {
          btn: true,
        },
        style: {
          gridArea: `${i + 1} / 2 / span 1 / span 1`,
          borderRadius: "0px",
          borderTop:
            i === 0 ? "1px solid var(--my-table-border-color)" : "none",
          borderBottom: "1px solid var(--my-table-border-color)",
          borderLeft: "1px solid var(--my-table-border-color)",
          borderRight: "1px solid var(--my-table-border-color)",
          boxShadow: "none",
        },
        refresh: function () {},
        click: function () {},
      });
    });
  },
});
