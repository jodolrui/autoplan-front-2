import { defineComponent, ref, computed, watch, onMounted, Ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { Brick } from "../../wallbrick";

export default defineComponent({
  props: {
    config: { type: Object, required: true },
    index: { type: Number, required: true },
    count: { type: Number, required: true },
  },
  emits: ["updated"],
  setup(props, context) {
    const state = useState();
    state.config = props.config as Brick;
    state.index = props.index;
    state.count = props.count;
    state.clicked = () => {
      state.config.clicked(state.config, state.config.wall);
    };
  },
});
