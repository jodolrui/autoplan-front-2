import { expose, exposed } from "@jodolrui/glue";
import {
  RecordBase,
  Format,
  Field,
  Design,
  ChildDesign,
} from "../shared/interfaces/dataInterfaces";
import { DesignPack } from "./getDesign";
import { required, numeric, integer, alphaNum } from "@vuelidate/validators";

const design: Design = {
  designKey: "root",
  caption: "Raíz",
};

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
  __designKey: "root",
  __id: "",
  __parentId: "",
  __order: 0,
  __breadcrumb: "",
  name: { value: null },
} as Record;

const childDesigns: ChildDesign[] = [
  {
    designKey: "site",
    min: 1,
    max: null,
  },
];

const designPack: DesignPack = {
  design,
  format,
  fields,
  newRecord,
  childDesigns,
};

export default designPack;
