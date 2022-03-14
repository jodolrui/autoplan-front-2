import { defineComponent, ref, computed, watch, onMounted, Ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { Brick } from "../../wallbrick";
// import Edit from "../../../../../Edit/index.vue";

export default defineComponent({
  // components: { edit: Edit },
  props: { config: { type: Object, required: true } },
  emits: ["updated"],
  setup(props, context) {
    const state = useState();
    state.config = props.config as Brick;
    state.clicked = () => {
      state.config.clicked(state.config, state.config.wall);
    };
    // state.mouseDown = () => {
    //   state.config.__mouseDown(state.config, state.config.__wall);
    // };
    // state.mouseUp = () => {
    //   state.config.__mouseUp(state.config, state.config.__wall);
    // };
  },
});
