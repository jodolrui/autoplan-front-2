<template src="./template.html"></template>

<script>
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import control from "./parts/control";
import table from "./parts/table";
import design from "./parts/design";

export default compose("Record", [main, design, control, table]);
</script>

<style scoped></style>
