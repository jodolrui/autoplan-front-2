//! intenté que Edit leyera directamente de current y me daba problemas de refresco
//! por eso lo mantengo independiente de current y lo dejo con propiedades y eventos
import {
  defineComponent,
  Ref,
  ref,
  watch,
  onMounted,
  computed,
  onUpdated,
} from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { useCurrent } from "../../shared/stores/useCurrent";

export default defineComponent({
  // props: {
  //   value: { type: String, required: true },
  //   cursor: { type: Number, required: true },
  // },
  // emits: ["updated"],
  setup(props, context) {
    const current = useCurrent();
    expose({ current });
    const state = useState();
    // state.value = ref(props.value);
    // state.cursor = ref(props.cursor);
    state.chars = computed(() =>
      current.edit.value ? current.edit.value.split("") : [],
    );

    watch(
      () => current.edit.value,
      () => {
        const editBox = document.getElementById("edit-box");
        if (editBox) {
          editBox.classList.add("editing");
          setTimeout(() => {
            editBox.classList.remove("editing");
          }, 10);
        }
      },
    );

    //* si cambiamos la posición del cursor haciendo clic
    watch(
      () => current.edit.cursor,
      () => {
        //* dispara el evento "updated" devolviendo la posición del cursor
        // context.emit("updated", current.edit.cursor);
      },
    );

    onMounted(() => {
      let editDiv: HTMLElement | null;
      let firstSpan: HTMLElement | null;
      let lastSpan: HTMLElement | null;
      //* getElementById necesita estar en el onMounted
      editDiv = document.getElementById("edit-box");

      function getPosition(event: MouseEvent): number {
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
          position = current.edit.value?.length;
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
        return position;
      }
      editDiv?.addEventListener("click", (event) => {
        current.edit.cursor = getPosition(event);
      });

      //* punto de inserción del ratón
      if (false) {
        editDiv?.addEventListener("click", (event) => {
          // current.edit.cursor = getPosition(event);
          current.edit.cursor = state.position.value;
          state.isMovingMouse.value = false;
        });
        editDiv?.addEventListener("mouseover", (event) => {
          state.isMovingMouse.value = true;
          state.position.value = getPosition(event);
        });
        editDiv?.addEventListener("mouseleave", (event) => {
          state.isMovingMouse.value = false;
        });
      }
    });

    //* caja de edición emergente
    if (false)
      onMounted(() => {
        let editDiv: HTMLElement | null;
        //* getElementById necesita estar en el onMounted
        editDiv = document.getElementById("edit-box");
        editDiv?.classList.add("editing");
        setTimeout(() => {
          editDiv?.classList.remove("editing");
        }, 2000);
      });
  },
});