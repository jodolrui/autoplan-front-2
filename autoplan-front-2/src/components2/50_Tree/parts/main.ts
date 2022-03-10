import { defineComponent, ref, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { useProjectData } from "../../__shared/stores/useProjectData";
import { useCurrent } from "../../__shared/stores/useCurrent";
import { RecordBase } from "../../__shared/helpers/data-interfaces";
import { defineWall, Wall, WallConfig } from "../../../helpers/wall-brick";
import _Wall from "../../30_Wall/index.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { Wall: _Wall },
  setup() {
    const state = useState();
    const router = useRouter();
    const projectData = useProjectData();
    const current = useCurrent();
    let treeArray: {
      node: RecordBase;
      depth: number;
    }[] = [];
    const node: RecordBase | null = projectData.getItem("root");
    recurseNodes(node);
    function recurseNodes(node: RecordBase | null) {
      const children = projectData.getChildren(node?.__id as string);
      children?.forEach((node: RecordBase) => {
        recurseNodes(node);
      });
      const path = projectData.getPath(node?.__id as string);
      treeArray.push({ node, depth: path ? path?.length - 1 : 0 } as {
        node: RecordBase;
        depth: number;
      });
    }
    treeArray = treeArray.reverse();

    const tree: Wall = defineWall({
      classes: {},
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(25, 20px)",
        gridAutoRows: "40px",
        marginTop: "10px",
        marginBottom: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        // backgroundColor: "beige",
      },
      refresh: function () {},
      items: {},
    } as WallConfig);
    expose({ tree });

    treeArray.forEach(
      (
        element: {
          node: RecordBase;
          depth: number;
        },
        i: number,
      ) => {
        tree.addItem(element.node.__id + "_+", {
          code: "+",
          caption: "",
          // icon: "fa fa-plus",
          classes: {
            // btn: true,
            // btsSquare: true,
          },
          style: {
            gridArea: `${i + 1} / ${element.depth} / span 1 / span 1`,
            border: "none",
            textAlign: "left !important",
            padding: "0px",
            height: "40px",
            backgroundColor: "transparent",
            fontSize: "14px",
            borderRight: "1px solid grey",
          },
          refresh: function () {},
          click: function () {},
        });
        tree.addItem(element.node.__id, {
          code: element.node.__id,
          caption: element.node.__breadcrumb,
          icon: "",
          classes: {
            // btn: true,
          },
          style: {
            gridArea: `${i + 1} / ${element.depth + 1} / span 1 / span ${
              25 - element.depth - 1
            }`,
            border: "none",
            textAlign: "left !important",
            padding: "0px",
            height: "32px",
            backgroundColor: "transparent",
            paddingLeft: "10px",
          },
          refresh: function () {},
          click: function () {
            router.push({
              path: `/${this.code as string}`,
            });
          },
        });
      },
    );

    //console.log({ treeArray });
  },
});
