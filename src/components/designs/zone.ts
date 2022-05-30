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
  designKey: "zone",
  caption: "Zona",
  icon: "fa fa-square-o",
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
  number: { value: number | null };
  name: { value: string | null };
  use: { value: string | null };
  detailedUse: { value: string | null };
  usableArea: { value: number | null; units: string | null };
};

const fields: Field[] = [
  {
    key: "number",
    label: { caption: "Número" },
    control: {
      type: "text",
      placeholder: "Introduce número",
    },
    validation: { value: { required, numeric } },
    inlineStyle: {
      width: "30px",
    },
  },
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
    key: "detailedUse",
    label: { caption: "Uso detallado" },
    control: {
      type: "select",
      options: ["Uso 1", "Uso 2"],
      placeholder: "Selecciona valor",
    },
    validation: { value: { required } },
    inlineStyle: {
      width: "30px",
    },
  },
  {
    key: "usableArea",
    label: { caption: "Superficie útil" },
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
];

const newRecord: Record = {
  __designKey: "zone",
  __id: "",
  __parentId: "",
  __order: 0,
  __breadcrumb: "",
  number: { value: null },
  name: { value: null },
  use: { value: null },
  detailedUse: { value: null },
  usableArea: { value: null, units: null },
} as Record;

const childDesigns: ChildDesign[] = [] as ChildDesign[];

const designPack: DesignPack = {
  design,
  format,
  fields,
  newRecord,
  childDesigns,
};

export default designPack;
