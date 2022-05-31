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
    {{ config.caption }}
  </button>
</template>

<style scoped lang="scss"></style>
