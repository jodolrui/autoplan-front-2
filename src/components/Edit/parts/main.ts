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
import { Brick } from "../../shared/modules/wallbrick/wallbrick";

export default defineComponent({
  props: {
    config: { type: Object, required: true },
    index: { type: Number, required: true },
    count: { type: Number, required: true },
  },
  setup(props, context) {
    const current = useCurrent();
    expose({ current });
    const state = useState();
    state.chars = computed(() =>
      current.edit.value ? current.edit.value.split("") : [],
    );
    state.config = props.config as Brick;
    state.index = props.index;
    state.count = props.count;
    function clicked() {
      state.config.clicked(state.config, state.config.wall);
    }
    state.classes = state.config.classes.toLiteral();
    state.classes["cell"] = true;
    state.classes["edit"] = true;
    state.classes["is-first-row"] = state.index <= 2;
    state.classes["is-first-col"] = state.index % 2 !== 0;
    state.classes["is-second-col"] = state.index % 2 === 0;

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
    });
  },
});
