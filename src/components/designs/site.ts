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
  designKey: "site",
  caption: "Lugar",
  icon: "fa fa-globe",
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

//* las formas de contacto (teléfono, e-mail...) las añadiré como recordsets nuevos
type Record = RecordBase & {
  name: { value: string | null };
  address: { value: string | null };
  zipCode: { value: string | null };
  locality: { value: string | null };
  province: { value: string | null };
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
  {
    key: "address",
    label: { caption: "Dirección" },
    control: {
      type: "text",
      placeholder: "Introduce texto",
    },
    validation: { value: { required } },
  },
  {
    key: "zipCode",
    label: { caption: "Código postal" },
    control: {
      type: "text",
      placeholder: "Introduce número",
    },
    validation: { value: { required } },
  },
  {
    key: "locality",
    label: { caption: "Localidad" },
    control: {
      type: "text",
      placeholder: "Introduce texto",
    },
    validation: { value: { required } },
  },
  {
    key: "province",
    label: { caption: "Provincia" },
    control: {
      type: "text",
      placeholder: "Introduce texto",
    },
    validation: { value: { required } },
  },
];

const newRecord: Record = {
  __designKey: "site",
  __id: "",
  __parentId: "",
  __order: 0,
  __breadcrumb: "",
  name: { value: null },
  address: { value: null },
  zipCode: { value: null },
  locality: { value: null },
  province: { value: null },
} as Record;

const childDesigns: ChildDesign[] = [
  {
    designKey: "building",
    min: 1,
    max: null,
  },
  {
    designKey: "coordinates",
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
