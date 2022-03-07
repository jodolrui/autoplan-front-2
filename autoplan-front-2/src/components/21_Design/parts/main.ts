import { defineComponent, watch, reactive, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";
import { useCurrent } from "../../../stores/useCurrent";
import Record from "../../22_Record/index.vue";
import { Brick, Wall } from "../../../wallbrick/wallbrick";

export default defineComponent({
  components: { Record },
  props: {
    designKey: { type: String, required: true },
    collapse: Object,
    options: Object,
  },
  emits: ["updated"],
  setup(props, context) {
    const data = useData();
    data.designKey = ref(props.designKey);
    data.current = useCurrent();
    data.recordPulse = ref(0);
    watch(data.recordPulse, () => {
      context.emit("updated");
    });

    const collapse: Object = props.collapse
      ? reactive(props.collapse)
      : { hidden: false, header: "" };
    expose({ collapse });
    const options: Object = props.options
      ? props.options
      : { canAdd: true, canDelete: true, canMove: true, canEnter: true };
    expose({ options });
  },
});
