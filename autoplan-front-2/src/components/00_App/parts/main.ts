import { defineComponent, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";
import { useProjectData } from "../../../stores/useProjectData";
import { currentData } from "../../../helpers/data";
import Wall from "../../30_Wall/index.vue";
import Id from "../../10_Id/index.vue";
export default defineComponent({
  components: { Wall, Id },
  setup() {
    const data = useData();
    const projectData = useProjectData();
    projectData.setData(currentData);
  },
});
