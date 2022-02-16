<template src="./template.html"></template>

<script lang="ts">
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import bar from "./parts/bar";
import foo from "./parts/foo";
import topbar from "./parts/topbar";
export default compose("App", [
  main,
  bar,
  foo,
  topbar,
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
