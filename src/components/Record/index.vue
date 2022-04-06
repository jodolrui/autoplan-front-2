<template src="./template.html"></template>

<script>
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import controls from "./parts/controls";
import table from "./parts/table";
import design from "./parts/design";
import options from "./parts/options";
import topPanel from "./parts/topPanel";

export default compose("Record", [
  main,
  design,
  topPanel,
  controls,
  options,
  table,
]);
</script>

<style scoped></style>
