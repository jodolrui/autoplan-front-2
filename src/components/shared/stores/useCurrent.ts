import { defineStore, Store } from "pinia";
import { watch } from "vue";
import { RecordBase, Design, ChildDesign } from "../interfaces/dataInterfaces";
import { Field } from "../interfaces/dataInterfaces";
import { Brick } from "../modules/wallbrick/wallbrick";
import {
  useProjectData,
  UseProjectDataState,
  UseProjectDataGetters,
  UseProjectDataActions,
} from "./useProjectData";
import { getDesign, DesignPack, designs } from "../../designs/getDesign";
import { v4 as uuidv4 } from "uuid";
import { Option } from "../interfaces/general";

export type UseCurrentState = {
  routeId: string;
  record: RecordBase | null;
  children: RecordBase[] | null;
  path: RecordBase[] | null;
  selected: {
    record: RecordBase | null;
    field: Field | null;
    brick: Brick | null;
  };
  edit: { value: string; cursor: number };
  editing: { pre: string[]; post: string[] };
  keyboardOn: boolean;
  pulse: number;
  optionsOn: boolean;
  options: Option[];
};

export type UseCurrentGetters = {
  selectedElement(
    state: UseCurrentState,
  ): { label: HTMLElement; value: HTMLElement } | null;
  // editChars(state: UseCurrentState): string[] | null;
};

