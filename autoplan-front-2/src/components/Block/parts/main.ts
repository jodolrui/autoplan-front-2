import { defineComponent, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";

export default defineComponent({
  props: {
    name: { type: String, required: true },
    code: { type: String, required: true },
    caption: { type: String, required: true },
    icon: { type: String, required: true },
    classes: { type: Object, required: true },
    style: { type: Object, required: true },
    row: { type: Number, required: true },
    rowSpan: { type: Number, required: false },
    col: { type: Number, required: true },
    colSpan: { type: Number, required: false },
    slot: { type: String, required: false },
  },
  emits: ["pressed"],
  setup(props, context) {
    const data = useData();
    data.name = props.name;
    data.code = props.code;
    data.caption = props.caption;
    data.icon = props.icon;
    data.classes = props.classes;
    data.style = props.style;
    const row = props.row;
    const rowSpan = props.rowSpan ? props.rowSpan : 1;
    const col = props.col;
    const colSpan = props.colSpan ? props.colSpan : 1;
    data.gridArea = `${row} / ${col} / span ${rowSpan} / span ${colSpan}`;
    data.pressed = (code: string) => {
      context.emit("pressed", code);
    };
    data.slot = props.slot ? props.slot : "";
  },
});
