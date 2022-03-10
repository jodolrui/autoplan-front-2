import { defineComponent, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useProjectData } from "../../__shared/stores/useProjectData";
import { sampleData } from "../../__shared/helpers/data";
import Wall from "../../../wallbrick/Wall/index.vue";
import Id from "../../10_Id/index.vue";
import Keyboard from "../../60_Keyboard/index.vue";
import Test from "../../../wallbrick/Test/index.vue";
import { useCurrent } from "../../__shared/stores/useCurrent";
import { useState } from "../state";

export default defineComponent({
  components: { Wall, Id, Keyboard, Test },
  setup() {
    // const state = exposed<State>();
    const state = useState();
    const projectData = useProjectData();
    projectData.setData(sampleData);
    console.log(state.current);

    state.current = useCurrent();
    console.log(state.current);
    state.keyboardPulse = ref(0);
  },
});
