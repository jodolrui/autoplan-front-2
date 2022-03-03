<template src="./template.html"></template>

//! quito lang="ts" para evitar errores de typescript
//! y elimino de tsconfig.json los archivos *.vue
<script>
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import test1 from "./parts/test1";
import test2 from "./parts/test2";
export default compose("99_Test", [main, test1, test2]);
</script>

<style>
</style>
