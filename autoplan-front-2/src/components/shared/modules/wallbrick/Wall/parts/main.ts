import {
  defineComponent,
  onMounted,
  computed,
  ref,
  watch,
  Ref,
  reactive,
} from "vue";
import { expose, exposed } from "@jodolrui/glue";
import _Brick from "../../Brick/index.vue";
import { Brick, Wall } from "../../wallbrick";
import { useState } from "../state";

export default defineComponent({
  components: { Brick: _Brick },
  props: { config: { type: Object, required: true } },
  setup(props, context) {
    const state = useState();
    //! Parece que este reactive no hace falta si viene con un reactive del padre
    state.config = reactive(props.config) as Wall;
    state.classes = computed(() => {
      const result: { [key: string]: string | boolean } = {};
      for (let i = 0; i <= state.config.classes.items.length; i++) {
        result[state.config.classes.keys[i]] = state.config.classes.items[i];
      }
      return result;
    });
    state.style = computed(() => {
      const result: { [key: string]: string | boolean } = {};
      for (let i = 0; i <= state.config.style.items.length; i++) {
        result[state.config.style.keys[i]] = state.config.style.items[i];
      }
      return result;
    });

    watch(state.config, () => {
      // alert("state.config watched");
    });
    watch(
      () => state.config.bricks.items,
      () => {
        // alert("state.config.bricks watched");
      },
    );
  },
});
