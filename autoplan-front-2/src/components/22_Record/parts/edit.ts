import { defineComponent, Ref, ref, watch, computed, ComputedRef } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { Field, RecordBase } from "../../../helpers/data-interfaces";
import { useData } from "../data";
import { useCurrent } from "../../../stores/useCurrent";
import _Wall from "../../../wallbrick/Wall/index.vue";
import Edit from "../../23_Edit/index.vue";

export default defineComponent({
  components: { Edit },
  setup() {
    const data = useData();
    data.editPulse = ref(0);
    //* si desde el componente Edit se cambió el valor o se movió el cursor
    data.onEditUpdated = (args: { value: string; cursor: number }) => {
      const { value, cursor } = args;
      data.current.edit.value = value;
      data.current.edit.cursor = cursor;
      //* incrementa editPulse para refrescar el componente Edit
      data.controlPulse.value++;
    };
    //* si desde el teclado cambiamos el current.edit.value
    watch(
      () => data.current.edit.value,
      () => {
        //* incrementa editPulse para refrescar el componente Edit
        data.editPulse.value++;
      },
    );
    //* si desde el teclado cambiamos el current.edit.cursor
    watch(
      () => data.current.edit.cursor,
      () => {
        //* incrementa editPulse para refrescar el componente Edit
        data.editPulse.value++;
      },
    );
  },
});
