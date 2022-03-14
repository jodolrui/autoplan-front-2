import { Ref, ref, reactive, watch } from "vue";

export type Collection<T> = {
  items: T[];
  keys: string[];
  set: (key: string, obj: T) => void;
  get: (key: string) => T;
  has: (key: string) => boolean;
  delete: (key: string) => void;
};

export type Brick = {
  code: string;
  caption: string;
  icon: string;
  slot: string;
  html: string;
  component: string;
  classes: Collection<string | boolean>;
  style: Collection<string | boolean>;
  vars: Collection<any>;
  __setup: (brick: Brick, wall: Wall) => void;
  setup: (brick: Brick, wall: Wall) => void;
  __clicked: (brick: Brick, wall: Wall) => void;
  clicked: (brick: Brick, wall: Wall) => void;
  __updated: (brick: Brick, wall: Wall) => void;
  updated: (brick: Brick, wall: Wall) => void;
  mount: (container: Wall | Map<string, Brick>) => void;
  wall: Wall;
  refresh: () => void;
};

export type Wall = {
  name: string;
  classes: Collection<string | boolean>;
  style: Collection<string | boolean>;
  bricks: Collection<Brick>;
  __setup: (wall: Wall) => void;
  setup: (wall: Wall) => void;
  __updated: (wall: Wall) => void;
  updated: (wall: Wall) => void;
  mount: () => void;
  refresh: () => void;
  refreshAll: () => void;
};

export function useBrick(code?: string): Brick {
  const brick: Brick = {
    code: code ? code : "",
    caption: "",
    icon: "",
    slot: "",
    html: "",
    component: "",
    wall: {} as Wall,
    classes: {
      items: reactive([]),
      keys: [],
      set: function (key: string, item: string | boolean) {
        this.items.push(item);
        this.keys.push(key);
      },
      get: function (key: string) {
        const position = this.keys.indexOf(key);
        return this.items[position];
      },
      has: function (key: string) {
        return this.keys.indexOf(key) >= 0;
      },
      delete: function (key: string) {
        const position = this.keys.indexOf(key);
        this.items.splice(position);
        this.keys.splice(position);
      },
    },
    style: {
      items: reactive([]),
      keys: [],
      set: function (key: string, item: string | boolean) {
        this.items.push(item);
        this.keys.push(key);
      },
      get: function (key: string) {
        const position = this.keys.indexOf(key);
        return this.items[position];
      },
      has: function (key: string) {
        return this.keys.indexOf(key) >= 0;
      },
      delete: function (key: string) {
        const position = this.keys.indexOf(key);
        this.items.splice(position);
        this.keys.splice(position);
      },
    },
    vars: {
      items: reactive([]),
      keys: [],
      set: function (key: string, item: Object) {
        this.items.push(item);
        this.keys.push(key);
      },
      get: function (key: string) {
        const position = this.keys.indexOf(key);
        return this.items[position];
      },
      has: function (key: string) {
        return this.keys.indexOf(key) >= 0;
      },
      delete: function (key: string) {
        const position = this.keys.indexOf(key);
        this.items.splice(position);
        this.keys.splice(position);
      },
    },
    __setup: () => {},
    get setup() {
      return this.__setup;
    },
    set setup(callback: (brick: Brick, wall: Wall) => void) {
      this.__setup = callback;
    },
    __clicked: () => {},
    get clicked() {
      return this.__clicked;
    },
    set clicked(callback: (brick: Brick, wall: Wall) => void) {
      this.__clicked = callback;
    },
    __updated: () => {},
    get updated() {
      return this.__updated;
    },
    set updated(callback: (brick: Brick, wall: Wall) => void) {
      this.__updated = callback;
    },
    mount: function (container: Wall | Map<string, Brick>) {
      if ((container as Wall).bricks) {
        this.wall = container as Wall;
        this.__setup(brick, container as Wall);
        (container as Wall).bricks.set(this.code, brick);
        this.__updated(brick, container as Wall);
      } else {
        (container as Map<string, Brick>).set(this.code, brick);
      }
    },
    refresh: function () {
      this.updated(brick, this.wall);
    },
  };
  return brick;
}

export function useWall(name: string): Wall {
  const wall: Wall = {
    name: name ? name : "",
    classes: {
      items: reactive([]),
      keys: [],
      set: function (key: string, item: string | boolean) {
        this.items.push(item);
        this.keys.push(key);
      },
      get: function (key: string) {
        const position = this.keys.indexOf(key);
        return this.items[position];
      },
      has: function (key: string) {
        return this.keys.indexOf(key) >= 0;
      },
      delete: function (key: string) {
        const position = this.keys.indexOf(key);
        this.items.splice(position);
        this.keys.splice(position);
      },
    },
    style: {
      items: reactive([]),
      keys: [],
      set: function (key: string, item: string | boolean) {
        this.items.push(item);
        this.keys.push(key);
      },
      get: function (key: string) {
        const position = this.keys.indexOf(key);
        return this.items[position];
      },
      has: function (key: string) {
        return this.keys.indexOf(key) >= 0;
      },
      delete: function (key: string) {
        const position = this.keys.indexOf(key);
        this.items.splice(position);
        this.keys.splice(position);
      },
    },
    bricks: {
      items: reactive([]),
      keys: [],
      set: function (key: string, item: Brick) {
        this.items.push(item);
        this.keys.push(key);
      },
      get: function (key: string) {
        const position = this.keys.indexOf(key);
        return this.items[position];
      },
      has: function (key: string) {
        return this.keys.indexOf(key) >= 0;
      },
      delete: function (key: string) {
        const position = this.keys.indexOf(key);
        this.items.splice(position);
        this.keys.splice(position);
      },
    },
    __setup: () => {},
    get setup() {
      return this.__setup;
    },
    set setup(callback: (wall: Wall) => void) {
      this.__setup = callback;
    },
    __updated: () => {},
    get updated() {
      return this.__updated;
    },
    set updated(callback: (wall: Wall) => void) {
      this.__updated = callback;
    },
    mount: () => {
      wall.__setup(wall);
      wall.__updated(wall);
      wall.bricks.items.forEach((brick: Brick) => {
        brick.__updated(brick, wall);
      });
    },
    refresh: () => {
      wall.__updated(wall);
    },
    refreshAll: () => {
      wall.__updated(wall);
      wall.bricks.items.forEach((brick: Brick) => {
        brick.__updated(brick, wall);
      });
    },
  };
  return wall;
}
