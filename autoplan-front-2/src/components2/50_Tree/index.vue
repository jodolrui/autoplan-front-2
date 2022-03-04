<template src="./template.html"></template>

//! quito lang="ts" para evitar errores de typescript
//! y elimino de tsconfig.json los archivos *.vue
<script>
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
export default compose("Tree", [main]);
</script>

<style scoped>
* {
  --my-table-border-color: var(--lm-table-border-color);
}
.dark-mode * {
  --my-table-border-color: var(--dm-table-border-color);
}
</style>
