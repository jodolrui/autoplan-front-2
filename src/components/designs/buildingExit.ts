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
  designKey: "buildingExit",
  caption: "Salida de edificio",
};

const format: Format = {
  desktop: {
    view: "table",
    inlineStyle: {
      width: "700px",
    },
  },
  tablet: {
    view: "list",
  },
  mobile: { view: "list" },
};

type Record = RecordBase & {
  number: { value: number | null };
  to: { value: string | null };
  isForEmergencyUseOnly: { value: boolean | null };
  width: { value: number | null; units: string | null };
};

const fields: Field[] = [
  {
    key: "number",
    label: { caption: "Número" },
    control: {
      type: "text",
      placeholder: "Introduce número",
    },
    validation: { value: { required, integer } },
    inlineStyle: {
      width: "200px",
    },
  },
  {
    key: "to",
    label: { caption: "Hasta" },
    control: {
      type: "text",
      placeholder: "Introduce texto",
    },
    validation: { value: { required, alphaNum } },
    inlineStyle: {
      width: "200px",
    },
  },
  {
    key: "isForEmergencyUseOnly",
    label: { caption: "Uso exclusivo en emergencias" },
    control: {
      type: "checkbox",
    },
    validation: { value: { required } },
    inlineStyle: {
      width: "30px",
    },
  },
  {
    key: "width",
    label: { caption: "Ancho" },
    control: {
      type: "text",
      placeholder: "Introduce número",
    },
    units: ["m", "cm"],
    validation: { value: { required, numeric } },
    inlineStyle: {
      width: "30px",
    },
  },
];

const newRecord: Record = {
  __designKey: "floorExit",
  __id: "",
  __parentId: "",
  __order: 0,
  __breadcrumb: "",
  number: { value: null },
  to: { value: null },
  isForEmergencyUseOnly: { value: false },
  width: { value: null, units: "cm" },
} as Record;

const childDesigns: ChildDesign[] = [
  {
    designKey: "buildingDoor",
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
