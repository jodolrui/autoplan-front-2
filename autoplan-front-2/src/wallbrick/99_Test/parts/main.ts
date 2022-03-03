import { defineComponent, ref, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import _Brick from "../../99_Brick/index.vue";
import _Wall from "../../Wall/index.vue";
import { useData } from "../data";

export default defineComponent({
  components: { Brick: _Brick, Wall: _Wall },
  setup() {
    const data = useData();
    data.pulse = ref(0);

    function alertUs() {
      alert("hey you");
    }
    expose({ alertUs });
  },
});
