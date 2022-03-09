import { defineComponent, ref, computed, watch, onMounted } from "vue";
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
      console.log("clicked");

      state.config.__clicked(state.config, state.config.__wall);
      // context.emit("updated"); //! esto hace que el brick se vuelva a montar
    };
    state.mouseDown = () => {
      // console.log("mouseDown");
      // state.config.__mouseDown(state.config, state.config.__wall);
      // context.emit("updated"); //! esto hace que el brick se vuelva a montar
    };
    state.mouseUp = () => {
      // console.log("mouseUp");
      // state.config.__mouseUp(state.config, state.config.__wall);
      // context.emit("updated"); //! esto hace que el brick se vuelva a montar
    };

    onMounted(() => {
      console.log("brick mounted " + state.config.caption);
    });
  },
});
