import { defineComponent, Ref, ref, watch, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useRoute } from "vue-router";
import { useData } from "../data";
import Design from "../../21_Design/index.vue";
import { useCurrent } from "../../../stores/useCurrent";
export default defineComponent({
  components: { Design },
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
