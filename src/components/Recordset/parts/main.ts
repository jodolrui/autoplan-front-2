import { defineComponent, Ref, ref, watch, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useRoute } from "vue-router";
import { useState } from "../state";
import Wall from "../../shared/modules/wallbrick/Wall/index.vue";
import { useCurrent } from "../../shared/stores/useCurrent";
import { RecordBase } from "../../shared/interfaces/dataInterfaces";
import Record from "../../Record/index.vue";
export default defineComponent({
  components: { Record, Wall },
  setup() {
    const state = useState();
    const route = useRoute();
    const current = useCurrent();

    state.records = ref(current.children);
    console.log(state.records.value);

    // current.setId(route.params.id as string);
    // state.designKey = computed(() => {
    //   return current.record?.__designKey;
    // });
  },
});
