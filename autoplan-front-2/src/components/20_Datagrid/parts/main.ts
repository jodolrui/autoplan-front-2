import { defineComponent, Ref, ref, watch, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useRoute } from "vue-router";
import { useState } from "../state";
import Design from "../../21_Design/index.vue";
import { useCurrent } from "../../__shared/stores/useCurrent";
import { Brick, Wall } from "../../../wallbrick/wallbrick";
export default defineComponent({
  components: { Design },
  setup() {
    const state = useState();
    const route = useRoute();
    state.current = useCurrent();
    state.current.setId(route.params.id as string);
    state.designKey = computed(() => {
      return state.current.record?.__designKey;
    });
    state.designPulse = ref(0);
  },
});
