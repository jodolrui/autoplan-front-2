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
  classes: Collection<string | boolean>;
  style: Collection<string | boolean>;
  vars: Collection<any>;
  setup: (callback: (brick: Brick, wall: Wall) => void) => void;
  __setup: (brick: Brick, wall: Wall) => void;
  clicked: (callback: (brick: Brick, wall: Wall) => void) => void;
  __clicked: (brick: Brick, wall: Wall) => void;
  mouseDown: (callback: (brick: Brick, wall: Wall) => void) => void;
  __mouseDown: (brick: Brick, wall: Wall) => void;
  mouseUp: (callback: (brick: Brick, wall: Wall) => void) => void;
  __mouseUp: (brick: Brick, wall: Wall) => void;
  updated: (callback: (brick: Brick, wall: Wall) => void) => void;
  __updated: (brick: Brick, wall: Wall) => void;
  mount: (container: Wall | Map<string, Brick>) => void;
  __wall: Wall;
  refresh: () => void;
};

export type Wall = {
  pulse: number;
  name: string;
  classes: Collection<string | boolean>;
  style: Collection<string | boolean>;
  bricks: Collection<Brick>;
  setup: (callback: (wall: Wall) => void) => void;
  __setup: (wall: Wall) => void;
  updated: (callback: (wall: Wall) => void) => void;
  __updated: (wall: Wall) => void;
  mount: () => void;
  refresh: () => void;
  refreshAll: () => void;
};

const bricks: Brick[] = [];

export function useBrick(code?: string): Brick {
  const brick: Brick = {} as any;
  if (code) brick.code = code;
  else brick.code = "";
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
  brick.__setup = () => {};
  brick.setup = (callback: (brick: Brick, wall: Wall) => void) => {
    brick.__setup = (brick: Brick, wall: Wall) => {
      callback(brick, wall);
    };
  };
  brick.__clicked = () => {};
  brick.clicked = (callback: (brick: Brick, wall: Wall) => void) => {
    brick.__clicked = (brick: Brick, wall: Wall) => {
      callback(brick, wall);
      wall.refreshAll();
    };
  };
  brick.__mouseDown = () => {};
  brick.mouseDown = (callback: (brick: Brick, wall: Wall) => void) => {
    brick.__mouseDown = (brick: Brick, wall: Wall) => {
      callback(brick, wall);
      wall.refreshAll();
    };
  };
  brick.__mouseUp = () => {};
  brick.mouseUp = (callback: (brick: Brick, wall: Wall) => void) => {
    brick.__mouseUp = (brick: Brick, wall: Wall) => {
      callback(brick, wall);
      wall.refreshAll();
    };
  };
  brick.__updated = () => {};
  brick.updated = (callback: (brick: Brick, wall: Wall) => void) => {
    brick.__updated = (brick: Brick, wall: Wall) => {
      callback(brick, wall);
    };
  };
  brick.mount = (container: Wall | Map<string, Brick>) => {
    if ((container as Wall).bricks) {
      brick.__wall = container as Wall;
      brick.__setup(brick, container as Wall);
      (container as Wall).bricks.set(brick.code, brick);
      brick.__updated(brick, container as Wall);
    } else {
      (container as Map<string, Brick>).set(brick.code, brick);
    }
  };
  brick.refresh = () => {
    brick.__updated(brick, brick.__wall);
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
  wall.__setup = () => {};
  wall.setup = (callback: (wall: Wall) => void) => {
    wall.__setup = (wall: Wall) => {
      callback(wall);
    };
  };
  wall.__updated = () => {};
  wall.updated = (callback: (wall: Wall) => void) => {
    wall.__updated = (wall: Wall) => {
      callback(wall);
    };
  };
  wall.mount = () => {
    wall.__setup(wall);
    wall.__updated(wall);
    wall.bricks.items.forEach((brick: Brick) => {
      brick.__updated(brick, wall);
    });
  };
  wall.refresh = () => {
    wall.__updated(wall);
  };
  wall.refreshAll = () => {
    wall.__updated(wall);
    wall.bricks.items.forEach((brick: Brick) => {
      brick.__updated(brick, wall);
    });
  };
  return wall;
}
