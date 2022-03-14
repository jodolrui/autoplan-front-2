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
    :id="config.code"
    :class="classes"
    :style="style"
    @click="clicked($event)">
    <div>
      <i :class="config.icon"></i>
    </div>
  </button>
</template>
