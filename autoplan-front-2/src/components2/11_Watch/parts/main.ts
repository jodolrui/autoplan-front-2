import { defineComponent, Ref, ref, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { State } from "../state";
import { RecordBase } from "../../__shared/helpers/data-interfaces";
export default defineComponent({
  props: {
    record: { type: Object, required: true },
    children: { type: Array, required: true },
    path: { type: Array, required: true },
  },
  setup(props) {
    const state = exposed<State>();
    state.record = props.record as Ref<RecordBase>;
    state.children = props.children as unknown as Ref<RecordBase[]>;
    state.path = props.path as unknown as Ref<RecordBase[]>;
  },
});
