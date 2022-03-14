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
