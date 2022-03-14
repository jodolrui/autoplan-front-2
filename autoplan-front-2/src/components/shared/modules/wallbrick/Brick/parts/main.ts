import { defineComponent, ref, computed, watch, onMounted, Ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { Brick } from "../../wallbrick";

export default defineComponent({
  props: { config: { type: Object, required: true } },
  emits: ["updated"],
  setup(props, context) {
    const state = useState();
    state.config = props.config as Brick;
    state.clicked = () => {
      state.config.clicked(state.config, state.config.wall);
    };
    const component = ref(state.config.component);
    expose({ component });
    watch(
      () => state.config,
      () => {
        alert(`${state.config.id} ${state.config.component}`);
        component.value = state.config.component;
      },
    );

    // state.mouseDown = () => {
    //   state.config.__mouseDown(state.config, state.config.__wall);
    // };
    // state.mouseUp = () => {
    //   state.config.__mouseUp(state.config, state.config.__wall);
    // };
    onMounted(() => {
      console.log({ component: state.config.component, config: state.config });
    });
  },
});
