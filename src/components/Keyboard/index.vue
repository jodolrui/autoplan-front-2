<template src="./template.html"></template>

//! quito lang="ts" para evitar errores de typescript //! y elimino de
tsconfig.json los archivos *.vue
<script>
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import letters from "./parts/letters";
import numbers from "./parts/numbers";
import symbols from "./parts/symbols";
export default compose("Keyboard", [main, letters, numbers, symbols]);
</script>

<style lang="scss"></style>
