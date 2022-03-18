<template src="./template.html"></template>

<script lang="ts">
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import control from "./parts/control";
export default compose("Recordset", [main, control]);
</script>

<style></style>
