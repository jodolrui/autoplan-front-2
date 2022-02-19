import { defineComponent } from "vue";
import { expose, exposed } from "@jodolrui/glue";

// import root from "../setups/root";
// import site from "../setups/site";
// import coordinates from "../setups/coordinates";
import building from "../setups/building";
// import buildingExit from "../setups/buildingExit";
import floor from "../setups/floor";
// import floorExit from "../setups/floorExit";
// import floorDoor from "../setups/floorDoor";
// import zone from "../setups/zone";
// import stairs from "../setups/stairs";
// import elevator from "../setups/elevator";

export default defineComponent({
  props: { designKey: String },
  setup(props) {
    const designKey: String = props.designKey ? props.designKey : "";
    expose({ designKey });

    // if (designKey === "root") site();
    // if (designKey === "site") site();
    // if (designKey === "coordinates") coordinates();
    if (designKey === "building") building();
    // if (designKey === "buildingExit") buildingExit();
    if (designKey === "floor") floor();
    // if (designKey === "floorExit") floorExit();
    // if (designKey === "floorDoor") floorDoor();
    // if (designKey === "zone") zone();
    // if (designKey === "stairs") stairs();
    // if (designKey === "elevator") elevator();
  },
});
