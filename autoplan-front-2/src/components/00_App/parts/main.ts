import { defineComponent, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useProjectData } from "../../__shared/stores/useProjectData";
import { sampleData } from "../../__shared/helpers/data";
import Wall from "../../__shared/modules/wallbrick/Wall/index.vue";
import Id from "../../10_Id/index.vue";
import Keyboard from "../../60_Keyboard/index.vue";
import { useState } from "../state";

export default defineComponent({
  components: { Wall, Id, Keyboard },
  setup() {
    const state = useState();
    const projectData = useProjectData();
    projectData.setData(sampleData);
  },
});
