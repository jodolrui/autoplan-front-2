import { defineComponent, ref, computed, watch, reactive } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";
import { defineWall, Wall, WallConfig } from "../../../helpers/wall-brick";
import _Wall from "../../30_Wall/index.vue";
import { lettersConfig } from "../helpers/lettersConfig";
import { KeyConfig } from "../helpers/KeyConfig";

export default defineComponent({
  components: { Wall: _Wall },
  setup() {
    const data = useData();

    for (let i = 0; i < lettersConfig.length; i++) {
      let cols: number = 0;
      lettersConfig[i].forEach((element: KeyConfig, j: number) => {
        cols += element.colSpan ? element.colSpan : 1;
      });
      data.keys[i] = defineWall({
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
      lettersConfig[i].forEach((element: KeyConfig, j: number) => {
        data.keys[i].addItem("key_" + element.code, {
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
            if (this.code === "shift") {
              data.shift.value = !data.shift.value;
              data.keys.forEach((row: Wall) => {
                row.__refresh();
              });
              data.pulse.value++;
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
