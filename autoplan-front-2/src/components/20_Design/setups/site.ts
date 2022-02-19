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

  //* las formas de contacto (teléfono, e-mail...) las añadiré como recordsets nuevos
  type Record = RecordBase & {
    data: {
      name: { value: string | null };
      address: { value: string | null };
      zipCode: { value: string | null };
      locality: { value: string | null };
      province: { value: string | null };
    };
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
  expose({ fields });

  const newRecord: Record = {
    __designKey: "site",
    __id: "",
    __parentId: routeId,
    __order: 0,
    data: {
      __breadcrumb: "",
      name: { value: null },
      address: { value: null },
      zipCode: { value: null },
      locality: { value: null },
      province: { value: null },
    },
  };
  expose({ newRecord });
}
