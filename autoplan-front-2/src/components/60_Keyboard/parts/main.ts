import { defineComponent, ref, computed, watch, reactive, Ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";
import { useProjectData } from "../../../stores/useProjectData";
import { useCurrent } from "../../../stores/useCurrent";
import { RecordBase } from "../../../helpers/data-interfaces";
import { defineWall, Wall, WallConfig } from "../../../helpers/wall-brick";
import _Wall from "../../30_Wall/index.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { Wall: _Wall },
  setup() {
    const data = useData();
    data.edit = {} as any;
    data.keys = [];
    data.numbers = [];
    data.symbols = [];
    data.shift = ref(false);
    data.panel = ref("letters");
    data.current = useCurrent();
    data.pulse = ref(0);

    // let el: HTMLElement | null = null;
    // let value: Ref<any> = ref(null);
    // expose({ value });
    // watch(data.current.selected, () => {
    //   const selected = data.current.selected;
    //   if (selected.record && selected.field) {
    //     const datum = selected.record[selected.field.key];
    //     value.value = !datum.units
    //       ? datum.value
    //       : `${datum.value} ${datum.units}`;
    //   }
    // });

    watch(
      data.current.selected,
      () => {
        const selected = data.current.selected;
        if (selected && selected.record && selected.field) {
          const datum = (selected.record as unknown as any)[selected.field.key];
          data.current.edit.value = !datum.units
            ? datum.value
            : `${datum.value} ${datum.units}`;
          // data.cursor.value = data.value.value.length;
        }
        data.pulse.value++;
      },
      { immediate: true },
    );

    data.editCharClick = function (position: number) {
      data.current.edit.cursor = position;
    };
  },
});
