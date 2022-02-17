import { defineComponent, onMounted, computed, ref, watch, Ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import _Brick from "../../Brick/index.vue";
import { Brick, WallConfig } from "../../../helpers/wall";
import { useData } from "../data";
import { composeClass, composeStyle } from "../../../helpers/composeStyle";

export default defineComponent({
  components: { Brick: _Brick },
  props: { config: { type: Object, required: true } },
  emits: ["pressed"],
  setup(props, context) {
    const data = useData();
    data.config = <WallConfig>props.config;
    // data.rows = computed(() =>
    //   Math.max.apply(
    //     Math,
    //     data.config.items.map(
    //       (brick: Brick) => brick.row + (brick.rowSpan ? brick.rowSpan - 1 : 0),
    //     ),
    //   ),
    // );
    // data.cols = computed(() =>
    //   Math.max.apply(
    //     Math,
    //     data.config.items.map(
    //       (brick: Brick) => brick.col + (brick.colSpan ? brick.colSpan - 1 : 0),
    //     ),
    //   ),
    // );

    data.classes = computed(() => composeClass(data.config.classes));
    data.style = computed(() => composeStyle(data.config.style));
  },
});
