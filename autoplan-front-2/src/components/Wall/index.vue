<template src="./template.html"></template>

//! quito lang="ts" para evitar errores de typescript
//! y elimino de tsconfig.json los archivos *.vue
<script>
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
export default compose("Wall", [main]);
</script>

<style>
.wall {
  height: calc(100%-10px);
  /* margin-top: 2px;
  margin-bottom: 2px; */
  width: calc(100%-10px);
  /* margin-left: 5px;
  margin-right: 5px; */
}

.wall {
  display: grid;
  grid-template-rows: repeat(v-bind(rows), calc(100% / v-bind(rows)));
  grid-template-columns: repeat(v-bind(cols), 1fr);
  /* grid-gap: 3px; */
}

.wall-flex {
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-align-content: stretch;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.item-flex {
  -webkit-order: 0;
  -ms-flex-order: 0;
  order: 0;
  -webkit-flex: 0 1 auto;
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  -webkit-align-self: auto;
  -ms-flex-item-align: auto;
  align-self: auto;
}
</style>
