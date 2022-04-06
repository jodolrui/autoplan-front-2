import { watch } from "vue";
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
  designKey: "building",
  caption: "Edificio",
  icon: "fa fa-building",
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
  __designKey: "building",
  __id: "",
  __parentId: "",
  __order: 0,
  __breadcrumb: "",
  name: { value: null },
} as Record;

const childDesigns: ChildDesign[] = [
  {
    designKey: "floor",
    min: 1,
    max: null,
  },
  { designKey: "buildingExit", min: 1, max: null },
  { designKey: "elevator", min: 1, max: null },
  { designKey: "stairs", min: 1, max: null },
];

const designPack: DesignPack = {
  design,
  format,
  fields,
  newRecord,
  childDesigns,
};

export default designPack;
