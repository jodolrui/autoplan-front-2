import { defineComponent, ref, computed, watch, reactive, Ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { useProjectData } from "../../__shared/stores/useProjectData";
import { useCurrent } from "../../__shared/stores/useCurrent";
import { RecordBase } from "../../__shared/interfaces/dataInterfaces";
import { Wall } from "../../../wallbrick/wallbrick";
import _Wall from "../../../wallbrick/Wall/index.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { Wall: _Wall },
  emits: ["updated"],
  setup() {
    const state = useState();
    state.edit = {} as any;
    state.letters = [];
    state.numbers = [];
    state.symbols = [];
    state.shift = ref(false);
    state.panel = ref("letters");
    state.current = useCurrent();
    state.pulse = ref(0);

    // let el: HTMLElement | null = null;
    // let value: Ref<any> = ref(null);
    // expose({ value });
    // watch(state.current.selected, () => {
    //   const selected = state.current.selected;
    //   if (selected.record && selected.field) {
    //     const datum = selected.record[selected.field.key];
    //     value.value = !datum.units
    //       ? datum.value
    //       : `${datum.value} ${datum.units}`;
    //   }
    // });

    // watch(
    //   state.current.selected,
    //   () => {
    //     const selected = state.current.selected;
    //     if (selected && selected.record && selected.field) {
    //       const datum = (selected.record as unknown as any)[selected.field.key];
    //       state.current.edit.value = !datum.units
    //         ? datum.value
    //         : `${datum.value} ${datum.units}`;
    //       // state.cursor.value = state.value.value.length;
    //     }
    //     state.pulse.value++;
    //   },
    //   { immediate: true },
    // );

    // state.editCharClick = function (position: number) {
    //   state.current.edit.cursor = position;
    // };
  },
});
