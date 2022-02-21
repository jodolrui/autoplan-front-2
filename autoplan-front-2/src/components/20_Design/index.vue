<template src="./template.html"></template>

<script>
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import design from "./parts/design";

export default compose("Design", [
  main,
  design,
]);
</script>

<style scoped>
.collapse-panel {
  margin-bottom: 0.5em;
}

.collapse-header {
  border: none;
  border-radius: 0px;
  /* background: transparent; */
}

.collapse-content {
  padding: 0px;
  margin: 0px;
  border: none;
}
</style>
