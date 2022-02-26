import { defineComponent, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useData } from "../data";

import root from "../setups/root";
import site from "../setups/site";
import coordinates from "../setups/coordinates";
import building from "../setups/building";
import buildingExit from "../setups/buildingExit";
import floor from "../setups/floor";
import floorExit from "../setups/floorExit";
import floorDoor from "../setups/floorDoor";
import zone from "../setups/zone";
import stairs from "../setups/stairs";
import elevator from "../setups/elevator";

export default defineComponent({
  setup() {
    const data = useData();

    if (data.designKey.value) {
      if (data.designKey.value === "root") site();
      if (data.designKey.value === "site") site();
      if (data.designKey.value === "coordinates") coordinates();
      if (data.designKey.value === "building") building();
      if (data.designKey.value === "buildingExit") buildingExit();
      if (data.designKey.value === "floor") floor();
      if (data.designKey.value === "floorExit") floorExit();
      if (data.designKey.value === "floorDoor") floorDoor();
      if (data.designKey.value === "zone") zone();
      if (data.designKey.value === "stairs") stairs();
      if (data.designKey.value === "elevator") elevator();

      data.records = ref(
        data.current.getChildrenByDesign(data.designKey.value as string),
      );
    }
  },
});
