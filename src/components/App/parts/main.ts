import { defineComponent, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useProjectData } from "../../shared/stores/useProjectData";
import { sampleData } from "../../shared/helpers/data";
import Wall from "../../shared/modules/wallbrick/Wall/index.vue";
import Id from "../../Id/index.vue";
import Keyboard from "../../Keyboard/index.vue";
import { useState } from "../state";

export default defineComponent({
  components: { Wall, Id, Keyboard },
  setup() {
    const state = useState();
    const projectData = useProjectData();
    projectData.setData(sampleData);
  },
});
