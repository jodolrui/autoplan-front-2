<template src="./template.html"></template>

<script lang="ts">
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import navbar from "./parts/navbar";
import breadcrumbs from "./parts/breadcrumbs";
import records from "./parts/records";
export default compose("Id", [
  main,
  navbar,
  breadcrumbs,
  records
]);
</script>

<style>
</style>
