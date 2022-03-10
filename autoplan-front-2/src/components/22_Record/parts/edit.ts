import { defineComponent, Ref, ref, watch, computed, ComputedRef } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { Field, RecordBase } from "../../../helpers/data-interfaces";
import { State } from "../state";
import { useCurrent } from "../../../stores/useCurrent";
import _Wall from "../../../wallbrick/Wall/index.vue";
import Edit from "../../23_Edit/index.vue";

export default defineComponent({
  components: { Edit },
  setup() {
    const state = exposed<State>();
    state.editPulse = ref(0);
    //* si desde el componente Edit se movió el cursor
    state.onEditUpdated = (cursor: number) => {
      state.current.edit.cursor = cursor;
      //* incrementamos editPulse para refrescar el componente Edit
      state.controlPulse.value++;
    };
    //* si desde el teclado cambiamos el current.edit.value
    watch(
      () => state.current.edit.value,
      () => {
        //* incrementamos editPulse para refrescar el componente Edit
        state.editPulse.value++;
      },
    );
    //* si desde el teclado cambiamos el current.edit.cursor
    watch(
      () => state.current.edit.cursor,
      () => {
        //* incrementamos editPulse para refrescar el componente Edit
        state.editPulse.value++;
      },
    );
  },
});
