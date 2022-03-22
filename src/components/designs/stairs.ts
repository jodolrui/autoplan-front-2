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

import { useProjectData } from "../shared/stores/useProjectData";
// const projectData = useProjectData();

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
  from: { value: string | null };
  to: { value: string | null };
  width: { value: number | null; units: string | null };
  tread: { value: number | null; units: string | null }; // huella
  riser: { value: number | null; units: string | null }; // contrahuella
  isForEmergencyUseOnly: { value: boolean | null };
  isOutside: { value: boolean | null };
  protected: { value: string | null };
};

const fields: Field[] = [
  {
    key: "number",
    label: { caption: "Escalera #" },
    control: {
      type: "text",
      placeholder: "Introduce número",
    },
    validation: { value: { required } },
    inlineStyle: {
      width: "150px",
    },
  },
  {
    key: "from",
    label: { caption: "Desde" },
    control: {
      type: "select",
      options: [],
      placeholder: "Selecciona valor",
    },
    validation: { value: { required } },
    inlineStyle: {
      width: "150px",
    },
  },
  {
    key: "to",
    label: { caption: "Hasta" },
    control: {
      type: "select",
      options: [],
      placeholder: "Selecciona valor",
    },
    validation: { value: { required } },
    inlineStyle: {
      width: "150px",
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
  {
    key: "tread",
    label: { caption: "Huella" },
    control: {
      type: "text",
      placeholder: "Introduce número",
    },
    units: ["cm"],
    validation: { value: { required, numeric } },
    inlineStyle: {
      width: "30px",
    },
  },
  {
    key: "riser",
    label: { caption: "Contrahuella" },
    control: {
      type: "text",
      placeholder: "Introduce número",
    },
    units: ["cm"],
    validation: { value: { required, numeric } },
    inlineStyle: {
      width: "30px",
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
    key: "isOutside",
    label: { caption: "Exterior" },
    control: {
      type: "checkbox",
    },
    validation: { value: { required } },
    inlineStyle: {
      width: "30px",
    },
  },
  {
    key: "protected",
    label: { caption: "Protegida" },
    control: {
      type: "select",
      options: ["Protegida", "Especialmente protegida"],
      placeholder: "Selecciona valor",
    },
    validation: { value: { required } },
    inlineStyle: {
      width: "150px",
    },
  },
];

const newRecord: Record = {
  __designKey: "stairs",
  __id: "",
  __parentId: "",
  __order: 0,
  __breadcrumb: "",
  number: { value: null },
  from: { value: null },
  to: { value: null },
  width: { value: null, units: "cm" },
  tread: { value: null, units: "cm" },
  riser: { value: null, units: "cm" },
  isForEmergencyUseOnly: { value: false },
  isOutside: { value: false },
  protected: { value: null },
} as Record;

const childDesigns: ChildDesign[] = [] as ChildDesign[];

const design: Design = { format, fields, newRecord, childDesigns };

export default design;

//* rellenamos "desde" y "hasta" con las plantas
// const floors = projectData.getChildrenByDesign("", "floor");
// const from = const fields: Field[].find((field) => field.key === "from");
// const to = const fields: Field[].find((field) => field.key === "to");

// floors?.forEach((element) => {
//   from?.control?.options?.push((element as any).name.value);
//   to?.control?.options?.push((element as any).name.value);
// });