export type UseCurrentActions = {
  setId: (routeId: string) => void;
  orderChildren: () => void;
  getChildrenByDesign: (designKey: string) => RecordBase[] | null;
  setSelected: (
    record: RecordBase | null,
    field: Field | null,
    brick: Brick | null,
  ) => void;
  sendKey: (keyCode: string, keyCaption: string) => void;
  move: (record: RecordBase, step: number) => void;
  moveUp: (record: RecordBase) => void;
  moveDown: (record: RecordBase) => void;
  delete: (record: RecordBase) => void;
  newRecord: (designKey: string, beforeRecord?: RecordBase) => void;
  chooseDesign: () => void;
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
      selected: { record: null, field: null, brick: null },
      edit: { value: "", cursor: 0 },
      editing: { pre: [], post: [] },
      keyboardOn: false,
      pulse: 0,
      optionsOn: false,
      options: [],
    };
  },
  getters: {
    selectedElement(state): { label: HTMLElement; value: HTMLElement } | null {
      const key = `${state.selected.record?.__id}_${state.selected.field?.key}`;
      const label = document.getElementById(`${key}_label`);
      const value = document.getElementById(`${key}_value`);
      //console.log({ label, value });
      return label && value ? { label, value } : null;
    },
    // editChars(state): string[] | null {
    //   const result = state.edit.value ? state.edit.value.split("") : [];
    //   return result;
    // },
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
      if (this.children) this.orderChildren();
      //* buscamos el path
      this.path = projectData.getPath(this.routeId as string);
    },
    orderChildren: function () {
      if (this.children) {
        this.children.sort((a: RecordBase, b: RecordBase) => {
          //* ordenamos por __order
          return a.__order === b.__order ? 0 : a.__order < b.__order ? -1 : 1;
          //* ordenamos primero por __designKey y segundo por __order
          // if (a.__designKey === b.__designKey) {
          //   return a.__order === b.__order ? 0 : a.__order < b.__order ? -1 : 1;
          // } else {
          //   return a.__designKey.localeCompare(b.__designKey);
          // }
        });
        let order: number = 0;
        this.children?.forEach((element: RecordBase) => {
          element.__order = order;
          order++;
        });
      }
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
    //* --> edit
    setSelected: function (
      record: RecordBase | null,
      field: Field | null,
      brick: Brick | null,
    ) {
      this.selected = { record, field: field as any, brick };
      if (record && field) {
        let value: string = (record as any)[field.key].value.toString();
        if ((record as any)[field.key].units)
          value += " " + (record as any)[field.key].units.toString();
        this.edit.value = value;
        this.edit.cursor = value.length;
      } else {
        this.edit = { value: "", cursor: 0 };
        this.keyboardOn = false;
      }
    },
    sendKey: function (keyCode: string, keyCaption: string) {
      if (keyCode.length === 1 || keyCode === "spacebar") {
        if (keyCode === "spacebar") keyCaption = " ";
        if (keyCaption.length === 1) {
          if (this.edit.value)
            if (this.edit.cursor === 0) {
              this.edit.value = keyCaption + this.edit.value;
              this.edit.cursor++;
            } else if (this.edit.cursor) {
              const pre = this.edit.value.substring(0, this.edit.cursor);
              const post = this.edit.value.substring(this.edit.cursor);
              this.edit.value = `${pre}${keyCaption}${post}`;
              this.edit.cursor++;
            } else {
              this.edit.value += keyCaption;
              this.edit.cursor = this.edit.value.length;
            }
          else {
            this.edit.value = keyCaption;
            this.edit.cursor = 1;
          }
        }
      }
      if (keyCode === "backspace") {
        const value = this.edit.value;
        let cursor = this.edit.cursor;
        if (value) {
          if (cursor) {
            const pre = value.substring(0, (cursor as number) - 1);
            const post = value.substring(cursor as number);
            this.edit.value = `${pre}${post}`;
            if (cursor > 0) (this.edit.cursor as number)--;
          } else {
            this.edit.value = value.substring(0, value.length - 1);
            this.edit.cursor = this.edit.value.length;
          }
        }
        // console.log({ value, cursor });
      }
      if (keyCode === "enter") {
        //! me falta procesar las unidades
        const value: string | null = this.edit.value;
        if (this.selected.record && this.selected.field) {
          (this.selected.record as any)[
            (this.selected.field as Field).key
          ].value = value;
          if (this.selected.brick) this.selected.brick.caption = value;
          this.setSelected(null, null, null);
        }
      }
    },
    //* --< edit
    move: function (record: RecordBase, step: number) {
      if (this.children) {
        console.log({ children: this.children });
        const found = this.children.find((element: RecordBase) => {
          return element.__order === record.__order + step;
        });
        if (found) {
          record.__order += step;
          found.__order -= step;
          this.orderChildren();
        }
        console.log({ children: this.children });
      }
    },
    moveDown: function (record: RecordBase) {
      this.move(record, 1);
    },
    moveUp: function (record: RecordBase) {
      this.move(record, -1);
    },
    delete: function (record: RecordBase) {
      let index: number | null = null;
      if (this.children) {
        this.children.forEach((element: RecordBase, i: number) => {
          if (element.__id === record.__id) index = i;
        });
        //* hacemos if (index !== null) porque si index === 0 if (index) seria false
        if (index !== null) this.children.splice(index, 1);
        this.orderChildren();
      }
    },
    newRecord: function (
      designKey: string,
      beforeRecord: RecordBase | undefined,
    ) {
      if (!this.children) this.children = [];
      const design: DesignPack = getDesign(designKey);
      //! JSON.stringify/parse only work with Number and String and Object literal without function or Symbol properties
      const newRecord: RecordBase = JSON.parse(
        JSON.stringify(design.newRecord),
      );
      newRecord.__id = uuidv4();
      if (beforeRecord) {
        newRecord.__order = beforeRecord.__order;

        this.children.forEach((element: RecordBase) => {
          if (element.__order >= newRecord.__order) element.__order++;
        });
      } else {
        newRecord.__order =
          Math.max.apply(
            Math,
            this.children.map((obj: RecordBase) => {
              return obj.__order;
            }),
          ) + 1;
      }
      this.children.push(newRecord);
      this.orderChildren();
    },
    chooseDesign() {
      if (this.record) {
        const design = getDesign(this.record.__designKey);
        this.options = [];
        design.childDesigns.forEach((element: ChildDesign) => {
          const found = designs.find((design: Design) => {
            return design.designKey === element.designKey;
          });
          if (found) {
            let option: Option = {
              key: found.designKey,
              caption: found.caption,
            };
            this.options.push(option);
          }
        });
      }
    },
  },
});
