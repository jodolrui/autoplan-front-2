<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useCurrent } from "./shared/stores/useCurrent"
const current = useCurrent();
const props = defineProps({
  config: { type: Object, required: true },
  index: { type: Number, required: true },
  count: { type: Number, required: true },
});
const config = props.config;
const index = props.index;
const count = props.count;
function clicked() {
  config.clicked();
}
const classes = config.classes.toLiteral()
classes["cell"] = true;
classes["edit"] = true;
classes["first-row"] = index <= 2;
classes["first-col"] = index % 2 !== 0;
classes["second-col"] = index % 2 === 0;

const chars = computed(() =>
  current.edit.value ? current.edit.value.split("") : [],
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
});

</script>

<template>
  <div
    :class="classes"
    :style="config.style.toLiteral()"
    @click="clicked($event)"
  >{{ config.caption }}</div>
</template>

<style scoped lang="scss">
.cell {
  display: inline-block;
  min-height: 2.2rem;
  height: 100%;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  padding-top: 0.7rem;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  &.first-row {
    border-top: 1px solid var(--border-color);
  }
  &.first-col {
    border-right: 1px solid var(--border-color);
  }
  color: var(--fore-color);
  background-image: none;
  -webkit-appearance: button;
  text-transform: none;
  overflow: visible;
  font-family: inherit;
  font-size: 100%;
  margin: 0;
  box-sizing: inherit;
  /* scroll para poder ver el contenido entero */
  overflow-x: auto;
  &.second-col {
    /* añador código */
  }
  /* elimina el azul del toque en móviles */
  -webkit-tap-highlight-color: transparent;
  &.selected {
    background-color: var(--active-color) !important;
  }
}
</style>
