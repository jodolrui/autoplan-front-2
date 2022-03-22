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
      width: "800px",
    },
  },
  tablet: {
    view: "list",
  },
  mobile: { view: "list" },
};

type Record = RecordBase & {
  latitudeSide: { value: string | null };
  latitudeDegrees: { value: number | null };
  latitudeMinutes: { value: number | null };
  latitudeSeconds: { value: number | null };
  latitudeDecimals: { value: number | null };
  longitudeSide: { value: string | null };
  longitudeDegrees: { value: number | null };
  longitudeMinutes: { value: number | null };
  longitudeSeconds: { value: number | null };
  longitudeDecimals: { value: number | null };
};

const fields: Field[] = [
  {
    key: "latitudeSide",
    label: { caption: "Latitud" },
    control: {
      type: "select",
      options: ["Norte", "Sur"],
      placeholder: "Selecciona valor",
    },
    validation: { value: { required } },
  },
  {
    key: "latitudeDegrees",
    label: { caption: "Latitud grados" },
    control: {
      type: "text",
      placeholder: "Introduce número",
    },
    validation: { value: { required } },
  },
  {
    key: "latitudeMinutes",
    label: { caption: "Latitud minutos" },
    control: {
      type: "text",
      placeholder: "Introduce número",
    },
    validation: { value: { required } },
  },
  {
    key: "latitudeSeconds",
    label: { caption: "Latitud segundos" },
    control: {
      type: "text",
      placeholder: "Introduce número",
    },
    validation: { value: { required } },
  },
  {
    key: "latitudeDecimals",
    label: { caption: "Latitud decimales" },
    control: {
      type: "text",
      placeholder: "Introduce número",
    },
    validation: { value: { required } },
  },
  {
    key: "longitudeSide",
    label: { caption: "Longitud" },
    control: {
      type: "select",
      options: ["Este", "Oeste"],
      placeholder: "Selecciona valor",
    },
    validation: { value: { required } },
  },
  {
    key: "longitudeDegrees",
    label: { caption: "Longitud grados" },
    control: {
      type: "text",
      placeholder: "Introduce número",
    },
    validation: { value: { required } },
  },
  {
    key: "longitudeMinutes",
    label: { caption: "Longitud minutos" },
    control: {
      type: "text",
      placeholder: "Introduce número",
    },
    validation: { value: { required } },
  },
  {
    key: "longitudeSeconds",
    label: { caption: "Longitud segundos" },
    control: {
      type: "text",
      placeholder: "Introduce número",
    },
    validation: { value: { required } },
  },
  {
    key: "longitudeDecimals",
    label: { caption: "Longitud decimales" },
    control: {
      type: "text",
      placeholder: "Introduce número",
    },
    validation: { value: { required } },
  },
];

const newRecord: Record = {
  __designKey: "coordinates",
  __id: "",
  __parentId: "",
  __order: 0,
  __breadcrumb: "",
  latitudeSide: { value: null },
  latitudeDegrees: { value: null },
  latitudeMinutes: { value: null },
  latitudeSeconds: { value: null },
  latitudeDecimals: { value: null },
  longitudeSide: { value: null },
  longitudeDegrees: { value: null },
  longitudeMinutes: { value: null },
  longitudeSeconds: { value: null },
  longitudeDecimals: { value: null },
} as Record;

const childDesigns: ChildDesign[] = [] as ChildDesign[];

const design: Design = { format, fields, newRecord, childDesigns };

export default design;
