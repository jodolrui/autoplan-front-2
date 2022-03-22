<template src="./template.html"></template>

<script lang="ts">
import { compose } from "@jodolrui/glue";
import main from "./parts/main";
import navbar from "./parts/navbar";
export default compose("App", [main, navbar]);
</script>

<style lang="scss">
@import url("./reset.scss");

@import url("./styles/--variables.scss");
@import url("./styles/base.scss");
@import url("./styles/layout.scss");
/* --> modules */
@import url("./styles/module.toolbar.scss");
@import url("./styles/module.btn.scss");
@import url("./styles/module.cell.scss");
@import url("./styles/module.edit-char.scss");
@import url("./styles/module.cursor.scss");
@import url("./styles/module.field.scss");
@import url("./styles/module.keyboard.scss");
/* --< modules */
@import url("./styles/state.scss");
/* @import url("./styles/theme.scss"); */
</style>
