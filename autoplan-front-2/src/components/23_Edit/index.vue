<template src="./template.html"></template>

<script>
import { compose } from "@jodolrui/glue";
import main from "./parts/main";

export default compose("Edit", [main]);
</script>

<style scoped>

#edit {
  height: 100%;
  width: 100%;
  text-align: center;
  padding-top: 8px;
  overflow-x: auto;
  background-color: var(--active-color);
}

.edit-char {
  border-left: 2px solid transparent;
}

.cursor-char {
  border-left: 2px solid var(--fore-color);
  animation: blinker 0.5s ease infinite;
}

@keyframes blinker {
  0% {
    border-left: 2px solid var(--fore-color);
  }
  33% {
    border-left: 2px solid var(--fore-color);
  }
  66% {
    border-left: 2px solid transparent;
  }
  100% {
    border-left: 2px solid transparent;
  }
}
</style>
