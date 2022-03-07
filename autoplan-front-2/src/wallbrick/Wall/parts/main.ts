import { defineComponent, onMounted, computed, ref, watch, Ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import _Brick from "../../Brick/index.vue";
import { Brick, Wall } from "../../wallbrick";
import { useData } from "../data";

export default defineComponent({
  components: { Brick: _Brick },
  props: { config: { type: Object, required: true } },
  emits: ["updated"],
  setup(props, context) {
    const data = useData();
    data.config = props.config as Wall;
    data.classes = computed(() => Object.fromEntries(data.config.classes));
    data.style = computed(() => Object.fromEntries(data.config.style));
    data.bricks = computed(() => Object.fromEntries(data.config.bricks));
    data.pulse = ref(0);
    watch(data.pulse, () => context.emit("updated"));
  },
});
