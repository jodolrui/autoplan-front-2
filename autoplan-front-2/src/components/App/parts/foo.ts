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
    data.foo = defineWall(
      [
        {
          code: "slot",
          caption: "",
          row: 1,
          col: 1,
          colSpan: 10,
          slot: "my-slot-name",
        },
        {
          code: "random",
          caption: "",
          row: 1,
          col: 11,
          colSpan: 1,
          icon: "fa fa-dice-six",
          classes: {
            btn: true,
            "btn-square": true,
            "rounded-circle": true,
          },
          click: () => {
            alert("click1");
          },
        },
        {
          code: "toggledark",
          caption: "",
          row: 1,
          col: 12,
          colSpan: 1,
          icon: "fa fa-adjust",
          classes: {
            btn: true,
            "btn-square": true,
            "rounded-circle": true,
            "btn-primary": false,
          },
          click: (brick: Brick) => {
            halfmoon.toggleDarkMode();
            // brick.classes["btn-primary"] = !brick.classes["btn-primary"];
          },
        },
      ],
      true,
    );
  },
});
