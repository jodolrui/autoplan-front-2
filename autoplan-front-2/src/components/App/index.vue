<template src="./template.html"></template>

<script lang="ts">
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import example from "./parts/example";
import foo from "./parts/foo";
export default compose("App", [
  main,
  foo,
  example,
]);
</script>

<style>
@import url("halfmoon/css/halfmoon-variables.min.css");
/* @import url("./styles/media.css");
@import url("./styles/main.css");
@import url("./styles/items.css"); */

#general {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}
</style>
