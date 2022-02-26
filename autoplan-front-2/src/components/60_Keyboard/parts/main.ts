import { defineComponent, ref, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";
import { useProjectData } from "../../../stores/useProjectData";
import { useCurrent } from "../../../stores/useCurrent";
import { RecordBase } from "../../../helpers/data-interfaces";
import { defineWall, Wall, WallConfig } from "../../../helpers/wall-brick";
import _Wall from "../../30_Wall/index.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { Wall: _Wall },
  setup() {
    const data = useData();
    data.keys = [];
    data.numbers = [];
    data.symbols = [];
    data.shift = ref(false);
    data.panel = ref("letters");
    data.pulse = ref(0);
  },
});
