import { expose, exposed } from "@jodolrui/glue";
import { RecordBase } from "../../__shared/interfaces/dataInterfaces";
import { required, numeric, integer, alphaNum } from "@vuelidate/validators";
import { useState } from "../state";
import { useCurrent } from "../../__shared/stores/useCurrent";

export default function setup() {
  const state = useState();
  const current = useCurrent();

  state.format = {
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

  state.fields = [
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

  state.newRecord = {
    __designKey: "zone",
    __id: "",
    __parentId: current.routeId,
    __order: 0,
    __breadcrumb: "",
    number: { value: null },
    name: { value: null },
    use: { value: null },
    detailedUse: { value: null },
    usableArea: { value: null, units: null },
  } as Record;
}
