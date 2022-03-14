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
    :class="config.classes.toLiteral()"
    :style="config.style.toLiteral()"
    @click="clicked($event)">
    <div>
      <i :class="config.icon"></i>
    </div>
  </button>
</template>
