import { defineComponent, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";
import { Brick } from "../../../helpers/wall";

export default defineComponent({
  props: { item: { type: Object, required: true } },
  emits: ["pressed"],
  setup(props, context) {
    const data = useData();
    data.item = <Brick>props.item;
    data.gridArea = `${data.item.row} / ${data.item.col} / span ${data.item.rowSpan} / span ${data.item.colSpan}`;
    data.pressed = function () {
      if (data.item.__click) data.item.__click();
    };
  },
});
