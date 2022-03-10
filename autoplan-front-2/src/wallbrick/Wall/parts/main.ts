import { defineComponent, onMounted, computed, ref, watch, Ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import _Brick from "../../Brick/index.vue";
import { Brick, Wall } from "../../wallbrick";
import { State } from "../state";

export default defineComponent({
  components: { Brick: _Brick },
  props: { config: { type: Object, required: true } },
  setup(props, context) {
    const state = exposed<State>();
    state.config = props.config as Wall;
    state.classes = computed(() => Object.fromEntries(state.config.classes));
    state.style = computed(() => Object.fromEntries(state.config.style));
    state.bricks = computed(() => Object.fromEntries(state.config.bricks));
  },
});
