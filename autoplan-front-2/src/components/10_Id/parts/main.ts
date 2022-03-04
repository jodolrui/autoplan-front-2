import { defineComponent, Ref, ref, watch, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useRoute } from "vue-router";
import { useData } from "../data";
import Datagrid from "../../20_Datagrid/index.vue";
import Wall from "../../../wallbrick/Wall/index.vue";
// import Watch from "../../11_Watch/index.vue";
// import Tree from "../../50_Tree/index.vue";
import { useCurrent } from "../../../stores/useCurrent";
export default defineComponent({
  components: { Wall, Datagrid },
  setup() {
    const data = useData();
    const route = useRoute();
    data.current = useCurrent();
    data.current.setId(route.params.id as string);
    data.designKey = computed(() => {
      return data.current.record?.__designKey;
    });
  },
});
