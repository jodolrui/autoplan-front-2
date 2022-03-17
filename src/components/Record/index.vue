<template src="./template.html"></template>

<script>
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import control from "./parts/control";
import table from "./parts/table";

export default compose("Record", [
  main,
  control,
  table,
]);
</script>

<style scoped>
* {
  --my-table-border-color: var(--lm-table-border-color);
}
.dark-mode * {
  --my-table-border-color: var(--dm-table-border-color);
}

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
