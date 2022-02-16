<template src="./template.html"></template>

//! quito lang="ts" para evitar errores de typescript
//! y elimino de tsconfig.json los archivos *.vue
<script>
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
export default compose("Blocks", [main]);
</script>

<style>
.blocks {
  height: calc(100%-10px);
  /* margin-top: 2px;
  margin-bottom: 2px; */
  width: calc(100%-10px);
  /* margin-left: 5px;
  margin-right: 5px; */
}

.blocks {
  display: grid;
  grid-template-rows: repeat(v-bind(rows), calc(100% / v-bind(rows)));
  grid-template-columns: repeat(v-bind(cols), 1fr);
  /* grid-gap: 3px; */
}
</style>
