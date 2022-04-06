<template src="./template.html"></template>

<script lang="ts">
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import controls from "./parts/controls";
import options from "./parts/options";
export default compose("Recordset", [main, controls, options]);
</script>

<style></style>
