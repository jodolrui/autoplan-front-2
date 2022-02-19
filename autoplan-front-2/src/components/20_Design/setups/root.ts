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
      name: { value: string | null };
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
  ];
  expose({ fields });

  const newRecord: Record = {
    __designKey: "root",
    __id: "",
    __parentId: routeId,
    __order: 0,
    data: {
      __breadcrumb: "",
      name: { value: null },
    },
  };
  expose({ newRecord });
}
