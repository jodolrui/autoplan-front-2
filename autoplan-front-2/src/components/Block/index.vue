<template src="./template.html"></template>

//! quito lang="ts" para evitar errores de typescript
//! y elimino de tsconfig.json los archivos *.vue
<script>
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
export default compose("Block", [main]);
</script>

<style scoped>
button {
  grid-area: v-bind(gridArea);
}
</style>
