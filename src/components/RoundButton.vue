<script setup>
const props = defineProps({
  config: { type: Object, required: true },
});
const config = props.config;
function clicked() {
  config.clicked(config, config.rack);
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
  display: inline-block;
  width: 2.5rem !important;
  height: 2.5rem !important;
  border-radius: 100%;
}
</style>
