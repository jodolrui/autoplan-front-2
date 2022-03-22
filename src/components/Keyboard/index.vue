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
  width: auto;
  /* border-top: 1px solid var(--border-color); */
}

button.btn-key {
  height: 100%;
  padding: 0px;
  font-size: 14pt;
  &:active {
    background-color: var(--active-color) !important;
  }
}

.pressed {
  animation: active 1s ease 1;
}

@keyframes active {
  0% {
    background-color: var(--active-color);
  }
  100% {
    background-color: inherit;
  }
}

.pressed div__old {
  animation: fly 0.5s ease 1;
  position: relative;
}

@keyframes fly {
  0% {
    transform: scale(1);
    opacity: 0;
  }
  50% {
    transform: scale(5) translateY(-0.5rem);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
