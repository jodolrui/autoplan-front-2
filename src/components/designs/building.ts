import { watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { RecordBase, Format, Field } from "../shared/interfaces/dataInterfaces";
import { required, numeric, integer, alphaNum } from "@vuelidate/validators";

const format: Format = {
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

const fields: Field[] = [
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

const newRecord: Record = {
  __designKey: "building",
  __id: "",
  __parentId: "",
  __order: 0,
  __breadcrumb: "",
  name: { value: null },
} as Record;

export default { format, fields, newRecord };
