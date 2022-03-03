import { Ref, ref, reactive, watch } from "vue";
import _ from "lodash";
import { spread } from "../helpers/composeStyle";

export type Brick = {
  __pulse: Ref<number>;
  code: string;
  caption: string;
  icon: string;
  slot: string;
  define: (config: {
    code?: string;
    caption?: string;
    icon?: string;
    slot?: string;
  }) => void;
  classes: Map<string, boolean | string>;
  style: Map<string, boolean | string>;
  vars: { [key: string]: any } | {};
  setup: (callback: (brick: Brick, wall: Wall) => void) => void;
  __setup: (brick: Brick, wall: Wall) => void;
  clicked: (callback: (brick: Brick, wall: Wall) => void) => void;
  __clicked: (brick: Brick, wall: Wall) => void;
  updated: (callback: (brick: Brick, wall: Wall) => void) => void;
  __updated: (brick: Brick, wall: Wall) => void;
  mount: (container: Wall | Map<string, Brick>) => void;
  __wall: Wall;
  refresh: () => void;
};

export type Wall = {
  name: string;
  classes: Map<string, boolean | string>;
  style: Map<string, boolean | string>;
  bricks: Map<string, Brick>;
  setup: (callback: (wall: Wall) => void) => void;
  __setup: (wall: Wall) => void;
  clicked: (callback: (wall: Wall) => void) => void;
  __clicked: (wall: Wall) => void;
  updated: (callback: (wall: Wall) => void) => void;
  __updated: (wall: Wall) => void;
  mount: () => void;
  refresh: () => void;
};

const bricks: Brick[] = [];

export function useBrick(code?: string): Brick {
  const brick: Brick = {} as any;
  brick.__pulse = ref(0);
  if (code) brick.code;
  brick.define = ({ code, caption, icon, slot }) => {
    brick.code = code as string;
    brick.caption = caption as string;
    brick.icon = icon as string;
    brick.slot = slot as string;
  };
  brick.classes = new Map() as Map<string, boolean | string>;
  brick.style = new Map() as Map<string, boolean | string>;
  brick.__setup = () => {};
  brick.setup = (callback: (brick: Brick, wall: Wall) => void) => {
    brick.__setup = callback;
  };
  brick.__clicked = () => {};
  brick.clicked = (callback: (brick: Brick, wall: Wall) => void) => {
    brick.__clicked = callback;
  };
  brick.__updated = () => {};
  brick.updated = (callback: (brick: Brick, wall: Wall) => void) => {
    brick.__updated = callback;
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
  bricks.push(brick);
  return brick;
}

const walls: Wall[] = [];

export function useWall(name: string): Wall {
  const wall: Wall = {} as any;
  wall.name = name;
  wall.classes = new Map() as Map<string, boolean | string>;
  wall.style = new Map() as Map<string, boolean | string>;
  wall.bricks = new Map() as Map<string, Brick>;
  wall.__setup = () => {};
  wall.setup = (callback: (wall: Wall) => void) => {
    wall.__setup = callback;
  };
  wall.__updated = () => {};
  wall.updated = (callback: (wall: Wall) => void) => {
    wall.__updated = callback;
  };
  wall.mount = () => {
    wall.__setup(wall);
    wall.__updated(wall);
  };
  wall.refresh = () => {
    wall.__updated(wall);
  };
  walls.push(wall);
  return wall;
}
