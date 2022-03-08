import { defineComponent, ref, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import _Brick from "../../Brick/index.vue";
import _Wall from "../../Wall/index.vue";
import { useState } from "../state";

export default defineComponent({
  components: { Brick: _Brick, Wall: _Wall },
  setup() {
    const state = useState();
    state.pulse = ref(0);

    function alertUs() {
      alert("hey you");
    }
    expose({ alertUs });
  },
});
