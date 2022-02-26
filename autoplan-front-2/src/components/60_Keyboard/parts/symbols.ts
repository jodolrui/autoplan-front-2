import { defineComponent, ref, computed, watch, reactive } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";
import { defineWall, Wall, WallConfig } from "../../../helpers/wall-brick";
import _Wall from "../../30_Wall/index.vue";
import { symbolsConfig } from "../helpers/symbolsConfig";
import { KeyConfig } from "../helpers/KeyConfig";

export default defineComponent({
  components: { Wall: _Wall },
  setup() {
    const data = useData();

    for (let i = 0; i < symbolsConfig.length; i++) {
      let cols: number = 0;
      symbolsConfig[i].forEach((element: KeyConfig, j: number) => {
        cols += element.colSpan ? element.colSpan : 1;
      });
      data.symbols[i] = defineWall({
        classes: {},
        style: {
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridAutoRows: "40px",
          gridGap: "3px",
        },
        refresh: function () {},
        items: {},
      } as WallConfig);
      let col: number = 1;
      symbolsConfig[i].forEach((element: KeyConfig, j: number) => {
        data.symbols[i].addItem("key_" + element.code, {
          code: element.code,
          caption: element.caption,
          icon: element.icon ? element.icon : undefined,
          classes: {
            btn: true,
            btnKey: true,
          },
          style: {
            gridArea: `1 / ${col} / span 1 / span ${
              element.colSpan ? element.colSpan : 1
            }`,
            backgroundColor: element.backgroundColor
              ? element.backgroundColor
              : "var(--lm-bg-color)",
          },
          refresh: function () {
            this.caption = data.shift.value
              ? this.caption?.toUpperCase()
              : this.caption?.toLowerCase();
          },
          click: function () {
            if (this.code === "letters") {
              data.panel.value = "letters";
            }
            if (this.code === "numbers") {
              data.panel.value = "numbers";
            }
          },
        });
        col += element.colSpan ? element.colSpan : 1;
      });
    }
  },
});
