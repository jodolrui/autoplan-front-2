import { defineComponent, onMounted, Ref, ref, reactive } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import halfmoon from "halfmoon"; // npm install --save @types/halfmoon
import { defineBlocks, Block } from "../../../helpers/blocks";
import { useData } from "../data";

export default defineComponent({
  setup() {
    const data = useData();
    onMounted(() => {
      halfmoon.onDOMContentLoaded();
    });
    const foo = defineBlocks([
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
        click: (block: Block) => {
          halfmoon.toggleDarkMode();
          // block.classes["btn-primary"] = !block.classes["btn-primary"];
        },
      },
    ]);
    expose({ foo });
  },
});
