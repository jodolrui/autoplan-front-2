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
    data.wall = useWall("name1");
    const { carry, out } = carryOut<Wall, Brick>(data.wall, useBrick);

    carry((wall) => {
      wall.style.set("display", "grid");
      wall.style.set("grid-template-columns", "repeat(10, 50px)");
      wall.style.set("grid-gap", "3px");
      wall.style.set("margin", "3px");
    });

    carry((wall, brick) => {
      brick.code = "button1";
      brick.caption = "5";
      brick.classes.set("btn", true);
      brick.style.set("grid-area", "1 / 1 / span 1 / span 2");
      brick.clicked(() => {
        alert("clicked1");
      });
      brick.mount(wall);
    });

    carry((wall, brick) => {
      brick.caption = "2";
      brick.classes.set("btn", true);
      brick.style.set("grid-area", "1 / 3");
      brick.setup((brick: Brick, wall: Wall) => {
        watch(
          data.pulse,
          () => {
            brick.caption = data.pulse.value.toString();
          },
          { immediate: true },
        );
      });
      brick.clicked(() => {
        alert("clicked2");
      });
      brick.mount(wall);
    });

    out();
  },
});

function carryOut<T>(newItem: () => T) {
  const callbacks: ((item: T) => void)[] = [];
  return {
    carry: function (callback: (item: T) => void) {
      callbacks.push(callback);
    },
    out: function () {
      callbacks.forEach((callback: (item: T) => void) => {
        callback(newItem());
      });
    },
  };
}

//* I = void para que sea opcional
function carryOut2<O, I = void>(obj: O, newItem?: () => I) {
  const callbacks: ((obj: O, item: I) => void)[] = [];
  return {
    carry: function (callback: (obj: O, item: I) => void) {
      callbacks.push(callback);
    },
    out: function () {
      callbacks.forEach((callback: (obj: O, item: I) => void) => {
        if (newItem) callback(obj, newItem());
        else callback(obj, {} as I);
      });
      return obj;
    },
  };
}
