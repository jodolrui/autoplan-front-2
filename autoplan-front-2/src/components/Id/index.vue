<template src="./template.html"></template>

<script lang="ts">
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import breadcrumbs from "./parts/breadcrumbs";
export default compose("Id", [
  main,
  breadcrumbs,
]);
</script>

<style>
</style>
