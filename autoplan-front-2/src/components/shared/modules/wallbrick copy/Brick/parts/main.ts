import {
  defineComponent,
  ref,
  computed,
  watch,
  onMounted,
  Ref,
  defineAsyncComponent,
  inject,
} from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { Brick } from "../../wallbrick";

export default defineComponent({
  props: { config: { type: Object, required: true } },
  emits: ["updated"],
  setup(props, context) {
    const dynamicComponent = ref(props.config.component);
    expose({ dynamicComponent });
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
      state.config.clicked(state.config, state.config.wall);
    };
    state.mouseDown = () => {
      state.config.mouseDown(state.config, state.config.wall);
    };
    state.mouseUp = () => {
      state.config.mouseUp(state.config, state.config.wall);
    };

    onMounted(() => {
      console.log(state.config.code);
    });
  },
});
