import { defineComponent, Ref, ref, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { RecordBase } from "../../../helpers/data-interfaces";
export default defineComponent({
  props: {
    record: { type: Object, required: true },
    children: { type: Array, required: true },
    path: { type: Array, required: true },
  },
  setup(props) {
    const state = useState();
    state.record = props.record as Ref<RecordBase>;
    state.children = props.children as unknown as Ref<RecordBase[]>;
    state.path = props.path as unknown as Ref<RecordBase[]>;
  },
});
