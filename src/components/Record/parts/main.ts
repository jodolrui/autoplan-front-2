import { defineComponent, reactive, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { Field, RecordBase } from "../../shared/interfaces/dataInterfaces";
import { useState } from "../state";
import { useCurrent } from "../../shared/stores/useCurrent";
import Wall from "../../shared/modules/wallbrick/Wall/index.vue";

export default defineComponent({
  components: { Wall },
  props: {
    // fields: { type: Array, required: true },
    record: { type: Object, required: true },
  },
  setup(props) {
    const state = useState();
    // state.fields = props.fields as Field[];
    state.record = props.record as RecordBase & {
      [key: string]: { value: any | null; units?: string | null };
    };
    console.log(state.record);

    const current = useCurrent();
    expose({ current });
  },
});
