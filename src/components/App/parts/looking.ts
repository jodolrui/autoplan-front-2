import { defineComponent, Ref, ref, watch } from "vue";
import { expose, exposed } from "@jodolrui/glue"; // a package published by me
// https://github.com/jodolrui/glue
export default defineComponent({
  setup() {
    const lookingForAJob: boolean = true;
    const offerArrived: Ref<boolean> = ref(false);
    const message: Ref<string> = ref("");
    watch(offerArrived, () => {
      if (lookingForAJob && offerArrived) message.value = "I'm interested";
    });
    expose({ message });
  },
});


