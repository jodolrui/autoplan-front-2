import { defineComponent, reactive, computed, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import {
  Field,
  RecordBase,
  Design,
} from "../../shared/interfaces/dataInterfaces";
import { useState } from "../state";
import { useCurrent } from "../../shared/stores/useCurrent";

export default defineComponent({
  props: {
    record: { type: Object, required: true },
    isLast: { type: Boolean, required: false },
  },
  setup(props) {
    const state = useState();
    state.record = props.record as RecordBase & {
      [key: string]: { value: any | null; units?: string | null };
    };
    state.insertOn = ref(false);
    state.addOn = ref(false);
    const current = useCurrent();
    expose({ current });
  },
});
