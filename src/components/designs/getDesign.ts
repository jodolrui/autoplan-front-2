import {
  Format,
  Field,
  RecordBase,
  Design,
  ChildDesign,
} from "../shared/interfaces/dataInterfaces";

import root from "../designs/root";
import site from "../designs/site";
import coordinates from "../designs/coordinates";
import building from "../designs/building";
import buildingExit from "../designs/buildingExit";
import floor from "../designs/floor";
import floorExit from "../designs/floorExit";
import floorDoor from "../designs/floorDoor";
import zone from "../designs/zone";
import stairs from "../designs/stairs";
import elevator from "../designs/elevator";

export const designs: Design[] = [
  root.design,
  site.design,
  coordinates.design,
  building.design,
  buildingExit.design,
  floor.design,
  floorExit.design,
  floorDoor.design,
  zone.design,
  stairs.design,
  elevator.design,
];

export type DesignPack = {
  design: Design;
  format: Format;
  fields: Field[];
  newRecord: RecordBase;
  childDesigns: ChildDesign[];
};

export function getDesign(designKey: string): DesignPack {
  let result: DesignPack = {} as DesignPack;
  if (designKey) {
    if (designKey === "root") result = root;
    if (designKey === "site") result = site;
    if (designKey === "coordinates") result = coordinates;
    if (designKey === "building") result = building;
    if (designKey === "buildingExit") result = buildingExit;
    if (designKey === "floor") result = floor;
    if (designKey === "floorExit") result = floorExit;
    if (designKey === "floorDoor") result = floorDoor;
    if (designKey === "zone") result = zone;
    if (designKey === "stairs") result = stairs;
    if (designKey === "elevator") result = elevator;
  }
  return result;
}
