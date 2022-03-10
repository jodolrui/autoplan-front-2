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

  state.fields = [
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

  state.newRecord = {
    __designKey: "site",
    __id: "",
    __parentId: current.routeId,
    __order: 0,
    __breadcrumb: "",
    name: { value: null },
    address: { value: null },
    zipCode: { value: null },
    locality: { value: null },
    province: { value: null },
  } as Record;
}
