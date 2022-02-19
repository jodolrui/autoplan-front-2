<template src="./template.html"></template>

<script lang="ts">
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import navbar from "./parts/navbar";
import breadcrumbs from "./parts/breadcrumbs";
export default compose("ViewId", [
  main,
  navbar,
  breadcrumbs
]);
</script>

<style>
</style>
