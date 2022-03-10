import { defineComponent, Ref, ref, watch, computed, ComputedRef } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { Field, RecordBase } from "../../__shared/interfaces/dataInterfaces";
import { State } from "../state";
import { useCurrent } from "../../__shared/stores/useCurrent";
import _Wall from "../../../wallbrick/Wall/index.vue";

export default defineComponent({
  components: { Wall: _Wall },
  props: {
    fields: { type: Array, required: true },
    record: { type: Object, required: true },
  },
  setup(props) {
    const state = exposed<State>();
    state.fields = props.fields as Field[];
    state.record = props.record as RecordBase & {
      [key: string]: { value: any | null; units?: string | null };
    };
    state.current = useCurrent();
  },
});
