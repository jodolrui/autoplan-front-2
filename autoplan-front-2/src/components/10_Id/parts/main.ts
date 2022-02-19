import { defineComponent, Ref, ref, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useRoute } from "vue-router";
import { useData } from "../data";
import { currentData } from "../../../helpers/data";
import Design from "../../20_Design/index.vue";
import Wall from "../../30_Wall/index.vue";
import { RecordBase } from "../../../helpers/data-interfaces";
export default defineComponent({
  components: { Wall, Design },
  setup() {
    const data = useData();
    const route = useRoute();
    data.routeId = ref(route.params.id);

    const record: Ref<RecordBase> = <Ref<RecordBase>>ref({});
    const found = currentData.find((element) => {
      return element.__id === data.routeId.value;
    });
    if (found) record.value = found;
    expose({ record });

    console.log({ record });

    const designKey = ref(record ? record.value.__designKey : "");
    expose({ designKey });

    const children: Ref<RecordBase[]> = <Ref<RecordBase[]>>ref([]);
    const foundChildren = currentData.filter((element) => {
      return element.__parentId === data.routeId.value;
    });
    if (foundChildren) children.value = foundChildren;
    expose({ children });
  },
});
