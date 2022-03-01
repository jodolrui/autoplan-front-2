<template src="./template.html"></template>

<script lang="ts">
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import navbar from "./parts/navbar";
export default compose("App", [main, navbar]);
</script>

<style lang="scss">
@import url("styles/reset.css");
@import url("styles/mixins.scss");
@import url("styles/variables.scss");
@import url("styles/layout.scss");
/* @import url("halfmoon/css/halfmoon-variables.min.css"); */

body {
  font-size: 10pt;
  background-color: var(--bg-color);
}

/* //* necesario para que el background-color aparezca bien en fullscreen */
#app:fullscreen {
  background-color: var(--bg-color);
}
.dark-mode #app:fullscreen {
  background-color: var(--bg-color);
}

/* --> variables */
#app {
  --width: 100%;
  --max-width: 800px;
  --border: none;
}
@media (min-width: 800px) {
  #app {
    --width: var(--max-width);
    --border: 1px solid var(--border-color);
  }
  .dark-mode #app {
  --border: 1px solid var(--border-color);
}
}
/* --< variables */
#app {
  width: var(--width);
  margin-left: calc(50% - var(--width) / 2);
  margin-right: calc(50% - var(--width) / 2);
  border-left: var(--border);
  border-right: var(--border);
}
.dark-mode #app {
  /* background-color: var(--dm-bg-color); */
}



/* margen detrás del teclado */
/* #general {
  margin-bottom: 200px;
  overflow-y: scroll;
  overflow-x: auto;
} */




.btn {
  /* @include noselect(); */
  display: inline-block;
  height: 2.2rem;
  padding-top: auto;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 0.4rem;
  color: var(--fore-color);
  background-image: none;
  box-shadow: 0 0.2rem 0.2rem var(--shadow-color);
  -webkit-appearance: button;
  text-transform: none;
  overflow: visible;
  font-family: inherit;
  font-size: 100%;
  margin: 0;
  box-sizing: inherit;
  &.btn-square {
    width: 2.2rem;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    &.rounded-circle {
      border-radius: 100%;
    }
  }
  /* elimina la posibilidad de seleccionar el texto */
  user-select: none;
  -webkit-user-select: none;
  /* elimina el azul del toque en móviles */
  -webkit-tap-highlight-color: transparent;
}

.field {
  /* @include noselect(); */
  display: inline-block;
  height: 2.2rem;
  padding-top: auto;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  &.field-first {
    border-top: 1px solid var(--border-color);
  }
  &.field-label {
    border-right: 1px solid var(--border-color);
  }
  color: var(--fore-color);
  background-image: none;
  -webkit-appearance: button;
  text-transform: none;
  overflow: visible;
  font-family: inherit;
  font-size: 100%;
  margin: 0;
  box-sizing: inherit;
  /* scroll para poder ver el contenido entero */
  overflow-x:scroll;
  &.field-value {
    /* font-size: 0.9rem; */
  }
  /* elimina el azul del toque en móviles */
  -webkit-tap-highlight-color: transparent;
}


/* --> elimina el efecto que tiene la navbar sobre height */
/* html,
body,
#app, */
.container {
  height: 100%;
  position: fixed;
}
/* --< elimina el efecto que tiene la navbar sobre height */






</style>
