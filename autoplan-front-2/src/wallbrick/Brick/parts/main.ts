import { defineComponent, ref, computed, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";
import { Brick } from "../../wallbrick";

export default defineComponent({
  props: { config: { type: Object, required: true } },
  emits: ["updated"],
  setup(props, context) {
    const data = useData();
    data.config = props.config as Brick;
    data.classes = computed(() => Object.fromEntries(data.config.classes));
    data.style = computed(() => Object.fromEntries(data.config.style));
    data.clicked = () => {
      data.config.__clicked(data.config, data.config.__wall);
      context.emit("updated");
    };
  },
});
