import { defineComponent, onMounted, computed, ref, watch, Ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import _Brick from "../../Brick/index.vue";
import { Brick } from "../../../helpers/wall";
import { useData } from "../data";

export default defineComponent({
  components: { Brick: _Brick },
  props: {
    items: { type: Array, required: true },
    flex: { type: Boolean, required: true },
  },
  emits: ["pressed"],
  setup(props, context) {
    const data = useData();
    data.items = <Brick[]>props.items;
    data.rows = computed(() =>
      Math.max.apply(
        Math,
        data.items.map(
          (brick: Brick) => brick.row + (brick.rowSpan ? brick.rowSpan - 1 : 0),
        ),
      ),
    );
    data.cols = computed(() =>
      Math.max.apply(
        Math,
        data.items.map(
          (brick: Brick) => brick.col + (brick.colSpan ? brick.colSpan - 1 : 0),
        ),
      ),
    );
    data.flex = props.flex;
    data.pressed = (code: string) => {
      context.emit("pressed", code);
    };
  },
});
