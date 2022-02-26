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
        // marginLeft: "10px",
        // marginRight: "10px",
      },
      refresh: function () {},
      items: {},
    } as WallConfig);

    data.fields.forEach((field: Field, i: number) => {
      data.table.addItem(`${field.key}_label`, {
        code: `${field.key}_label`,
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
        code: `${field.key}_value`,
        // elementType: "div",
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
        },
        refresh: function () {},
        click: function () {},
      });
    });
  },
});
