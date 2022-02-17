import { defineComponent, onMounted } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import halfmoon from "halfmoon"; // npm install --save @types/halfmoon
import { defineWall } from "../../../helpers/wall-brick";
import { useData } from "../data";

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
      },
      refresh: function () {
        this.style["border-bottom"] = halfmoon.darkModeOn
          ? "var(--navbar-border-width) solid var(--dm-navbar-border-color)"
          : "var(--navbar-border-width) solid var(--lm-navbar-border-color)";
      },
      items: {
        toggleDark: {
          code: "home",
          icon: "fas fa-home",
          classes: {
            btn: true,
            btnSquare: true,
            roundedCircle: true,
            btnPrimary: false,
          },
          style: {},
          refresh: function () {},
          click: function () {},
        },
      },
    });

    data.breadcrumbs.addItem("a1", {
      code: "Hola",
      caption: "Hola",
      classes: {
        btn: true,
      },
      style: {},
      refresh: function () {},
      click: function () {},
    });

    data.breadcrumbs.addItem("a2", {
      code: "Mundo",
      caption: "Mundo",
      classes: {
        btn: true,
      },
      style: {},
      refresh: function () {},
      click: function () {},
    });

    data.breadcrumbs.addItem("a3", {
      code: "Mundo",
      caption: "Mundo",
      classes: {
        btn: true,
      },
      style: {},
      refresh: function () {},
      click: function () {},
    });

    data.breadcrumbs.addItem("a4", {
      code: "Mundo",
      caption: "Mundo",
      classes: {
        btn: true,
      },
      style: {},
      refresh: function () {},
      click: function () {},
    });

    data.breadcrumbs.addItem("a5", {
      code: "Mundo",
      caption: "Mundo",
      classes: {
        btn: true,
      },
      style: {},
      refresh: function () {},
      click: function () {},
    });
  }, // setup
});
