<template src="./template.html"></template>

<script>
import { compose } from "@jodolrui/glue";
import stylize from "../../components/shared/parts/stylize";
import main from "./parts/main";

export default compose("Edit", [stylize, main]);
</script>

<style scoped lang="scss">
#edit-box-container {
  position: relative;
  overflow:visible;
  height: 100%;
}

#edit-box {
  height: 100%;
  width: 100%;
  text-align: center;
  padding-top: 9px;
  overflow-x: auto;
  background-color: var(--active-color);
  /* position: "relative" o "absolute" es necesario para que funcione bien el offsetLeft de los edit-char */
  position: absolute;
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

.position {
  border-left: 2px solid var(--fore-color);
  /* opacity: 0.5; */
  /* animation: blinker 0.5s ease infinite; */
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

.editing {
  position: sticky;
  display: block;
  top: 0%;
  left: -50%;
  width: 100%;
  transform: scale(2);
  /* border: 0.5px solid var(--border-color); */
  /* box-shadow: 0px 0px 10px var(--border-color); */
  /* background-color: lightgoldenrodyellow !important; */
  border: none !important;
  opacity: 0.8;
  /* background-color: var(--active-color); */
  /* animation: open 0.1s ease-in-out 1; */
  z-index: 1;
}

@keyframes open {
  0% {
    transform: translateX(50%);
  }
  100% {
    transform: scale(1.9);
  }
}
</style>
