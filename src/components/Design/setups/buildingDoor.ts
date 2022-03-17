import { watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { RecordBase } from "../../shared/interfaces/dataInterfaces";
import { required, numeric, integer, alphaNum } from "@vuelidate/validators";
import { useState } from "../state";
import { useCurrent } from "../../shared/stores/useCurrent";

export default function setup() {
  const state = useState();
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
    type: { value: string | null };
    leaves: { value: string | null };
    material: { value: string | null };
    isUsuallyOpen: { value: boolean | null };
    hasPanicBar: { value: boolean | null };
    opensInEvacuationDirection: { value: boolean | null };
    fireResistance: { value: number | null };
    width: { value: number | null; units: string | null };
  };

  state.fields = [
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
      label: { caption: "Barra antipánico" },
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
      label: { caption: "Apertura en el sentido de la evacuación" },
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
    leaves: { value: "1" },
    type: { value: null },
    material: { value: null },
    isUsuallyOpen: { value: false },
    hasPanicBar: { value: false },
    opensInEvacuationDirection: { value: false },
    fireResistance: { value: null },
    width: { value: null, units: "cm" },
  } as Record;
}
