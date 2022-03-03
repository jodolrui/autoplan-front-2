import { defineComponent, ref, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import _Brick from "../../99_Brick/index.vue";
import _Wall from "../../99_Wall/index.vue";
import { Brick, Wall, useWall, useBrick } from "../../../helpers/wallbrick";
import { useData } from "../data";

export default defineComponent({
  components: { Brick: _Brick, Wall: _Wall },
  setup(props, context) {
    const data = useData();
    data.pulse = ref(0);

    data.wall = useWall("test");
    const { classes, style, setup, updated } = data.wall;

    style.set("display", "grid");
    style.set("grid-template-columns", "repeat(10, 50px)");
    style.set("grid-gap", "3px");
    style.set("margin", "3px");

    setup((wall: Wall) => {
      let brick: Brick;

      const { caption, classes, style, setup, clicked, updated } =
        useBrick("hi");

      brick = useBrick("button1");
      brick.caption = "1";
      brick.classes.set("btn", true);
      brick.style.set("grid-area", "1 / 1 / span 1 / span 2");
      brick.clicked(() => {
        alert("clicked1");
        // brick.caption = data.pulse.value.toString();
      });
      brick.mount(wall);

      brick = useBrick("button2");
      brick.caption = "2";
      brick.classes.set("btn", true);
      brick.style.set("grid-area", "1 / 3");
      brick.setup((brick: Brick, wall: Wall) => {
        // alert("setup " + brick.code);
        watch(
          data.pulse,
          () => {
            brick.caption = data.pulse.value.toString();
          },
          { immediate: true },
        );
      });
      brick.updated((brick: Brick, wall: Wall) => {
        // alert("updated " + brick.code);
      });
      brick.clicked((brick: Brick, wall: Wall) => {
        // alert("clicked " + brick.code);
        brick.refresh();
      });
      brick.mount(data.wall);
      //* --< bricks
    });
    data.wall.mount();
  },
});
