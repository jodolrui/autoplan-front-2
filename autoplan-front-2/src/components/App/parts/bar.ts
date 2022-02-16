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
    data.bar = defineWall([
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
          "btn-primary": true,
        },
        click: (brick: Brick) => {
          halfmoon.toggleDarkMode();
          // brick.classes["btn-primary"] = !brick.classes["btn-primary"];
        },
      },
    ]);
  },
});
