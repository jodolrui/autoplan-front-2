import { defineComponent, Ref, ref, watch, onMounted, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { Field, RecordBase } from "../../../helpers/data-interfaces";
import { useData } from "../data";
import { useCurrent } from "../../../stores/useCurrent";
import _Wall from "../../../wallbrick/Wall/index.vue";

export default defineComponent({
  components: { Wall: _Wall },
  props: {
    value: { type: String, required: true },
    cursor: { type: Number, required: true },
  },
  setup() {
    const data = useData();
    data.current = useCurrent();
    data.chars = computed(() =>
      data.current.edit.value ? data.current.edit.value.split("") : [],
    );
    onMounted(() => {
      //* getElementById necesita estar en el onMounted
      const editDiv: HTMLElement | null = document.getElementById("edit");
      const firstSpan: HTMLElement | null = document.getElementById(
        editDiv?.firstElementChild?.id as string,
      );
      const lastSpan: HTMLElement | null = document.getElementById(
        editDiv?.lastElementChild?.id as string,
      );
      console.log({ lastSpan });

      editDiv?.addEventListener("click", (event) => {
        //* si pulsamos por delante del valor
        if (firstSpan?.offsetLeft && event.offsetX < firstSpan?.offsetLeft)
          //* mueve el cursor al principio
          data.current.edit.cursor = 0;
        //* si pulsamos por detrás del valor
        if (
          lastSpan?.offsetLeft &&
          event.offsetX > lastSpan?.offsetLeft //+ lastSpan.offsetWidth
        ) {
          //* mueve el cursor al final
          data.current.edit.cursor = data.current.edit.value?.length
            ? data.current.edit.value?.length
            : null;
        }
      });
    });
  },
});
