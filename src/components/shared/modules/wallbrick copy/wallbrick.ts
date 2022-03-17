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
  id: string;
  component: string;
  caption: string;
  icon: string;
  slot: string;
  html: string;
  classes: Collection<string | boolean>;
  style: Collection<string | boolean>;
  vars: Collection<any>;
  setup: (callback: (brick: Brick, wall: Wall) => void) => void;
  setup: (brick: Brick, wall: Wall) => void;
  clicked: (callback: (brick: Brick, wall: Wall) => void) => void;
  clicked: (brick: Brick, wall: Wall) => void;
  mouseDown: (callback: (brick: Brick, wall: Wall) => void) => void;
  mouseDown: (brick: Brick, wall: Wall) => void;
  mouseUp: (callback: (brick: Brick, wall: Wall) => void) => void;
  mouseUp: (brick: Brick, wall: Wall) => void;
  updated: (callback: (brick: Brick, wall: Wall) => void) => void;
  updated: (brick: Brick, wall: Wall) => void;
  mount: (container: Wall | Map<string, Brick>) => void;
  wall: Wall;
  refresh: () => void;
};

export type Wall = {
  pulse: number;
  name: string;
  classes: Collection<string | boolean>;
  style: Collection<string | boolean>;
  bricks: Collection<Brick>;
  setup: (callback: (wall: Wall) => void) => void;
  setup: (wall: Wall) => void;
  updated: (callback: (wall: Wall) => void) => void;
  updated: (wall: Wall) => void;
  mount: () => void;
  refresh: () => void;
  refreshAll: () => void;
};

const bricks: Brick[] = [];

export function useBrick(id?: string): Brick {
  const brick: Brick = {} as any;
  if (id) brick.id = id;
  else brick.id = "";
  brick.component = "";
  brick.caption = "";
  brick.icon = "";
  brick.slot = "";
  brick.html = "";
  brick.classes = {
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
  };
  brick.style = {
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
  };
  brick.vars = {
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
  };
  brick.setup = () => {};
  brick.setup = (callback: (brick: Brick, wall: Wall) => void) => {
    brick.setup = (brick: Brick, wall: Wall) => {
      callback(brick, wall);
    };
  };
  brick.clicked = () => {};
  brick.clicked = (callback: (brick: Brick, wall: Wall) => void) => {
    brick.clicked = (brick: Brick, wall: Wall) => {
      callback(brick, wall);
      wall.refreshAll();
    };
  };
  brick.mouseDown = () => {};
  brick.mouseDown = (callback: (brick: Brick, wall: Wall) => void) => {
    brick.mouseDown = (brick: Brick, wall: Wall) => {
      callback(brick, wall);
      wall.refreshAll();
    };
  };
  brick.mouseUp = () => {};
  brick.mouseUp = (callback: (brick: Brick, wall: Wall) => void) => {
    brick.mouseUp = (brick: Brick, wall: Wall) => {
      callback(brick, wall);
      wall.refreshAll();
    };
  };
  brick.updated = () => {};
  brick.updated = (callback: (brick: Brick, wall: Wall) => void) => {
    brick.updated = (brick: Brick, wall: Wall) => {
      callback(brick, wall);
    };
  };
  brick.mount = (container: Wall | Map<string, Brick>) => {
    if ((container as Wall).bricks) {
      brick.wall = container as Wall;
      brick.setup(brick, container as Wall);
      (container as Wall).bricks.set(brick.id, brick);
      brick.updated(brick, container as Wall);
    } else {
      (container as Map<string, Brick>).set(brick.id, brick);
    }
  };
  brick.refresh = () => {
    brick.updated(brick, brick.wall);
  };
  return brick;
}

const walls: Wall[] = [];

export function useWall(name: string): Wall {
  const wall: Wall = {} as any;
  wall.pulse = 0;
  if (name) wall.name = name;
  wall.classes = {
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
  };
  wall.style = {
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
  };
  wall.bricks = {
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
  };
  wall.setup = () => {};
  wall.setup = (callback: (wall: Wall) => void) => {
    wall.setup = (wall: Wall) => {
      callback(wall);
    };
  };
  wall.updated = () => {};
  wall.updated = (callback: (wall: Wall) => void) => {
    wall.updated = (wall: Wall) => {
      callback(wall);
    };
  };
  wall.mount = () => {
    wall.setup(wall);
    wall.updated(wall);
    wall.bricks.items.forEach((brick: Brick) => {
      brick.updated(brick, wall);
    });
  };
  wall.refresh = () => {
    wall.updated(wall);
  };
  wall.refreshAll = () => {
    wall.updated(wall);
    wall.bricks.items.forEach((brick: Brick) => {
      brick.updated(brick, wall);
    });
  };
  return wall;
}
