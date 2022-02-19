import { watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { Format, Field, RecordBase } from "../../../helpers/data-interfaces";
import { required, numeric, integer, alphaNum } from "@vuelidate/validators";
import { getChildrenByDesign } from "../../../10_Data/helpers/functions";

export default function setup() {
  const { routeId, updated } = exposed();

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
  expose({ format });

  type Record = RecordBase & {
    data: {
      number: { value: number | null };
      isFreightElevator: { value: boolean | null };
      from: { value: string | null };
      to: { value: string | null };
      mechanism: { value: string | null };
      maximumLoad: { value: number | null; units: string | null };
      maximumPersons: { value: number | null };
      isForEmergencyUse: { value: boolean | null };
    };
  };

  const fields: Field[] = [
    {
      key: "number",
      label: { caption: "Ascensor #" },
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
      key: "isFreightElevator",
      label: { caption: "Montacargas" },
      control: {
        type: "checkbox",
      },
      validation: { value: { required } },
      inlineStyle: {
        width: "30px",
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
      key: "mechanism",
      label: { caption: "Mecanismo" },
      control: {
        type: "select",
        options: ["Eléctrico", "Hidráulico"],
        placeholder: "Selecciona valor",
      },
      validation: { value: { required } },
      inlineStyle: {
        width: "150px",
      },
    },
    {
      key: "maximumLoad",
      label: { caption: "Carga máxima" },
      control: {
        type: "text",
        placeholder: "Introduce número",
      },
      units: ["kg"],
      validation: { value: { required, numeric } },
      inlineStyle: {
        width: "30px",
      },
    },
    {
      key: "maximumPersons",
      label: { caption: "Capacidad máxima de personas" },
      control: {
        type: "text",
        placeholder: "Introduce número",
      },
      units: ["kg"],
      validation: { value: { required, numeric } },
      inlineStyle: {
        width: "30px",
      },
    },
    {
      key: "isForEmergencyUse",
      label: { caption: "Utilizable en emergencias" },
      control: {
        type: "checkbox",
      },
      validation: { value: { required } },
      inlineStyle: {
        width: "30px",
      },
    },
  ];
  expose({ fields });

  const newRecord: Record = {
    __designKey: "stairs",
    __id: "",
    __parentId: routeId,
    __order: 0,
    data: {
      __breadcrumb: "",
      number: { value: null },
      isFreightElevator: { value: false },
      from: { value: null },
      to: { value: null },
      mechanism: { value: null },
      maximumLoad: { value: null, units: "kg" },
      maximumPersons: { value: null },
      isForEmergencyUse: { value: false },
    },
  };
  expose({ newRecord });

  //* rellenamos "desde" y "hasta" con las plantas
  const floors = getChildrenByDesign(routeId, "floor");
  const from = fields.find((field) => field.key === "from");
  const to = fields.find((field) => field.key === "to");
  console.log({ routeId, floors, from, to });

  floors?.forEach((element) => {
    from?.control?.options?.push((element.data as any).name.value);
    to?.control?.options?.push((element.data as any).name.value);
  });
}
