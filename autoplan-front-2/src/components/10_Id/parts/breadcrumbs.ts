import { defineComponent, onMounted } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import halfmoon from "halfmoon"; // npm install --save @types/halfmoon
import { defineWall } from "../../../helpers/wall-brick";
import { useData } from "../data";
import { RecordBase } from "../../../helpers/data-interfaces";
import { useCurrent } from "../../../stores/useCurrent";

export default defineComponent({
  setup() {
    const data = useData();
    onMounted(() => {
      halfmoon.onDOMContentLoaded();
    });
    data.breadcrumbs = defineWall({
      classes: {},
      style: {
        display: "flex",
        frexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignContent: "stretch",
        alignItems: "frex-start",
        padding: "3px",
        gap: "3px",
        borderBottom: "1px solid var(--border-color)",
        // boxShadow: "0 0.2rem 0.2rem var(--shadow-color)",
      },
      refresh: function () {},
      items: {},
    });

    if (data.current.path && data.current.path)
      data.current.path.forEach((element: RecordBase) => {
        const isHome = element.__id === "root";
        data.breadcrumbs.addItem(element.__id, {
          code: element.__id,
          caption: isHome ? "" : element.__breadcrumb,
          icon: isHome ? "fas fa-home" : "",
          classes: {
            btn: true,
            btnSquare: isHome,
            roundedCircle: isHome,
          },
          style: {},
          refresh: function () {},
          click: function () {
            data.goTo(element.__id);
          },
        });
      });
  },
});
