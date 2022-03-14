<script setup>
const props = defineProps({
  config: { type: Object, required: true },
});
const config = props.config;
function clicked() {
  alert("clicked");
}
</script>

<template>
  <div @click="clicked($event)">
    {{ config.caption }}
  </div>
</template>
