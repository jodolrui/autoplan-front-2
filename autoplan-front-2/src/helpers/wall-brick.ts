import { Ref, ref, reactive, watch } from "vue";
import _ from "lodash";
import { spread } from "./composeStyle";

export type BrickConfig = {
  code?: string;
  caption?: string;
  row?: number;
  col?: number;
  rowSpan?: number;
  colSpan?: number;
  icon?: string;
  classes?: { [key: string]: any };
  style?: { [key: string]: any };
  setup?: () => void;
  click?: () => void;
  slot?: string;
  div?: {
    classes?: { [key: string]: any };
    style?: { [key: string]: any };
    html: string;
  };
  refresh?: () => void;
  elementType?: "button" | "div";
  vars?: { [key: string]: any };
};

export type Brick = BrickConfig & {
  __refresh: () => void; //* con __refresh solucioné un problema de acceso recursivo a refresh
  __click?: () => void; //* click() + wall.refresh()
};

export type WallConfig = {
  classes: { [key: string]: any };
  style: { [key: string]: any };
  items: { [key: string]: BrickConfig };
  refresh?: () => void;
};

export type Wall = WallConfig & {
  items: { [key: string]: Brick }; //* BrickConfig por Brick
  __refresh: () => void; //* con __refresh solucioné un problema de acceso recursivo a refresh
  addItem: (key: string, brickConfig: BrickConfig) => {};
  // deleteItem: (key: string) => {};
};

const walls: Wall[] = [];
//* canRefresh sirve para evitar refrescos recursivos
const canRefresh: Ref<boolean[]> = ref([]);
const canWatch: Ref<boolean> = ref(true);

export function defineWall(config: WallConfig): Wall {
  const wall: Wall = reactive({
    pulse: 0,
    // items: config.items ? <{ [key: string]: Brick }>config.items : {},
    items: <{ [key: string]: Brick }>{},
    classes: config.classes ? config.classes : {},
    style: config.style ? config.style : {},
    refresh: config.refresh ? config.refresh : () => {},
    __refresh: () => {},
    addItem: function (key: string, brickConfig: BrickConfig) {
      const brick: Brick = <Brick>brickConfig;
      if (brick.click)
        //* __click es la verdadera función click
        brick.__click = () => {
          if (brick.click) brick.click();
          //* refresca el wall
          wall.__refresh();
        };
      else brick.__click = () => {};
      if (brick.refresh) {
        //* __refresh es la verdadera función refresh
        brick.__refresh = () => {
          if (brick.refresh) brick.refresh();
          //! por algún motivo se ejecuta dos veces
          // console.log({ brick });
        };
      } else brick.__refresh = () => {};
      if (brick.setup) brick.setup();
      this.items[key] = brick;
    },
  });

  console.log({ items: wall.items });

  for (const prop in config.items) {
    wall.addItem(prop, config.items[prop]);
  }

  Object.values(wall.items).forEach((brick: Brick) => {
    // if (brick.click)
    //   //* __click es la verdadera función click
    //   brick.__click = () => {
    //     if (brick.click) brick.click();
    //     //* refresca el wall
    //     wall.__refresh();
    //   };
    // else brick.__click = () => {};
    // if (brick.refresh) {
    //   //* __refresh es la verdadera función refresh
    //   brick.__refresh = () => {
    //     if (brick.refresh) brick.refresh();
    //     //! por algún motivo se ejecuta dos veces
    //     // console.log({ brick });
    //   };
    // } else brick.__refresh = () => {};
  });

  wall.__refresh = () => {
    //* ejecuta el wall.refresh
    if (wall.refresh) wall.refresh();
    //* ejecuta todos los brick.__refresh
    Object.values(wall.items).forEach((brick: Brick) => {
      brick.__refresh();
    });
  }; //* con __refresh solucioné un problema de acceso recursivo a refresh

  if (wall.refresh) wall.refresh();

  walls.push(wall);

  //* _.cloneDeep(wall) reacciona a cualquier cambio en todo el objeto wall
  watch(
    () => _.cloneDeep(wall),
    () => {
      if (wall.__refresh) wall.__refresh();
    },
  );

  return <Wall>walls.at(walls.length - 1);
}
