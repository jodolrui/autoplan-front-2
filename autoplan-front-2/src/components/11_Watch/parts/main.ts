import { defineComponent, Ref, ref, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";
import { RecordBase } from "../../../helpers/data-interfaces";
export default defineComponent({
  props: {
    record: { type: Object, required: true },
    children: { type: Array, required: true },
    path: { type: Array, required: true },
  },
  setup(props) {
    const data = useData();
    data.record = props.record as Ref<RecordBase>;
    data.children = props.children as unknown as Ref<RecordBase[]>;
    data.path = props.path as unknown as Ref<RecordBase[]>;
  },
});
