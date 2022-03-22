<script setup>
const props = defineProps({
  config: { type: Object, required: true },
});
const config = props.config;
function clicked() {
  config.clicked(config, config.wall);
}
</script>

<template>
  <button
    :id="config.id"
    :class="config.classes.toLiteral()"
    :style="config.style.toLiteral()"
    @click="clicked($event)">
    <i :class="config.icon"></i>
  </button>
</template>

<style scoped lang="scss">
button {
  width: 40px !important;
  height: 40px !important;
  border-radius: 100%;
  display: inline-block;
  padding-top: 2px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  color: var(--fore-color);
  background-image: none;
  box-shadow: 0 2px 2px var(--shadow-color);
  -webkit-appearance: button;
  text-transform: none;
  overflow: visible;
  font-family: inherit;
  font-size: 100%;
  margin: 0;
  box-sizing: inherit;
  /* elimina la posibilidad de seleccionar el texto */
  user-select: none;
  -webkit-user-select: none;
  /* elimina el azul del toque en móviles */
  -webkit-tap-highlight-color: transparent;
}
</style>
