import { watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { RecordBase } from "../../../helpers/data-interfaces";
import { required, numeric, integer, alphaNum } from "@vuelidate/validators";
import { State } from "../state";
import { useCurrent } from "../../../stores/useCurrent";

export default function setup() {
  const state = exposed<State>();
  const current = useCurrent();

  state.format = {
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
    to: { value: string | null };
    isForEmergencyUseOnly: { value: boolean | null };
    width: { value: number | null; units: string | null };
  };

  state.fields = [
    {
      key: "number",
      label: { caption: "Número" },
      control: {
        type: "text",
        placeholder: "Introduce número",
      },
      validation: { value: { required, integer } },
      inlineStyle: {
        width: "200px",
      },
    },
    {
      key: "to",
      label: { caption: "Hasta" },
      control: {
        type: "text",
        placeholder: "Introduce texto",
      },
      validation: { value: { required, alphaNum } },
      inlineStyle: {
        width: "200px",
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
  ];

  state.newRecord = {
    __designKey: "floorExit",
    __id: "",
    __parentId: current.routeId,
    __order: 0,
    __breadcrumb: "",
    number: { value: null },
    to: { value: null },
    isForEmergencyUseOnly: { value: false },
    width: { value: null, units: "cm" },
  } as Record;
}
