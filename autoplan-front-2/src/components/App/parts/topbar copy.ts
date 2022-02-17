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
import { defineWall } from "../../../helpers/wall";
import { useData } from "../data";

export default defineComponent({
  setup() {
    const data = useData();
    onMounted(() => {
      halfmoon.onDOMContentLoaded();
    });
    // halfmoon.toggleDarkMode();
    // refresh();
    // onUpdated(refresh);
    // watch(() => data.topbar, refresh);

    // const isDark = computed(() => halfmoon.darkModeOn);
    // expose({ isDark });

    // watchEffect(() => {
    data.topbar = {
      container: defineWall({
        style: {
          display: "grid",
          "grid-template-columns": "1fr 1fr 1fr",
          // backgroundColor: "red",
          padding: "3px",
          "border-bottom": true ? "1px solid red" : "1px solid black",
        },
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
      }),
      left: defineWall({
        style: {
          display: "flex",
          frexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "flex-start",
          alignContent: "stretch",
          alignItems: "frex-start",
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
              btnSquare: true,
              roundedCircle: true,
            },
            div: {
              html: "<i class='fa fa-bars'></i>",
            },
          },
        ],
      }),
      center: defineWall({
        style: {
          display: "flex",
          frexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "center",
          alignContent: "stretch",
          alignItems: "frex-start",
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
      }),
      right: defineWall({
        style: {
          display: "flex",
          frexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "flex-end",
          alignContent: "stretch",
          alignItems: "frex-start",
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
              btnSquare: true,
              roundedCircle: true,
            },
            click: function () {
              halfmoon.toggleDarkMode();
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
              btnSquare: true,
              roundedCircle: true,
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
      }),
    };

    // });
  },
});
