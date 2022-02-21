import { defineComponent, Ref, ref, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useRoute } from "vue-router";
import { useData } from "../data";
import Design from "../../20_Design/index.vue";
import Wall from "../../30_Wall/index.vue";
import Watch from "../../11_Watch/index.vue";
import { RecordBase } from "../../../helpers/data-interfaces";
export default defineComponent({
  components: { Wall, Design, Watch },
  setup() {
    const data = useData();
    const route = useRoute();
    data.routeId = ref(route.params.id);
  },
});
