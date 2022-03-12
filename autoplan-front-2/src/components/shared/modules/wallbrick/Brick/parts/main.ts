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
    state.clicked = () => {
      state.config.__clicked(state.config, state.config.__wall);
    };
    state.mouseDown = () => {
      state.config.__mouseDown(state.config, state.config.__wall);
    };
    state.mouseUp = () => {
      state.config.__mouseUp(state.config, state.config.__wall);
    };

    onMounted(() => {
      console.log(state.config.code);
    });
  },
});
