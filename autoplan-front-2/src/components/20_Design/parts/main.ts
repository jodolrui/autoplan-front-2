import { defineComponent, watch, reactive } from "vue";
import { expose, exposed } from "@jodolrui/glue";
// import ViewControl from "../../22_ViewControl/index.vue";

export default defineComponent({
  // components: { ViewControl },
  props: { routeId: Object, collapse: Object, options: Object },
  setup(props) {
    const routeId: Object = props.routeId ? props.routeId : {};
    expose({ routeId });
    const collapse: Object = props.collapse
      ? reactive(props.collapse)
      : { hidden: false, header: "" };
    expose({ collapse });
    const options: Object = props.options
      ? props.options
      : { canAdd: true, canDelete: true, canMove: true, canEnter: true };
    expose({ options });
  },
});
