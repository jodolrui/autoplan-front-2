import { defineComponent } from "vue";
import { expose, exposed } from "@jodolrui/glue";

export default defineComponent({
  setup() {
    function useState<T>() {
      return exposed<T>();
    }
    expose({ useState });
  },
});
