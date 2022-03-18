import { defineComponent, ref, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { useCurrent } from "../../shared/stores/useCurrent";
import { getDesign, Design } from "../../designs/getDesign";

export default defineComponent({
  setup() {
    const state = useState();

    state.designKey = computed(() => {
      return state.record.__designKey;
    });

    if (state.designKey.value) {
      const design: Design = getDesign(state.designKey.value);
      state.format = design.format;
      state.fields = design.fields;
      state.newRecord = design.newRecord;
    }
  },
});
