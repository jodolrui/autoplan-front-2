import { defineStore, Store } from "pinia";
import { RecordBase } from "../helpers/data-interfaces";
import {
  useProjectData,
  UseProjectDataState,
  UseProjectDataGetters,
  UseProjectDataActions,
} from "./useProjectData";

export type UseCurrentState = {
  routeId: string;
  record: RecordBase | null;
  children: RecordBase[] | null;
  path: RecordBase[] | null;
};

export type UseCurrentGetters = {};

export type UseCurrentActions = {
  setId: (routeId: string) => void;
  getChildrenByDesign: (designKey: string) => RecordBase[] | null;
};

export const useCurrent = defineStore<
  "current",
  UseCurrentState,
  UseCurrentGetters,
  UseCurrentActions
>("current", {
  state: () => {
    return {
      routeId: "",
      record: null,
      children: null,
      path: null,
    };
  },
  getters: {},
  actions: {
    setId: function (routeId: string) {
      const projectData: Store<
        "projectData",
        UseProjectDataState,
        UseProjectDataGetters,
        UseProjectDataActions
      > = useProjectData();

      //* establecemos el routeId
      this.routeId = routeId;
      //* buscamos el registro
      this.record = projectData.getItem(this.routeId as string);
      //* buscamos los hijos
      this.children = projectData.getChildren(this.routeId as string);
      //* ordenamos hijos primero por __designKey y segundo por __order
      if (this.children)
        this.children.sort((a: RecordBase, b: RecordBase) => {
          if (a.__designKey === b.__designKey) {
            return a.__order === b.__order ? 0 : a.__order < b.__order ? -1 : 1;
          } else {
            return a.__designKey.localeCompare(b.__designKey);
          }
        });
      //* buscamos el path
      this.path = projectData.getPath(this.routeId as string);
    },
    getChildrenByDesign: function (designKey: string): RecordBase[] | null {
      const found = this.children?.filter((element: RecordBase) => {
        return (
          element.__parentId === this.routeId &&
          element.__designKey === designKey
        );
      });
      return found ? found : null;
    },
  },
});
