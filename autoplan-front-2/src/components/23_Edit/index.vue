<template src="./template.html"></template>

<script>
import { compose } from "@jodolrui/glue";
import main from "./parts/main";

export default compose("Edit", [main]);
</script>

<style scoped lang="scss">

#edit {
  height: 100%;
  width: 100%;
  text-align: center;
  padding-top: 9px;
  overflow-x: auto;
  background-color: var(--active-color);
  /* "position: relative" es necesario para que funcione bien el offsetLeft de los edit-char */
  position: relative;
}

.edit-char {
  border-left: 2px solid transparent;
  /* compensamos el espacio añadido por el border-left */
  margin-left: -1px;
  margin-right: -1px;
}

.cursor {
  border-left: 2px solid var(--fore-color);
  animation: blinker 0.5s ease infinite;
}

.cursor-end {
  border-left: 2px solid transparent;
  /* compensamos el espacio añadido por el border-left */
  /* margin-left: -1px;
  margin-right: -1px; */
  //* para que no sea seleccionable
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
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
