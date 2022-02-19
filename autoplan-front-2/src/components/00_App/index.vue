<template src="./template.html"></template>

<script lang="ts">
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
export default compose("App", [main]);
</script>

<style>
@import url("halfmoon/css/halfmoon-variables.min.css");

/* //* necesario para que el background-color aparezca bien en fullscreen */
#app:fullscreen {
  background-color: var(--lm-base-body-bg-color);
}
.dark-mode #app:fullscreen {
  background-color: var(--dm-base-body-bg-color);
}
</style>
