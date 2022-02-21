import { defineComponent, Ref, ref, watch, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useRoute } from "vue-router";
import { useData } from "../data";
import Design from "../../20_Design/index.vue";
import Wall from "../../30_Wall/index.vue";
import Watch from "../../11_Watch/index.vue";
import { useCurrent } from "../../../stores/useCurrent";
export default defineComponent({
  components: { Wall, Design, Watch },
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
