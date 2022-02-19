import { RecordBase } from "./data-interfaces";
import { currentData } from "./data";

const doLog: boolean = false;

export function getAll(id: string): RecordBase[] | null {
  if (doLog) console.log("getAll", { id });
  const found: RecordBase[] = currentData.filter((element: RecordBase) => {
    if (doLog) console.log("getAll", { element });
    return element.parentId === id;
  });
  if (doLog) console.log("getAll", { found });
  return found ? found : null;
}

export function getItem(id: string): RecordBase | null {
  if (doLog) console.log("getItem", { id });
  const found: RecordBase | undefined = currentData.find(
    (element: RecordBase) => {
      if (doLog) console.log("getItem", { element });
      return element.id === id;
    },
  );
  if (doLog) console.log("getItem", { found });
  return found ? found : null;
}

export function getChildren(id: string): RecordBase[] | null {
  if (doLog) console.log("getChildren", { id });
  const found = currentData.filter((element: RecordBase) => {
    if (doLog) console.log("getChildren", { element });
    return element.parentId === id;
  });
  if (doLog) console.log("getChildren", { found });
  return found ? found : null;
}

export function getChildrenByDesign(
  id: string,
  designKey: string,
): RecordBase[] | null {
  if (doLog) console.log("getChildrenByDesign", { id });
  const found = currentData.filter((element: RecordBase) => {
    if (doLog) console.log("getChildrenByDesign", { element });
    return element.parentId === id && element.designKey === designKey;
  });
  if (doLog) console.log("getChildrenByDesign", { found });
  return found ? found : null;
}

export function getParent(id: string): RecordBase | null {
  if (doLog) console.log("getParent", { id });
  const child = getItem(id);
  const found = currentData.find((element: RecordBase) => {
    if (doLog) console.log("getParent", { element });
    return child ? element.id === child.parentId : false;
  });
  if (doLog) console.log("getParent", { found });
  return found ? found : null;
}

export function getPath(id: string): RecordBase[] | null {
  if (doLog) console.log("getParent", { id });
  let result: RecordBase[] = [];
  const item = getItem(id);
  if (doLog) console.log("getParent", { item });
  if (item) {
    result.push(item);
    function iterate(id: string) {
      let parent = getParent(id);
      if (doLog) console.log("getParent", { parent });
      if (parent) {
        result.push(parent);
        iterate(parent.id);
      }
    }
    iterate(id);
  }
  result.reverse();
  if (doLog) console.log("getParent", { result });
  return result.length > 0 ? result : null;
}

export function addItem(record: RecordBase) {
  //! quizá deberían eliminarse las propiedades calculadas $ del registro
  if (doLog) console.log("addItem", { record });
  currentData.push(record);
  if (doLog) console.log("addItem", { currentData });
}

export function deleteItem(record: RecordBase) {
  if (doLog) console.log("deleteItem", { record });
  for (var i = currentData.length - 1; i >= 0; --i) {
    if (currentData[i].id === record.id) {
      currentData.splice(i, 1);
    }
  }
  if (doLog) console.log("deleteItem", { currentData });
}

export function changeItem(record: RecordBase) {
  if (doLog) console.log("changeItem", { record });
  //! en realidad los cambios realizados sobre registros no recién añadidos se guardan sin necesidad de esto
  //! la necesidad de esto es sólo para registros recién añadidos
  deleteItem(record);
  addItem(record);
  if (doLog) console.log("changeItem", { currentData });
}
