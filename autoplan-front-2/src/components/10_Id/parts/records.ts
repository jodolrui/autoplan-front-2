import { defineComponent, Ref, ref, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useRoute } from "vue-router";
import { useData } from "../data";
import { RecordBase } from "../../../helpers/data-interfaces";
import { useProjectData } from "../../../stores/useProjectData";
export default defineComponent({
  setup() {
    const data = useData();
    const projectData = useProjectData();
    const route = useRoute();
    data.routeId = ref(route.params.id);
    //* buscamos el registro
    data.record = ref(projectData.getItem(data.routeId.value as string));
    //* buscamos los hijos
    data.children = ref(projectData.getChildren(data.routeId.value as string));
    //* ordenamos hijos primero por __designKey y segundo por __order
    if (data.children.value)
      data.children.value.sort((a: RecordBase, b: RecordBase) => {
        if (a.__designKey === b.__designKey) {
          return a.__order === b.__order ? 0 : a.__order < b.__order ? -1 : 1;
        } else {
          return a.__designKey.localeCompare(b.__designKey);
        }
      });
    //* buscamos el path
    data.path = ref(projectData.getPath(data.routeId.value as string));
  },
});
