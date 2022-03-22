<template src="./template.html"></template>

<script>
import { compose } from "@jodolrui/glue";
import stylize from "../../components/shared/parts/stylize";
import main from "./parts/main";

export default compose("Edit", [stylize, main]);
</script>

<style scoped lang="scss"></style>
