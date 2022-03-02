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
    data.edit = defineWall({
      classes: {},
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(10, 1fr)`,
        gridAutoRows: "40px",
        gridGap: "3px",
      },
      items: {
        undo: {
          code: "undo",
          caption: "",
          icon: "fa fa-ellipsis-v",
          classes: {
            btn: true,
            btnKey: true,
          },
          style: { gridArea: "1 / 1 / span 1 / span 1" },
        },
        input: {
          code: "edit-box",
          caption: "",
          slot: "edit",
          classes: {
            btn: true,
            btnKey: true,
          },
          style: {
            gridArea: "1 / 2 / span 1 / span 7",
            overflow: "hidden",
            overflowX: "scroll",
            fontSize: "1rem",
            boxShadow: "none",
            borderRadius: "0px",
          },
          setup: function () {
            // watch(
            //   data.current.selected,
            //   () => {
            //     const selected = data.current.selected;
            //     if (selected && selected.record && selected.field) {
            //       const datum = (selected.record as unknown as any)[
            //         selected.field.key
            //       ];
            //       // this.caption = !datum.units
            //       //   ? datum.value
            //       //   : `${datum.value} ${datum.units}`;
            //       data.value = !datum.units
            //         ? datum.value
            //         : `${datum.value} ${datum.units}`;
            //     }
            //     data.pulse.value++;
            //   },
            //   { immediate: true },
            // );
          },
        },
        cancel: {
          code: "cancel",
          caption: "",
          icon: "fa fa-ban",
          classes: {
            btn: true,
            btnKey: true,
          },
          style: { gridArea: "1 / 9 / span 1 / span 1" },
        },
        confirm: {
          code: "confirm",
          caption: "",
          icon: "fa fa-check",
          classes: {
            btn: true,
            btnKey: true,
          },
          style: { gridArea: "1 / 10 / span 1 / span 1" },
        },
      },
    } as WallConfig);
  },
});
