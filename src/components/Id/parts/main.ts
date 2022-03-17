import { defineComponent, Ref, ref, watch, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useRoute } from "vue-router";
import { useState } from "../state";
import Datagrid from "../../Datagrid/index.vue";
import Wall from "../../shared/modules/wallbrick/Wall/index.vue";
import { useCurrent } from "../../shared/stores/useCurrent";
export default defineComponent({
  components: { Wall, Datagrid },
  setup() {
    const state = useState();
    const route = useRoute();
    const current = useCurrent();
    current.setId(route.params.id as string);
    state.designKey = computed(() => {
      return current.record?.__designKey;
    });
  },
});
