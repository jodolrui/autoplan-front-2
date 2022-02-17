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
    data.navbar = defineWall({
      classes: {},
      style: {
        display: "flex",
        frexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "flex-end",
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
          code: "toggledark",
          icon: "fa fa-adjust",
          classes: {
            btn: true,
            btnSquare: true,
            roundedCircle: true,
            btnPrimary: false,
          },
          style: {},
          refresh: function () {
            this.classes.btnPrimary = halfmoon.darkModeOn;
          },
          click: function () {
            halfmoon.toggleDarkMode();
          },
        },
        toggleFullscreen: {
          code: "togglefullscreen",
          icon: "fas fa-expand",
          classes: {
            btn: true,
            btnSquare: true,
            roundedCircle: false,
            btnPrimary: false,
          },
          style: {},
          refresh: function () {
            this.classes.btnPrimary = document.fullscreen;
          },
          click: function () {
            if (document.fullscreen)
              document
                .exitFullscreen()
                .then(() => {
                  if (this.refresh) this.refresh();
                })
                .catch((error) => {});
            else {
              const element: Element | null = document.querySelector("#app");
              if (element)
                element
                  .requestFullscreen()
                  .then(() => {
                    if (this.refresh) this.refresh();
                  })
                  .catch((error) => {});
            }
          },
        },
      },
    });
  }, // setup
});
