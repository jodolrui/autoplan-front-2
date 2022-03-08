import { defineComponent, Ref, ref, watch, onMounted, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
//! mantener independiente de currentStore y de wallbrick para poder reutilizarlo

export default defineComponent({
  props: {
    value: { type: String, required: true },
    cursor: { type: Number, required: true },
  },
  emits: ["updated"],
  setup(props, context) {
    const state = useState();
    state.value = ref(props.value);
    state.cursor = ref(props.cursor);
    state.chars = computed(() =>
      state.value.value ? state.value.value.split("") : [],
    );

    //* si cambiamos la posición del cursor haciendo clic
    watch(state.cursor, () => {
      //* dispara el evento "updated" devolviendo la posición del cursor
      context.emit("updated", state.cursor.value);
    });

    onMounted(() => {
      let editDiv: HTMLElement | null;
      let firstSpan: HTMLElement | null;
      let lastSpan: HTMLElement | null;
      //* getElementById necesita estar en el onMounted
      editDiv = document.getElementById("edit-box");
      editDiv?.addEventListener("click", (event) => {
        let position: number = 0;
        firstSpan = document.getElementById(
          editDiv?.firstElementChild?.id as string,
        );
        lastSpan = document.getElementById(
          editDiv?.lastElementChild?.id as string,
        );
        //* si pulsamos por delante de los caracteres
        if (firstSpan?.offsetLeft && event.offsetX < firstSpan?.offsetLeft)
          position = 0;
        //* si pulsamos por detrás de los caracteres
        else if (lastSpan?.offsetLeft && event.offsetX > lastSpan?.offsetLeft) {
          position = state.value.value?.length;
        } else {
          //* si pulsamos a la altura de los caracteres
          editDiv?.childNodes.forEach((element: ChildNode, i: number) => {
            const span: HTMLElement | null = document.getElementById(
              (element as HTMLElement).id as string,
            );
            if (span?.classList.contains("edit-char")) {
              if (
                span?.offsetLeft &&
                span?.offsetLeft + span.offsetWidth / 2 < event.offsetX
              )
                position++;
            }
          });
        }
        state.cursor.value = position;
      });
    });
  },
});
