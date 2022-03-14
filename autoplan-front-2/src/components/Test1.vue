<script setup>
const props = defineProps({
  config: { type: Object, required: true },
});
const config = props.config;
function clicked() {
  config.clicked();
}
</script>

<template>
  <div :class="config.classes.toLiteral()" :style="config.style.toLiteral()" @click="clicked($event)">
    {{ config.caption }}
  </div>
</template>

