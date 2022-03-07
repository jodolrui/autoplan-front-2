import { defineComponent, Ref, ref, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { Field, RecordBase } from "../../../helpers/data-interfaces";
import { useData } from "../data";
import { useCurrent } from "../../../stores/useCurrent";
import _Wall from "../../../wallbrick/Wall/index.vue";

export default defineComponent({
  components: { Wall: _Wall },
  props: {
    field: { type: Object, required: true },
    record: { type: Object, required: true },
  },
  setup(props) {
    const data = useData();
    data.current = useCurrent();
    data.cursor = ref(null);
  },
});
