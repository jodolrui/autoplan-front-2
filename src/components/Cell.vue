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
const classes = config.classes.toLiteral();
classes["m-cell"] = true;
classes["m-cell__first-row"] = index <= 2;
classes["m-cell__first-col"] = index % 2 !== 0;
classes["m-cell__second-col"] = index % 2 === 0;
</script>

<template>
  <div
    :class="classes"
    :style="config.style.toLiteral()"
    @click="clicked($event)">
    {{ config.caption }}
  </div>
</template>

<style scoped lang="scss"></style>
