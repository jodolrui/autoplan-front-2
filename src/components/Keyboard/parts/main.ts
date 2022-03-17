import { defineComponent, ref, computed, watch, reactive, Ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import Wall from "../../shared/modules/wallbrick/Wall/index.vue";

export default defineComponent({
  components: { Wall },
  emits: ["updated"],
  setup() {
    const state = useState();
  },
});
