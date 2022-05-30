import { RecordBase } from "../interfaces/dataInterfaces";
// import cloneDeep from "clone-deep";

function evalChanges(record: any, old: any) {
  let changed = false;

  ["__breadcrumb", "__order"].forEach((element) => {
    if (record[element] !== old[element]) {
      changed = true;
    }
  });

  for (const prop in record) {
    if (prop.substring(0, 2) !== "__") {
      if (record[prop] && old[prop]) {
        if (record[prop].value !== old[prop].value) {
          changed = true;
        }
      }
    }
  }

  return { changed, record };
}

function isObject(variable: any): boolean {
  return (
    typeof variable === "object" &&
    variable !== null &&
    variable.constructor === Object
  );
}

export function getDelta(
  oldRecordset: RecordBase[],
  newRecordset: RecordBase[],
) {
  const added: RecordBase[] = [];
  const deleted: RecordBase[] = [];
  const changed: RecordBase[] = [];
  newRecordset.forEach((current: RecordBase) => {
    const found = oldRecordset.find((old) => old.__id === current.__id);
    if (!found) added.push(current);
  });
  oldRecordset.forEach((old: RecordBase) => {
    const found = newRecordset.find((current) => current.__id === old.__id);
    if (!found) deleted.push(old);
  });
  newRecordset.forEach((current: RecordBase) => {
    const found = oldRecordset.find((old) => old.__id === current.__id);
    if (found) {
      const evalResult = evalChanges(current, found);
      if (evalResult.changed) {
        changed.push(evalResult.record);
      }
    }
  });
  return { added, deleted, changed };
}
