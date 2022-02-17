import { defineComponent, onMounted } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import halfmoon from "halfmoon"; // npm install --save @types/halfmoon
import { defineWall } from "../../../helpers/wall";
import { useData } from "../data";

export default defineComponent({
  setup() {
    const data = useData();
    onMounted(() => {
      halfmoon.onDOMContentLoaded();
    });
    data.foo = defineWall({
      classes: {},
      style: {
        display: "flex",
        "frex-direction": "row",
        "flex-wrap": "nowrap",
        "justify-content": "flex-end",
        "align-content": "stretch",
        "align-items": "frex-start",
        padding: "3px",
        gap: "3px",
      },
      refresh: function () {
        this.style["border-bottom"] = halfmoon.darkModeOn
          ? "var(--navbar-border-width) solid var(--dm-navbar-border-color)"
          : "var(--navbar-border-width) solid var(--lm-navbar-border-color)";
      },
      items: [
        {
          code: "toggledark",
          icon: "fa fa-adjust",
          classes: {
            btn: true,
            "btn-square": true,
            "rounded-circle": true,
          },
          click: function () {
            halfmoon.toggleDarkMode();
          },
        },
        {
          code: "togglefullscreen",
          icon: "fas fa-expand",
          classes: {
            btn: true,
            "btn-square": true,
            "rounded-circle": true,
          },
          click: function () {
            if (document.fullscreen) document.exitFullscreen();
            else {
              const element: Element | null = document.querySelector("#app");
              if (element)
                element
                  .requestFullscreen()
                  .then(() => {})
                  .catch((error) => {});
            }
          },
        },
      ],
    });
  },
});
