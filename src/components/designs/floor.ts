import { watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import {
  RecordBase,
  Format,
  Field,
  ChildDesign,
} from "../shared/interfaces/dataInterfaces";
import { Design } from "./getDesign";
import { required, numeric, integer, alphaNum } from "@vuelidate/validators";

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
  name: { value: string | null };
  abbreviation: { value: string | null };
  order: { value: number | null };
  use: { value: string | null };
  constructedArea: { value: number | null; units: string | null };
  evacuationHeight: { value: number | null; units: string | null };
  isUnderground: { value: boolean | null };
  edit: { value: boolean | null };
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
    inlineStyle: {
      width: "200px",
    },
  },
  {
    key: "abbreviation",
    label: { caption: "Abreviatura" },
    control: {
      type: "text",
      placeholder: "Introduce texto",
    },
    validation: { value: { required, alphaNum } },
    inlineStyle: {
      width: "30px",
    },
  },
  {
    key: "order",
    label: { caption: "Orden" },
    control: {
      type: "text",
      placeholder: "Introduce número",
    },
    validation: { value: { required, integer } },
    inlineStyle: {
      width: "20px",
    },
  },
  {
    key: "use",
    label: { caption: "Uso normativo" },
    control: {
      type: "select",
      options: [
        "Administrativo",
        "Aparcamiento",
        "Comercial",
        "Docente",
        "Hospitalario",
        "Industrial",
        "Pública concurrencia",
        "Residencial público",
        "Residencial vivienda",
      ],
      placeholder: "Selecciona valor",
    },
    validation: { value: { required } },
    inlineStyle: {
      width: "30px",
    },
  },
  {
    key: "constructedArea",
    label: { caption: "Superficie construida" },
    control: {
      type: "text",
      placeholder: "Introduce número",
    },
    units: ["m2"],
    validation: { value: { required, numeric } },
    inlineStyle: {
      width: "30px",
    },
  },
  {
    key: "evacuationHeight",
    label: { caption: "Altura de evacuación" },
    control: {
      type: "text",
      placeholder: "Introduce número",
    },
    units: ["m"],
    validation: { value: { required, integer } },
    inlineStyle: {
      width: "30px",
    },
  },
  {
    key: "isUnderground",
    label: { caption: "Bajo rasante" },
    control: {
      type: "checkbox",
    },
    validation: { value: { required } },
    inlineStyle: {
      width: "30px",
    },
  },
];

const newRecord: Record = {
  __designKey: "floor",
  __id: "",
  __parentId: "",
  __order: 0,
  __breadcrumb: "",
  name: { value: null },
  abbreviation: { value: null },
  order: { value: null },
  use: { value: null },
  constructedArea: { value: null, units: null },
  evacuationHeight: { value: null, units: null },
  isUnderground: { value: false },
  edit: { value: true },
} as Record;

const childDesigns: ChildDesign[] = [] as ChildDesign[];

const design: Design = { format, fields, newRecord, childDesigns };

export default design;
