<template src="./template.html"></template>

//! quito lang="ts" para evitar errores de typescript
//! y elimino de tsconfig.json los archivos *.vue
<script>
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import edit from "./parts/edit";
import letters from "./parts/letters";
import numbers from "./parts/numbers";
import symbols from "./parts/symbols";
export default compose("Keyboard", [main, edit, letters, numbers, symbols]);
</script>

<style lang="scss">
#keyboard {
  /* position: fixed; */
  left: 0px;
  bottom: 0px;
  padding: 3px;
  padding-bottom: 3px;
  background-color: var(--bg-color);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 3px;
  width: 100%;
  @media (min-width: 800px) {
    width: 800px;
    margin-left: calc(50% - 400px);
    margin-right: calc(50% - 400px);
  }
  border-top: 1px solid var(--border-color);
}

button.btn-key {
  height: 100%;
  padding: 0px;
  font-size: 14pt;
  &:active {
    background-color: var(--active-color) !important;
  }
}


</style>
