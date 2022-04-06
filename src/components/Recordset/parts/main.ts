import { defineComponent, Ref, ref, watch, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useRoute } from "vue-router";
import { useState } from "../state";
import { useCurrent } from "../../shared/stores/useCurrent";
import { RecordBase } from "../../shared/interfaces/dataInterfaces";
import Record from "../../Record/index.vue";
export default defineComponent({
  components: { Record },
  setup() {
    const state = useState();
    const route = useRoute();
    const current = useCurrent();
    state.addOn = ref(false);
    state.records = computed(() => current.children);
    watch(
      state.records,
      () => {
        state.recordPulse.value++;
      },
      //! deep watch
      { deep: true },
    );
  },
});
