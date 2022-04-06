<template src="./template.html"></template>

<script lang="ts">
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
// import control from "./parts/control";
import add from "./parts/add";
import options from "./parts/options";
export default compose("Recordset", [main, add, options]);
</script>

<style></style>
