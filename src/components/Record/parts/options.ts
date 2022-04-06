import { defineComponent, Ref, ref, onMounted } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import {
  Wall,
  Brick,
  useWall,
  useBrick,
} from "../../shared/modules/wallbrick/wallbrick";
import { createBuilder } from "../../shared/helpers/builder";
import { useCurrent } from "../../shared/stores/useCurrent";
import { Option } from "../../shared/interfaces/general";
import { getDesign, designs } from "../../designs/getDesign";
import {
  ChildDesign,
  Design,
  RecordBase,
} from "../../shared/interfaces/dataInterfaces";

export default defineComponent({
  emits: ["selected"],
  setup(props) {
    const current = useCurrent();
    const state = useState();

    state.options = useWall("options");

    const { create, design, after, build } = createBuilder<Wall>();

    create(() => state.options);
    after((wall: Wall) => {
      wall.mount();
    });

    design((wall) => {
      let { classes } = wall;
      classes.set("m-toolbar", true);
      classes.set("s-flex-right", true);
      classes.set("s-flex-wrap-reverse", true);

      const { create, before, design, after, build } = createBuilder<Brick>();

      create(useBrick);
      after((brick: Brick) => {
        brick.mount(wall);
      });

      let options: Option[] | [] = getOptions();

      options.forEach((element: Option) => {
        design((brick) => {
          brick.id = element.key;
          brick.caption = element.caption;
          brick.component = "Button";
          brick.clicked = () => {
            const designKey = element.key;
            current.newRecord(designKey, state.record);
          };
        });
      });

      build();
    });

    build();

    function getOptions(): Option[] | [] {
      const result: Option[] = [];
      if (current.record) {
        const design = getDesign(current.record.__designKey);
        design.childDesigns.forEach((element: ChildDesign) => {
          const found = designs.find((design: Design) => {
            return design.designKey === element.designKey;
          });
          if (found) {
            let option: Option = {
              key: found.designKey,
              caption: found.caption,
              icon: found.icon ? found.icon : "",
            };
            result.push(option);
          }
        });
      }
      return result;
    }
  },
});
