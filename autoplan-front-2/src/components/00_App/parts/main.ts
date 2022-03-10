import { defineComponent, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { useProjectData } from "../../../stores/useProjectData";
import { sampleData } from "../../../helpers/data";
import Wall from "../../../wallbrick/Wall/index.vue";
import Id from "../../10_Id/index.vue";
import Keyboard from "../../60_Keyboard/index.vue";
import Test from "../../../wallbrick/Test/index.vue";
import { useCurrent } from "../../../stores/useCurrent";
import { State } from "../type";

export default defineComponent({
  components: { Wall, Id, Keyboard, Test },
  setup() {
    // const state = useState();
    const state = exposed<State>();
    const projectData = useProjectData();
    projectData.setData(sampleData);
    state.current = useCurrent();
    state.keyboardPulse = ref(0);
  },
});
