import { defineComponent, ref, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { useCurrent } from "../../shared/stores/useCurrent";
import { Design } from "../../shared/interfaces/dataInterfaces";
import { getDesign, designs, DesignPack } from "../../designs/getDesign";

export default defineComponent({
  setup() {
    const state = useState();

    const found = designs.find((design: Design) => {
      return design.designKey === state.record.__designKey;
    });
    if (found) state.design = found;

    if (state.design.designKey) {
      const design: DesignPack = getDesign(state.design.designKey);
      state.format = design.format;
      state.fields = design.fields;
      state.newRecord = design.newRecord;
    }
  },
});
