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
  designKey: "buildingDoor",
  caption: "Puerta de edificio",
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
  type: { value: string | null };
  leaves: { value: string | null };
  material: { value: string | null };
  isUsuallyOpen: { value: boolean | null };
  hasPanicBar: { value: boolean | null };
  opensInEvacuationDirection: { value: boolean | null };
  fireResistance: { value: number | null };
  width: { value: number | null; units: string | null };
};

const fields: Field[] = [
  {
    key: "type",
    label: { caption: "Tipo" },
    control: {
      type: "select",
      options: ["batiente", "corredera", "giratoria", "persiana"],
      placeholder: "Selecciona valor",
    },
    validation: { value: { required } },
    inlineStyle: {
      width: "150px",
    },
  },
  {
    key: "leaves",
    label: { caption: "Hojas" },
    control: {
      type: "select",
      options: ["1", "2"],
      placeholder: "Selecciona valor",
    },
    validation: { value: { required } },
    inlineStyle: {
      width: "150px",
    },
  },
  {
    key: "material",
    label: { caption: "Material" },
    control: {
      type: "select",
      options: [
        "madera",
        "metal",
        "cristal",
        "madera y cristal",
        "metal y cristal",
        "metal no opaca",
      ],
      placeholder: "Selecciona valor",
    },
    validation: { value: { required } },
    inlineStyle: {
      width: "150px",
    },
  },
  {
    key: "isUsuallyOpen",
    label: { caption: "Normalmente abierta" },
    control: {
      type: "checkbox",
    },
    validation: { value: { required } },
    inlineStyle: {
      width: "30px",
    },
  },
  {
    key: "hasPanicBar",
    label: { caption: "Barra antip??nico" },
    control: {
      type: "checkbox",
    },
    validation: { value: { required } },
    inlineStyle: {
      width: "30px",
    },
  },
  {
    key: "opensInEvacuationDirection",
    label: { caption: "Apertura en el sentido de la evacuaci??n" },
    control: {
      type: "checkbox",
    },
    validation: { value: { required } },
    inlineStyle: {
      width: "30px",
    },
  },
  {
    key: "fireResistance",
    label: { caption: "Resistencia al fuego" },
    control: {
      type: "select",
      options: ["30", "45", "60", "90", "120"],
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
      placeholder: "Introduce n??mero",
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
  leaves: { value: "1" },
  type: { value: null },
  material: { value: null },
  isUsuallyOpen: { value: false },
  hasPanicBar: { value: false },
  opensInEvacuationDirection: { value: false },
  fireResistance: { value: null },
  width: { value: null, units: "cm" },
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
