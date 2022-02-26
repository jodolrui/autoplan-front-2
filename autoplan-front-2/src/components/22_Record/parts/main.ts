import { defineComponent, Ref, ref, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { Field, RecordBase } from "../../../helpers/data-interfaces";
import { useData } from "../data";
import { useCurrent } from "../../../stores/useCurrent";

export default defineComponent({
  props: {
    fields: { type: Array, required: true },
    record: { type: Object, required: true },
  },
  setup(props) {
    const data = useData();
    data.fields = props.fields as Field[];
    data.record = props.record as RecordBase & {
      [key: string]: { value: any | null; units?: string | null };
    };
    data.current = useCurrent();
  },
});
