import { defineComponent, ref, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";
import { Brick } from "../../../helpers/wall";
import { composeClass, composeStyle } from "../../../helpers/composeStyle";

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
    data.classes = computed(() => composeClass(data.item.classes));
    data.style = computed(() => composeStyle(data.item.style));
  },
});
