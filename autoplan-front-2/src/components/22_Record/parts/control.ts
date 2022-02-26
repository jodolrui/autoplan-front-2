import { defineComponent, onMounted } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import halfmoon from "halfmoon"; // npm install --save @types/halfmoon
import { defineWall } from "../../../helpers/wall-brick";
import { useData } from "../data";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const data = useData();
    const router = useRouter();
    onMounted(() => {
      halfmoon.onDOMContentLoaded();
    });
    data.control = defineWall({
      classes: {},
      style: {
        display: "flex",
        frexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "flex-end",
        alignContent: "stretch",
        alignItems: "frex-start",
        padding: "3px",
        gap: "3px",
      },
      refresh: function () {},
      items: {
        moveUp: {
          code: "move-up",
          icon: "fa fa-angle-up",
          classes: {
            btn: true,
            btnSquare: true,
            roundedCircle: true,
          },
          style: {},
          refresh: function () {},
          click: function () {},
        },
        moveDown: {
          code: "move-down",
          icon: "fa fa-angle-down",
          classes: {
            btn: true,
            btnSquare: true,
            roundedCircle: true,
          },
          style: {},
          refresh: function () {},
          click: function () {},
        },
        delete: {
          code: "delete",
          icon: "fa fa-trash",
          classes: {
            btn: true,
            btnSquare: true,
            roundedCircle: true,
          },
          style: {},
          refresh: function () {},
          click: function () {},
        },
        add: {
          code: "add",
          icon: "fa fa-plus",
          classes: {
            btn: true,
            btnSquare: true,
            roundedCircle: true,
          },
          style: {},
          refresh: function () {},
          click: function () {},
        },
        enter: {
          code: "enter",
          icon: "fa fa-angle-double-right",
          classes: {
            btn: true,
            btnSquare: true,
            roundedCircle: true,
          },
          style: {},
          refresh: function () {},
          click: function () {
            router.push({
              path: `/${data.record?.__id as string}`,
            });
          },
        },
      },
    });
  }, // setup
});
