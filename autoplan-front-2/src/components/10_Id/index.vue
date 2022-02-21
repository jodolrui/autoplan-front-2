<template src="./template.html"></template>

<script lang="ts">
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import navbar from "./parts/navbar";
import breadcrumbs from "./parts/breadcrumbs";
import goTo from "./parts/goTo";
export default compose("Id", [
  main,
  navbar,
  goTo,
  breadcrumbs,
]);
</script>

<style>
</style>
