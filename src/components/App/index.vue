<template src="./template.html"></template>

<script lang="ts">
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import navbar from "./parts/navbar";
export default compose("App", [main, navbar]);
</script>

<style>
@import url("./styles/variables.scss");
@import url("./styles/reset.scss");
@import url("./styles/base.scss");
@import url("./styles/layout.scss");
/* --> modules */
@import url("./styles/modules/header.scss");
@import url("./styles/modules/body.scss");
@import url("./styles/modules/footer.scss");
@import url("./styles/modules/btn.scss");
@import url("./styles/modules/container.scss");
@import url("./styles/modules/cell.scss");
@import url("./styles/modules/edit-char.scss");
@import url("./styles/modules/cursor.scss");
@import url("./styles/modules/field.scss");
@import url("./styles/modules/keyboard.scss");
/* --< modules */
/* @import url("./styles/state.scss"); */
/* @import url("./styles/theme.scss"); */
</style>
