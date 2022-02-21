import { defineComponent, reactive, ref, Ref, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useRouter } from "vue-router";
import { useData } from "../data";

export default defineComponent({
  setup() {
    const data = useData();
    const router = useRouter();
    data.goTo = (id: string) => {
      router.push({ path: `/${id}` });
    };
  },
});
