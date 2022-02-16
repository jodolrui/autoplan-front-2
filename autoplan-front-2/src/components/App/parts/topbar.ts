import { defineComponent, onMounted, Ref, ref, reactive } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import halfmoon from "halfmoon"; // npm install --save @types/halfmoon
import { defineWall, Brick } from "../../../helpers/wall";
import { useData } from "../data";

export default defineComponent({
  setup() {
    const data = useData();
    onMounted(() => {
      halfmoon.onDOMContentLoaded();
    });
    data.topbar = {
      container: defineWall([
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
      ]),
      left: defineWall(
        [
          {
            code: "dice",
            caption: "",
            row: 1,
            col: 1,
            colSpan: 1,
            icon: "fa fa-dice",
            classes: {
              btn: true,
              "btn-square": true,
              "rounded-circle": true,
            },
          },
        ],
        true,
      ),
      center: defineWall(
        [
          {
            code: "star",
            caption: "",
            row: 1,
            col: 1,
            colSpan: 1,
            icon: "fa fa-star",
            classes: {
              btn: true,
              "btn-square": true,
              "rounded-circle": true,
            },
          },
        ],
        true,
      ),
      right: defineWall(
        [
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
            },
            click: (brick: Brick) => {
              halfmoon.toggleDarkMode();
            },
          },
        ],
        true,
      ),
    };
  },
});
