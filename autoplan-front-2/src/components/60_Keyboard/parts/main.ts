import { defineComponent, ref, computed, watch, reactive, Ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { useProjectData } from "../../__shared/stores/useProjectData";
import { useCurrent } from "../../__shared/stores/useCurrent";
import { RecordBase } from "../../__shared/interfaces/dataInterfaces";
import { Wall } from "../../../wallbrick/wallbrick";
import _Wall from "../../../wallbrick/Wall/index.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { Wall: _Wall },
  emits: ["updated"],
  setup() {
    const state = useState();
    state.current = useCurrent();
  },
});
