import { defineComponent, ref, computed } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { useCurrent } from "../../shared/stores/useCurrent";
import {
  Format,
  Field,
  RecordBase,
} from "../../shared/interfaces/dataInterfaces";

import root from "../setups/root";
import site from "../../designs/site";
import coordinates from "../../designs/coordinates";
import building from "../../designs/building";
import buildingExit from "../../designs/buildingExit";
import floor from "../../designs/floor";
import floorExit from "../../designs/floorExit";
import floorDoor from "../../designs/floorDoor";
import zone from "../../designs/zone";
import stairs from "../../designs/stairs";
import elevator from "../../designs/elevator";

export default defineComponent({
  setup() {
    const state = useState();
    const current = useCurrent();

    state.designKey = computed(() => {
      return state.record.__designKey;
    });

    type Design = { format: Format; fields: Field[]; newRecord: RecordBase };

    let design: Design = {} as Design;

    if (state.designKey.value) {
      if (state.designKey.value === "root") design = site;
      if (state.designKey.value === "site") design = site;
      if (state.designKey.value === "coordinates") design = coordinates;
      if (state.designKey.value === "building") design = building;
      if (state.designKey.value === "buildingExit") design = buildingExit;
      if (state.designKey.value === "floor") design = floor;
      if (state.designKey.value === "floorExit") design = floorExit;
      if (state.designKey.value === "floorDoor") design = floorDoor;
      if (state.designKey.value === "zone") design = zone;
      if (state.designKey.value === "stairs") design = stairs;
      if (state.designKey.value === "elevator") design = elevator;

      state.format = design.format;
      state.fields = design.fields;
      state.newRecord = design.newRecord;
    }
  },
});
