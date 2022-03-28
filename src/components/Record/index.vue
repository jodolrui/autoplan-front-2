<template src="./template.html"></template>

<script>
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import add from "./parts/add";
import control from "./parts/control";
import table from "./parts/table";
import design from "./parts/design";
import options from "./parts/options";

export default compose("Record", [main, design, add, control, options, table]);
</script>

<style scoped></style>
