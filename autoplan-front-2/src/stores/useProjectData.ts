import { defineStore } from "pinia";
import { RecordBase } from "../helpers/data-interfaces";

export const useProjectData = defineStore("projectData", {
  state: (): { projectData: RecordBase[] } => {
    return {
      projectData: [],
    };
  },
  getters: {},
  actions: {
    setData: function (data: RecordBase[]) {
      this.projectData = data;
    },
    getItem: function (id: string): RecordBase | null {
      const found: RecordBase | undefined = this.projectData.find(
        (element: RecordBase) => {
          return element.__id === id;
        },
      );
      return found ? found : null;
    },
    getParent: function (id: string): RecordBase | null {
      const child = this.getItem(id);
      const found = this.projectData.find((element: RecordBase) => {
        return child ? element.__id === child.__parentId : false;
      });
      return found ? found : null;
    },
    getChildren: function (id: string): RecordBase[] | null {
      const found = this.projectData.filter((element: RecordBase) => {
        return element.__parentId === id;
      });
      return found ? found : null;
    },
    getChildrenByDesign: function (
      id: string,
      designKey: string,
    ): RecordBase[] | null {
      const found = this.projectData.filter((element: RecordBase) => {
        return element.__parentId === id && element.__designKey === designKey;
      });
      return found ? found : null;
    },
    getPath: function (id: string): RecordBase[] | null {
      let result: RecordBase[] = [];
      const item: RecordBase | null = this.getItem(id);
      if (item) {
        result.push(item);
        const getParent = this.getParent;
        function iterate(id: string) {
          let parent: RecordBase | null = getParent(id);
          if (parent) {
            result.push(parent);
            iterate(parent.__id);
          }
        }
        iterate(id);
      }
      result.reverse();
      return result.length > 0 ? result : null;
    },
    addItem: function (record: RecordBase) {
      this.projectData.push(record);
    },
    deleteItem: function (record: RecordBase) {
      for (var i = this.projectData.length - 1; i >= 0; --i) {
        if (this.projectData[i].__id === record.__id) {
          this.projectData.splice(i, 1);
        }
      }
    },
    changeItem: function (record: RecordBase) {
      //! en realidad los cambios realizados sobre registros no recién añadidos se guardan sin necesidad de esto
      //! la necesidad de esto es sólo para registros recién añadidos
      this.deleteItem(record);
      this.addItem(record);
    },
  },
});
