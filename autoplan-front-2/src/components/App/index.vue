<template src="./template.html"></template>

<script lang="ts">
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import topbar from "./parts/topbar";
import example from "./parts/example";
export default compose("App", [
  main,
  topbar,
  example,
]);
</script>

<style>
@import url("halfmoon/css/halfmoon-variables.min.css");

/* //* necesario para que el background-color aparezca bien en fullscreen */
#app:fullscreen {
  background-color: var(--lm-base-body-bg-color);
}
.dark-mode #app:fullscreen {
  background-color: var(--dm-base-body-bg-color)
}

#general {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

</style>
