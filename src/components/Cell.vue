<script setup>
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
classes["first-row"] = index <= 2;
classes["first-col"] = index % 2 !== 0;
classes["second-col"] = index % 2 === 0;

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
