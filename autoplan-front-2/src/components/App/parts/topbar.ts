import {
  defineComponent,
  onMounted,
  Ref,
  ref,
  reactive,
  computed,
  onUpdated,
  watch,
  watchEffect,
} from "vue";
import { expose, exposed } from "@jodolrui/glue";
import halfmoon from "halfmoon"; // npm install --save @types/halfmoon
import { Wall } from "../../../helpers/wall";
import { useData } from "../data";

import _ from "lodash";

export default defineComponent({
  setup() {
    const data = useData();
    onMounted(() => {
      halfmoon.onDOMContentLoaded();
    });

    data.topbar = reactive({
      container: {
        pulse: 0,
        classes: {},
        style: {},
        items: [
          {
            code: "slot-1",
            caption: "",
            row: 1,
            col: 1,
            slot: "slot-1",
          },
          {
            code: "slot-2",
            caption: "",
            row: 1,
            col: 2,
            slot: "slot-2",
          },
          {
            code: "slot-3",
            caption: "",
            row: 1,
            col: 3,
            slot: "slot-3",
          },
        ],
        refresh: function () {
          this.style = {
            display: "grid",
            "grid-template-columns": "1fr 1fr 1fr",
            // "background-color": "red",
            padding: "3px",
            "background-color": halfmoon.darkModeOn ? "red" : "yellow",
            "border-bottom": halfmoon.darkModeOn
              ? "1px solid white"
              : "1px solid black",
          };
        },
      },
      left: {
        pulse: 0,
        style: {
          display: "flex",
          "flex-direction": "row",
          "flex-wrap": "nowrap",
          "justify-content": "flex-start",
          "align-content": "stretch",
          "align-items": "frex-start",
          gap: "3px",
        },
        items: [
          {
            code: "menu",
            caption: "",
            row: 1,
            col: 1,
            colSpan: 1,
            icon: "fa fa-bars",
            classes: {
              btn: true,
              "btn-square": true,
              "rounded-circle": true,
            },
            div: {
              html: "<i class='fa fa-bars'></i>",
            },
          },
        ],
      },
      center: {
        pulse: 0,
        style: {
          display: "flex",
          "frex-direction": "row",
          "flex-wrap": "nowrap",
          "justify-content": "center",
          "align-content": "stretch",
          "align-items": "frex-start",
          gap: "3px",
        },
        items: [
          {
            code: "star",
            caption: "Autoplan",
            row: 1,
            col: 1,
            colSpan: 1,
            // icon: "fa fa-star",
            classes: {
              btn: true,
            },
            div: {
              html: "Hola",
            },
          },
        ],
      },
      right: {
        pulse: 0,
        style: {
          display: "flex",
          "frex-direction": "row",
          "flex-wrap": "nowrap",
          "justify-content": "flex-end",
          "align-content": "stretch",
          "align-items": "frex-start",
          gap: "3px",
        },
        items: [
          {
            code: "toggledark",
            caption: "",
            row: 1,
            col: 1,
            colSpan: 1,
            icon: "fa fa-adjust",
            classes: {
              btn: true,
              "btn-square": true,
              "rounded-circle": true,
              "btn-primary": false,
            },
            click: function () {
              halfmoon.toggleDarkMode();
              this.classes["btn-primary"] = halfmoon.darkModeOn;
              data.topbar.container.pulse++;
            },
          },
          {
            code: "togglefullscreen",
            caption: "",
            row: 1,
            col: 1,
            colSpan: 1,
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
      },
    });

    let canRefresh = true;
    watch(
      () => _.cloneDeep(data.topbar),
      () => {
        if (canRefresh) {
          canRefresh = false;
          data.topbar.container.refresh();
          canRefresh = true;
        }
      },
    );

    watch(
      () => data.topbar.container.pulse,
      () => {
        // data.topbar.container.refresh();
      },
    );

    if (data.topbar.container.refresh) data.topbar.container.refresh();
  },
});
