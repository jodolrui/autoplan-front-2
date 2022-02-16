import { defineComponent, onMounted, computed, ref, watch, Ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import _Block from "../../Block/index.vue";
import { Block } from "../../../helpers/wall";
import { useData } from "../data";

export default defineComponent({
  components: { Block: _Block },
  props: {
    items: { type: Array, required: true },
    flex: { type: Boolean, required: true },
  },
  emits: ["pressed"],
  setup(props, context) {
    const data = useData();
    data.items = <Block[]>props.items;
    data.rows = computed(() =>
      Math.max.apply(
        Math,
        data.items.map(
          (block: Block) => block.row + (block.rowSpan ? block.rowSpan - 1 : 0),
        ),
      ),
    );
    data.cols = computed(() =>
      Math.max.apply(
        Math,
        data.items.map(
          (block: Block) => block.col + (block.colSpan ? block.colSpan - 1 : 0),
        ),
      ),
    );
    data.flex = props.flex;
    data.pressed = (code: string) => {
      context.emit("pressed", code);
    };
  },
});
