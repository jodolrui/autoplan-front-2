import { watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { RecordBase } from "../../../helpers/data-interfaces";
import { required, numeric, integer, alphaNum } from "@vuelidate/validators";
import { useData } from "../data";
import { useCurrent } from "../../../stores/useCurrent";

export default function setup() {
  const data = useData();
  const current = useCurrent();

  data.format = {
    desktop: {
      view: "table",
      inlineStyle: {
        width: "800px",
      },
    },
    tablet: {
      view: "list",
    },
    mobile: { view: "list" },
  };

  type Record = RecordBase & {
    name: { value: string | null };
  };

  data.fields = [
    {
      key: "name",
      label: { caption: "Denominación" },
      control: {
        type: "text",
        placeholder: "Introduce texto",
      },
      validation: { value: { required } },
    },
  ];

  data.newRecord = {
    __designKey: "building",
    __id: "",
    __parentId: current.routeId,
    __order: 0,
    __breadcrumb: "",
    name: { value: null },
  } as Record;
}
