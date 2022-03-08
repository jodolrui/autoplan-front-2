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
  emits: ["updated"],
  setup(props, context) {
    const data = useData();
    data.value = ref(props.value);
    data.cursor = ref(props.cursor);
    data.chars = computed(() =>
      data.value.value ? data.value.value.split("") : [],
    );

    watch(data.value, () => {
      alert("value");
      context.emit("updated", { value: data.value, cursor: data.cursor });
    });
    watch(data.cursor, () => {
      context.emit("updated", { value: data.value, cursor: data.cursor });
    });

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
          data.cursor.value = 0;
        //* si pulsamos por detrás del valor
        if (
          lastSpan?.offsetLeft &&
          event.offsetX > lastSpan?.offsetLeft //+ lastSpan.offsetWidth
        ) {
          //* mueve el cursor al final
          data.cursor.value = data.value.value?.length
            ? data.value.value?.length
            : null;
        }
      });
    });
  },
});
