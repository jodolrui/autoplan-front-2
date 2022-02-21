import { watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { RecordBase } from "../../../helpers/data-interfaces";
import { required, numeric, integer, alphaNum } from "@vuelidate/validators";
import { useData } from "../data";
import { useCurrent } from "../../../stores/useCurrent";
import { useProjectData } from "../../../stores/useProjectData";
const projectData = useProjectData();

export default function setup() {
  const data = useData();
  const current = useCurrent();

  data.format = {
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
    isFreightElevator: { value: boolean | null };
    from: { value: string | null };
    to: { value: string | null };
    mechanism: { value: string | null };
    maximumLoad: { value: number | null; units: string | null };
    maximumPersons: { value: number | null };
    isForEmergencyUse: { value: boolean | null };
  };

  data.fields = [
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

  data.newRecord = {
    __designKey: "stairs",
    __id: "",
    __parentId: current.routeId,
    __order: 0,
    __breadcrumb: "",
    number: { value: null },
    isFreightElevator: { value: false },
    from: { value: null },
    to: { value: null },
    mechanism: { value: null },
    maximumLoad: { value: null, units: "kg" },
    maximumPersons: { value: null },
    isForEmergencyUse: { value: false },
  } as Record;

  //* rellenamos "desde" y "hasta" con las plantas
  const floors = projectData.getChildrenByDesign(current.routeId, "floor");
  const from = data.fields.find((field) => field.key === "from");
  const to = data.fields.find((field) => field.key === "to");

  floors?.forEach((element) => {
    from?.control?.options?.push((element as any).name.value);
    to?.control?.options?.push((element as any).name.value);
  });
}
