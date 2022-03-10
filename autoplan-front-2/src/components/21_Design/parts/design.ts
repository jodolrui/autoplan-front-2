import { defineComponent, ref } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";

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
    const state = useState();

    if (state.designKey.value) {
      if (state.designKey.value === "root") site();
      if (state.designKey.value === "site") site();
      if (state.designKey.value === "coordinates") coordinates();
      if (state.designKey.value === "building") building();
      if (state.designKey.value === "buildingExit") buildingExit();
      if (state.designKey.value === "floor") floor();
      if (state.designKey.value === "floorExit") floorExit();
      if (state.designKey.value === "floorDoor") floorDoor();
      if (state.designKey.value === "zone") zone();
      if (state.designKey.value === "stairs") stairs();
      if (state.designKey.value === "elevator") elevator();

      state.records = ref(
        state.current.getChildrenByDesign(state.designKey.value as string),
      );
    }
  },
});
