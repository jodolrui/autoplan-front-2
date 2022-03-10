import { expose, exposed } from "@jodolrui/glue";
import { RecordBase } from "../../../helpers/data-interfaces";
import { required, numeric, integer, alphaNum } from "@vuelidate/validators";
import { State } from "../state";
import { useCurrent } from "../../../stores/useCurrent";

export default function setup() {
  const state = exposed<State>();
  const current = useCurrent();

  state.format = {
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

  state.fields = [
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

  state.newRecord = {
    __designKey: "root",
    __id: "",
    __parentId: current.routeId,
    __order: 0,
    __breadcrumb: "",
    name: { value: null },
  } as Record;
}
