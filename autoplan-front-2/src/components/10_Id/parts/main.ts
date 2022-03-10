import { defineComponent, Ref, ref, watch, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useRoute } from "vue-router";
import { useState } from "../state";
import Datagrid from "../../20_Datagrid/index.vue";
import Wall from "../../../wallbrick/Wall/index.vue";
import { useCurrent } from "../../__shared/stores/useCurrent";
export default defineComponent({
  components: { Wall, Datagrid },
  setup() {
    const state = useState();
    const route = useRoute();
    state.current = useCurrent();
    state.current.setId(route.params.id as string);
    state.designKey = computed(() => {
      return state.current.record?.__designKey;
    });
  },
});
