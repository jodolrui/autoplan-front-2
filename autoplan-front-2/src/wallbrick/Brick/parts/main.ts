import { defineComponent, ref, computed, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { Brick } from "../../wallbrick";

export default defineComponent({
  props: { config: { type: Object, required: true } },
  emits: ["updated"],
  setup(props, context) {
    const state = useState();
    state.config = props.config as Brick;
    state.classes = computed(() => Object.fromEntries(state.config.classes));
    state.style = computed(() => Object.fromEntries(state.config.style));
    state.clicked = () => {
      state.config.__clicked(state.config, state.config.__wall);
      context.emit("updated");
    };
  },
});
