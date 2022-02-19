import { expose, exposed } from "@jodolrui/glue";
import { Format, Field, RecordBase } from "../../../helpers/data-interfaces";
import { required, numeric, integer, alphaNum } from "@vuelidate/validators";

export default function setup() {
  const { routeId } = exposed();

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
  expose({ format });

  type Record = RecordBase & {
    data: {
      number: { value: number | null };
      name: { value: string | null };
      use: { value: string | null };
      detailedUse: { value: string | null };
      usableArea: { value: number | null; units: string | null };
    };
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
  expose({ fields });

  const newRecord: Record = {
    __designKey: "zone",
    __id: "",
    __parentId: routeId,
    __order: 0,
    data: {
      __breadcrumb: "",
      number: { value: null },
      name: { value: null },
      use: { value: null },
      detailedUse: { value: null },
      usableArea: { value: null, units: null },
    },
  };
  expose({ newRecord });
}
