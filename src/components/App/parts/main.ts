import { defineComponent, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useProjectData } from "../../shared/stores/useProjectData";
import { sampleData } from "../../shared/helpers/data";
import Id from "../../Id/index.vue";
import Keyboard from "../../Keyboard/index.vue";
import Options from "../../Options/index.vue";
import { useState } from "../state";

export default defineComponent({
  components: { Id, Keyboard, Options },
  setup() {
    const state = useState();
    const projectData = useProjectData();
    projectData.setData(sampleData);
  },
});
