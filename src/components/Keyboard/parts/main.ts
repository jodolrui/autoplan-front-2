import { defineComponent, ref, computed, watch, reactive, Ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";

export default defineComponent({
  emits: ["updated"],
  setup() {
    const state = useState();
  },
});
