import { defineStore, Store } from "pinia";
import { watch } from "vue";
import { RecordBase } from "../helpers/data-interfaces";
import { Field } from "../helpers/data-interfaces";
import { Brick } from "../wallbrick/wallbrick";
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
  selectedField: string | null;
  fieldPulse: number;
  selected: {
    record: RecordBase | null;
    field: Field | null;
  };
  edit: { value: string | null; cursor: number | null };
  editing: { pre: string[]; post: string[] };
};

export type UseCurrentGetters = {
  selectedElement(
    state: UseCurrentState,
  ): { label: HTMLElement; value: HTMLElement } | null;
  editChars(state: UseCurrentState): string[] | null;
};

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
      selectedField: null,
      fieldPulse: 0,
      selected: { record: null, field: null },
      edit: { value: null, cursor: null },
      editing: { pre: [], post: [] },
    };
  },
  getters: {
    selectedElement(state): { label: HTMLElement; value: HTMLElement } | null {
      const key = `${state.selected.record?.__id}_${state.selected.field?.key}`;
      const label = document.getElementById(`${key}_label`);
      const value = document.getElementById(`${key}_value`);
      console.log({ label, value });
      return label && value ? { label, value } : null;
    },
    editChars(state): string[] | null {
      return state.edit.value ? state.edit.value.split("") : null;
    },
  },
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
