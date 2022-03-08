import { defineComponent, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";
import { useProjectData } from "../../../stores/useProjectData";
import { sampleData } from "../../../helpers/data";
import Wall from "../../../wallbrick/Wall/index.vue";
import Id from "../../10_Id/index.vue";
import Keyboard from "../../60_Keyboard/index.vue";
import Test from "../../../wallbrick/Test/index.vue";
import { useCurrent } from "../../../stores/useCurrent";

export default defineComponent({
  components: { Wall, Id, Keyboard, Test },
  setup() {
    const data = useData();
    const projectData = useProjectData();
    projectData.setData(sampleData);
    data.current = useCurrent();
  },
});
